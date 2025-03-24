import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./Insights.css";

const Insights = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/stats`) // Fetch statistics from FastAPI
        .then((response) => response.json())
        .then((data) => setStats(data))
        .catch((error) => console.error("Error fetching data:", error));
    }, []);

    if (!stats) return <p>Loading statistics...</p>;

    // Define chart colors
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
    <div className="insight-container">
        <div className="metrics-grid">
        {/* Key Metrics Cards */}
        <div className="metric-card">
            <h3>Total Revenue</h3>
            <p>$ {stats.total_revenue.toLocaleString()}</p>
        </div>

        <div className="metric-card">
            <h3>Top Product Category</h3>
            <p>{stats.top_product_category}</p>
        </div>

        <div className="metric-card">
            <h3>Total Transactions</h3>
            <p>{stats.total_transactions.toLocaleString()}</p>
        </div>

        {/* Store Performance (Bar Chart) */}
        <div className="chart-card">
            <h3>Store Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={Object.entries(stats.store_performance).map(([store, sales]) => ({ store, sales }))}>
                <XAxis dataKey="store" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
            </ResponsiveContainer>
        </div>

        {/* Monthly Sales (Bar Chart) */}
        <div className="chart-card">
            <h3>Monthly Sales</h3>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={Object.entries(stats.monthly_sales).map(([month, sales]) => ({ month, sales }))}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#00C49F" />
            </BarChart>
            </ResponsiveContainer>
        </div>

        {/* Payment Method Distribution (Pie Chart) */}
        <div className="chart-card">
            <h3>Payment Methods</h3>
            <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                data={Object.entries(stats.payment_methods).map(([method, value]) => ({ method, value }))}
                dataKey="value"
                nameKey="method"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                >
                {Object.keys(stats.payment_methods).map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
            </ResponsiveContainer>
        </div>
        </div>
    </div>
    );
    };

    export default Insights;
