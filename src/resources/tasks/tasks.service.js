const tasksRepo = require('./tasks.db.repository');
const Task = require('./tasks.model');

const createTask = data => {
  const task = new Task(data);
  return tasksRepo.createTask(task);
};

const getTasksByBoardId = boardId => {
  return tasksRepo.getTasksByBoardId(boardId);
};

const getTaskById = taskId => {
  return tasksRepo.getTaskById(taskId);
};

const updateTask = data => {
  return tasksRepo.updateTask(data);
};

const deleteTask = taskId => {
  return tasksRepo.deleteTask(taskId);
};

const deleteTasksByBoardId = id => {
  return tasksRepo.deleteTasksByBoardId(id);
};

const unassignTasks = id => {
  return tasksRepo.unassignTasks(id);
};

module.exports = {
  createTask,
  getTasksByBoardId,
  getTaskById,
  updateTask,
  deleteTask,
  deleteTasksByBoardId,
  unassignTasks
};
