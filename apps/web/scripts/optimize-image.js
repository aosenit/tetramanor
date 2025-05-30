const sharp = require("sharp");
const path = require("path");

const inputPath = path.join(__dirname, "../public/about/about.png");
const outputPath = path.join(__dirname, "../public/about/about-optimized.png");

sharp(inputPath)
  .resize(800, 1000, {
    // Reduce dimensions while maintaining aspect ratio
    fit: "inside",
    withoutEnlargement: true,
  })
  .png({ quality: 80 }) // Reduce quality slightly
  .toFile(outputPath)
  .then(() => {
    console.log("Image optimized successfully!");
  })
  .catch((err) => {
    console.error("Error optimizing image:", err);
  });
