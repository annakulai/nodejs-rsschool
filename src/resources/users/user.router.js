const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

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
