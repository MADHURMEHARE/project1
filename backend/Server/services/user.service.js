const userRepository = require("../repositories/user.repository");

exports.registerUser = async (data) => {
  // Example business logic
  

  return await userRepository.createUser(data);
};

exports.getUsers = async () => {
  return await userRepository.getAllUsers();
};

exports.deleteUser = async (id) => {
  return await userRepository.deleteUser(id);
};

exports.updateUser = async (id, data) => {
  return await userRepository.updateUser(id, data);
};