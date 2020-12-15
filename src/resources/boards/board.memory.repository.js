let boards = [];

const getAll = async () => {
  return boards;
};

const getBoard = async id => {
  return boards.find(item => item.id === id);
};

const createBoard = async board => {
  boards.push(board);
  return board;
};

const updateBoard = async data => {
  const { idBoard, title, columns } = data;
  boards = boards.map(item => {
    if (idBoard === item.id) {
      item.title = title || item.title;
      columns.forEach(columnUpdate => {
        item.columns.map(column => {
          if (columnUpdate.id === column.id) {
            column.title = columnUpdate.title || column.title;
            column.order = columnUpdate.order || column.order;
          }
          return column;
        });
      });
    }
    return item;
  });
  return boards.find(item => item.id === idBoard);
};

const deleteBoard = async id => {
  const startLength = boards.length;
  boards = boards.filter(item => item.id !== id);
  const deletedLength = boards.length;
  return startLength !== deletedLength;
};

const isValidParameters = (boardId, columnId) => {
  const boardIndex = boards.findIndex(item => item.id === boardId);
  if (boardIndex !== -1) {
    return boards[boardIndex].columns.some(item => item.id === columnId);
  }
  return false;
};

module.exports = {
  getAll,
  createBoard,
  getBoard,
  updateBoard,
  deleteBoard,
  isValidParameters
};
