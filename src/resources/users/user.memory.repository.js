let users = [];

const getAll = async () => {
  return users;
};

const getUser = async id => {
  return users.find(item => item.id === id);
};

const createUser = async user => {
  users.push(user);
  const { id, login, name } = user;
  return { id, login, name };
};

const updateUser = async user => {
  const { id, login, name, password } = user;
  users = users.map(item => {
    if (id === item.id) {
      item.login = login || item.login;
      item.name = name || item.name;
      item.password = password || item.password;
    }
    return item;
  });
  return users.find(item => item.id === id);
};

const deleteUser = async id => {
  const startLength = users.length;
  users = users.filter(item => item.id !== id);
  const afterDeletedLength = users.length;
  return startLength !== afterDeletedLength;
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
