import express from "express";
import prisma from "../prismaClient";
import { ShortUrl } from "@prisma/client";
import isUrl from "validator/lib/isURL";

const URL_LENGTH: number = 6;
const router: express.Router = express.Router();

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

router.post("/shorten", async (req: express.Request, res: express.Response) => {
    // Ensure request body contains a URL
    if ("url" in req.body) {
        const originalUrl: string = req.body.url;

        // Validate URL
        if (isUrl(originalUrl,
            { require_protocol: true}
        )) {
            let shortCode: string;
            let collision: boolean;

            // Prevent collision
            do {
                shortCode = generateRandomString(URL_LENGTH);
                collision = (await prisma.shortUrl.findUnique({
                    where: {
                        shortCode: shortCode
                    }
                })) !== null;
            } while (collision);

            // Save to database
            await prisma.shortUrl.create({
                data: {
                    shortCode: shortCode,
                    originalUrl: originalUrl
                }
            });

            res.json({ shortCode });
        } else {
            res.status(400).json({ error: "Invalid URL" });
        }
    } else {
        res.status(400).json({ error: "URL is required" });
    }
});

router.get("/:code", async (req: express.Request, res: express.Response) => {
    const shortCode: string = req.params.code;
    const shortUrlRecord: ShortUrl | null = await prisma.shortUrl.findUnique({
        where: {
            shortCode: shortCode
        }
    });
    
    // Check if the short URL exists in the mapping
    if (shortUrlRecord !== null) {
        res.redirect(shortUrlRecord.originalUrl);
    } else {
        res.status(404).json({ error: "Short URL not found" });
    }
});

export default router;