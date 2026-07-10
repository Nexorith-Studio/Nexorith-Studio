# Images for Zentry Sections

This directory should contain images for the Zentry-style sections.

## Required Images:

### 1. about.webp
- **Used in**: ZentryAbout section
- **Description**: Background image for the about section
- **Recommended Size**: 1920x1080 or similar
- **Format**: WebP (or use .jpg/.png and update component)
- **Style**: Dark, tech-focused, abstract

### 2. entrance.webp
- **Used in**: ZentryStory section
- **Description**: Main story/entrance image with 3D tilt effect
- **Recommended Size**: 1200x800 or similar
- **Format**: WebP (or use .jpg/.png and update component)
- **Style**: Dramatic, entrance/gateway themed, futuristic

### 3. contact-1.webp
- **Used in**: ZentryContact section (left side)
- **Description**: Decorative image for contact section
- **Recommended Size**: 400x800 (vertical/portrait)
- **Format**: WebP (or use .jpg/.png and update component)
- **Style**: Abstract, tech-themed

### 4. contact-2.webp
- **Used in**: ZentryContact section (right side)
- **Description**: Decorative image for contact section
- **Recommended Size**: 400x600
- **Format**: WebP (or use .jpg/.png and update component)
- **Style**: Abstract, tech-themed

## Quick Start:

### Option 1: Use Placeholder Images
You can temporarily use solid color placeholders by creating simple images or using online tools.

### Option 2: Stock Image Sources
- [Unsplash](https://unsplash.com/) - Free high-quality images
- [Pexels](https://www.pexels.com/) - Free stock photos
- [Pixabay](https://pixabay.com/) - Free images

### Search Terms:
- "abstract technology"
- "futuristic background"
- "digital art"
- "cyberpunk"
- "dark tech"
- "portal entrance"
- "gateway"

## Converting to WebP:

### Using online tools:
- [CloudConvert](https://cloudconvert.com/jpg-to-webp)
- [Squoosh](https://squoosh.app/)

### Using command line (if you have cwebp installed):
```bash
cwebp input.jpg -o output.webp -q 80
```

## Note:
If you want to use JPG or PNG instead of WebP, simply update the image src in the components:
- ZentryAbout.tsx (line 48)
- ZentryStory.tsx (line 45)
- ZentryContact.tsx (lines 22, 31)
