// import Enquiry from "../model/enquiry.model.js";
import AppError from "../utils/appError.js";

export const checkEmailUnique = async (req) => {
  const { email } = req.body;
  if (email) {
    //const exists = await Enquiry.findOne({ email });
    if (exists) {
      throw new AppError("Email already exists", 400);
    }
  }
};
