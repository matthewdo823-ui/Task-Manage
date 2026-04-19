import mongoose from "mongoose"
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: {
        Type: String,
        required: true,
    },
    description: String,
    status: {
        String,
        enum: ['todo', 'in progress', 'complete'],
        default: 'todo',
        required: true
    },
    user: {ref: 'user'},
}, {timestamps: true } // adds createdAt and updatedAt
);

export default mongoose.model("task", taskSchema);