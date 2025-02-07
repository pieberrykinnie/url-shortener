import express from "express";

const app: express.Application = express();
const PORT: number = 3000;

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});