let tasks = [];

const createTask = async task => {
  await tasks.push(task);
  return task;
};

const getTasksByBoardId = async boardId => {
  return tasks.filter(item => item.boardId === boardId);
};

const getTaskById = async taskId => {
  return tasks.find(item => item.id === taskId);
};

const updateTask = async data => {
  const { boardId, taskId, title, order, description, userId, columnId } = data;
  tasks = tasks.map(item => {
    if (item.id === taskId) {
      item.title = title || item.title;
      item.order = order || item.order;
      item.description = description || item.description;
      item.boardId = boardId || item.boardId;
      item.columnId = columnId || item.columnId;
      item.userId = userId || item.userId;
    }
    return item;
  });
  return tasks.find(item => item.id === taskId);
};

const deleteTask = async taskId => {
  const startLength = tasks.length;
  tasks = tasks.filter(item => item.id !== taskId);
  const deletedLength = tasks.length;
  return startLength !== deletedLength;
};

const deleteTasksByBoardId = async id => {
  tasks = tasks.filter(item => item.boardId !== id);
};

const unassignTasks = id => {
  tasks = tasks.map(item => {
    if (item.userId === id) {
      item.userId = null;
    }
    return item;
  });
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
