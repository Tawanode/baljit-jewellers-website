const fs = require('fs');
const path = require('path');

const cssPath = 'd:\\baljit-jew\\index.css';
const assetsDir = 'd:\\baljit-jew\\assets';

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

console.log('Reading CSS file...');
const data = fs.readFileSync(cssPath, 'utf8');
const lines = data.split('\n');
console.log(`Total lines: ${lines.length}`);

const extractImage = (lineIndex, filename) => {
    if (lineIndex >= lines.length) return;
    const line = lines[lineIndex];
    // Regex to match data:image/something;base64,data
    const regex = /url\(['"]?data:image\/([^;]+);base64,([^'"]+)['"]?\)/;
    const match = line.match(regex);
    
    if (match) {
        const ext = match[1].split('+')[0]; // simple extension
        const base64Data = match[2];
        const buffer = Buffer.from(base64Data, 'base64');
        const fullFilename = `${filename}.${ext === 'jpeg' ? 'jpg' : ext}`;
        const outputPath = path.join(assetsDir, fullFilename);
        
        fs.writeFileSync(outputPath, buffer);
        console.log(`Extracted ${fullFilename} (${buffer.length} bytes) to ${outputPath}`);
        
        // Update the line in the array (replace with relative path)
        lines[lineIndex] = line.replace(/url\(['"]?data:image\/[^;]+;base64,[^'"]+['"]?\)/, `url('assets/${fullFilename}')`);
    } else {
        // Fallback: search the whole line for any data:image if exact match fails
        const secondRegex = /data:image\/([^;]+);base64,([^'")]*)/;
        const secondMatch = line.match(secondRegex);
        if (secondMatch) {
             const ext = secondMatch[1].split('+')[0];
             const base64Data = secondMatch[2];
             const buffer = Buffer.from(base64Data, 'base64');
             const fullFilename = `${filename}.${ext === 'jpeg' ? 'jpg' : ext}`;
             fs.writeFileSync(path.join(assetsDir, fullFilename), buffer);
             console.log(`Extracted via fallback ${fullFilename} (${buffer.length} bytes)`);
             lines[lineIndex] = line.replace(/data:image\/[^;]+;base64,[^'")]*/, `assets/${fullFilename}`);
        } else {
            console.log(`No match on line ${lineIndex + 1}`);
        }
    }
};

console.log('Extracting specific known lines...');
extractImage(1768, 'hero-bg');
extractImage(4331, 'collection-item-1');

console.log('Searching for other data:image instances...');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('data:image') && i !== 1768 && i !== 4331) {
        console.log(`Found another data:image on line ${i + 1}`);
        extractImage(i, `asset-image-${i + 1}`);
    }
}

// Write back the updated CSS
console.log('Writing updated CSS...');
fs.writeFileSync(cssPath, lines.join('\n'), 'utf8');
console.log('Updated index.css with relative paths');
