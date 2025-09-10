import slugify from "slugify";
export const generateSlug = (text) => {
  return slugify(text, {
    lower: true, // lowercase all letters
    strict: true, // remove special chars
    locale: "en", // handle accents and special chars
    trim: true, // remove leading/trailing spaces
  });
};
