
import Expense from "../models/expenseModel.js";

// GET ALL EXPENSES
export const getAllExpense = async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        console.error("Error in getall Expenses", error)
        res.status(500).json({ message: "Internal server Error" });
    }
};

// GET EXPENSE BY ID
export const getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json(expense);
    } catch (error) {
        console.error("Error in getExpensesBYid controller", error)
        res.status(500).json({ message: "Internal server Error" });

    }
};

// CREATE EXPENSE
export const createExpense = async (req, res) => {
    try {
        const { productName, amount, category, paymentMethod, location, date, notes, status } = req.body
        if (!productName || !amount || !category || !paymentMethod || !location || !date || !notes || !status) {
            return res.status(404).json({
                message: "All fields are Required"
            })
        }
        const expense = new Expense({ productName, amount, category, paymentMethod, location, date, notes, status })
        const savedExpense = await expense.save();

        res.status(201).json(savedExpense);

    } catch (error) {
        console.error("Error in create expense controller", error)
        res.status(500).json({ message: "Internal server Error" });

    }
}

export const updateExpense = async (req, res) => {
    try {
        const {
            productName,
            amount,
            category,
            paymentMethod,
            location,
            date,
            notes,
            status
        } = req.body;

        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            {
                productName,
                amount,
                category,
                paymentMethod,
                location,
                date,
                notes,
                status
            },
            { new: true, runValidators: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json(updatedExpense);
    } catch (error) {
        console.error("Error in updateExpense controller", error);
        res.status(500).json({ message: "Internal server Error" });
    }
};



// DELETE EXPENSE
export const deleteExpense = async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("Error in deleteExpense controller", error)
        res.status(500).json({ message: "Internal server Error" });

    }
};
// GET MONTHLY EXPENSES
export const getMonthlyExpenses = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    const startDate = new Date(`${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const expenses = await Expense.find({
      date: { $gte: startDate, $lt: endDate }
    }).sort({ date: -1 });

    res.status(200).json(expenses);

  } catch (error) {
    console.error("Monthly Error:", error); 
    res.status(500).json({ message: error.message });
  }
};


export const getCategorySummaryByMonth = async (req, res) => {
  try {
    const { month } = req.query; 

    let matchStage = {};

    if (month) {
      const startDate = new Date(`${month}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      matchStage = {
        date: {
          $gte: startDate,
          $lt: endDate,
        },
      };
    }

    const summary = await Expense.aggregate([
      { $match: matchStage },

      {
        $group: {
          _id: "$category",

          totalAmount: { $sum: "$amount" },

          paidAmount: {
            $sum: {
              $cond: [
                { $eq: ["$status", "Paid"] },
                "$amount",
                0,
              ],
            },
          },

          pendingAmount: {
            $sum: {
              $cond: [
                { $eq: ["$status", "Pending"] },
                "$amount",
                0,
              ],
            },
          },
        },
      },

      { $sort: { totalAmount: -1 } },
    ]);

    res.status(200).json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};