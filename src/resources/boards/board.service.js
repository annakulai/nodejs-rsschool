const boardRepo = require('./board.db.repository');
const Column = require('./column.model');
const Board = require('./board.model');
const tasksService = require('../tasks/tasks.service');

const getAll = () => boardRepo.getAll();

const getBoard = id => {
  return boardRepo.getBoard(id);
};

const createBoard = data => {
  let { columns } = data;
  const { title } = data;
  if (columns) {
    columns = columns.map(item => new Column(item));
  }
  return boardRepo.createBoard(new Board({ title, columns }));
};

const updateBoard = (idBoard, title, columns) => {
  return boardRepo.updateBoard({ idBoard, title, columns });
};

const deleteBoard = async id => {
  const isDeleted = await boardRepo.deleteBoard(id);
  if (isDeleted) {
    await tasksService.deleteTasksByBoardId(id);
  }
  return isDeleted;
};

module.exports = { getAll, createBoard, getBoard, updateBoard, deleteBoard };
