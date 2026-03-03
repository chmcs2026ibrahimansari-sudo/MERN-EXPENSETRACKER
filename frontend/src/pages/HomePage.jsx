import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ExpenseCard from "../components/ExpenseCard";
import ExpenseNotFound from "../components/ExpenseNotFound"
import api from "../lib/axios";   
import toast from "react-hot-toast";

const HomePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await api.get("/expenses");  
        setExpenses(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load expenses");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-primary mb-6">
          All Expenses
        </h2>

        {loading && <p>Loading...</p>}

        {!loading && expenses.length === 0 && (
         <ExpenseNotFound/>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expenses.map((expense) => (
            <ExpenseCard
              key={expense._id}
              expense={expense}
              setExpenses={setExpenses}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
