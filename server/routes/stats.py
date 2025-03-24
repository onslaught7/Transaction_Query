from fastapi import APIRouter
import pandas as pd

router = APIRouter(prefix="/stats", tags=["Statistics"])

# Loading CSV
CSV_FILE_PATH = "./cleaned_&_transformed_transactions.csv"
df = pd.read_csv(CSV_FILE_PATH)

@router.get("/")
def get_statistics():
    """Returns key statistics from the dataset."""
    stats = {
        "total_revenue": df["totalamount"].sum(),
        "top_product_category": df["productcategory"].mode()[0],
        "total_transactions": len(df),
        "monthly_sales": df.groupby("month")["totalamount"].sum().to_dict(),
        "store_performance": df.groupby("storelocation")["totalamount"].sum().to_dict(),
        "payment_methods": df["paymentmethod"].value_counts().to_dict(),
    }

    return stats

print(get_statistics())