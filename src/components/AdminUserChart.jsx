import React from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function AdminUserChart({
    users,
    donors,
    admins,
}) {
    const data = {
        labels: ["Users", "Donors", "Admins"],
        datasets: [
            {
                data: [users, donors, admins],
                backgroundColor: [
                    "#0d6efd",
                    "#dc3545",
                    "#198754",
                ],
                borderColor: "#ffffff",
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    boxWidth: 15,
                    padding: 15,
                },
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div className="card shadow h-100">
            <div className="card-header bg-success text-white">
                <h5 className="mb-0 text-center">User Distribution</h5>
            </div>

            <div
                className="card-body p-3"
                style={{ height: "440px" }}
            >
                <Pie data={data} options={options} />
            </div>
        </div>
    );
}

export default AdminUserChart;