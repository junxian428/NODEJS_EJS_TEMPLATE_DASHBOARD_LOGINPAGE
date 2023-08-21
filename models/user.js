const users = [
    { id: 1, username: 'user', password: 'password' }
  ];
  
  function findUserByUsername(username) {
    return users.find(user => user.username === username);
  }
  
  function findUserById(id) {
    return users.find(user => user.id === id);
  }
  
  module.exports = {
    findUserByUsername,
    findUserById
  };
  