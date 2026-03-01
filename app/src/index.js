import app from "./config/express.js";
import clientRoutes from "./routes/client.js";
import { connectToMongoDB } from "./config/mongoose.js";
import { loadEnvFile } from "node:process";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./config/swagger.js";

loadEnvFile("./config/.env");

connectToMongoDB();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(clientRoutes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
