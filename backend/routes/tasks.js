const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.route('/')
  .get(async (req, res) => {
    try {
      const tasks = await Task.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
      });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while fetching tasks'
      });
    }
  })
  .post(async (req, res) => {
    try {
      const newTask = new Task(req.body);
      const savedTask = await newTask.save();
      res.status(201).json({
        success: true,
        data: savedTask
      });
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while creating task'
      });
    }
  });

router.route('/:id')
  .put(async (req, res) => {
    try {
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedTask) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }
      res.status(200).json({
        success: true,
        data: updatedTask
      });
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while updating task'
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
      if (!deletedTask) {
        return res.status(404).json({
          success: false,
          message: 'Task not found'
        });
      }
      res.status(200).json({
        success: true,
        data: deletedTask
      });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while deleting task'
      });
    }
  });

module.exports = router;