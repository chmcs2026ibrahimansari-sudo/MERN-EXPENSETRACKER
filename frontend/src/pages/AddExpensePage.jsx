import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const AddExpensePage = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/expenses", {
        productName,
        amount: Number(amount), // ensure number
        category,
        paymentMethod, // already lowercase and matches schema
        location,
        date: new Date(date), // safer for MongoDB
        notes,
        status, // now matches "Paid" / "Pending"
      });

      toast.success("Expense Added Successfully");
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">

          {/* Back Button */}
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Expenses
          </Link>

          {/* Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">

              <h2 className="card-title text-2xl text-primary mb-4">
                Add New Expense
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">

                <input
                  type="text"
                  placeholder="Product Name"
                  className="input input-bordered w-full"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />

                <input
                  type="number"
                  placeholder="Amount"
                  className="input input-bordered w-full"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />

                <input
                  type="text"
                  placeholder="Category"
                  className="input input-bordered w-full"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />

                {/* Payment Dropdown */}
                <select
                  className="select select-bordered w-full"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="cash">Cash</option>
                  <option value="upi">UPI</option>
                  <option value="card">Card</option>
                  <option value="netbanking">Net Banking</option>
                </select>

                <input
                  type="text"
                  placeholder="Location"
                  className="input input-bordered w-full"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />

                <textarea
                  placeholder="Additional Notes"
                  className="textarea textarea-bordered w-full"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />

                {/* Corrected Status Dropdown */}
                <select
                  className="select select-bordered w-full"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Expense"}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddExpensePage;