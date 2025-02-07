import express from "express";
import urlRoutes from "./routes/urlRoutes";

const app: express.Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Hello World");
});

app.use("/", urlRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});