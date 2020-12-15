const router = require('express').Router({ mergeParams: true });
const tasksService = require('./tasks.service');

router.route('/').get(async (req, res) => {
  const boardId = req.params.id;
  const tasks = await tasksService.getTasksByBoardId(boardId);
  await res.json(tasks);
});

router.route('/:taskId').get(async (req, res) => {
  const { taskId } = req.params;
  const task = await tasksService.getTaskById(taskId);
  if (!task) {
    res.status(404);
  }
  await res.json(task);
});

router.route('/').post(async (req, res) => {
  const boardId = req.params.id;
  const { title, order, description, userId, columnId } = req.body;
  const task = await tasksService.createTask({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  await res.json(task);
});

router.route('/:taskId').put(async (req, res) => {
  const taskId = req.params.taskId;
  const { boardId, title, order, description, userId, columnId } = req.body;
  const updatedTask = await tasksService.updateTask({
    boardId,
    taskId,
    title,
    order,
    description,
    userId,
    columnId
  });
  await res.json(updatedTask);
});

router.route('/:taskId').delete(async (req, res) => {
  const taskId = req.params.taskId;
  const isDeleted = await tasksService.deleteTask(taskId);
  await res.json(isDeleted);
});

module.exports = router;
