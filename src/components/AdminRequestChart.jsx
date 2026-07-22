import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function AdminRequestChart({
    pending,
    accepted,
    completed,
}) {
    const data = {
        labels: ["Pending", "Accepted", "Completed"],
        datasets: [
            {
                label: "Blood Requests",
                data: [pending, accepted, completed],
                backgroundColor: [
                    "#ffc107",
                    "#0d6efd",
                    "#198754",
                ],
            },
        ],
    };

    return (
        <div className="card shadow h-100">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                    Blood Request Statistics
                </h5>
            </div>

            <div className="card-body">
                <Bar data={data} />
            </div>
        </div>
    );
}

export default AdminRequestChart;