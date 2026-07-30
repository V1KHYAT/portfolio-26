const fs = require("fs");
const path = require("path");

const worldDir = "C:\\Users\\Vikhyat Kaushik\\AG Projects\\Portfolio 26\\Assets\\The World";
const siteImagesDir = "C:\\Users\\Vikhyat Kaushik\\AG Projects\\Portfolio 26\\bymonolog-clone-light\\site\\images";

const images = [
  "WhatsApp Image 2026-07-24 at 7.41.00 PM.jpeg",
  "WhatsApp Image 2026-07-24 at 7.41.57 PM.jpeg",
  "WhatsApp Image 2026-07-24 at 7.42.29 PM.jpeg",
  "WhatsApp Image 2026-07-24 at 7.43.56 PM.jpeg",
  "image 10.png"
];

let html = fs.readFileSync("site/index.html", "utf8");

images.forEach((imgFile) => {
  const sourcePath = path.join(worldDir, imgFile);
  const destPath = path.join(siteImagesDir, imgFile);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied "${imgFile}" to site/images`);
  } else {
    console.log(`Could not find "${imgFile}"`);
  }
});

let imgIndex = 0;
html = html.replace(/<img[^>]*class="gap_home_image"[^>]*>/g, (match) => {
  if (imgIndex < images.length) {
    const encodedName = encodeURIComponent(images[imgIndex]).replace(/%20/g, ' ');
    const newTag = `<img src="images/${encodedName}" loading="lazy" alt="User interest image ${imgIndex + 1}" class="gap_home_image" style="object-fit: cover;">`;
    imgIndex++;
    return newTag;
  }
  return match;
});

fs.writeFileSync("site/index.html", html);
console.log(`Replaced ${imgIndex} gap_home_image tags with images from 'The World' folder`);
