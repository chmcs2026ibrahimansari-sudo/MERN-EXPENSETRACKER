import express from "express"
import { createExpense, deleteExpense, getAllExpense, getExpenseById, updateExpense ,getMonthlyExpenses,  getCategorySummaryByMonth} from "../controllers/expenseController.js"

const router = express.Router()

router.get("/monthly", getMonthlyExpenses);
router.get("/category-summary",getCategorySummaryByMonth)
router.get("/", getAllExpense)
router.get("/:id", getExpenseById)
router.post("/", createExpense)
router.put("/:id", updateExpense)
router.delete("/:id", deleteExpense)

export default router