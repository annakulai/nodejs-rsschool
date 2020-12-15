const Tasks = require('./tasks.model');

const createTask = async task => {
  return Tasks.create(task);
};

const getTasksByBoardId = async boardId => {
  return Tasks.find({ boardId });
};

const getTaskById = async taskId => {
  return Tasks.findById(taskId);
};

const updateTask = async data => {
  return Tasks.updateOne({ _id: data.taskId }, data);
};

const deleteTask = async taskId => {
  const deleteResult = await Tasks.deleteOne({ _id: taskId });
  return deleteResult.deletedCount;
};

const deleteTasksByBoardId = async id => {
  const deleteResult = await Tasks.deleteMany({ boardId: id });
  return deleteResult.deletedCount;
};

const unassignTasks = async id => {
  return await Tasks.updateMany({ userId: id }, { userId: null });
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
