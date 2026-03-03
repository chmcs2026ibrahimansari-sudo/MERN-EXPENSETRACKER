import { Link, useLocation, useNavigate } from "react-router-dom";
import { Pencil, Trash2, MapPin, CreditCard } from "lucide-react";
import { useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const ExpenseCard = ({ expense, setExpenses }) => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname === `/expense/${expense._id}`;

  const handleDelete = async () => {
    try {
      await api.delete(`/expenses/${expense._id}`);
      setExpenses((prev) =>
        prev.filter((e) => e._id !== expense._id)
      );
      toast.success("Expense deleted successfully");
    } catch (error) {
      toast.error("Failed to delete expense");
    } finally {
      setShowModal(false);
    }
  };

  if (!expense) return null;

  return (
    <>
      <Link
        to={`/expense/${expense._id}`}
        className={`block rounded-xl bg-base-100 p-5 border transition-all duration-200 ${
          isActive
            ? "border-primary shadow-lg"
            : "border-base-300"
        } hover:border-primary hover:shadow-xl`}
      >
        {/* Top Row */}
        <div className="flex justify-between items-start">
          <p className="text-xs text-base-content/60 truncate">
            {expense._id}
          </p>

          <span className="badge badge-secondary">
            ₹ {expense.amount}
          </span>
        </div>

        {/* Expense Info */}
        <div className="mt-4 space-y-2">

          {/* Product Name */}
          <p className="font-medium text-base-content text-lg">
            {expense.productName}
          </p>

          {/* Category + Payment */}
          <div className="flex items-center gap-3 text-sm text-base-content/70">
            <span>{expense.category}</span>
            <span>•</span>
            <CreditCard className="size-4" />
            <span>{expense.paymentMethod}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-base-content/70">
            <MapPin className="size-4" />
            <span>{expense.location}</span>
          </div>

          {/* Notes */}
          {expense.notes && (
            <p className="text-xs text-base-content/60 line-clamp-2">
              {expense.notes}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between items-center">
          <span className="text-xs text-base-content/60">
            {expense.date
              ? new Date(expense.date).toLocaleDateString()
              : ""}
          </span>

          <div className="flex items-center gap-3">
            <span
              className={`badge ${
                expense.status === "Paid"
                  ? "badge-success"
                  : expense.status === "Pending"
                  ? "badge-warning"
                  : "badge-error"
              }`}
            >
              {expense.status}
            </span>

            {/* EDIT */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/expense/${expense._id}`);
              }}
              className="text-warning hover:scale-110 transition"
            >
              <Pencil className="size-4" />
            </button>

            {/* DELETE */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowModal(true);
              }}
              className="text-error hover:scale-110 transition"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      </Link>

      {/* DELETE MODAL */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error flex items-center gap-2">
              <Trash2 className="size-5" />
              Delete Expense
            </h3>

            <p className="py-4 text-base-content/70">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-base-content">
                “{expense.productName}”
              </span>
              ? This action cannot be undone.
            </p>

            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-error flex items-center gap-2"
                onClick={handleDelete}
              >
                <Trash2 className="size-4" />
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ExpenseCard;