import { Router } from "express";
import { createBudget, getBudgets, updateBudget, deleteBudget } from "../controller/budgetController.js";
import protect from '../middleware/authMiddleware.js' ;

const router = Router();

router.post('/', protect, createBudget);
router.get('/', protect, getBudgets );
router.put('/:id', protect, updateBudget);
router.delete('/:id', protect, deleteBudget);

export default router;