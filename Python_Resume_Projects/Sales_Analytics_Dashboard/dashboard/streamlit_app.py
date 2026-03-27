import streamlit as st
import pandas as pd
from sqlalchemy import create_engine

engine = create_engine("sqlite:///sales.db")

st.title("📊 Sales Analytics Dashboard")

# df = pd.read_sql("SELECT * FROM sales", engine)

st.subheader("Raw Data")
st.dataframe(df)

# Revenue by Region
st.subheader("Revenue by Region")
region_sales = df.groupby("Region")["Sales"].sum()
st.bar_chart(region_sales)

# Profit by Category
st.subheader("Profit by Category")
category_profit = df.groupby("Category")["Profit"].sum()
st.bar_chart(category_profit)

@st.cache_data
def load_data():
    return pd.read_sql("SELECT * FROM sales", engine)

df = load_data()