const users = {};

function getUserData(username) {
  return users[username];
};

function addUserData(username, userTodoList, userInventoryList, userMyRewards, userPoint) {
  users[username] = { ...userTodoList, ...userInventoryList, ...userMyRewards, ...userPoint }
};

module.exports = {
  getUserData,
  addUserData,
};
