import mongoose from "mongoose";
import Task from "../model/tasks.js";
export const createTask = async (req, res) => {
    const { userId, title, description, status } = req.body;

    try {
        const newTask = new Task({
            userId,
            title,
            description,
            status,
            //   dueDate,
        });

        await newTask.save();
        res.status(201).json({
            message: "Task created successfully",
            task: newTask,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating task",
            error: error.message,
        });
    }
};

export const getTasksByUser = async (req, res) => {
    const  userId  = req.query.userId;
    console.log(req.query.userId === "674235d85908e8efbd094550");
    console.log(userId);

    try {
        const tasks = await Task.find({ userId });
        console.log(tasks)
        res.status(200).json({
            message: "Tasks fetched successfully",
            tasks

        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching tasks",
            error: error.message,
        });
    }
};

// **3. Get a Single Task by ID**
export const getTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({
            message: "Task fetched successfully",
            task,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching task",
            error: error.message,
        });
    }
};

// export const updateTask = async (req, res) => {
//   const { id } = req.params;
//   const updates = req.body;

//   try {
//     const updatedTask = await Task.findByIdAndUpdate(
//       id,
//       { ...updates, updatedAt: Date.now() },
//       { new: true, runValidators: true }
//     );

//     if (!updatedTask) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     res.status(200).json({
//       message: "Task updated successfully",
//       task: updatedTask,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error updating task",
//       error: error.message,
//     });
//   }
// };

export const updateTaskStatus = async (req, res) => {
    const  taskId  = req.query.taskId;
    const { status } = req.body;

    const allowedStatuses = ["pending", "in-progress", "completed"];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
            message: "Invalid status. Allowed values are: 'pending', 'in-progress', 'completed'.",
        });
    }

    try {
        // Update the task's status
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { status, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({
            message: "Task status updated successfully",
            task: updatedTask,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating task status",
            error: error.message,
        });
    }
};

export const deleteTask = async (req, res) => {
    const  taskId  = req.query.taskId;

    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({
            message: "Task deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting task",
            error: error.message,
        });
    }
};
