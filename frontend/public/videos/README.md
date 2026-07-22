# Video Files for Zentry Sections

This directory should contain video files for the Zentry sections.

## Hero Section Videos (Required):
1. `nexorith-1.mp4` - Main background video (loops automatically)
2. `nexorith-2.mp4` - Second transition video
3. `nexorith-3.mp4` - Third transition video
4. `nexorith-4.mp4` - Fourth transition video

## Features Section Videos (Required):
5. `feature-1.mp4` - Web Development demo
6. `feature-2.mp4` - AI Integration demo
7. `feature-3.mp4` - Mobile Apps demo
8. `feature-4.mp4` - Cloud Solutions demo
9. `feature-5.mp4` - Additional feature video

## Video Specifications:
- **Format**: MP4 (H.264 codec recommended)
- **Aspect Ratio**: 16:9 or similar landscape format
- **Resolution**: 1920x1080 or higher recommended
- **Duration**: 5-15 seconds (will loop automatically)
- **File Size**: Optimize for web (under 5MB per video recommended)

## Usage:
- **Hero videos (1-4)**: Cycle when user clicks on the mini preview
- **Feature videos (1-4)**: Display when hovering/clicking feature cards
- Main video plays as background with clip-path animation on scroll
- Videos should be visually cohesive with your brand (dark, modern, tech-focused)

## Recommendations:
- Use abstract tech animations, particles, or brand-related visuals
- Keep colors aligned with your dark theme (blacks, blues, cyans)
- Ensure videos are optimized/compressed for fast web loading
- Consider using tools like HandBrake or FFmpeg for compression

## Example Sources for Stock Videos:
- Pexels Videos (free): https://www.pexels.com/videos/
- Pixabay (free): https://pixabay.com/videos/
- Coverr (free): https://coverr.co/
- Unsplash (free): https://unsplash.com/

Search terms: "abstract tech", "digital particles", "futuristic background", "cyberpunk", "data visualization"

## Video Optimization:

Use **FFmpeg** to compress and optimize videos:
```bash
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -crf 23 -preset slow output.mp4
```
