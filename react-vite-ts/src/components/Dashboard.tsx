// import React from "react";

export default function Dashboard() {
    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-200">
                    <h3 className="text-lg font-semibold">Total Familiars</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
                    </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-200">
                            <h3 className="text-lg font-semibold">Total Customers</h3>
                            <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
                        </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-200">
                    <h3 className="text-lg font-semibold">Active Groups</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
                </div>
            </div>
        </div>
    );
}