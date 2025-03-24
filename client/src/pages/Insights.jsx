import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./Insights.css";

const Insights = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true; // Prevent state updates if unmounted

        fetch(`${import.meta.env.VITE_API_URL}/stats`)
            .then((response) => response.json())
            .then((data) => {
                if (isMounted) {
                    setStats(data);
                    setLoading(false);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));

        return () => (isMounted = false); // Cleanup to prevent memory leaks
    }, []);

    if (loading) return <p className="loading-text">Loading statistics...</p>;

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
            <h3>Top 10 Store Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.store_performance}>
                <XAxis dataKey="store" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
            </ResponsiveContainer>
        </div>

        {/* Monthly Sales (Bar Chart) */}
        <div className="chart-card">
            <h3>Last 6 Months of Sales</h3>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.monthly_sales}>
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
                data={stats.payment_methods}
                dataKey="value"
                nameKey="method"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                >
                {stats.payment_methods.map((_, index) => (
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
