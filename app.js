import express from "express";
import userRoute from "./routes/user.route.js";
import uploadRoutes from "./routes/upload.routes.js";
import productRoutes from "./routes/product.routes.js";
import { responseHandler } from "./middleware/responseHandler.js";
import errorHandler from "./middleware/errorHandler.js";
import { upload } from "./utils/upload.js";
const app = express();
app.use(express.json());

// ?**** Global Response handler
app.use(responseHandler);

// ?*** APP ROUTE
app.use("/api/v1", userRoute);

app.use("/api/v1", uploadRoutes);

app.use("/api/v1", productRoutes);

// Serve uploaded files statically
// app.post("/upload", upload.single("image"), (req, res) => {
//   if (!req.file) return res.status(400).json({ error: "No file uploaded" });
//   res.json({
//     message: "Upload successful",
//     url: req.file.path, // Cloudinary URL
//     public_id: req.file.filename, // unique Cloudinary ID
//   });
// });
//?**  Global error handler
app.use(errorHandler);
export default app;
