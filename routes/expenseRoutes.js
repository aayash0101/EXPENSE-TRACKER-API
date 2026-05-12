import { Router } from "express";
import { createExpense, deleteExpense, getExpense, getExpenses, updateExpense } from '../controller/expenseController.js';
import protect from "../middleware/authMiddleware.js";

const router = Router();

router.post('/', protect, createExpense);
router.get('/', protect, getExpenses);
router.get('/:id', protect, getExpense);
router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);

export default router;