import express from "express";

const taskRoutes = express.Router()

import { createTask, deleteTask, getTasksByUser, updateTaskStatus } from "../controller/taskcontroller.js";

taskRoutes.post('/create', createTask)
taskRoutes.put('/update', updateTaskStatus)
taskRoutes.get('/alltasks', getTasksByUser)
taskRoutes.delete('/deletetask', deleteTask)

export default taskRoutes