const fs = require('fs');

const head = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta property="og:title" content="Baljit Jewellers - Premium Gold Jewellery" />
    <meta property="og:description" content="Discover handcrafted jewellery collections." />
    <meta property="og:image" content="https://www.baljitjewellers.com/preview.jpg" />
    <meta property="og:url" content="https://www.baljitjewellers.com/" />
    <meta property="og:type" content="website" />
    <meta name="msvalidate.01" content="D31654FD639E73B363C856628BA124E0" />
    <meta name="google-site-verification" content="vr3yAMmMI3CXSSKckXcoe_9PRrJZ_9jJo5omyxpSATY" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Baljit Jewellers - Luxury Gold & Diamond Jewellery</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="index.css">
</head>`;

let body = fs.readFileSync('d:\\baljit-jew\\body_content.html', 'utf8');

// Logo Fix: Ensure BALJIT JEWELLERS is on one horizontal line.
// The user might mean the text is breaking or stacking.
// I'll wrap it in a span with nowrap if needed, but the current structure is okay.
// Let's just make it more robust.
body = body.replace(/<div class="logo-text">([\s\S]*?)<\/div>/, `<div class="logo-text" style="white-space: nowrap;">$1</div>`);

const footer = `
    <script src="index.js"></script>
</body>
</html>`;

fs.writeFileSync('d:\\baljit-jew\\index.html', head + body + footer, 'utf8');
console.log('Rebuilt index.html');
