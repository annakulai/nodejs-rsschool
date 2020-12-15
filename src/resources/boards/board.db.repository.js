const Board = require('./board.model');

const getAll = async () => {
  return Board.find({});
};

const getBoard = async id => {
  return Board.findById(id);
};

const createBoard = async board => {
  return Board.create(board);
};

const updateBoard = async data => {
  return Board.updateOne({ _id: data.idBoard }, data);
};

const deleteBoard = async id => {
  const deleteResult = await Board.deleteOne({ _id: id });
  return deleteResult.deletedCount;
};

module.exports = {
  getAll,
  createBoard,
  getBoard,
  updateBoard,
  deleteBoard
};
