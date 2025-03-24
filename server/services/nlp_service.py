import pandas as pd
import openai
import os
from dotenv import load_dotenv

# load the environment variables
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


# loadin the csv file 
csv_file_path = "./cleaned_&_transformed_transactions.csv"
df = pd.read_csv(csv_file_path)


# Creating a list of all the columns in the dataset
columns = df.columns.tolist()
# print(columns)


# querying openai for user query to pandas query conversion
def query_openai_for_pandas(user_query):
    prompt = f"""
    You are a data assistant that converts natural language queries into pandas DataFrame operations.
    
    The dataset has the following columns, and **you must always use them in lowercase**:
    {columns}

    ### IMPORTANT RULES:
    - **All column names must be lowercase** (e.g., use `'books'`, not `'Books'`).
    - **Do NOT modify column names**; always use them **exactly as provided**.
    - **Incorrect Example:** df[df['ProductCategory'] == 'Books']['TotalAmount'].sum()
    - **Correct Example:** df[df['productcategory'] == 'books']['totalamount'].sum()

    ### Dataset Schema (Columns Must Always Be Used as Lowercase):
    - customerid: A unique identifier for each customer.
    - productid: The product code (e.g., A, B, C, or D).
    - quantity: The number of units purchased in a transaction.
    - price: The price per unit of the product.
    - transactiondate: The date and time of the transaction in MM/DD/YYYY HH:MM format.
    - paymentmethod: The mode of payment used (e.g., Cash, Credit Card, Debit Card, PayPal).
    - storelocation: The physical store location where the purchase occurred.
    - productcategory: The category of the product (e.g., clothing, electronics, books, home decor).
    - discountapplied(%): The discount percentage applied to the transaction.
    - totalamount: The final transaction amount after applying the discount.
    - year: The year in which the transaction took place.
    - month: The month of the transaction (1-12).
    - day: The day of the transaction (1-31).
    - day_of_week: The day of the week the transaction occurred (e.g., Monday, Tuesday).

    Always use **lowercase column names exactly as provided** in the schema above.  

    Example user query: Total revenue generated from home decor in the year 2023.
    Example pandas query: df[(df['productcategory'] == 'home decor') & (df['year'] == 2023)]['totalamount'].sum()
    Example user query: What was the total revenue in books in 2023
    Example pandas query: df[(df['productcategory'] == 'books') & (df['year'] == 2023)]['totalamount'].sum()

    You have to keep in mind the user can ask any question with typos but you have to convert it into a pandas DataFrame with correct 
    field names as given in the columns list {columns} and apply the required operation.

    Always remember to provide only the pandas command directly instead of wrapping it in anything else.
    Now Convert the following query into a pandas DataFrame command and provide only the command: {user_query}
    """

    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": prompt},
            {"role": "user", "content": user_query}
        ],
        temperature=0
    )

    pandas_code = response.choices[0].message.content.strip()
    return pandas_code


def process_query(user_query):
    try:
        pandas_code = query_openai_for_pandas(user_query)
        print(pandas_code)
        result_evaluation = eval(pandas_code, {"df": df})
        result = generate_user_friendly_response(result_evaluation, user_query)
        return result
    except (SyntaxError, NameError, TypeError, ZeroDivisionError) as e:
        return "Out of scope for the dataset", str(e)
    except Exception as e:
        return "An error occurred, try a more specific query", str(e)
    

def generate_user_friendly_response(result, user_query):
    prompt = f"""
    The result of the query is: {result}. 
    The initial query was: {user_query}
    Please provide a concise and user-friendly explanation of this outcome with the {result} being the crucial output.
    If output doesn't exist return a response accordingly.
    """

    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": prompt},
        ],
        temperature=0
    )

    explanation = response.choices[0].message.content.strip()
    return explanation
    
# print(process_query("What was the total revenue in books in 2023"))