import pandas as pd

def get_revenue_by_month(df):
    return df.groupby("month")["revenue"].sum()