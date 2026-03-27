import pandas as pd

def load_and_clean_data(path):
    df = pd.read_csv(path, encoding='latin1')

    df.drop_duplicates(inplace=True)
    df.fillna(method="ffill", inplace=True)

    return df