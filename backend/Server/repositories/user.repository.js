const User = require("../models/user.model");

exports.createUser = async (data) => {
  return await User.create(data);
};

exports.getAllUsers = async () => {
  return await User.find();
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

exports.updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};