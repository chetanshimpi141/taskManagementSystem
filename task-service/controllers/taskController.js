const { response } = require('express');
const Task = require('../models/Task');
const notifyUser= require("../services/taskService");


// Create
exports.createTask = async (req, res) => {
  try {
    const { title, description, assigneeId, assigneeEmail } = req.body;    
    const task = await Task.create({ title, description, assigneeId, assigneeEmail});
    //const jsonData = res.jsonData();

    console.log(task);
    
    // Notify the assigned user
    //if (assigneeEmail) {
        await notifyUser(assigneeEmail, title,task);
    //}
    res.status(201).json(task);
  } catch (error) {
   res.status(500).json({ message: 'Server error', error });
  }
};

// Get
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update 
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, assigneeId } = req.body;
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.update({ title, description, status, assigneeId });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
// Delete
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    await task.destroy();
    res.status(200).json({
      message: `${req.params.id} ID of Task deleted successfully,` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
