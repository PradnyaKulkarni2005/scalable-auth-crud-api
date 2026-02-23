const Task = require("../../models/Task");

const createTask = async (taskData, userId) => {
  try {
    const task = await Task.create({
      ...taskData,
      userId,
    });
    return task;
  } catch (error) {
    throw error;
  }
};

const getAllTasks = async (userId, role, filterOptions = {}) => {
  try {
    let query = {};

    // If user is not admin, only return their tasks
    if (role !== "admin") {
      query.userId = userId;
    }

    // Apply filters
    if (filterOptions.status) {
      query.status = filterOptions.status;
    }
    if (filterOptions.priority) {
      query.priority = filterOptions.priority;
    }

    const tasks = await Task.find(query)
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return tasks;
  } catch (error) {
    throw error;
  }
};

const getTaskById = async (taskId, userId, role) => {
  try {
    const task = await Task.findById(taskId).populate("userId", "name email");

    if (!task) {
      throw new Error("Task not found");
    }

    // Check authorization: only admin or task owner can view
    if (role !== "admin" && task.userId._id.toString() !== userId) {
      throw new Error("Not authorized to access this task");
    }

    return task;
  } catch (error) {
    throw error;
  }
};

const updateTask = async (taskId, updateData, userId, role) => {
  try {
    const task = await Task.findById(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    // Check authorization: only admin or task owner can update
    if (role !== "admin" && task.userId.toString() !== userId) {
      throw new Error("Not authorized to update this task");
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true,
      runValidators: true,
    }).populate("userId", "name email");

    return updatedTask;
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (taskId, userId, role) => {
  try {
    const task = await Task.findById(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    // Check authorization: only admin or task owner can delete
    if (role !== "admin" && task.userId.toString() !== userId) {
      throw new Error("Not authorized to delete this task");
    }

    await Task.findByIdAndDelete(taskId);
    return { message: "Task deleted successfully" };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
