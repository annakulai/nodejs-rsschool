const uuid = require('uuid');

class Tasks {
  constructor({
    id = uuid(),
    title = 'TITLE',
    order = 0,
    description = 'There should be description',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Tasks;
