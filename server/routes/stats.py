from fastapi import APIRouter
import pandas as pd

router = APIRouter(prefix="/stats", tags=["Statistics"])

# Load CSV Once for Performance
CSV_FILE_PATH = "./cleaned_&_transformed_transactions.csv"
df = pd.read_csv(CSV_FILE_PATH)

@router.get("/")
def get_statistics():
    try:
        stats = {
            "total_revenue": float(df["totalamount"].sum()),  
            "top_product_category": df["productcategory"].mode()[0],
            "total_transactions": int(len(df)), 

            "store_performance": [
                {"store": k, "sales": float(v)}
                for k, v in df.groupby("storelocation")["totalamount"]
                .sum()
                .sort_values(ascending=False)
                .head(10) 
                .items()
            ],

            "monthly_sales": [
                {"month": k, "sales": float(v)}
                for k, v in df.groupby("month")["totalamount"].sum().items()
            ][-6:],  

            "payment_methods": [
                {"method": k, "value": int(v)}
                for k, v in df["paymentmethod"].value_counts().items()
            ],
        }
        
        return stats
    
    except Exception as e:
        return {"error": str(e)}

print(get_statistics())