import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { logger } from "./utils/logger.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});
console.log("Server database url: ", process.env.DATABASE_URL);