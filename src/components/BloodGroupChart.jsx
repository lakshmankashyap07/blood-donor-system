import React from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function BloodGroupChart({ donors = [] }) {

    const bloodGroups = [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
    ];

    const chartData = {
        labels: bloodGroups,
        datasets: [
            {
                label: "Blood Groups",
                data: bloodGroups.map(
                    (group) =>
                        (donors || []).filter(
                            (donor) => donor.bloodGroup === group
                        ).length
                ),
                backgroundColor: [
                    "#ff6384",
                    "#36a2eb",
                    "#ffce56",
                    "#4bc0c0",
                    "#9966ff",
                    "#ff9f40",
                    "#8bc34a",
                    "#e91e63",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="card shadow-sm mt-5">

            <div className="card-header bg-danger text-white">
                <h5 className="mb-0">
                    Blood Group Distribution
                </h5>
            </div>

            <div className="card-body">

                {donors.length === 0 ? (

                    <div className="text-center text-muted py-5">
                        No donor data available
                    </div>

                ) : (

                    <div
                        style={{
                            width: "400px",
                            margin: "auto",
                        }}
                    >
                        <Pie data={chartData} />
                    </div>

                )}

            </div>

        </div>
    );
}

export default BloodGroupChart;