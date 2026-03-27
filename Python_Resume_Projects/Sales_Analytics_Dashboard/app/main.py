from app.data_processing.clean_data import load_and_clean_data
from app.database.db_connection import engine

def main():
    df = load_and_clean_data("data/sales.csv")
    df.to_sql("sales", engine, if_exists="replace", index=False)
    print("Data loaded into database")

if __name__ == "__main__":
    main()