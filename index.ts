import express from "express";
import { connectionSource } from "./src/config/typeorm";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./src/config/swagger";
import { createIndexRouter } from "./src/routes/index.route";

// create express app
const app = express();

// use dotenv to load environment variables
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// create a route
app.get("/", (_, res) => {
    res.send("Switch Configurator Plan BE is running");
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Initialize the database connection
connectionSource.initialize().then(() => {
    console.log("Data Source has been initialized!");

    app.use("/api", createIndexRouter(connectionSource));

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.error("Error during Data Source initialization", error);
});
