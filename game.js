/**
 * Simple Reaction Game
 * A game where circles appear at random positions and the player must click them
 */

class ReactionGame {
    // Configuration constants
    // NOTE: CIRCLE_SIZE_PX must match the CSS .target-circle width/height (currently 60px)
    static CONFIG = {
        SPAWN_INTERVAL_MS: 1500,  // Time between circle spawns
        CIRCLE_SIZE_PX: 60        // Circle diameter in pixels
    };

    constructor() {
        try {
            // DOM elements
            this.gameArea = document.getElementById('game-area');
            this.targetCircle = document.getElementById('target-circle');
            this.scoreDisplay = document.getElementById('score');
            this.startBtn = document.getElementById('start-btn');
            this.resetBtn = document.getElementById('reset-btn');

            // Validate all required elements exist
            if (!this.gameArea || !this.targetCircle || !this.scoreDisplay || 
                !this.startBtn || !this.resetBtn) {
                throw new Error('Required DOM elements not found');
            }

            // Game state
            this.score = 0;
            this.isPlaying = false;
            this.gameInterval = null;
            this.circleSize = ReactionGame.CONFIG.CIRCLE_SIZE_PX
            
            // Bind methods to maintain context
            this.handleCircleClick = this.handleCircleClick.bind(this);
            this.startGame = this.startGame.bind(this);
            this.stopGame = this.stopGame.bind(this);
            this.resetScore = this.resetScore.bind(this);
            
            // Initialize event listeners
            this.initEventListeners();
        } catch (error) {
            this.handleError('Initialization error', error);
        }
    }

    /**
     * Initialize all event listeners
     */
    initEventListeners() {
        try {
            this.targetCircle.addEventListener('click', this.handleCircleClick);
            this.startBtn.addEventListener('click', this.startGame);
            this.resetBtn.addEventListener('click', this.resetScore);
        } catch (error) {
            this.handleError('Error setting up event listeners', error);
        }
    }

    /**
     * Start the game
     */
    startGame() {
        try {
            if (this.isPlaying) {
                this.stopGame();
                this.startBtn.textContent = 'Start Game';
                return;
            }

            this.isPlaying = true;
            this.startBtn.textContent = 'Stop Game';
            this.spawnCircle();
            
            // Spawn new circles at configured intervals
            this.gameInterval = setInterval(() => {
                if (this.isPlaying) {
                    this.spawnCircle();
                }
            }, ReactionGame.CONFIG.SPAWN_INTERVAL_MS);
        } catch (error) {
            this.handleError('Error starting game', error);
            this.stopGame();
        }
    }

    /**
     * Stop the game
     */
    stopGame() {
        try {
            this.isPlaying = false;
            if (this.gameInterval) {
                clearInterval(this.gameInterval);
                this.gameInterval = null;
            }
            this.targetCircle.classList.add('hidden');
        } catch (error) {
            this.handleError('Error stopping game', error);
        }
    }

    /**
     * Spawn a circle at a random position
     */
    spawnCircle() {
        try {
            if (!this.gameArea) {
                throw new Error('Game area not found');
            }

            // Get game area dimensions
            const areaRect = this.gameArea.getBoundingClientRect();
            const maxX = areaRect.width - this.circleSize;
            const maxY = areaRect.height - this.circleSize;

            // Validate dimensions
            if (maxX < 0 || maxY < 0) {
                throw new Error('Game area too small for circle');
            }

            // Calculate random position
            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);

            // Position the circle
            this.targetCircle.style.left = `${randomX}px`;
            this.targetCircle.style.top = `${randomY}px`;
            this.targetCircle.classList.remove('hidden');
        } catch (error) {
            this.handleError('Error spawning circle', error);
        }
    }

    /**
     * Handle circle click event
     */
    handleCircleClick() {
        try {
            if (!this.isPlaying) {
                return;
            }

            // Increment score
            this.score++;
            this.updateScore();

            // Spawn new circle immediately
            this.spawnCircle();
        } catch (error) {
            this.handleError('Error handling click', error);
        }
    }

    /**
     * Update score display
     */
    updateScore() {
        try {
            if (!this.scoreDisplay) {
                throw new Error('Score display element not found');
            }
            this.scoreDisplay.textContent = this.score;
        } catch (error) {
            this.handleError('Error updating score', error);
        }
    }

    /**
     * Reset the score
     */
    resetScore() {
        try {
            this.score = 0;
            this.updateScore();
        } catch (error) {
            this.handleError('Error resetting score', error);
        }
    }

    /**
     * Handle errors consistently
     * @param {string} message - Error message
     * @param {Error} error - Error object
     */
    handleError(message, error) {
        console.error(`${message}:`, error);
        // In a production environment, you might want to:
        // - Send error to logging service
        // - Display user-friendly error message
        // - Attempt recovery
    }
}

// Initialize game when DOM is ready
try {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.game = new ReactionGame();
        });
    } else {
        window.game = new ReactionGame();
    }
} catch (error) {
    console.error('Failed to initialize game:', error);
}
