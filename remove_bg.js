const Jimp = require('jimp');

async function processImage() {
    try {
        const image = await Jimp.read('assets/logo/logo.png');
        
        // Define background color
        const bgR = 247;
        const bgG = 245;
        const bgB = 237;
        const threshold = 15; // Tolerance for anti-aliasing

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];
            
            const distance = Math.sqrt(
                Math.pow(r - bgR, 2) + 
                Math.pow(g - bgG, 2) + 
                Math.pow(b - bgB, 2)
            );

            if (distance < threshold) {
                // Completely transparent
                this.bitmap.data[idx + 3] = 0;
            } else if (distance < threshold * 3) {
                // Anti-aliased edges (fade to transparent)
                const alpha = Math.floor(((distance - threshold) / (threshold * 2)) * 255);
                this.bitmap.data[idx + 3] = alpha;
            }
        });

        // Crop the image to just the butterfly based on non-transparent pixels
        // Wait, just let Jimp autocrop it!
        image.autocrop();

        await image.writeAsync('assets/logo/butterfly_real.png');
        console.log('Successfully created butterfly_real.png');
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

processImage();
