import express from "express";
import userRoute from "./routes/user.route.js";
import uploadRoutes from "./routes/upload.routes.js";
import { responseHandler } from "./middleware/responseHandler.js";
import errorHandler from "./middleware/errorHandler.js";
const app = express();
app.use(express.json());

// ?**** Global Response handler
app.use(responseHandler);

// ?*** APP ROUTE
app.use("/api/v1", userRoute);

app.use("/api/v1", uploadRoutes);

// Serve uploaded files statically
app.use("/uploads", express.static("uploads"));

//?**  Global error handler
app.use(errorHandler);
export default app;
