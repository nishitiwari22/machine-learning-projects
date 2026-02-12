# ===============================
# Imports
# ===============================
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os
import plotly.graph_objects as go
from pulp import *

# ===============================
# Load files
# ===============================
for dirname, _, filenames in os.walk('/kaggle/input'):
    for filename in filenames:
        print(os.path.join(dirname, filename))

mainFile = pd.ExcelFile("/kaggle/input/supply-chain-data/Supply chain logisitcs problem.xlsx")

# ===============================
# Read all sheets into dictionary
# ===============================
df_dict = {}
for name in mainFile.sheet_names:
    df = mainFile.parse(name)
    df_dict[name] = df

# ===============================
# Check shapes, duplicates, nulls
# ===============================
for df_name, df in df_dict.items():
    print(df_name, df.shape)
    print("Duplicates:", df.duplicated().sum())
    print("Missing:", df.isnull().sum().sum())

# ===============================
# Clean FreightRates
# ===============================
df_dict['FreightRates'] = df_dict['FreightRates'].drop_duplicates()

# ===============================
# Standardize column names
# ===============================
for df in df_dict.values():
    df.columns = [c.strip().replace(" ", "_").replace("/", "_").upper() for c in df.columns]

# ===============================
# Merge + Cost calculation
# ===============================
orderList = df_dict['OrderList']

orderList = orderList.merge(
    df_dict['FreightRates'],
    left_on=['CARRIER', 'ORIGIN_PORT', 'DESTINATION_PORT'],
    right_on=['CARRIER', 'ORIG_PORT_CD', 'DEST_PORT_CD'],
    how='left'
)

orderList = orderList.merge(
    df_dict['WhCosts'],
    left_on='PLANT_CODE',
    right_on='WH',
    how='left'
)

orderList['COST'] = (
    orderList['UNIT_QUANTITY'] * orderList['RATE']
    + orderList['UNIT_QUANTITY'] * orderList['COST_UNIT']
)

orderList = orderList.dropna()
orderList['ORDER_DATE'] = pd.to_datetime(orderList['ORDER_DATE'])

df_dict['OrderList'] = orderList

# ===============================
# Descriptive statistics
# ===============================
df_dict['OrderList'].describe()
df_dict['FreightRates'].describe()

# ===============================
# Correlation heatmap
# ===============================
corr = df_dict['OrderList'].corr(numeric_only=True)

plt.figure(figsize=(10, 6))
sns.heatmap(corr, annot=True, cmap='coolwarm')
plt.title("Correlation Matrix")
plt.show()

# ===============================
# Pricing & revenue
# ===============================
pricing_strategy = df_dict['FreightRates']['MODE_DSC'].unique()
price_elasticity = df_dict['FreightRates']['RATE'].mean()
historical_revenue = df_dict['OrderList']['UNIT_QUANTITY'] * df_dict['OrderList']['COST']
total_revenue = historical_revenue.sum()

print("Pricing strategies:", pricing_strategy)
print("Average price elasticity:", price_elasticity)
print("Total revenue:", total_revenue)

# ===============================
# Visualizations
# ===============================
plt.figure(figsize=(10, 6))
sns.scatterplot(data=df_dict['OrderList'], x='WEIGHT', y='COST', hue='CARRIER')
plt.show()

# ===============================
# Network visualization
# ===============================
df_plant_ports = df_dict['PlantPorts']
fig = go.Figure()

for _, row in df_plant_ports.iterrows():
    fig.add_trace(go.Scatter(
        x=[row['PLANT_CODE'], row['PORT']],
        y=[1, 0],
        mode='lines+markers',
        hoverinfo='text',
        text=f"Plant: {row['PLANT_CODE']} → Port: {row['PORT']}"
    ))

fig.update_layout(
    title="Plant-Port Connections",
    showlegend=False,
    yaxis=dict(showticklabels=False)
)
fig.show()

# ===============================
# Linear Programming Model
# ===============================
supply_nodes = list(df_dict['WhCosts']['WH'])
demand_nodes = list(df_dict['OrderList']['DESTINATION_PORT'].unique())

# Supply
supply_dict = {}
for node in supply_nodes:
    supply_dict[node] = df_dict['WhCapacities'][
        df_dict['WhCapacities']['PLANT_ID'] == node
    ]['DAILY_CAPACITY'].sum()

# Demand
demand_dict = {}
for _, row in df_dict['OrderList'].iterrows():
    demand_dict[row['DESTINATION_PORT']] = (
        demand_dict.get(row['DESTINATION_PORT'], 0)
        + row['UNIT_QUANTITY']
    )

# Cost dictionary (simplified)
cost_dict = {
    w: {b: 1 for b in demand_nodes}
    for w in supply_nodes
}

# LP Problem
prob = LpProblem("SupplyChainOptimization", LpMinimize)

routes = LpVariable.dicts(
    "Route",
    (supply_nodes, demand_nodes),
    lowBound=0,
    cat=LpInteger
)

prob += lpSum(routes[w][b] * cost_dict[w][b]
              for w in supply_nodes for b in demand_nodes)

for w in supply_nodes:
    prob += lpSum(routes[w][b] for b in demand_nodes) <= supply_dict[w]

for b in demand_nodes:
    prob += lpSum(routes[w][b] for w in supply_nodes) >= demand_dict[b]

prob.solve()

print("Status:", LpStatus[prob.status])
print("Objective value:", value(prob.objective))