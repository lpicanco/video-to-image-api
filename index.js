const extractFrames = require('ffmpeg-extract-frames')
const path = require('path');
const express = require('express');
const uuidv4 = require('uuid/v4');
const app = express()
const port = process.env.PORT || 3000

app.get('/', async (req, res) => {
    offsetInMillis = req.query["offset-in-millis"]
    url = req.query.url
    fileName = path.join(__dirname, "./imgs_" + uuidv4() + ".jpg");

    console.info("url: " + url)
    console.info("offSet: " + offsetInMillis)
    console.info("fileName: " + fileName)


    await extractFrames({
        input: url,
        output: fileName,
        offsets: [
          offsetInMillis
        ]
      });

    res.sendFile(fileName);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))