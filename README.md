# Transaction Chart Query

Transaction Query & Insights is a FastAPI + React-powered analytics dashboard that enables users to query and visualize transaction data from a CSV dataset. The backend efficiently processes user queries using LLM-powered query conversion, while the frontend provides interactive charts for key business insights.

## Exploratory Data Analysis
Before moving on to the development phase, I performed Exploratory Data Analysis (EDA) on the CSV dataset to understand its structure and contents. This process involved data wrangling steps such as handling missing values, data type conversions(date from object type to date tiime format), and identifying key features for analysis. Although the CSV file could have been directly loaded into a database like PostgreSQL for more efficient querying and storage, I decided to keep it as a CSV for simplicity in this project.

## Front End Setup

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (https://nodejs.org/)
- npm (Node Package Manager, comes with Node.js)

### Cloning the Repository

1. Open your terminal or command prompt.
2. Clone the repository:
    ```sh
    git clone https://github.com/onslaught7/Transaction_Query.git
    ```
3. Navigate to the project directory:
    ```sh
    cd transaction-chart-query
    ```
### Installation

1. Open your terminal or command prompt.
2. Navigate to the `client` directory:
    ```sh
    cd client
    ```
3. Install the required dependencies:
    ```sh
    npm install
    ```

### Running the Development Server

1. After installing the dependencies, start the development server:
    ```sh
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:5173` to view the application.

## Back End Setup

### Prerequisites

Ensure you have the following installed on your machine:
- Python (https://www.python.org/)

### Installation

1. Navigate to the `server` directory:
    ```sh
    cd server
    ```

2. Create a virtual environment:
    ```sh
    python -m venv venv
    ```

3. Install the required dependencies:
    ```sh
    pip install -r requirements.txt
    ```

4. Activate the virtual environment:
    - On Windows:
        ```sh
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```sh
        source venv/bin/activate
        ```

### Configuration

1. Create a `.env` file in the `server` directory with the following content:
    ```env
    HOST=127.0.0.1
    PORT=8080
    OPENAI_API_KEY=your_openai_api_key
    CLIENT_URL=http://localhost:5173
    ```

### Running the Server

1. Start the server:
    ```sh
    python main.py
    ```
2. The server will be running at `http://127.0.0.1:8080`.