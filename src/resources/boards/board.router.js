const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksRouter = require('../tasks/tasks.router');

router.use('/:id/tasks', tasksRouter);

router.route('/').get(async (req, res) => {
  const board = await boardsService.getAll();
  await res.json(board.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const board = await boardsService.getBoard(id);
  if (!board) {
    res.status(404);
  }
  await res.json(board);
});

router.route('/').post(async (req, res) => {
  const data = req.body;
  const board = await boardsService.createBoard(data);
  await res.json(board);
});

router.route('/:id').put(async (req, res) => {
  const idBoard = req.params.id;
  const { title, columns } = req.body;
  const updateBoard = await boardsService.updateBoard(idBoard, title, columns);
  await res.json(updateBoard);
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  const board = await boardsService.deleteBoard(id);
  if (!board) {
    res.status(404);
  }
  await res.json({ message: 'Board was removed', board });
});

module.exports = router;
