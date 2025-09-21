import User from "../models/user.model.js";

// ?** GET ALL USER
export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.success(users, "All users fetch successfully", 200);
  } catch (error) {
    next(error);
  }
};

// ?** GET USER BY ID
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await User.findById(id);
    if (!users) {
      res.fail("User Not found", 404);
    }
    res.success("User fetch successfully", 200, users);
  } catch (error) {
    next(error);
  }
};

// ?*** UPDATED USER BY THERE ID
export const userUpdateById = async (req, res, next) => {
  console.log("userUpdateById", req.body);

  try {
    const users = await User.findByIdAndUpdate(
      { _id: req.body.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!users) {
      res.fail("User Not found", 404);
    }
    res.success("User Updated successfully", 200);
  } catch (error) {
    next(error);
  }
};

// ?*** DELETE USER BY THERE ID
export const userDeleteById = async (req, res, next) => {
  try {
    if (!req.body.id) {
      res.fail("User ID is required", 400);
    }
    const user = User.findById(req.body.id);
    if (!user) {
      res.fail("User not found", 404);
    }
    await User.deleteOne({ _id: req.body.id });
    res.success("User Deleted successfully", 200);
  } catch (error) {
    next(error);
  }
};

// ?*** USER PROFILE UPLOAD
export const userProfileUpload = async (req, res, next) => {
  try {
    if (!req.file) return res.fail("No file uploaded", 400);
    res.success("Upload successful", 200, req.file.path);
  } catch (error) {
    next(error);
  }
};
