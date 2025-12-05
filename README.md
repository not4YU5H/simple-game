# Simple Reaction Game

A fast and simple reaction game where circles appear at random positions on the screen. Click them to increase your score!

## Features

- 🎯 Red circles appear at random positions
- 👆 Click circles to increase your score
- 🎮 Start/Stop game controls
- 🔄 Reset score functionality
- 📱 Mobile responsive design
- ✨ Clean, modern UI with smooth animations
- 🛡️ Proper error handling

## How to Play

1. Open `index.html` in a web browser
2. Click the "Start Game" button
3. Click on the red circles as they appear
4. Your score increases with each click
5. Click "Stop Game" to pause
6. Click "Reset Score" to start over

## Technical Details

- **HTML5** for structure
- **CSS3** for styling with gradients and animations
- **Vanilla JavaScript** with object-oriented design
- No external dependencies required
- Comprehensive error handling with try-catch blocks
- Configuration constants for easy customization

## Customization

You can adjust game parameters in `game.js`:

```javascript
static CONFIG = {
    SPAWN_INTERVAL_MS: 1500,  // Time between circle spawns
    CIRCLE_SIZE_PX: 60        // Circle diameter in pixels
};
```

## Browser Compatibility

Works in all modern browsers that support ES6:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

Open source - feel free to use and modify!