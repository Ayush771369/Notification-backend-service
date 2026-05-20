import prisma from "./config/prisma.client.js";


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

app.get("/", (req, res) => {
    res.send("Notification backend is running 🚀");
});

app.get("/test-db", async (req, res) => {
    try {
        await prisma.$connect();

        res.json({
            success: true,
            message: "Database connected successfully 🚀"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});