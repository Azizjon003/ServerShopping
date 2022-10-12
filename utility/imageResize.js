const sharp = require("sharp");
const fs = require("fs");
const imageResize = async (img) => {
  const url =
    "/home/aziz/Desktop/New works/Computer-Service-main/server/public/images/";
  const mainUrl = url + img;
  const data = fs.readFileSync(mainUrl);
  const images = await sharp(data)
    .resize(600, 400)
    .jpeg({ mozjpeg: true, quality: 100 })
    .toBuffer();
  const image = fs.writeFileSync(`${mainUrl}`, images);
  console.log(image);
};

module.exports = imageResize;
