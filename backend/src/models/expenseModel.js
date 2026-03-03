import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "upi", "card", "netbanking"],
    },
    location: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    notes: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Paid", "Pending"],
        default: "Paid",
    },
}, { timestamps: true });

const Expense = mongoose.model("Expense", expenseSchema)
export default Expense