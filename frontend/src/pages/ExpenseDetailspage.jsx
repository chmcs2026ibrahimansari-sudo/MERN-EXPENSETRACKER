import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

const ExpenseDetailPage = () => {
    const [expense, setExpense] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch Expense
    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const res = await api.get(`/expenses/${id}`);
                setExpense(res.data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch expense");
            } finally {
                setLoading(false);
            }
        };

        fetchExpense();
    }, [id]);

    // Delete Expense
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this expense?"))
            return;

        try {
            await api.delete(`/expenses/${id}`);
            toast.success("Expense deleted successfully");
            navigate("/");
        } catch (error) {
            toast.error("Failed to delete expense");
        }
    };

    // Save Changes
    const handleSave = async () => {
        if (!expense.productName.trim()) {
            toast.error("Product name required");
            return;
        }

        setSaving(true);

        try {
            await api.put(`/expenses/${id}`, {
                productName: expense.productName,
                amount: Number(expense.amount),
                category: expense.category,
                paymentMethod: expense.paymentMethod,
                location: expense.location,
                date: expense.date,
                notes: expense.notes,
                status: expense.status,
            });

            toast.success("Expense updated successfully");
            navigate("/");
        } catch (error) {
            toast.error("Failed to update expense");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">

                    {/* Header */}
                    <div className="flex justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <ArrowLeftIcon className="h-5 w-5" />
                            Back
                        </Link>

                        <button
                            onClick={handleDelete}
                            className="btn btn-error btn-outline"
                        >
                            <Trash2Icon className="h-5 w-5" />
                            Delete
                        </button>
                    </div>

                    {/* Card */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body">

                            {/* Product Name */}
                            <input
                                type="text"
                                placeholder="Product Name"
                                className="input input-bordered w-full"
                                value={expense.productName}
                                onChange={(e) =>
                                    setExpense({ ...expense, productName: e.target.value })
                                }
                            />

                            {/* Amount */}
                            <input
                                type="number"
                                placeholder="Amount"
                                className="input input-bordered w-full"
                                value={expense.amount}
                                onChange={(e) =>
                                    setExpense({ ...expense, amount: e.target.value })
                                }
                            />

                            {/* Category */}
                            <input
                                type="text"
                                placeholder="Category"
                                className="input input-bordered w-full"
                                value={expense.category}
                                onChange={(e) =>
                                    setExpense({ ...expense, category: e.target.value })
                                }
                            />

                            {/* Payment Method */}
                            <select
                                className="select select-bordered w-full"
                                value={expense.paymentMethod || ""}
                                onChange={(e) =>
                                    setExpense({ ...expense, paymentMethod: e.target.value })
                                }
                            >
                                <option value="">Select Payment Method</option>
                                <option value="cash">Cash</option>
                                <option value="upi">UPI</option>
                                <option value="card">Card</option>
                                <option value="netbanking">Net Banking</option>
                            </select>

                            {/* Location */}
                            <input
                                type="text"
                                placeholder="Location"
                                className="input input-bordered w-full"
                                value={expense.location}
                                onChange={(e) =>
                                    setExpense({ ...expense, location: e.target.value })
                                }
                            />

                            {/* Date */}
                            <input
                                type="date"
                                className="input input-bordered w-full"
                                value={expense.date?.substring(0, 10)}
                                onChange={(e) =>
                                    setExpense({ ...expense, date: e.target.value })
                                }
                            />

                            {/* Notes */}
                            <textarea
                                placeholder="Notes"
                                className="input input-bordered w-full"
                                value={expense.notes || ""}
                                onChange={(e) =>
                                    setExpense({ ...expense, notes: e.target.value })
                                }
                            />

                            {/* Status */}
                            <select
                                className="select select-bordered w-full"
                                value={expense.status}
                                onChange={(e) =>
                                    setExpense({ ...expense, status: e.target.value })
                                }
                            >
                                <option value="Pending">Pending</option>
                                <option value="Paid">Paid</option>
                            </select>

                            {/* Save Button */}
                            <button
                                className="btn btn-primary"
                                disabled={saving}
                                onClick={handleSave}
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ExpenseDetailPage;