import mongoose from "mongoose";

export const idChecker = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
