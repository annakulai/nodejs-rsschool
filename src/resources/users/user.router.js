const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const {
  NOT_FOUND,
  BAD_REQUEST,
  OK,
  NO_CONTENT,
  getStatusText
} = require('http-status-codes');
const { ClientError } = require('../error-classes');
const { catchErrors } = require('../catch-errors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const users = await usersService.getAll();
    if (!users) {
      throw new ClientError(NOT_FOUND);
    }
    res.status(OK).json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const id = req.params.id;
    const user = await usersService.getUser(id);
    if (!user) {
      throw new ClientError(NOT_FOUND);
    }
    res.status(OK).json(User.toResponse(user));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { name, login, password } = req.body;
    if (!name || !login || !password) {
      throw new ClientError(BAD_REQUEST);
    }
    const userInfo = await usersService.createUser(name, login, password);
    res.status(OK).json(User.toResponse(userInfo));
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const id = req.params.id;
    const { name, login, password } = req.body;
    if (!name && !login && !password) {
      throw new ClientError(BAD_REQUEST);
    }
    const updateUser = await usersService.updateUser(id, name, login, password);
    res
      .status(OK)
      .json({ message: 'User updated', user: User.toResponse(updateUser) });
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const id = req.params.id;
    const user = await usersService.deleteUser(id);
    if (!user) {
      throw new ClientError(NOT_FOUND);
    }
    res.status(NO_CONTENT).send(getStatusText(NO_CONTENT));
  })
);

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const user = await usersService.getUser(id);
  res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const userInfo = await usersService.createUser(name, login, password);
  res.json(User.toResponse(userInfo));
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const { name, login, password } = req.body;
  const updateUser = await usersService.updateUser(id, name, login, password);
  res.json({ message: 'User updated', user: User.toResponse(updateUser) });
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  const user = await usersService.deleteUser(id);
  res.json({ message: 'User was removed', user: User.toResponse(user) });
});

module.exports = router;
