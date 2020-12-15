const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksRouter = require('../tasks/tasks.router');
const { NOT_FOUND, BAD_REQUEST, OK, NO_CONTENT } = require('http-status-codes');
const { ClientError } = require('../error-classes');
const { catchErrors } = require('../catch-errors');

router.use('/:id/tasks', tasksRouter);

router.route('/').get(
  catchErrors(async (req, res) => {
    const board = await boardsService.getAll();
    if (!board) {
      throw new ClientError(NOT_FOUND);
    }
    await res.status(OK).json(board.map(Board.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const id = req.params.id;
    const board = await boardsService.getBoard(id);
    if (!board) {
      throw new ClientError(NOT_FOUND);
    }
    await res.status(OK).json(Board.toResponse(board));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { title, columns } = req.body;
    const board = await boardsService.createBoard({ title, columns });
    await res.json(Board.toResponse(board));
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const idBoard = req.params.id;
    const { title, columns } = req.body;
    if (!title && !columns) {
      throw new ClientError(BAD_REQUEST);
    }
    const updateBoard = await boardsService.updateBoard(
      idBoard,
      title,
      columns
    );

    await res.status(OK).json(updateBoard);
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const id = req.params.id;
    const isDeleted = await boardsService.deleteBoard(id);
    if (!isDeleted) {
      throw new ClientError(NOT_FOUND);
    }
    await res.status(NO_CONTENT).json({ message: 'Board was removed' });
  })
);

module.exports = router;
