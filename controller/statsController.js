import Expense from '../models/Expense.js'
import Budget from '../models/Budget.js'

export const getStats = async (req, res) => {
    const { month, year } = req.query

    const currentMonth = parseInt(month) || new Date().getMonth() + 1
    const currentYear = parseInt(year) || new Date().getFullYear()

    const startDate = new Date(currentYear, currentMonth - 1, 1)
    const endDate = new Date(currentYear, currentMonth, 0)

    const expenses = await Expense.find({
        user: req.user._id,
        date: { $gte: startDate, $lte: endDate }
    })

    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)

    const spendingByCategory = await Expense.aggregate([
        {
            $match: {
                user: req.user._id,
                date: { $gte: startDate, $lte: endDate }
            }
        },
        {
            $group: {
                _id: '$category',
                total: { $sum: '$amount' }
            }
        },
        { $sort: { total: -1 } }
    ])

    const dailySpending = await Expense.aggregate([
        {
            $match: {
                user: req.user._id,
                date: { $gte: startDate, $lte: endDate }
            }
        },
        {
            $group: {
                _id: { $dayOfMonth: '$date' },
                total: { $sum: '$amount' }
            }
        },
        { $sort: { _id: 1 } }
    ])

    const sixMonthsAgo = new Date(currentYear, currentMonth - 7, 1)
    const monthlySpending = await Expense.aggregate([
        {
            $match: {
                user: req.user._id,
                date: { $gte: sixMonthsAgo, $lte: endDate }
            }
        },
        {
            $group: {
                _id: {
                    month: { $month: '$date' },
                    year: { $year: '$date' }
                },
                total: { $sum: '$amount' }
            }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } }
    ])

    const budgets = await Budget.find({
        user: req.user._id,
        month: currentMonth,
        year: currentYear
    })

    const budgetVsActual = await Promise.all(budgets.map(async (budget) => {
        const categoryExpenses = expenses.filter(e => e.category === budget.category)
        const spent = categoryExpenses.reduce((sum, e) => sum + e.amount, 0)

        return {
            category: budget.category,
            budget: budget.amount,
            spent,
            remaining: budget.amount - spent,
            percentage: Math.round((spent / budget.amount) * 100)
        }
    }))

    res.status(200).json({
        success: true,
        totalSpent,
        spendingByCategory,
        dailySpending,
        monthlySpending,
        budgetVsActual
    })
}