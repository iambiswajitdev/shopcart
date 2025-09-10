import { generateSlug } from "../helper/slugify.js";
import Category from "../models/category.model.js";

// ?** CREATE CATEGORY
export const createCategory = async (req, res, next) => {
  try {
    console.log("product", req.body);

    const { name, id } = req.body;
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    console.log("imageUrl", imageUrl);

    if (!name || !imageUrl || !id) {
      res.fail("Field is required");
    }
    const slug = generateSlug(name);

    const reqObj = {
      name,
      slug,
      image: imageUrl,
      user: id,
    };
    console.log("reqObj", reqObj);

    //const data = await Category.create(reqObj);

    res.success(reqObj, "Data added successfully", 200);
  } catch (error) {
    next(error);
  }
};
