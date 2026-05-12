import mongoose from "mongoose"

const budgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        min: [0, 'Budget cannot be negative'],
        required: [true, 'Amount is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Food', 'Transport', 'Housing', 'Entertainment', 'Health', 'Shopping', 'Education', 'Other']
    },
    month: {
        type: Number,
        required: [true, 'Month is required'],
        min: 1,
        max: 12
    },
    year: {
        type: Number,
        required: [true, 'Year is required'],
    }
}, { timestamps: true })

budgetSchema.index({ user: 1, category: 1, month: 1, year: 1 }, { unique: true })

const Budget = mongoose.model('Budget', budgetSchema)

export default Budget