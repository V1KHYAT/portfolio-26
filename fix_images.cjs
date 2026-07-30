const fs = require("fs");
const path = require("path");

const userUploadsDir = "C:\\Users\\Vikhyat Kaushik\\.gemini\\antigravity\\brain\\f2ade801-3238-4843-9bb4-e9837324d1ff\\.user_uploaded";
const images = [
  "media__1785050171884.png",
  "media__1785048150446.png",
  "media__1785048140050.png",
  "media__1784998041167.jpg",
  "media__1784992300740.png"
];

let html = fs.readFileSync("site/index.html", "utf8");

images.forEach((imgFile, index) => {
  const sourcePath = path.join(userUploadsDir, imgFile);
  const destPath = path.join("site", "images", imgFile);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied ${imgFile} to site/images`);
  } else {
    console.log(`Could not find ${imgFile}`);
  }
});

// We need to replace the 5 img tags that have class="gap_home_image"
// The easiest way is to use regex to find all <img ... class="gap_home_image"> and replace their src and remove srcset/sizes
let imgIndex = 0;
html = html.replace(/<img[^>]*class="gap_home_image"[^>]*>/g, (match) => {
  if (imgIndex < images.length) {
    const newTag = `<img src="images/${images[imgIndex]}" loading="lazy" alt="User interest image ${imgIndex + 1}" class="gap_home_image" style="object-fit: cover;">`;
    imgIndex++;
    return newTag;
  }
  return match;
});

fs.writeFileSync("site/index.html", html);
console.log(`Replaced ${imgIndex} gap_home_image tags`);
