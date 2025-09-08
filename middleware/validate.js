import AppError from "../utils/appError.js";

export const validate =
  (schema, dbChecks = []) =>
  async (req, res, next) => {
    try {
      // ✅ Yup validation first
      await schema.validate(req.body, { abortEarly: false });

      // ✅ DB validation checks
      for (const check of dbChecks) {
        await check(req); // each check gets access to req
      }

      next(); // proceed if everything is valid
    } catch (err) {
      const errors = err.errors || [err.message];
      return next(new AppError(errors.join(", "), 400));
    }
  };
