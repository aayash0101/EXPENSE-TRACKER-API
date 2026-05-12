import Expense from '../models/Expense.js'

export const createExpense = async (req, res) => {
    const { title, amount, category, date, notes } = req.body

    if (!title || !amount || !category) {
        return res.status(400).json({ message: 'Please provide title, amount and category' })
    }

    const expense = await Expense.create({
        user: req.user._id,
        title,
        amount,
        category,
        date: date || Date.now(),
        notes,
    })

    res.status(201).json({ success: true, expense })
}

export const getExpenses = async (req, res) => {
    const { category, startDate, endDate, sortBy } = req.query

    const query = { user: req.user._id }

    if (category) query.category = category

    if (startDate || endDate) {
        query.date = {}
        if (startDate) query.date.$gte = new Date(startDate)
        if (endDate) query.date.$lte = new Date(endDate)
    }

    const sortOptions = {
        newest: { date: -1 },
        oldest: { date: 1 },
        highest: { amount: -1 },
        lowest: { amount: 1 },
    }

    const sort = sortOptions[sortBy] || sortOptions.newest

    const expenses = await Expense.find(query).sort(sort)
    const total = expenses.reduce((sum, e) => sum + e.amount, 0)

    res.status(200).json({ success: true, count: expenses.length, total, expenses })
}

export const getExpense = async (req, res) => {
    const expense = await Expense.findById(req.params.id)

    if (!expense) {
        return res.status(404).json({ message: 'Expense not found' })
    }

    if (expense.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    res.status(200).json({ success: true, expense })
}

export const updateExpense = async (req, res) => {
    const expense = await Expense.findById(req.params.id)

    if (!expense) {
        return res.status(404).json({ message: 'Expense not found' })
    }

    if (expense.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })

    res.status(200).json({ success: true, expense: updated })
}

export const deleteExpense = async (req, res) => {
    const expense = await Expense.findById(req.params.id)

    if (!expense) {
        return res.status(404).json({ message: 'Expense not found' })
    }

    if (expense.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    await expense.deleteOne()

    res.status(200).json({ success: true, message: 'Expense deleted' })
}