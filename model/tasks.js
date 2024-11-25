    import mongoose from "mongoose";
    const taskSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true, 
        },
        description: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed'], 
            default: 'pending',
        },
        //   dueDate: {
        //     type: Date,
        //   },
        createdAt: {
            type: Date,
            default: Date.now, 
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
    );
    const tasks = mongoose.model("Task", taskSchema);
    export default tasks;