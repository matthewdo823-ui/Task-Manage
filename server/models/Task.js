import mongoose from "mongoose"
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['todo', 'in progress', 'complete'],
        default: 'todo',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',},
}, {timestamps: true } // adds createdAt and updatedAt
);

export default mongoose.model("task", taskSchema);