import Budget from '../models/Budget.js'
import Expense from '../models/Expense.js'

export const createBudget = async (req, res) => {
    const { amount, category, month, year } = req.body

    if (!amount || !category || !month || !year) {
        return res.status(400).json({ message: 'Please provide all fields' })
    }

    const existingBudget = await Budget.findOne({
        user: req.user._id,
        category,
        month,
        year
    })

    if (existingBudget) {
        return res.status(400).json({ message: `Budget for ${category} in this month already exists` })
    }

    const budget = await Budget.create({
        user: req.user._id,
        amount,
        category,
        month,
        year
    })

    res.status(201).json({ success: true, budget })
}

export const getBudgets = async (req, res) => {
    const { month, year } = req.query

    const query = { user: req.user._id }

    if (month) query.month = month
    if (year) query.year = year

    const budgets = await Budget.find(query)

    // For each budget calculate how much has been spent
    const budgetsWithSpending = await Promise.all(budgets.map(async (budget) => {
        const startDate = new Date(budget.year, budget.month - 1, 1)
        const endDate = new Date(budget.year, budget.month, 0)

        const expenses = await Expense.find({
            user: req.user._id,
            category: budget.category,
            date: { $gte: startDate, $lte: endDate }
        })

        const spent = expenses.reduce((sum, e) => sum + e.amount, 0)
        const remaining = budget.amount - spent
        const percentage = Math.round((spent / budget.amount) * 100)

        return {
            ...budget.toObject(),
            spent,
            remaining,
            percentage
        }
    }))

    res.status(200).json({ success: true, budgets: budgetsWithSpending })
}

export const updateBudget = async (req, res) => {
    const budget = await Budget.findById(req.params.id)

    if (!budget) {
        return res.status(404).json({ message: 'Budget not found' })
    }

    if (budget.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    const updated = await Budget.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({ success: true, budget: updated })
}

export const deleteBudget = async (req, res) => {
    const budget = await Budget.findById(req.params.id)

    if (!budget) {
        return res.status(404).json({ message: 'Budget not found' })
    }

    if (budget.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    await budget.deleteOne()

    res.status(200).json({ success: true, message: 'Budget deleted' })
}