# Importing Libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Checking available files in Kaggle input
for dirname, _, filenames in os.walk('/kaggle/input'):
    for filename in filenames:
        print(os.path.join(dirname, filename))

# Loading Dataset
df = pd.read_csv("/kaggle/input/clicks-conversion-tracking/KAG_conversion_data.csv")
df.head()

# Checking Dataset Information
df.info()

# Checking Dataset Shape
df.shape

# Statistical Summary of Dataset
df.describe()

# Correlation Heatmap
g = sns.heatmap(df[["Impressions","Clicks","Spent","Total_Conversion","Approved_Conversion"]].corr(),
                annot=True, fmt=".2f", cmap="coolwarm")

# Unique Campaign IDs
df["xyz_campaign_id"].unique()

# Replacing Campaign IDs with Names
df["xyz_campaign_id"].replace({916:"campaign_a",936:"campaign_b",1178:"campaign_c"}, inplace=True)
df.head()

# Countplot of Campaigns
sns.countplot(x='xyz_campaign_id', data=df)
plt.show()

# Barplot: Campaign vs Approved Conversion
plt.bar(df["xyz_campaign_id"], df["Approved_Conversion"])
plt.ylabel("Approved_Conversion")
plt.title("company vs Approved_Conversion")
plt.show()

# Countplot: Age Distribution
sns.countplot(x='age', data=df)
plt.show()

# Barplot: Campaign vs Approved Conversion by Age
sns.set(style="whitegrid")
tips = sns.load_dataset("tips")
sns.barplot(x=df["xyz_campaign_id"], y=df["Approved_Conversion"], hue=df["age"], data=tips)

# Countplot: Gender Distribution
sns.countplot(x='gender', data=df)
plt.show()

# Barplot: Campaign vs Approved Conversion by Gender
sns.set(style="whitegrid")
tips = sns.load_dataset("tips")
sns.barplot(x=df["xyz_campaign_id"], y=df["Approved_Conversion"], hue=df["gender"], data=tips)

# Countplot: Interest Distribution
fig_dims = (15,6)
fig, ax = plt.subplots(figsize=fig_dims)
sns.countplot(x='interest', data=df)
plt.show()

# Scatterplot: Interest vs Approved Conversion
plt.scatter(df["interest"], df["Approved_Conversion"])
plt.title("interest vs. Approved_Conversion")
plt.xlabel("interest")
plt.ylabel("Approved_Conversion")
plt.show()

# FacetGrid: Interest vs Approved Conversion by Gender
g = sns.FacetGrid(df, col="gender")
g.map(plt.scatter, "interest", "Approved_Conversion", alpha=.4)
g.add_legend()

# FacetGrid: Interest vs Approved Conversion by Age
g = sns.FacetGrid(df, col="age")
g.map(plt.scatter, "interest", "Approved_Conversion", alpha=.4)
g.add_legend()

# Histogram: Spent
plt.hist(df['Spent'], bins=25)
plt.xlabel("Spent")
plt.ylabel("Frequency")
plt.show()

# Scatterplot: Spent vs Approved Conversion
plt.scatter(df["Spent"], df["Approved_Conversion"])
plt.title("Spent vs. Approved_Conversion")
plt.xlabel("Spent")
plt.ylabel("Approved_Conversion")
plt.show()

# FacetGrid: Spent vs Approved Conversion by Gender
g = sns.FacetGrid(df, col="gender")
g.map(plt.scatter, "Spent", "Approved_Conversion", alpha=.4)
g.add_legend()

# FacetGrid: Spent vs Approved Conversion by Age
g = sns.FacetGrid(df, col="age")
g.map(plt.scatter, "Spent", "Approved_Conversion", alpha=.4)
g.add_legend()

# Histogram: Impressions
plt.hist(df['Impressions'], bins=25)
plt.xlabel("Impressions")
plt.ylabel("Frequency")
plt.show()

# Scatterplot: Impressions vs Approved Conversion
plt.scatter(df["Impressions"], df["Approved_Conversion"])
plt.title("Impressions vs. Approved_Conversion")
plt.xlabel("Impressions")
plt.ylabel("Approved_Conversion")
plt.show()

# FacetGrid: Clicks vs Approved Conversion by Gender
g = sns.FacetGrid(df, col="gender")
g.map(plt.scatter, "Clicks", "Approved_Conversion", alpha=.4)
g.add_legend()

# FacetGrid: Clicks vs Approved Conversion by Age
g = sns.FacetGrid(df, col="age")
g.map(plt.scatter, "Clicks", "Approved_Conversion", alpha=.4)
g.add_legend()

# FacetGrid: Total Conversion vs Approved Conversion by Gender
g = sns.FacetGrid(df, col="gender")
g.map(plt.scatter, "Total_Conversion", "Approved_Conversion", alpha=.4)
g.add_legend()

# FacetGrid: Total Conversion vs Approved Conversion by Age
g = sns.FacetGrid(df, col="age")
g.map(plt.scatter, "Total_Conversion", "Approved_Conversion", alpha=.5)
g.add_legend()

# Filtering Campaign C
a, b, c = [], [], []
for i, j, k in zip(df.xyz_campaign_id, df.fb_campaign_id, df.Approved_Conversion):
    if i == "campaign_c":
        a.append(i)
        b.append(j)
        c.append(k)
d = {'campaign_name': a, 'fb_campaign_id': b, 'Approved_Conversion': c}     
campaign_c = pd.DataFrame(d)
campaign_c.head()

# Scatterplot: fb_campaign_id vs Approved Conversion for Campaign C
plt.figure(figsize=(20,5))
plt.scatter(campaign_c["fb_campaign_id"], campaign_c["Approved_Conversion"])
plt.title("fb_campaign_id vs. Approved_Conversion for campaign_c")
plt.xlabel("fb_campaign_id")
plt.ylabel("Approved_Conversion")
plt.show()

# Replacing Campaign Names with Original IDs for Modelling
df["xyz_campaign_id"].replace({"campaign_a":916 ,"campaign_b":936 ,"campaign_c":1178}, inplace=True)

# Encoding Categorical Variables
from sklearn.preprocessing import LabelEncoder
encoder = LabelEncoder()
encoder.fit(df["gender"])
df["gender"] = encoder.transform(df["gender"])
encoder.fit(df["age"])
df["age"] = encoder.transform(df["age"])
df.head()

# Splitting Features and Target
x = np.array(df.drop(labels=["Approved_Conversion","Total_Conversion"], axis=1))
y = np.array(df["Total_Conversion"]).reshape(len(df), 1)

# Feature Scaling
from sklearn.preprocessing import StandardScaler
sc_x = StandardScaler()
x = sc_x.fit_transform(x)

# Splitting Dataset into Train and Test Sets
from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

# Training Random Forest Regressor
from sklearn.ensemble import RandomForestRegressor
rfr = RandomForestRegressor(n_estimators=10, random_state=0)
rfr.fit(x_train, y_train)

# Predicting on Test Set
y_pred = rfr.predict(x_test)
y_pred = np.round(y_pred)

# Model Evaluation
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)
mae
r2