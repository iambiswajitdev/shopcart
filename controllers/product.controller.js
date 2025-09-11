import mongoose from "mongoose";
import { generateSlug } from "../helper/slugify.js";
import Category from "../models/category.model.js";
import { idChecker } from "../helper/commonIdCheck.js";

// ?** CREATE CATEGORY
export const createCategory = async (req, res, next) => {
  try {
    const { name, id } = req.body;

    if (!name || !id) {
      res.fail("Field is required");
    }

    const slug = generateSlug(name);
    const reqObj = {
      name,
      slug,
      userId: id,
      parent: null,
    };
    console.log("reqObj", reqObj);

    const data = await Category.create(reqObj);

    res.success(data, "Data added successfully", 200);
  } catch (error) {
    next(error);
  }
};

// ?** GET ALL CATEGORY
export const getCategory = async (req, res, next) => {
  try {
    const allCateData = await Category.find({ parent: null });
    res.success(allCateData, "Data fetch successfully", 200);
  } catch (error) {
    next(error);
  }
};
// ?** CATEGORY UPDATED BY ID
export const updateCategory = async (req, res, next) => {
  try {
    const { name, userId, id } = req.body;
    const isCateId = idChecker(id);
    const isUserId = idChecker(userId);
    //?*Check Category exist or not
    if (!isCateId) {
      res.fail("Category Not Found", 404);
    }
    //?*Check Category exist or not
    if (!isUserId) {
      res.fail("User Not Found", 404);
    }

    const data = await Category.findByIdAndUpdate(
      { _id: id },
      { $set: { name, slug: generateSlug(name) } },
      { new: true, runValidators: true }
    );
    res.success(data, "Data updated successfully", 200);
  } catch (error) {
    next(error);
  }
};

// ?*** CREATE SUB-CATEGORY BY CATEGORY ID
export const createSubCategory = async (req, res, next) => {
  try {
    const { name, id, categoryId } = req.body;
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    console.log("imageUrl", imageUrl);

    if (!name || !imageUrl || !id || !categoryId) {
      res.fail("Field is required");
    }

    //?*Check Category exist or not
    const parentCategory = await Category.findById(categoryId);
    console.log("parentCategory", parentCategory);
    if (!parentCategory) {
      res.fail("Category Not Found", 404);
    }
    const slug = generateSlug(name);

    const reqObj = {
      name,
      slug,
      image: imageUrl,
      userId: id,
      parent: categoryId,
    };
    console.log("reqObj", reqObj);

    const data = await Category.create(reqObj);

    res.success(data, "Data added successfully", 200);
  } catch (error) {
    next(error);
  }
};
