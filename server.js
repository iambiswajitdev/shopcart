import app from "./app.js";
import config from "./config.js";
import { connectDb } from "./database/db.js";
connectDb();
const PORT = config.app.port || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
