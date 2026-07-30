const fs = require("fs");
// image-size might be installed in node_modules
try {
  const sizeOf = require("image-size");
  const size = sizeOf("site/images/Opening Up Is Hard/Thumbnail.png");
  console.log(`Thumbnail 1: ${size.width}x${size.height} (Ratio: ${(size.width/size.height).toFixed(2)})`);
} catch(e) { console.log(e); }
