# SwipeMaster

A minimalist, addictive color-matching game for mobile and desktop. Match the ball's color with the correct border by swiping or using arrow keys!

## About

SwipeMaster is a simple yet engaging mobile-first game that tests your reflexes and color recognition. Built with jQuery Mobile and optimized for touch devices, it provides smooth animations and responsive gameplay across all platforms.

## How to Play

1. A colored ball appears in the center of the game board
2. The board is surrounded by four colored borders: **Red** (top), **Blue** (right), **Yellow** (bottom), and **Green** (left)
3. Swipe the ball (or use arrow keys) towards the border that matches the ball's color
4. If you match correctly, the ball bounces back with a new color and the board rotates randomly
5. If you swipe to the wrong color, the ball simply bounces back without progressing

### Controls

- **Mobile/Tablet**: Swipe in any direction (up, down, left, right)
- **Desktop**: Use arrow keys (↑ ↓ ← →)

## Features

- Responsive design that adapts to any screen size
- Smooth, physics-based ball animations
- Touch-optimized for mobile devices
- Random board rotations to keep gameplay challenging
- Clean, minimalist interface with vibrant colors
- Works offline once loaded

## Demo

**Play now:** https://daromaj.github.io/SwipeMaster/

Or run locally by opening `index.html` in your browser or deploying to any web server.

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/SwipeMaster.git

# Navigate to the directory
cd SwipeMaster

# Open in browser (or use a local server)
open index.html
```

Or use a simple HTTP server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server installed)
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Animations and responsive design
- **JavaScript/jQuery** - Game logic and interactions
- **jQuery Mobile** - Touch event handling and mobile optimization
- **HTML5 Boilerplate** - Project foundation
- **Modernizr** - Feature detection

### Dependencies

- jQuery 1.11.3
- jQuery Mobile 1.4.5
- Modernizr 2.8.3

All dependencies can be loaded from CDN or served locally (included in the repository).

## Browser Compatibility

SwipeMaster works on:

- Modern mobile browsers (iOS Safari, Chrome, Firefox)
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Tablets and touch-enabled devices

**Note**: IE8 and older are not supported. Users will see an upgrade prompt.

## Project Structure

```
SwipeMaster/
├── index.html              # Main game page
├── css/
│   ├── main.css           # Custom styles and game board design
│   └── normalize.css      # CSS reset
├── js/
│   ├── main.js            # Core game logic
│   ├── plugins.js         # Custom swipe detection & rotation plugins
│   ├── mobile_config.js   # jQuery Mobile configuration
│   └── vendor/            # Third-party libraries
├── 404.html               # Custom error page
├── robots.txt             # Search engine configuration
├── crossdomain.xml        # Cross-domain policy
└── *.png, *.ico           # Favicons and touch icons
```

## Game Mechanics

### Ball Animation

The ball uses CSS animations to simulate realistic bouncing physics:
- Stretches horizontally when moving left/right
- Stretches vertically when moving up/down
- Smooth easing for natural motion
- Hardware-accelerated transforms for performance

### Board Rotation

After each successful match:
- The board rotates by 90° or 180° (random)
- Color positions update accordingly
- Rotation is smooth and animated

### Color Scheme

- **Red**: `rgb(234, 6, 0)` - Top border
- **Blue**: `rgb(54, 18, 161)` - Right border
- **Yellow**: `rgb(255, 213, 0)` - Bottom border
- **Green**: `rgb(0, 199, 13)` - Left border

## Customization

### Adjusting Difficulty

Edit `js/main.js` to modify:

- `ballSize` - Size of the ball (default: 40px)
- `boardSize` - Size of the game board (calculated from screen size)
- `borderWidth` - Width of colored borders (default: 30px)
- Animation duration in `animBall()` function

### Changing Colors

Modify the `colors` array in `js/main.js`:

```javascript
var colors = ["rgb(234, 6, 0)", "rgb(54, 18, 161)", "rgb(255, 213, 0)", "rgb(0, 199, 13)"];
```

## Development

The codebase is well-structured and easy to modify:

- Game logic is contained in `js/main.js`
- Custom jQuery plugins are in `js/plugins.js`
- Styles can be adjusted in `css/main.css`

### Key Functions

- `screenSetup()` - Initializes game board dimensions
- `setBallColor()` - Randomly assigns a color to the ball
- `rotateBoard()` - Rotates the board and shifts colors
- `animBall(dir)` - Handles ball animation and collision detection
- `animateRotate()` - Custom jQuery plugin for smooth rotations

## License

This project is built on HTML5 Boilerplate and uses the MIT License.

Copyright (c) HTML5 Boilerplate

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Credits

- Built with [HTML5 Boilerplate](https://html5boilerplate.com/)
- [jQuery](https://jquery.com/) and [jQuery Mobile](https://jquerymobile.com/)
- Custom swipe detection for vertical gestures
- Rotation animation plugin

## Contributing

Feel free to submit issues and enhancement requests! This is a fun project that can be extended with:

- Score tracking
- Timer/countdown mode
- Difficulty levels
- Sound effects
- High score leaderboard
- Power-ups and special balls

---

Built with ❤️ for mobile gaming
