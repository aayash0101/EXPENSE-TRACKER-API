import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'
import Expense from './models/Expense.js'
import Budget from './models/Budget.js'

dotenv.config()

const seedData = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')

    // Clear existing data
    await Expense.deleteMany()
    await Budget.deleteMany()
    console.log('Cleared existing data')

    // Get or create user
    let user = await User.findOne({ email: 'demo@expenseiq.com' })
    if (!user) {
        user = await User.create({
            name: 'Demo User',
            email: 'demo@expenseiq.com',
            password: 'demo123456'
        })
        console.log('Demo user created')
    }

    // Seed expenses across 6 months
    const expenses = [
        // May 2026
        { title: 'Grocery Shopping', amount: 120.50, category: 'Food', date: new Date('2026-05-01'), notes: 'Weekly groceries' },
        { title: 'Uber Ride', amount: 18.00, category: 'Transport', date: new Date('2026-05-02') },
        { title: 'Netflix', amount: 15.99, category: 'Entertainment', date: new Date('2026-05-03') },
        { title: 'Rent', amount: 850.00, category: 'Housing', date: new Date('2026-05-01'), notes: 'Monthly rent' },
        { title: 'Gym Membership', amount: 30.00, category: 'Health', date: new Date('2026-05-04') },
        { title: 'Amazon Order', amount: 65.99, category: 'Shopping', date: new Date('2026-05-05') },
        { title: 'Restaurant Dinner', amount: 45.00, category: 'Food', date: new Date('2026-05-07') },
        { title: 'Bus Pass', amount: 25.00, category: 'Transport', date: new Date('2026-05-08') },
        { title: 'Online Course', amount: 29.99, category: 'Education', date: new Date('2026-05-09') },
        { title: 'Coffee Shop', amount: 12.50, category: 'Food', date: new Date('2026-05-10') },

        // April 2026
        { title: 'Grocery Shopping', amount: 110.00, category: 'Food', date: new Date('2026-04-01') },
        { title: 'Rent', amount: 850.00, category: 'Housing', date: new Date('2026-04-01') },
        { title: 'Spotify', amount: 9.99, category: 'Entertainment', date: new Date('2026-04-03') },
        { title: 'Petrol', amount: 55.00, category: 'Transport', date: new Date('2026-04-05') },
        { title: 'Doctor Visit', amount: 80.00, category: 'Health', date: new Date('2026-04-10') },
        { title: 'Clothes Shopping', amount: 120.00, category: 'Shopping', date: new Date('2026-04-15') },
        { title: 'Restaurant Lunch', amount: 22.50, category: 'Food', date: new Date('2026-04-18') },
        { title: 'Electricity Bill', amount: 95.00, category: 'Housing', date: new Date('2026-04-20') },

        // March 2026
        { title: 'Grocery Shopping', amount: 130.00, category: 'Food', date: new Date('2026-03-01') },
        { title: 'Rent', amount: 850.00, category: 'Housing', date: new Date('2026-03-01') },
        { title: 'Netflix', amount: 15.99, category: 'Entertainment', date: new Date('2026-03-03') },
        { title: 'Uber Ride', amount: 22.00, category: 'Transport', date: new Date('2026-03-06') },
        { title: 'Gym Membership', amount: 30.00, category: 'Health', date: new Date('2026-03-04') },
        { title: 'Textbook', amount: 45.00, category: 'Education', date: new Date('2026-03-12') },
        { title: 'Coffee Shop', amount: 18.00, category: 'Food', date: new Date('2026-03-15') },
        { title: 'Phone Bill', amount: 40.00, category: 'Other', date: new Date('2026-03-20') },

        // February 2026
        { title: 'Grocery Shopping', amount: 95.00, category: 'Food', date: new Date('2026-02-01') },
        { title: 'Rent', amount: 850.00, category: 'Housing', date: new Date('2026-02-01') },
        { title: 'Valentine Dinner', amount: 85.00, category: 'Food', date: new Date('2026-02-14') },
        { title: 'Spotify', amount: 9.99, category: 'Entertainment', date: new Date('2026-02-03') },
        { title: 'Petrol', amount: 50.00, category: 'Transport', date: new Date('2026-02-10') },
        { title: 'Gym Membership', amount: 30.00, category: 'Health', date: new Date('2026-02-04') },

        // January 2026
        { title: 'Grocery Shopping', amount: 105.00, category: 'Food', date: new Date('2026-01-01') },
        { title: 'Rent', amount: 850.00, category: 'Housing', date: new Date('2026-01-01') },
        { title: 'New Year Dinner', amount: 95.00, category: 'Food', date: new Date('2026-01-01') },
        { title: 'Netflix', amount: 15.99, category: 'Entertainment', date: new Date('2026-01-03') },
        { title: 'Winter Clothes', amount: 180.00, category: 'Shopping', date: new Date('2026-01-10') },
        { title: 'Gym Membership', amount: 30.00, category: 'Health', date: new Date('2026-01-04') },

        // December 2025
        { title: 'Grocery Shopping', amount: 150.00, category: 'Food', date: new Date('2025-12-01') },
        { title: 'Rent', amount: 850.00, category: 'Housing', date: new Date('2025-12-01') },
        { title: 'Christmas Shopping', amount: 320.00, category: 'Shopping', date: new Date('2025-12-15') },
        { title: 'Christmas Dinner', amount: 110.00, category: 'Food', date: new Date('2025-12-25') },
        { title: 'Spotify', amount: 9.99, category: 'Entertainment', date: new Date('2025-12-03') },
        { title: 'Petrol', amount: 60.00, category: 'Transport', date: new Date('2025-12-10') },
    ]

    const expensesWithUser = expenses.map(e => ({ ...e, user: user._id }))
    await Expense.insertMany(expensesWithUser)
    console.log(`${expenses.length} expenses seeded`)

    // Seed budgets for May 2026
    const budgets = [
        { category: 'Food', amount: 300, month: 5, year: 2026 },
        { category: 'Transport', amount: 100, month: 5, year: 2026 },
        { category: 'Housing', amount: 900, month: 5, year: 2026 },
        { category: 'Entertainment', amount: 50, month: 5, year: 2026 },
        { category: 'Health', amount: 80, month: 5, year: 2026 },
        { category: 'Shopping', amount: 150, month: 5, year: 2026 },
    ]

    const budgetsWithUser = budgets.map(b => ({ ...b, user: user._id }))
    await Budget.insertMany(budgetsWithUser)
    console.log(`${budgets.length} budgets seeded`)

    console.log('✅ Seed complete')
    console.log('Demo login → email: demo@expenseiq.com | password: demo123456')
    process.exit(0)
}

seedData().catch((err) => {
    console.error(err)
    process.exit(1)
})