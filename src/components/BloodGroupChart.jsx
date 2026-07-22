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
                        donors.filter((donor) => donor.bloodGroup === group).length
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
        <div className="card shadow-sm mt-3 mx-1 border-0">
            <div className="card-header bg-danger text-white py-2">
                <h6 className="mb-0 text-center">
                    Blood Group Distribution
                </h6>
            </div>

            <div className="card-body py-3">
                {donors.length === 0 ? (
                    <div className="text-center text-muted py-4">
                        No donor data available
                    </div>
                ) : (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            width: "100%",
                            height: "340px",
                        }}
                    >
                        <div
                            style={{
                                width: "320px",
                                height: "320px",
                            }}
                        >
                            <Pie
                                data={chartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: "top",
                                            labels: {
                                                boxWidth: 12,
                                                font: {
                                                    size: 11,
                                                },
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BloodGroupChart;