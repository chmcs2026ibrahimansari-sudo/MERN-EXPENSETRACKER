import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../lib/axios";
import toast from "react-hot-toast";
import CategoryChart from "../components/CategoryChart";

const CategoryWisePage = () => {
  const [summary, setSummary] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSummary = async (month = "") => {
    try {
      setLoading(true);
      const res = await api.get("/expenses/category-summary", {
        params: { month },
      });
      setSummary(res.data);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const totalAmount = summary.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );

  const totalPaid = summary.reduce(
    (sum, item) => sum + item.paidAmount,
    0
  );

  const totalPending = summary.reduce(
    (sum, item) => sum + item.pendingAmount,
    0
  );

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        {/* Month Selector */}
        <div className="mb-6 flex items-center gap-4">
          <label className="font-semibold">Select Month:</label>
          <input
            type="month"
            className="input input-bordered"
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              fetchSummary(e.target.value);
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT SIDE */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">
                Expenses by Category
              </h2>

              {/* SUMMARY CARDS */}
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-black-100 p-3 rounded-lg">
                  <p className="text-sm">Paid</p>
                  <p className="font-bold text-green-600">
                    ₹ {totalPaid}
                  </p>
                </div>

                <div className="bg-black-100 p-3 rounded-lg">
                  <p className="text-sm">Pending</p>
                  <p className="font-bold text-yellow-600">
                    ₹ {totalPending}
                  </p>
                </div>

                <div className="bg-black-100 p-3 rounded-lg">
                  <p className="text-sm">Total</p>
                  <p className="font-bold text-blue-600">
                    ₹ {totalAmount}
                  </p>
                </div>
              </div>

              {/* CATEGORY LIST */}
              {loading && <p>Loading...</p>}

              {summary.map((item) => (
                <div key={item._id} className="border-b py-3">
                  <div className="flex justify-between font-semibold">
                    <span>{item._id}</span>
                    <span>₹ {item.totalAmount}</span>
                  </div>

                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-black-600">
                      Paid: ₹ {item.paidAmount}
                    </span>
                    <span className="text-black-600">
                      Pending: ₹ {item.pendingAmount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">
                Category Breakdown
              </h2>

              <CategoryChart summary={summary} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CategoryWisePage;