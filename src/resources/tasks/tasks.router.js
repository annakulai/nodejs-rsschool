const router = require('express').Router({ mergeParams: true });
const tasksService = require('./tasks.service');
const { catchErrors } = require('../catch-errors');
const { NOT_FOUND, BAD_REQUEST, NO_CONTENT, OK } = require('http-status-codes');
const { ClientError } = require('../error-classes');
const Tasks = require('./tasks.model');

router.route('/').get(
  catchErrors(async (req, res) => {
    const boardId = req.params.id;
    const tasks = await tasksService.getTasksByBoardId(boardId);
    if (!tasks) {
      throw new ClientError(NOT_FOUND);
    }
    await res.status(OK).json(tasks.map(Tasks.toResponse));
  })
);

router.route('/:taskId').get(
  catchErrors(async (req, res) => {
    const { taskId } = req.params;
    const task = await tasksService.getTaskById(taskId);
    if (!task) {
      throw new ClientError(NOT_FOUND);
    }
    await res.status(OK).json(Tasks.toResponse(task));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const boardId = req.params.id;
    const { title, order, description, userId, columnId } = req.body;
    if (!title || typeof order !== 'number' || !description) {
      throw new ClientError(BAD_REQUEST);
    }
    const task = await tasksService.createTask({
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    });
    await res.status(OK).json(Tasks.toResponse(task));
  })
);

router.route('/:taskId').put(
  catchErrors(async (req, res) => {
    const taskId = req.params.taskId;
    const { boardId, title, order, description, userId, columnId } = req.body;
    if (!boardId && !title && !order && !description && !userId && !columnId) {
      throw new ClientError(BAD_REQUEST);
    }
    const updatedTask = await tasksService.updateTask({
      boardId,
      taskId,
      title,
      order,
      description,
      userId,
      columnId
    });
    if (!updatedTask) {
      throw new ClientError(NOT_FOUND);
    }
    await res.status(OK).json(updatedTask);
  })
);

router.route('/:taskId').delete(
  catchErrors(async (req, res) => {
    const taskId = req.params.taskId;
    const isDeleted = await tasksService.deleteTask(taskId);
    if (!isDeleted) {
      throw new ClientError(NOT_FOUND);
    }
    await res.status(NO_CONTENT).send('Task was removed');
  })
);

module.exports = router;
