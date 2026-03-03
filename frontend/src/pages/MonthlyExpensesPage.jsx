import { useEffect, useState } from "react";
import api from "../lib/axios";
import MonthlySummary from "../components/MonthlySummary";

const MonthlyExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const fetchData = async () => {
    try {
      const res = await api.get(
        `/expenses/monthly?month=${selectedMonth}`
      );

      setExpenses(res.data.expenses || res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //  GROUP BY DATE
  const grouped = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(expense);
    return acc;
  }, {});

  const totalMonthly = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  return (
    <div className="p-6">
      <MonthlySummary
        groupedExpenses={grouped}
        totalMonthly={totalMonthly}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
    </div>
  );
};

export default MonthlyExpensesPage;
