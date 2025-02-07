import express from "express";

const URL_LENGTH: number = 6;
const router: express.Router = express.Router();

// For testing
interface stringMap {
    [key: string]: string;
}

const urlMapping: stringMap = {};

function generateRandomString(length: number): string {
    const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result: string = "";
    for (let i: number = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

router.post("/shorten", (req: express.Request, res: express.Response) => {
    if ("url" in req.body) {
        const originalUrl: string = req.body.url;
        const shortUrl: string = generateRandomString(URL_LENGTH);
        urlMapping[shortUrl] = originalUrl;
        res.json({ shortUrl });
    } else {
        res.status(400).json({ error: "URL is required" });
    }
});

router.get("/:code", (req: express.Request, res: express.Response) => {
    const shortUrl: string = req.params.code;
    
    if (shortUrl in urlMapping) {
        const originalUrl: string = urlMapping[shortUrl];
        res.redirect(originalUrl);
    } else {
        res.status(404).json({ error: "Short URL not found" });
    }
});

export default router;