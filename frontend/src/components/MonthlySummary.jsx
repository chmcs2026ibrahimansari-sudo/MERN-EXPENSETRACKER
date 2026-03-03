import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

const MonthlySummary = ({
  groupedExpenses,
  totalMonthly,
  selectedMonth,
  setSelectedMonth,
}) => {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          {/* Back Button */}
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5 mr-2" />
            Back to Expenses
          </Link>

          <div className="bg-black p-6 rounded-xl shadow-md">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="border p-2 rounded"
              />
              <div className="text-lg font-semibold">
                Total: ₹ {totalMonthly}
              </div>
            </div>

            {/* No Data */}
            {Object.keys(groupedExpenses).length === 0 && (
              <p className="text-gray-500">No expenses found.</p>
            )}

            {/* Date Wise Sections */}
            {Object.keys(groupedExpenses).map((date) => {
              const dailyTotal = groupedExpenses[date].reduce(
                (sum, e) => sum + Number(e.amount),
                0
              );
              return (
                <div key={date} className="mb-6 border rounded-lg p-4 bg-gray-900">
                  <div className="flex justify-between font-semibold mb-3">
                    <span>{date}</span>
                    <span>₹ {dailyTotal}</span>
                  </div>
                  {groupedExpenses[date].map((exp) => (
                    <div
                      key={exp._id}
                      className="flex justify-between items-center border-t py-3"
                    >
                      <div>
                        <div className="font-medium">
                          PRODUCT: {exp.productName}
                        </div>
                        <div className="mt-1">
                          <span className="badge badge-outline badge-sm">
                            CATEGORY: {exp.category}
                          </span>
                        </div>
                      </div>
                      <div className="font-semibold">
                        ₹ {exp.amount}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlySummary;