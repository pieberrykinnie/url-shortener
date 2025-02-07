import express from "express";
import isUrl from "validator/lib/isURL";

const URL_LENGTH: number = 6;
const router: express.Router = express.Router();

// For testing
interface stringMap {
    [key: string]: string;
}

const urlMapping: stringMap = {};

/**
 * Generate a random string of a given length for the shortened URL.
 * 
 * @param length the length of the string to generate
 * @returns a random string of the given length
 */
function generateRandomString(length: number): string {
    const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result: string = "";
    for (let i: number = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

router.post("/shorten", (req: express.Request, res: express.Response) => {
    // Ensure request body contains a URL
    if ("url" in req.body) {
        const originalUrl: string = req.body.url;

        // Validate URL
        if (isUrl(originalUrl,
            { require_protocol: true}
        )) {
            let shortUrl: string = generateRandomString(URL_LENGTH);
            // Prevent collision
            while (shortUrl in urlMapping) {
                shortUrl = generateRandomString(URL_LENGTH);
            }
            urlMapping[shortUrl] = originalUrl;
            res.json({ shortUrl });
        } else {
            res.status(400).json({ error: "Invalid URL" });
        }
    } else {
        res.status(400).json({ error: "URL is required" });
    }
});

router.get("/:code", (req: express.Request, res: express.Response) => {
    const shortUrl: string = req.params.code;
    
    // Check if the short URL exists in the mapping
    if (shortUrl in urlMapping) {
        const originalUrl: string = urlMapping[shortUrl];
        res.redirect(originalUrl);
    } else {
        res.status(404).json({ error: "Short URL not found" });
    }
});

export default router;