const express = require('express');
const ytdl = require('ytdl-core');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/download', async (req, res) => {
    const { url, quality } = req.body;

    try {
        if (!ytdl.validateURL(url)) {
            return res.status(400).json({ error: 'Invalid YouTube URL' });
        }

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url);
        await page.screenshot({ path: 'screenshot.png' });
        await browser.close();

        console.log('Screenshot taken');

        // Download video
        const video = ytdl(url, { quality: quality === 'highest' ? 'highestvideo' : quality });

        video.on('info', (info) => {
            const format = info.formats.find(f => f.itag === (quality === '1080p' ? 137 : (quality === '720p' ? 22 : (quality === '480p' ? 135 : (quality === '360p' ? 18 : undefined)))));

            if (!format) {
                return res.status(404).json({ error: 'No stream found for the requested quality' });
            }

            res.header('Content-Disposition', 'attachment; filename="video.mp4"');
            res.header('Content-Type', 'video/mp4');
            video.pipe(res);
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
