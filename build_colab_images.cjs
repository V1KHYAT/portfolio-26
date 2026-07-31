const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'site/images/CoLab');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

async function processImages() {
  console.log(`Found ${files.length} PNG slides in CoLab folder. Processing...`);
  
  for (const file of files) {
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, file.replace('.png', '.webp'));
    
    try {
      await sharp(inputPath)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);
      
      const originalSize = fs.statSync(inputPath).size / (1024 * 1024);
      const newSize = fs.statSync(outputPath).size / (1024 * 1024);
      console.log(`✅ ${file}: ${originalSize.toFixed(2)}MB -> ${newSize.toFixed(2)}MB`);
    } catch (e) {
      console.error(`❌ Failed to process ${file}:`, e);
    }
  }
  
  console.log('🎉 All Colab slides compressed successfully! You can now view them in project-2.html');
}

processImages();
