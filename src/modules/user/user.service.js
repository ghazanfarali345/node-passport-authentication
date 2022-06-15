import UserModel from "./user.model";

export const createUser = async (user) => {
  return UserModel.create(user);
};

export const findUserByEmail = (email) => {
  return UserModel.findOne({ email });
};
