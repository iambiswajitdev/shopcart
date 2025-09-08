import express from "express";
import userRoute from "./routes/user.route.js";
import { responseHandler } from "./middleware/responseHandler.js";
import errorHandler from "./middleware/errorHandler.js";
const app = express();
app.use(express.json());

// ?**** Global Response handler
app.use(responseHandler);

// ?*** APP ROUTE
app.use("/api/v1/users", userRoute);

//?**  Global error handler
app.use(errorHandler);
export default app;
