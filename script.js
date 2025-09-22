// Theme switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set default theme
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'dark');
    }
    
    // Apply saved theme
    const savedTheme = localStorage.getItem('theme');
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeDropdownText(savedTheme);
    
    // Sound test buttons have been removed as per user request
    
    // Theme dropdown functionality
    const themeDropdownBtn = document.querySelector('.theme-dropdown-btn');
    const themeDropdownContent = document.querySelector('.theme-dropdown-content');
    
    themeDropdownBtn.addEventListener('click', function() {
        playSound('button-hover'); // Play sound on dropdown open
        themeDropdownContent.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!themeDropdownBtn.contains(event.target) && !themeDropdownContent.contains(event.target)) {
            themeDropdownContent.classList.remove('show');
        }
    });
    
    // Theme options event listeners
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        // Add hover sound
        option.addEventListener('mouseenter', function() {
            playSound('button-hover');
        });
        
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            updateThemeDropdownText(theme);
            themeDropdownContent.classList.remove('show');
            
            // Play theme change sound
            playSound('theme-change');
            
            // Recreate background animations for the new theme
            recreateBackgroundAnimations();
        });
    });
    
    // Folder icons event listeners - only on click, with precise detection
    const folderIcons = document.querySelectorAll('.folder-icon:not(.secret-folder)');
    folderIcons.forEach(icon => {
        // Remove any existing event listeners
        const newIcon = icon.cloneNode(true);
        icon.parentNode.replaceChild(newIcon, icon);
        
        // Add hover sound
        const iconImage = newIcon.querySelector('.icon-image');
        iconImage.addEventListener('mouseenter', function() {
            playSound('button-hover');
        });
        
        // Add click event listener only on the icon image
        iconImage.addEventListener('click', function(e) {
            // Ensure the click is directly on the icon image
            const folder = newIcon.getAttribute('data-folder');
            openWindow(folder);
            
            // Play folder open sound
            playSound('folder-open');
        });
    });
    
    // Initialize secret folder behavior
    initSecretFolder();
    
    // Create background animations
    createBackgroundAnimations();
    
    // Add event listener for cat button (will be added dynamically when About window opens)
    document.addEventListener('click', function(e) {
        if (e.target.id === 'cat-button' || e.target.closest('#cat-button')) {
            openCatSecretFolder();
        }
    });
});

// Update theme dropdown text and icon
function updateThemeDropdownText(theme) {
    const themeNameMap = {
        'dark': 'Dark Mode',
        'sakura': 'Sakura Mode',
        'matcha': 'Matcha Mode',
        'coffee': 'Coffee Mode'
    };
    
    const themeIconMap = {
        'dark': '🌙',
        'sakura': '🌸',
        'matcha': '🍵',
        'coffee': '☕'
    };
    
    const themeDropdownBtn = document.querySelector('.theme-dropdown-btn');
    const themeName = themeNameMap[theme] || 'Dark Mode';
    const themeIcon = themeIconMap[theme] || '🌙';
    
    themeDropdownBtn.querySelector('.theme-name').textContent = themeName;
    themeDropdownBtn.querySelector('.theme-icon').textContent = themeIcon;
}

// HOWLER.JS Sound Effects
let soundEffects = {};

function initSounds() {
    // Initialize sound effects
    soundEffects['folder-open'] = new Howl({
        src: ['https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3'],
        volume: 0.5,
        onload: function() {
            console.log('Folder open sound loaded');
        },
        onloaderror: function() {
            console.log('Error loading folder open sound');
        }
    });
    
    soundEffects['folder-close'] = new Howl({
        src: ['https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3'],
        volume: 0.3,
        onload: function() {
            console.log('Folder close sound loaded');
        },
        onloaderror: function() {
            console.log('Error loading folder close sound');
        }
    });
    
    soundEffects['theme-change'] = new Howl({
        src: ['https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3'],
        volume: 0.5,
        onload: function() {
            console.log('Theme change sound loaded');
        },
        onloaderror: function() {
            console.log('Error loading theme change sound');
        }
    });
    
    soundEffects['secret-found'] = new Howl({
        src: ['https://assets.mixkit.co/sfx/preview/mixkit-game-ball-tap-2073.mp3'],
        volume: 0.7,
        onload: function() {
            console.log('Secret found sound loaded');
        },
        onloaderror: function() {
            console.log('Error loading secret found sound');
        }
    });
    
    soundEffects['window-pop'] = new Howl({
        src: ['https://assets.mixkit.co/sfx/preview/mixkit-cartoon-pop-up-1694.mp3'],
        volume: 0.4,
        onload: function() {
            console.log('Window pop sound loaded');
        },
        onloaderror: function() {
            console.log('Error loading window pop sound');
        }
    });
    
    soundEffects['button-hover'] = new Howl({
        src: ['https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3'],
        volume: 0.2,
        onload: function() {
            console.log('Button hover sound loaded');
        },
        onloaderror: function() {
            console.log('Error loading button hover sound');
        }
    });
    
    soundEffects['button-click'] = new Howl({
        src: ['https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3'],
        volume: 0.5,
        onload: function() {
            console.log('Button click sound loaded');
        },
        onloaderror: function() {
            console.log('Error loading button click sound');
        }
    });
    
    soundEffects['window-hover'] = new Howl({
        src: ['https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3'],
        volume: 0.1,
        onload: function() {
            console.log('Window hover sound loaded');
        },
        onloaderror: function() {
            console.log('Error loading window hover sound');
        }
    });
    
    soundEffects['window-focus'] = new Howl({
        src: ['https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3'],
        volume: 0.3,
        onload: function() {
            console.log('Window focus sound loaded');
        },
        onloaderror: function() {
            console.log('Error loading window focus sound');
        }
    });
    
    // Horror sound effect for About folder
    soundEffects['horror-ambient'] = new Howl({
        src: ['https://assets.mixkit.co/sfx/preview/mixkit-horror-impact-779.mp3'],
        volume: 0.3,
        loop: true,
        onload: function() {
            console.log('Horror ambient sound loaded');
        },
        onloaderror: function() {
            console.log('Error loading horror ambient sound');
        }
    });
    
    console.log('All sounds initialized');
}

// Play sound function
function playSound(soundName) {
    if (soundEffects[soundName]) {
        // Debug: Log when a sound is played
        console.log('Playing sound:', soundName);
        console.log('Sound object:', soundEffects[soundName]);
        
        // Check if sound is loaded
        if (soundEffects[soundName].state() === 'loaded') {
            console.log('Sound is loaded, playing...');
            try {
                soundEffects[soundName].play();
            } catch (e) {
                console.log('Error playing sound:', e);
                // Fallback: Try to play with Web Audio API directly
                fallbackPlaySound(soundName);
            }
        } else {
            console.log('Sound not yet loaded, state:', soundEffects[soundName].state());
            // Try to load and play
            soundEffects[soundName].once('load', function() {
                console.log('Sound loaded, now playing');
                try {
                    soundEffects[soundName].play();
                } catch (e) {
                    console.log('Error playing sound:', e);
                    // Fallback: Try to play with Web Audio API directly
                    fallbackPlaySound(soundName);
                }
            });
            // If loading failed, try to reload
            soundEffects[soundName].once('loaderror', function() {
                console.log('Sound load error, trying to reload');
                soundEffects[soundName].unload();
                soundEffects[soundName].load();
            });
        }
    } else {
        console.log('Sound not found:', soundName);
    }
}

// Fallback function to play sounds using Web Audio API directly
function fallbackPlaySound(soundName) {
    console.log('Using fallback sound method for:', soundName);
    
    // Simple beep as fallback
    try {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        
        oscillator.type = 'square';
        oscillator.frequency.value = 440; // A note
        gainNode.gain.value = 0.1;
        
        oscillator.start();
        oscillator.stop(context.currentTime + 0.1); // 100ms beep
        
        console.log('Fallback sound played');
    } catch (e) {
        console.log('Error with fallback sound:', e);
    }
}

// Initialize sounds when Howler is ready
if (typeof Howl !== 'undefined') {
    initSounds();
} else {
    // Fallback if Howler is not loaded
    window.addEventListener('load', function() {
        if (typeof Howl !== 'undefined') {
            initSounds();
        }
    });
}

// Store references to minimized windows
const minimizedWindows = new Map();

// Window functionality
function openWindow(contentId) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay active';
    document.body.appendChild(overlay);
    
    // Create window
    const window = document.createElement('div');
    window.className = 'window active';
    window.setAttribute('data-window-id', contentId);
    
    // Window header
    const windowHeader = document.createElement('div');
    windowHeader.className = 'window-header';
    
    // Window title based on content
    const title = document.createElement('div');
    title.textContent = getWindowTitle(contentId);
    
    // Window controls
    const windowControls = document.createElement('div');
    windowControls.className = 'window-controls';
    
    // Minimize button (will toggle between minimize and restore)
    const minimizeBtn = document.createElement('button');
    minimizeBtn.className = 'window-btn minimize-btn';
    minimizeBtn.innerHTML = '&#8211;'; // Minus sign
    
    // Add hover sound
    minimizeBtn.addEventListener('mouseenter', function() {
        playSound('button-hover');
    });
    
    minimizeBtn.addEventListener('click', function() {
        playSound('button-click');
        toggleMinimizeWindow(window, contentId);
    });
    
    // Maximize button
    const maximizeBtn = document.createElement('button');
    maximizeBtn.className = 'window-btn maximize-btn';
    maximizeBtn.innerHTML = '&#9723;'; // Square
    
    // Add hover sound
    maximizeBtn.addEventListener('mouseenter', function() {
        playSound('button-hover');
    });
    
    maximizeBtn.addEventListener('click', function() {
        playSound('button-click');
        maximizeWindow(window);
    });
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'window-btn close-btn';
    closeBtn.innerHTML = '&times;'; // Times symbol
    
    // Add hover sound
    closeBtn.addEventListener('mouseenter', function() {
        playSound('button-hover');
    });
    
    closeBtn.addEventListener('click', function() {
        playSound('button-click');
        // Stop horror sound when closing About window
        if (contentId === 'about') {
            if (soundEffects['horror-ambient']) {
                soundEffects['horror-ambient'].stop();
            }
        }
        closeWindow(window, overlay);
    });
    
    windowControls.appendChild(minimizeBtn);
    windowControls.appendChild(maximizeBtn);
    windowControls.appendChild(closeBtn);
    
    windowHeader.appendChild(title);
    windowHeader.appendChild(windowControls);
    
    // Window content
    const windowContent = document.createElement('div');
    windowContent.className = 'window-content';
        
    // Apply themes to specific windows
    // Removed pixel styling for About folder as requested
    // Removed retro styling for Contact folder as requested
    if (contentId === 'contact') {
        // Retro styling removed
    }
        
    windowContent.innerHTML = getWindowContent(contentId);
    
    window.appendChild(windowHeader);
    window.appendChild(windowContent);
    
    document.body.appendChild(window);
    
    // Add dragging functionality
    // Use a small delay to ensure the window is fully rendered before making it draggable
    // Special handling for About folder to ensure proper sizing
    if (contentId === 'about') {
        setTimeout(() => {
            makeWindowDraggable(window, windowHeader);
            // Add horror effects after the window is created
            createCreepyCrawlies();
            enhanceHorrorExperience(); // Add enhanced horror effects
            
            // Play horror ambient sound
            playSound('horror-ambient');
            
            // Add special hover effect for horror elements
            const horrorElements = window.querySelectorAll('.horror-skill-item, .horror-cat-button-below, .horror-image');
            horrorElements.forEach(element => {
                element.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.05)';
                    playSound('button-hover');
                });
                
                element.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                });
            });
        }, 150);
    } else if (contentId === 'home') {
        setTimeout(() => {
            makeWindowDraggable(window, windowHeader);
            // Add cozy effects after the window is created
            createCozyParticles();
            
            // Add click functionality to cozy buttons
            const projectsButton = window.querySelector('.projects-button');
            const aboutButton = window.querySelector('.about-button');
            const socialButton = window.querySelector('.social-button');
            
            if (projectsButton) {
                projectsButton.addEventListener('click', function() {
                    playSound('button-click');
                    // Close current window and open Projects folder
                    const overlay = window.previousElementSibling;
                    closeWindow(window, overlay);
                    setTimeout(() => openWindow('projects'), 300);
                });
            }
            
            if (aboutButton) {
                aboutButton.addEventListener('click', function() {
                    playSound('button-click');
                    // Close current window and open About folder
                    const overlay = window.previousElementSibling;
                    closeWindow(window, overlay);
                    setTimeout(() => openWindow('about'), 300);
                });
            }
            
            if (socialButton) {
                socialButton.addEventListener('click', function() {
                    playSound('button-click');
                    // Close current window and open Social folder
                    const overlay = window.previousElementSibling;
                    closeWindow(window, overlay);
                    setTimeout(() => openWindow('social'), 300);
                });
            }
            
            // Add hover effects to cozy buttons
            const cozyButtons = window.querySelectorAll('.cozy-button');
            cozyButtons.forEach(button => {
                button.addEventListener('mouseenter', function() {
                    playSound('button-hover');
                });
            });
        }, 150);
    } else {
        makeWindowDraggable(window, windowHeader);
    }
    
    // Add hover and click sounds for the window
    // Use capture phase to ensure events are caught even with complex content
    window.addEventListener('mouseenter', function() {
        playSound('window-hover');
    }, true);
    
    window.addEventListener('click', function() {
        playSound('window-focus');
    }, true);
    
    // Play window open sound
    playSound('window-pop');
    
    // Test: Add a simple click handler to the window header for sound testing
    windowHeader.addEventListener('click', function() {
        playSound('button-click');
    });
    
    // Close window when clicking overlay
    overlay.addEventListener('click', function() {
        // Stop horror sound when closing About window
        if (contentId === 'about') {
            if (soundEffects['horror-ambient']) {
                soundEffects['horror-ambient'].stop();
            }
        }
        closeWindow(window, overlay);
        playSound('folder-close'); // Play folder close sound
    });
    
    // Close window with Escape key
    function handleEscapeKey(event) {
        if (event.key === 'Escape') {
            // Stop horror sound when closing About window
            if (contentId === 'about') {
                if (soundEffects['horror-ambient']) {
                    soundEffects['horror-ambient'].stop();
                }
            }
            closeWindow(window, overlay);
            playSound('folder-close'); // Play folder close sound
            document.removeEventListener('keydown', handleEscapeKey);
        }
    }
    
    document.addEventListener('keydown', handleEscapeKey);
    
    // Special handling for About window to initialize cat button
    if (contentId === 'about') {
        // Use setTimeout to ensure the content is rendered
        setTimeout(() => {
            const catButton = document.getElementById('cat-button');
            if (catButton) {
                // Remove any existing event listeners to prevent duplicates
                const newCatButton = catButton.cloneNode(true);
                catButton.parentNode.replaceChild(newCatButton, catButton);
                
                // Add click event listener
                newCatButton.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent event from bubbling to window
                    openCatSecretFolder();
                });
            }
        }, 100);
    }
}

// Add this function to create cozy particle effects for the Home folder
function createCozyParticles() {
    const container = document.querySelector('.cozy-home-container');
    if (!container) return;
    
    // Create multiple cozy particles
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'cozy-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';
            particle.style.width = (Math.random() * 6 + 4) + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = ['#d4a76a', '#dda0dd', '#87ceeb', '#ff7f50'][Math.floor(Math.random() * 4)];
            container.appendChild(particle);
            
            // Remove particle after animation completes
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 13000); // 8s animation + 5s max delay
        }, i * 300); // Stagger particle creation
    }
}

// Ensure the home folder content is properly defined
const homeContent = `
    <div class="cozy-home-container">
        <div class="cozy-header">
            <h2 class="cozy-title">🏡 Welcome Home! 🏡</h2>
            <div class="cozy-subtitle">Get comfy and explore my cozy corner of the web</div>
        </div>
        
        <div class="cozy-content">
            <div class="cozy-image-container">
                <img src="images/cozy.webp" alt="Cozy Home" class="cozy-home-image" />
            </div>
            
            <div class="cozy-text">
                <p class="cozy-intro">Hello there! Welcome to my digital home where creativity and comfort meet. ☕</p>
                
                <p class="cozy-description">This is a warm, welcoming space where you can learn more about me and my projects. Grab a blanket, make yourself at home, and explore the different sections of my portfolio!</p>
                
                <div class="cozy-features-container">
                    <h3 class="cozy-features-title">✨ What You'll Find Here ✨</h3>
                    <ul class="cozy-features-list">
                        <li class="cozy-feature-item">📚 My Projects & Creations</li>
                        <li class="cozy-feature-item">👨‍💻 About Me & My Skills</li>
                        <li class="cozy-feature-item">🌐 Social Media Links</li>
                        <li class="cozy-feature-item">📧 Contact Information</li>
                        <li class="cozy-feature-item">🎉 Fun Secrets to Discover</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="cozy-footer">
            <div class="cozy-buttons-container">
                <button class="cozy-button projects-button">
                    <span>🎨 View Projects</span>
                </button>
                <button class="cozy-button about-button">
                    <span>📖 Learn About Me</span>
                </button>
                <button class="cozy-button social-button">
                    <span>💬 Connect With Me</span>
                </button>
            </div>
            
            <div class="cozy-quote">
                <p>"Home is where the heart is, and my heart is in creating beautiful digital experiences!"</p>
            </div>
        </div>
        
        <!-- Cozy decorative elements -->
        <div class="cozy-decoration decor-1">☕</div>
        <div class="cozy-decoration decor-2">🧸</div>
        <div class="cozy-decoration decor-3">📖</div>
        <div class="cozy-decoration decor-4">🍪</div>
    </div>
`;

function getWindowTitle(contentId) {
    const titles = {
        'home': 'Home Directory',
        'about': 'About',
        'projects': 'Projects',
        'social': 'SOCIAL NETWORKS',
        'contact': 'Contact',
        'secret': 'Secret Folder'
    };
    return titles[contentId] || 'Window';
}

function getWindowContent(contentId) {
    const contents = {
        'home': homeContent,
        'about': `
            <div class="horror-container">
                <div class="horror-header">
                    <h2 class="horror-title">👹 WELCOME TO MY NIGHTMARE 👹</h2>
                    <div class="horror-subtitle">Proceed with caution... if you dare</div>
                </div>
                
                <div class="horror-content">
                    <div class="horror-image-container">
                        <img src="images/Welcome.webp" alt="Welcome" class="horror-image" />
                        <div class="horror-eyes">
                            <div class="eye left-eye"></div>
                            <div class="eye right-eye"></div>
                        </div>
                        <!-- Cat image placed under Welcome image -->
                        <div class="horror-cat-under-image">
                            <button id="cat-button" class="horror-cat-button-below">
                                <img src="images/Cat1.webp" alt="Cat" class="horror-cat-image-below" />
                            </button>
                        </div>
                    </div>
                    
                    <div class="horror-text">
                        <p class="horror-intro">Hello, brave visitor... I am a web developer who thrives in the darkness.</p>
                        
                        <p class="horror-description">My journey began in the shadows, where code becomes alive and websites whisper secrets. I specialize in creating experiences that will haunt your dreams... in a good way.</p>
                        
                        <div class="horror-skills-container">
                            <h3 class="horror-skills-title">💀 My Dark Arts 💀</h3>
                            <ul class="horror-skills-list">
                                <li class="horror-skill-item">HTML5 & CSS3 <span class="horror-skill-level">🌑🌑🌑🌑🌑</span></li>
                                <li class="horror-skill-item">JavaScript (ES6+) <span class="horror-skill-level">🌑🌑🌑🌑🌑</span></li>
                                <li class="horror-skill-item">React & Vue.js <span class="horror-skill-level">🌑🌑🌑🌑🌑</span></li>
                                <li class="horror-skill-item">Node.js <span class="horror-skill-level">🌑🌑🌑🌑🌑</span></li>
                                <li class="horror-skill-item">Responsive Design <span class="horror-skill-level">🌑🌑🌑🌑🌑</span></li>
                                <li class="horror-skill-item">UI/UX Design <span class="horror-skill-level">🌑🌑🌑🌑🌑</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="horror-footer">
                    <div class="horror-warning">
                        <p>⚠️ WARNING: Exiting this folder may result in temporary nightmares ⚠️</p>
                    </div>
                </div>
                
                <div class="horror-blood-drips">
                    <div class="blood-drip drip-1"></div>
                    <div class="blood-drip drip-2"></div>
                    <div class="blood-drip drip-3"></div>
                </div>
                
                <!-- Add creepy crawlies for extra horror effect -->
                <div class="horror-crawly crawly-1"></div>
                <div class="horror-crawly crawly-2"></div>
                <div class="horror-crawly crawly-3"></div>
            </div>
        `,
        'projects': `
            <div class="gaming-projects-container">
                <div class="gaming-header">
                    <h2 class="gaming-title">🎮 GAME DEVELOPMENT PORTFOLIO 🎮</h2>
                    <div class="gaming-subtitle">Level Up Your Experience - Explore My Game Projects</div>
                </div>
                
                <div class="gaming-grid">
                    <!-- Project 1 -->
                    <div class="gaming-card project-card-1">
                        <div class="gaming-card-inner">
                            <div class="gaming-card-front">
                                <div class="gaming-card-badge">NEW</div>
                                <h3 class="gaming-card-title">Grumpy Bird</h3>
                                <div class="gaming-card-image">
                                    <img src="images/Grumpy bird.webp" alt="Grumpy Bird" />
                                </div>
                                <div class="gaming-card-overlay">
                                    <div class="gaming-card-stats">
                                        <span class="stat">⭐ Unity</span>
                                        <span class="stat">💻 C#</span>
                                    </div>
                                </div>
                            </div>
                            <div class="gaming-card-back">
                                <h3>Grumpy Bird</h3>
                                <p>A complete Unity project for a Flappy Bird-style game with all assets and code included. Perfect for learning game development.</p>
                                <a href="https://draggonestudio.itch.io/grumpy-bird-untiy-full-project-free" target="_blank" class="gaming-download-btn">Download Project</a>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Project 2 -->
                    <div class="gaming-card project-card-2">
                        <div class="gaming-card-inner">
                            <div class="gaming-card-front">
                                <div class="gaming-card-badge hot">HOT</div>
                                <h3 class="gaming-card-title">Anime Wallpaper App</h3>
                                <div class="gaming-card-image">
                                    <img src="images/Android Wallpaper.webp" alt="Anime Wallpaper App" />
                                </div>
                                <div class="gaming-card-overlay">
                                    <div class="gaming-card-stats">
                                        <span class="stat">📱 Android</span>
                                        <span class="stat">⭐ Unity</span>
                                        <span class="stat">💻 C#</span>
                                    </div>
                                </div>
                            </div>
                            <div class="gaming-card-back">
                                <h3>Anime Wallpaper App</h3>
                                <p>A complete Android wallpaper application with anime themes. Includes both the APK file and the full Unity project for customization.</p>
                                <a href="https://draggonestudio.itch.io/anime-wallpaper-app-project" target="_blank" class="gaming-download-btn">Download Project</a>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Project 3 -->
                    <div class="gaming-card project-card-3">
                        <div class="gaming-card-inner">
                            <div class="gaming-card-front">
                                <div class="gaming-card-badge limited">LIMITED</div>
                                <h3 class="gaming-card-title">Horror Game Template</h3>
                                <div class="gaming-card-image">
                                    <img src="images/Horror game project.webp" alt="Horror Game Project" />
                                </div>
                                <div class="gaming-card-overlay">
                                <div class="gaming-card-stats">
                                        <span class="stat">👻 Horror</span>
                                        <span class="stat">⭐ Unity</span>
                                        <span class="stat">💻 C#</span>
                                    </div>
                                </div>
                            </div>
                            <div class="gaming-card-back">
                                <h3>Horror Game Template</h3>
                                <p>A complete Unity horror game template with atmospheric lighting, sound effects, and basic gameplay mechanics. Perfect for creating your own horror experience.</p>
                                <a href="https://draggonestudio.itch.io/horror-game-project-unity" target="_blank" class="gaming-download-btn">Download Project</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="gaming-footer">
                    <div class="gaming-level-bar">
                        <div class="gaming-level-progress" style="width: 75%"></div>
                    </div>
                    <div class="gaming-footer-text">75% Completion - More Projects Coming Soon!</div>
                </div>
            </div>
        `,
        'social': `
            <div class="cyberpunk-window">
                <h2 style="text-align: center; font-family: 'Courier New', monospace; color: #00f3ff; text-shadow: 0 0 10px #00f3ff;">Social Media</h2>
                <div style="display: flex; flex-direction: column; align-items: center; margin-top: 20px; margin-bottom: 20px;">
                    <img src="images/Social.webp" alt="Social Media" style="width: 150px; height: 150px; margin-bottom: 20px; filter: drop-shadow(0 0 10px #00f3ff);">
                </div>
                <p style="text-align: center; color: #fff; margin-bottom: 20px;">Connect with me on various social platforms to stay updated with my latest projects and thoughts.</p>
                
                <div class="cyberpunk-grid">
                    <div class="cyberpunk-card">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 50px; height: 50px; margin-bottom: 10px; fill: #ff0000; filter: drop-shadow(0 0 5px #ff0000);">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                        </svg>
                        <h3>YouTube</h3>
                        <p>Check out my latest videos and tutorials.</p>
                        <button class="btn hologram" onclick="window.open('https://www.youtube.com/@draggonestudio', '_blank')">
                          <span data-text="Visit Channel">Visit Channel</span>
                          <div class="scan-line"></div>
                        </button>
                    </div>
                    
                    <div class="cyberpunk-card">
                        <img src="images/instagram.webp" alt="Instagram" style="width: 50px; height: 50px; margin-bottom: 10px; filter: drop-shadow(0 0 5px #e1306c);">
                        <h3>Instagram</h3>
                        <p>Follow me for behind-the-scenes content.</p>
                        <button class="btn hologram" onclick="window.open('https://www.instagram.com/draggonestudio/', '_blank')">
                          <span data-text="Visit Profile">Visit Profile</span>
                          <div class="scan-line"></div>
                        </button>
                    </div>
                    
                    <div class="cyberpunk-card">
                        <img src="images/x.webp" alt="X (Twitter)" style="width: 50px; height: 50px; margin-bottom: 10px; filter: drop-shadow(0 0 5px #000000);">
                        <h3>X (Twitter)</h3>
                        <p>Follow me for daily tech updates.</p>
                        <button class="btn hologram" onclick="window.open('https://x.com/DraggoneStudio', '_blank')">
                          <span data-text="Visit Profile">Visit Profile</span>
                          <div class="scan-line"></div>
                        </button>
                    </div>
                    
                    <div class="cyberpunk-card">
                        <img src="images/patreon.webp" alt="Patreon" style="width: 50px; height: 50px; margin-bottom: 10px; filter: drop-shadow(0 0 5px #ff424d);">
                        <h3>Patreon</h3>
                        <p>Support my work on Patreon.</p>
                        <button class="btn hologram" onclick="window.open('https://www.patreon.com/c/draggonestudio', '_blank')">
                          <span data-text="Support Me">Support Me</span>
                          <div class="scan-line"></div>
                        </button>
                    </div>
                    
                    <div class="cyberpunk-card">
                        <img src="images/itch.webp" alt="Itch.io" style="width: 50px; height: 50px; margin-bottom: 10px; filter: drop-shadow(0 0 5px #fa5c5c);">
                        <h3>Itch.io</h3>
                        <p>Check out my games on Itch.io.</p>
                        <button class="btn hologram" onclick="window.open('https://draggonestudio.itch.io/', '_blank')">
                          <span data-text="Visit Page">Visit Page</span>
                          <div class="scan-line"></div>
                        </button>
                    </div>
                    
                    <div class="cyberpunk-card">
                        <img src="images/paypal.webp" alt="PayPal" style="width: 50px; height: 50px; margin-bottom: 10px; filter: drop-shadow(0 0 5px #003087);">
                        <h3>PayPal</h3>
                        <p>Send a one-time donation via PayPal.</p>
                        <button class="btn hologram" onclick="window.open('https://paypal.me/Ainsley142', '_blank')">
                          <span data-text="Donate">Donate</span>
                          <div class="scan-line"></div>
                        </button>
                    </div>
                </div>
            </div>
        `,
        'contact': `
            <div class="vintage-email-window">
                <h2 style="text-align: center; font-family: 'Courier New', monospace; color: #8B4513; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">📧 Send a Message 📧</h2>
                
                <div style="display: flex; justify-content: center; margin: 20px 0;">
                    <img src="images/Email.webp" alt="Email Icon" style="width: 120px; height: 120px; filter: sepia(50%); border: 3px dashed #8B4513; border-radius: 50%; padding: 10px;">
                </div>
                
                <div style="background: #f5f5dc; border: 2px solid #d2b48c; border-radius: 15px; padding: 20px; margin: 20px 0; box-shadow: 3px 3px 5px rgba(0,0,0,0.2);">
                    <p style="text-align: center; color: #5c3317; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.2rem;">Dear Friend,</p>
                    
                    <p style="color: #5c3317; font-family: 'Comic Sans MS', cursive, sans-serif; line-height: 1.6; margin: 15px 0;">
                        I'd love to hear from you! Whether you have a question, want to collaborate, or just want to say hello, 
                        feel free to drop me a line. I check my email regularly and will get back to you as soon as possible!
                    </p>
                    
                    <div style="text-align: center; margin: 25px 0;">
                        <div style="display: inline-block; background: #fff8dc; border: 2px dotted #8B4513; border-radius: 10px; padding: 15px; box-shadow: inset 0 0 5px rgba(0,0,0,0.1);">
                            <p style="font-size: 1.3rem; color: #8B4513; font-weight: bold; margin: 0; font-family: 'Courier New', monospace;">📧 hey@kerrico.site</p>
                        </div>
                    </div>
                    
                    <p style="text-align: center; color: #5c3317; font-family: 'Comic Sans MS', cursive, sans-serif; font-style: italic; margin: 15px 0;">
                        P.S. I usually respond within 24-48 hours 🕐
                    </p>
                </div>
                
                <div style="text-align: center; margin-top: 20px;">
                    <div style="display: inline-block; background: #8B4513; color: white; padding: 10px 20px; border-radius: 20px; font-family: 'Comic Sans MS', cursive, sans-serif; box-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                        💌 Looking forward to your message! 💌
                    </div>
                </div>
            </div>
        `,
        'secret': `
            <h2>Secret Folder</h2>
            <p>Congratulations! You found the secret folder. This is a special place where I keep some of my experimental projects and hidden gems.</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 20px;">
                <div style="padding: 15px; border-radius: 10px; background: rgba(0,0,0,0.05);">
                    <h3>Hidden Project #1</h3>
                    <p>A secret project that's not ready for public release yet.</p>
                </div>
                
                <div style="padding: 15px; border-radius: 10px; background: rgba(0,0,0,0.05);">
                    <h3>Hidden Project #2</h3>
                    <p>Another experimental project that showcases cutting-edge technology.</p>
                </div>
            </div>
            
            <p style="margin-top: 20px; text-align: center; font-style: italic;">Keep exploring to find more secrets!</p>
        `
    };
    return contents[contentId] || '<p>Content not found.</p>';
}

function closeWindow(window, overlay) {
    // Add closing animation
    window.style.animation = 'pop-out 0.3s ease-in-out forwards';
    
    // Remove elements after transition
    setTimeout(function() {
        if (window.parentNode) {
            window.parentNode.removeChild(window);
        }
        if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
    }, 300);
}

// Toggle function for minimizing/restoring windows
function toggleMinimizeWindow(window, contentId) {
    // Check if window is already minimized
    const isMinimized = window.style.height === '40px';
    
    if (isMinimized) {
        // Restore the window
        restoreWindow(contentId);
    } else {
        // Minimize the window
        minimizeWindow(window, contentId);
    }
}

function minimizeWindow(window, contentId) {
    // Store the window reference for restoration
    minimizedWindows.set(contentId, {
        window: window,
        originalStyles: {
            width: window.style.width || '80%',
            height: window.style.height || '80%',
            top: window.style.top || '50%',
            left: window.style.left || '50%',
            bottom: window.style.bottom || 'auto',
            right: window.style.right || 'auto',
            transform: window.style.transform || 'translate(-50%, -50%)'
        }
    });
    
    // Minimize the window with animation
    window.style.transition = 'all 0.3s ease';
    window.style.height = '40px';
    window.style.bottom = '0';
    window.style.top = 'auto';
    window.style.left = '20px';
    window.style.right = 'auto';
    window.style.width = '300px';
    window.style.transform = 'none';
    window.style.borderRadius = '10px 10px 0 0';
}

function maximizeWindow(window) {
    const isMaximized = window.style.width === 'calc(100% - 40px)' || window.style.width === '100%';
    
    if (isMaximized) {
        // Restore to normal size
        window.style.width = '80%';
        window.style.height = '80%';
        window.style.top = '50%';
        window.style.left = '50%';
        window.style.bottom = 'auto';
        window.style.right = 'auto';
        window.style.transform = 'translate(-50%, -50%)';
        window.style.borderRadius = '15px';
    } else {
        // Maximize
        window.style.width = 'calc(100% - 40px)';
        window.style.height = 'calc(100% - 40px)';
        window.style.top = '20px';
        window.style.left = '20px';
        window.style.bottom = '20px';
        window.style.right = '20px';
        window.style.transform = 'none';
        window.style.borderRadius = '0';
    }
}

// Function to restore minimized windows
function restoreWindow(contentId) {
    const windowData = minimizedWindows.get(contentId);
    if (windowData) {
        const { window, originalStyles } = windowData;
        
        // Restore original styles
        window.style.transition = 'all 0.3s ease';
        Object.keys(originalStyles).forEach(prop => {
            window.style[prop] = originalStyles[prop];
        });
        window.style.borderRadius = '15px';
        
        // Remove from minimized windows
        minimizedWindows.delete(contentId);
    }
}

// Add glow effect to buttons on hover and click
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        // Add glow on hover
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            playSound('button-hover');
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Add stronger glow on click
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
            playSound('button-click');
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // Add click event to minimized windows to restore them
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('window') && e.target.style.height === '40px') {
            const contentId = e.target.getAttribute('data-window-id');
            restoreWindow(contentId);
        }
    });

// Secret Folder - Evasive behavior with teleportation
let teleportCooldown = false;
let cornerStuckCount = 0;
const maxCornerStuckAttempts = 5;

function initSecretFolder() {
    const secretFolder = document.querySelector('.secret-folder');
    
    if (secretFolder) {
        // Position the secret folder randomly on page load
        positionSecretFolder();
        
        // Make the folder teleport when mouse approaches
        document.addEventListener('mousemove', function(e) {
            if (teleportCooldown) return;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const folderRect = secretFolder.getBoundingClientRect();
            const folderX = folderRect.left + folderRect.width / 2;
            const folderY = folderRect.top + folderRect.height / 2;
            
            // Calculate distance between mouse and folder center
            const distance = Math.sqrt(
                Math.pow(mouseX - folderX, 2) + 
                Math.pow(mouseY - folderY, 2)
            );
            
            // If mouse is close to the folder (within 200px), teleport it away
            if (distance < 200) {
                teleportSecretFolder(mouseX, mouseY);
                teleportCooldown = true;
                
                // Reset cooldown after 50ms for ultra-fast teleportation
                setTimeout(() => {
                    teleportCooldown = false;
                }, 50);
            }
        });
        
        // Play sound when secret folder is found
        secretFolder.addEventListener('click', function() {
            playSound('secret-found');
            openWindow('secret');
        });
    }
}

function positionSecretFolder() {
    const secretFolder = document.querySelector('.secret-folder');
    if (secretFolder) {
        // Position randomly within the viewport with margins
        const margin = 100;
        const maxX = window.innerWidth - margin - 80;
        const maxY = window.innerHeight - margin - 100;
        
        const randomX = margin + Math.floor(Math.random() * (maxX - margin));
        const randomY = margin + Math.floor(Math.random() * (maxY - margin));
        
        secretFolder.style.left = randomX + 'px';
        secretFolder.style.top = randomY + 'px';
        secretFolder.style.transition = 'left 0.05s, top 0.05s'; // Ultra-fast transition
    }
}

function teleportSecretFolder(mouseX, mouseY) {
    const secretFolder = document.querySelector('.secret-folder');
    if (!secretFolder) return;
    
    // Calculate direction vector from mouse to folder
    const folderRect = secretFolder.getBoundingClientRect();
    const folderX = folderRect.left + folderRect.width / 2;
    const folderY = folderRect.top + folderRect.height / 2;
    
    const dx = folderX - mouseX;
    const dy = folderY - mouseY;
    
    // Normalize the vector
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance === 0) return;
    
    const normalizedDx = dx / distance;
    const normalizedDy = dy / distance;
    
    // Teleport folder far away in the direction away from mouse
    const moveDistance = 400; // Even farther teleportation
    let newX = folderX + normalizedDx * moveDistance;
    let newY = folderY + normalizedDy * moveDistance;
    
    // Keep folder within viewport bounds with better edge handling
    const margin = 50;
    const maxX = window.innerWidth - margin - 80;
    const maxY = window.innerHeight - margin - 100;
    const minX = margin;
    const minY = margin;
    
    // Prevent getting stuck in corners
    if (newX <= minX || newX >= maxX || newY <= minY || newY >= maxY) {
        cornerStuckCount++;
        if (cornerStuckCount >= maxCornerStuckAttempts) {
            // If stuck in corner, reposition randomly
            positionSecretFolder();
            cornerStuckCount = 0;
            return;
        }
    } else {
        cornerStuckCount = 0; // Reset counter when not in corner
    }
    
    // Apply constraints with margin
    newX = Math.max(minX, Math.min(newX, maxX));
    newY = Math.max(minY, Math.min(newY, maxY));
    
    // Apply new position with ultra-fast transition
    secretFolder.style.left = newX + 'px';
    secretFolder.style.top = newY + 'px';
    secretFolder.style.transition = 'left 0.05s, top 0.05s'; // Ultra-fast transition
}

// Window dragging functionality
function makeWindowDraggable(windowElement, headerElement) {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    
    // Check if window is maximized
    function isWindowMaximized() {
        return windowElement.style.width === 'calc(100% - 40px)' || 
               windowElement.style.width === '100%' ||
               windowElement.style.borderRadius === '0';
    }
    
    headerElement.addEventListener('mousedown', dragStart);
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('mousemove', drag);
    
    function dragStart(e) {
        // Only allow dragging if window is not maximized
        if (isWindowMaximized()) return;
        
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        
        if (e.target === headerElement) {
            isDragging = true;
            windowElement.style.transition = 'none';
        }
    }
    
    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        
        isDragging = false;
        windowElement.style.transition = 'all 0.3s ease';
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            
            xOffset = currentX;
            yOffset = currentY;
            
            // Keep window within viewport bounds
            const windowRect = windowElement.getBoundingClientRect();
            const maxX = window.innerWidth - windowRect.width;
            const maxY = window.innerHeight - windowRect.height;
            
            // Apply constraints
            currentX = Math.max(0, Math.min(currentX, maxX));
            currentY = Math.max(0, Math.min(currentY, maxY));
            
            // Update window position
            windowElement.style.left = currentX + 'px';
            windowElement.style.top = currentY + 'px';
            windowElement.style.transform = 'none';
        }
    }
}

// Create background animations based on current theme
function createBackgroundAnimations() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme') || 'dark';
    
    // Clear ALL existing theme-specific elements to prevent overlap
    const allElements = document.querySelectorAll('.sakura-petal, .space-star, .coffee-static, .background-animal, .floating-star, .floating-element, .matcha-leaf, .coffee-bean, .car-animation-container, .floating-heart, .toast-catcher-game, .toast-game-button, .retro-rain-container, .retro-rain, .retro-lightning, .coffee-aquarium, .coffee-fish, .coffee-seaweed, .coffee-animated-background, .sakura-animated-background');
    allElements.forEach(el => el.remove());
    
    // Create theme-specific elements immediately (no delay)
    switch(currentTheme) {
        case 'dark':
            createDarkModeEffects();
            break;
        case 'sakura':
            createSakuraModeEffects();
            break;
        case 'matcha':
            createMatchaModeEffects();
            break;
        case 'coffee':
            createCoffeeModeEffects();
            break;
        default:
            // Default to dark mode if unknown theme
            createDarkModeEffects();
            break;
    }
}

// Create effects for Dark mode
function createDarkModeEffects() {
    // No background effects for dark mode
}

// Create effects for Sakura mode
function createSakuraModeEffects() {
    // Create sakura petals - REMOVED per user request
    // createSakuraPetals();
    
    // Create floating hearts animation - REMOVED per user request
    // createFloatingHearts();
    
    // Create retro rain background effect
    createRetroRain();
    
    // Create sakura & cozy theme animated background - REMOVED per user request
    // createSakuraAnimatedBackground();
}

// Create effects for Matcha mode
function createMatchaModeEffects() {
    // Create matcha leaves - REMOVED per user request
    // createMatchaLeaves();
    
    // Create car animation
    createCarAnimation();
}

// Create effects for Coffee mode
function createCoffeeModeEffects() {
    // Create coffee beans - REMOVED per user request
    // createCoffeeBeans();
    
    // Create Toast Catcher Game Button
    createToastGameButton();
    
    // Create shadow fish background effect - REMOVED per user request
    // createShadowFish();
    
    // Create coffee theme animated background
    createCoffeeAnimatedBackground();
}

// Store interval IDs for cleanup
let matchaIntervalId = null;
let coffeeIntervalId = null;

// Recreate background animations when theme changes
function recreateBackgroundAnimations() {
  // Clear ALL existing elements to prevent overlap
  const allElements = document.querySelectorAll('.sakura-petal, .space-star, .coffee-static, .background-animal, .matcha-leaf, .coffee-bean, .floating-star, .floating-element, .car-animation-container');
  allElements.forEach(el => el.remove());
  
  // Clear any existing intervals
  if (matchaIntervalId) {
    clearInterval(matchaIntervalId);
    matchaIntervalId = null;
  }
  if (coffeeIntervalId) {
    clearInterval(coffeeIntervalId);
    coffeeIntervalId = null;
  }
  
  // Create new elements with no delay
  setTimeout(() => {
    createBackgroundAnimations();
  }, 10);
}

// Create floating elements for Dark mode - removed as per user request
function createFloatingElements() {
    // Removed floating elements for dark mode
}

// Create sakura petals for Sakura mode
function createSakuraPetals() {
    const body = document.body;
    const petalCount = 20; // Further reduced for smoother animation
    
    // Remove any existing petals first
    const existingPetals = document.querySelectorAll('.sakura-petal');
    existingPetals.forEach(petal => petal.remove());
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('sakura-petal');
        
        // Random position
        const left = Math.random() * 100;
        petal.style.left = `${left}%`;
        
        // Random size
        const size = 6 + Math.random() * 10; // Smaller petals
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        
        // Random animation duration and delay
        const duration = 20 + Math.random() * 25; // Consistent longer duration
        const delay = Math.random() * 10; // Increased delay range for staggered effect
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${delay}s`;
        
        // Random rotation
        const rotation = Math.random() * 360;
        petal.style.transform = `rotate(${rotation}deg)`;
        
        body.appendChild(petal);
    }
}

// Create matcha leaves for Matcha mode
function createMatchaLeaves() {
    const body = document.body;
    
    // Remove any existing leaves first
    const existingLeaves = document.querySelectorAll('.matcha-leaf');
    existingLeaves.forEach(leaf => leaf.remove());
    
    // Create a continuous stream of leaves
    function createLeaf() {
        const leaf = document.createElement('div');
        leaf.classList.add('matcha-leaf');
        
        // Random position
        const left = Math.random() * 100;
        leaf.style.left = `${left}%`;
        
        // Random size
        const size = 10 + Math.random() * 15; // Slightly smaller leaves
        leaf.style.width = `${size}px`;
        leaf.style.height = `${size}px`;
        
        // Random animation duration
        const duration = 20 + Math.random() * 25; // Longer duration for smoother fall
        leaf.style.animationDuration = `${duration}s`;
        
        // No delay for immediate start
        leaf.style.animationDelay = '0s';
        
        // Random rotation
        const rotation = Math.random() * 360;
        leaf.style.transform = `rotate(${rotation}deg)`;
        
        body.appendChild(leaf);
        
        // Remove leaf after animation completes
        setTimeout(() => {
            if (leaf.parentNode) {
                leaf.parentNode.removeChild(leaf);
            }
        }, duration * 1000);
    }
    
    // Create initial batch of leaves
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createLeaf();
        }, Math.random() * 2000); // Stagger initial leaves
    }
    
    // Continue creating leaves at regular intervals
    matchaIntervalId = setInterval(() => {
        createLeaf();
    }, 800); // Create a new leaf every 800ms
}

// Create floating hearts for Sakura mode
function createFloatingHearts() {
    const body = document.body;
    const heartCount = 30; // Based on 30x1 grid from css-doodle example
    
    // Remove any existing floating hearts first
    const existingHearts = document.querySelectorAll('.floating-heart');
    existingHearts.forEach(heart => heart.remove());
    
    // Exact colors from css-doodle example
    const colors = ['#51eaea', '#fffde1', '#ff9d76', '#FB3569'];
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        
        // Random position across screen
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        heart.style.left = `${left}%`;
        heart.style.top = `${top}%`;
        
        // Random size (larger hearts for better visibility)
        const size = 15 + Math.random() * 25; // 15px to 40px
        heart.style.setProperty('--heart-size', `${size}px`);
        
        // Random color from exact css-doodle palette
        const color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.setProperty('--heart-color', color);
        
        // Random rotation degree (-180deg to 180deg)
        const degree = (Math.random() - 0.5) * 360;
        heart.style.setProperty('--rotation-deg', `${degree}deg`);
        
        // Animation with staggered delay (calc(-12s / @I * @i) equivalent)
        heart.style.animationDelay = `${-12 / heartCount * i}s`;
        
        body.appendChild(heart);
    }
}

// Create coffee beans for Coffee mode
function createCoffeeBeans() {
    const body = document.body;
    
    // Remove any existing beans first
    const existingBeans = document.querySelectorAll('.coffee-bean');
    existingBeans.forEach(bean => bean.remove());
    
    // Create a continuous stream of beans
    function createBean() {
        const bean = document.createElement('div');
        bean.classList.add('coffee-bean');
        
        // Random position
        const left = Math.random() * 100;
        bean.style.left = `${left}%`;
        
        // Random size
        const size = 6 + Math.random() * 8; // Smaller beans
        bean.style.width = `${size}px`;
        bean.style.height = `${size}px`;
        
        // Random animation duration
        const duration = 20 + Math.random() * 25; // Longer duration for smoother fall
        bean.style.animationDuration = `${duration}s`;
        
        // No delay for immediate start
        bean.style.animationDelay = '0s';
        
        // Random rotation
        const rotation = Math.random() * 360;
        bean.style.transform = `rotate(${rotation}deg)`;
        
        body.appendChild(bean);
        
        // Remove bean after animation completes
        setTimeout(() => {
            if (bean.parentNode) {
                bean.parentNode.removeChild(bean);
            }
        }, duration * 1000);
    }
    
    // Create initial batch of beans
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            createBean();
        }, Math.random() * 2000); // Stagger initial beans
    }
    
    // Continue creating beans at regular intervals
    coffeeIntervalId = setInterval(() => {
        createBean();
    }, 1000); // Create a new bean every 1000ms
}

// Function to open the cat secret folder
function openCatSecretFolder() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay active';
    document.body.appendChild(overlay);
    
    // Create window
    const window = document.createElement('div');
    window.className = 'window active';
    window.setAttribute('data-window-id', 'cat-secret');
    
    // Window header
    const windowHeader = document.createElement('div');
    windowHeader.className = 'window-header';
    
    // Window title
    const title = document.createElement('div');
    title.textContent = 'Cat Secret Folder';
    
    // Window controls
    const windowControls = document.createElement('div');
    windowControls.className = 'window-controls';
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'window-btn close-btn';
    closeBtn.innerHTML = '&times;'; // Times symbol
    
    // Add hover sound
    closeBtn.addEventListener('mouseenter', function() {
        playSound('button-hover');
    });
    
    closeBtn.addEventListener('click', function() {
        playSound('button-click');
        closeWindow(window, overlay);
    });
    
    windowControls.appendChild(closeBtn);
    
    windowHeader.appendChild(title);
    windowHeader.appendChild(windowControls);
    
    // Window content
    const windowContent = document.createElement('div');
    windowContent.className = 'window-content';
    windowContent.innerHTML = '<h2>Cute Cats Gallery</h2><p>Loading amazing cat pictures...</p><div id="cat-images-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 20px;"></div><div style="text-align: center; margin-top: 20px;"><button id="load-more-cats" style="padding: 10px 20px; background: #4e54c8; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">Load More Images</button></div>';
    
    window.appendChild(windowHeader);
    window.appendChild(windowContent);
    
    document.body.appendChild(window);
    
    // Add dragging functionality
    makeWindowDraggable(window, windowHeader);
    
    // Play window open sound
    playSound('window-pop');
    
    // Close window when clicking overlay
    overlay.addEventListener('click', function() {
        closeWindow(window, overlay);
        playSound('folder-close'); // Play folder close sound
    });
    
    // Close window with Escape key
    function handleEscapeKey(event) {
        if (event.key === 'Escape') {
            closeWindow(window, overlay);
            playSound('folder-close'); // Play folder close sound
            document.removeEventListener('keydown', handleEscapeKey);
        }
    }
    
    document.addEventListener('keydown', handleEscapeKey);
    
    // Fetch cat images from API
    fetchCatImages();
    
    // Add event listener for load more button
    setTimeout(() => {
        const loadMoreButton = document.getElementById('load-more-cats');
        if (loadMoreButton) {
            loadMoreButton.addEventListener('click', function() {
                playSound('button-click');
                fetchCatImages();
            });
            
            // Add hover effect
            loadMoreButton.addEventListener('mouseenter', function() {
                playSound('button-hover');
                this.style.background = '#6a71e6';
            });
            
            loadMoreButton.addEventListener('mouseleave', function() {
                this.style.background = '#4e54c8';
            });
        }
    }, 100);
}

// Function to fetch cat images from the API
function fetchCatImages() {
    const apiUrl = 'https://api.thecatapi.com/v1/images/search?limit=10&api_key=live_biux4p6QprIZZAKRqv1Z2aqftYCytUpIDCy78qpOXykgYOW41hb09jVYScbo4bFp';
    
    // Show loading message
    const loadMoreButton = document.getElementById('load-more-cats');
    if (loadMoreButton) {
        loadMoreButton.textContent = 'Loading...';
        loadMoreButton.disabled = true;
    }
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('cat-images-container');
            if (container) {
                // If this is the first load, clear the loading message
                if (container.innerHTML === '<p>Loading amazing cat pictures...</p>') {
                    container.innerHTML = '';
                }
                
                data.forEach(cat => {
                    const img = document.createElement('img');
                    img.src = cat.url;
                    img.alt = 'Cute Cat';
                    img.style.width = '100%';
                    img.style.height = '200px';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '10px';
                    img.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                    img.style.transition = 'transform 0.3s ease';
                    
                    // Add hover effect
                    img.addEventListener('mouseenter', function() {
                        this.style.transform = 'scale(1.05)';
                    });
                    
                    img.addEventListener('mouseleave', function() {
                        this.style.transform = 'scale(1)';
                    });
                    
                    container.appendChild(img);
                });
            }
            
            // Reset button
            if (loadMoreButton) {
                loadMoreButton.textContent = 'Load More Images';
                loadMoreButton.disabled = false;
            }
        })
        .catch(error => {
            console.error('Error fetching cat images:', error);
            const container = document.getElementById('cat-images-container');
            if (container) {
                container.innerHTML = '<p>Failed to load cat images. Please try again later.</p>';
            }
            
            // Reset button
            if (loadMoreButton) {
                loadMoreButton.textContent = 'Load More Images';
                loadMoreButton.disabled = false;
            }
        });
    }

// Floating blocks functionality removed as per user request

// Initialize Vanta.js Clouds effect for dark mode
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in dark mode and initialize the effect
    if (document.body.getAttribute('data-theme') === 'dark') {
        initVantaClouds();
    }
    
    // Also initialize when theme changes
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            // Reinitialize Vanta.js when switching to dark mode
            if (theme === 'dark') {
                setTimeout(initVantaClouds, 100);
            } else {
                // Destroy Vanta.js effect when switching to other themes
                if (window.vantaEffect) {
                    window.vantaEffect.destroy();
                    window.vantaEffect = null;
                }
            }
        });
    });
});

// Function to initialize Vanta.js Clouds effect
function initVantaClouds() {
    // Destroy existing effect if it exists
    if (window.vantaEffect) {
        window.vantaEffect.destroy();
        window.vantaEffect = null;
    }
    
    // Initialize Vanta.js Clouds effect with dark colors
    try {
        window.vantaEffect = VANTA.CLOUDS({
            el: "#vantajs",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            skyColor: 0x141414,  // Dark gray
            cloudColor: 0x333333, // Darker clouds
            cloudShadowColor: 0x000000,
            sunColor: 0xffffff,
            sunGlareColor: 0xffffff,
            sunlightColor: 0xffffff,
            speed: 1.0
        });
    } catch (e) {
        console.log("Vanta.js failed to initialize:", e);
    }
}

// Add this function to create creepy crawlies when the About window is opened
function createCreepyCrawlies() {
    const container = document.querySelector('.horror-container');
    if (!container) return;
    
    // Create multiple creepy crawlies
    for (let i = 0; i < 5; i++) {
        const crawly = document.createElement('div');
        crawly.className = 'horror-crawly';
        crawly.style.left = Math.random() * 100 + '%';
        crawly.style.top = Math.random() * 100 + '%';
        crawly.style.animationDuration = (Math.random() * 10 + 5) + 's';
        crawly.style.animationDelay = (Math.random() * 5) + 's';
        crawly.style.width = (Math.random() * 15 + 5) + 'px';
        crawly.style.height = crawly.style.width;
        container.appendChild(crawly);
    }
}

// Add this function to create more horror effects when the About window is opened
function enhanceHorrorExperience() {
    const container = document.querySelector('.horror-container');
    if (!container) return;
    
    // Add random ghost appearances
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every interval
            const ghost = document.createElement('div');
            ghost.innerHTML = '👻';
            ghost.style.position = 'absolute';
            ghost.style.fontSize = '2rem';
            ghost.style.zIndex = '5';
            ghost.style.pointerEvents = 'none';
            ghost.style.left = Math.random() * 80 + '%';
            ghost.style.top = Math.random() * 80 + '%';
            ghost.style.opacity = '0';
            ghost.style.animation = 'ghostAppear 2s forwards';
            ghost.style.textShadow = '0 0 10px #ff0000';
            
            // Add CSS for ghost animation if not already present
            if (!document.querySelector('#ghost-animation')) {
                const style = document.createElement('style');
                style.id = 'ghost-animation';
                style.innerHTML = `
                    @keyframes ghostAppear {
                        0% { opacity: 0; transform: scale(0); }
                        50% { opacity: 1; transform: scale(1.2); }
                        100% { opacity: 0; transform: scale(0); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            container.appendChild(ghost);
            
            // Remove ghost after animation completes
            setTimeout(() => {
                if (ghost.parentNode) {
                    ghost.parentNode.removeChild(ghost);
                }
            }, 2000);
        }
    }, 3000); // Check every 3 seconds
    
    // Add random screen flashes
    setInterval(() => {
        if (Math.random() > 0.8) { // 20% chance every interval
            container.style.backgroundColor = '#ff0000';
            setTimeout(() => {
                container.style.backgroundColor = '';
            }, 100);
        }
    }, 5000); // Check every 5 seconds
    
    // Add heartbeat sound effect periodically
    setInterval(() => {
        if (Math.random() > 0.6 && soundEffects['horror-ambient']) { // 40% chance
            // Create a temporary heartbeat sound
            const heartbeat = new Howl({
                src: ['https://assets.mixkit.co/sfx/preview/mixkit-heartbeat-733.mp3'],
                volume: 0.3
            });
            heartbeat.play();
        }
    }, 10000); // Every 10 seconds
}

// Create Retro Rain Effect for Sakura Mode
function createRetroRain() {
    // Remove any existing retro rain
    const existingRain = document.querySelectorAll('.retro-rain-container, .retro-rain, .retro-lightning');
    existingRain.forEach(element => element.remove());
    
    // Create rain container
    const rainContainer = document.createElement('div');
    rainContainer.className = 'retro-rain-container';
    
    // Create front and back rain layers
    const frontRain = document.createElement('div');
    frontRain.className = 'retro-rain front-row';
    
    const backRain = document.createElement('div');
    backRain.className = 'retro-rain back-row';
    
    // Create lightning effect
    const lightning = document.createElement('div');
    lightning.className = 'retro-lightning';
    
    // Append elements
    rainContainer.appendChild(frontRain);
    rainContainer.appendChild(backRain);
    rainContainer.appendChild(lightning);
    document.body.appendChild(rainContainer);
    
    // Generate rain drops
    makeRetroRain();
}

// Function to generate retro rain drops
function makeRetroRain() {
    // Clear existing drops
    const rainElements = document.querySelectorAll('.retro-rain');
    rainElements.forEach(rain => rain.innerHTML = '');
    
    let frontDrops = '';
    let backDrops = '';
    
    // Generate 100 raindrops as specified in memory
    for (let i = 0; i < 100; i++) {
        // Random positioning and timing
        const leftPosition = Math.random() * 100;
        const animationDelay = Math.random() * 8;
        const animationDuration = 3 + Math.random() * 4; // 3-7 seconds for smoother fall
        const dropOpacity = 0.6 + Math.random() * 0.4; // Vary opacity for depth
        
        // Create front layer drops (60% of total)
        if (i < 60) {
            frontDrops += `<div class="retro-drop" style="
                left: ${leftPosition}%;
                animation-delay: ${animationDelay}s;
                animation-duration: ${animationDuration}s;
                opacity: ${dropOpacity};
            ">
                <div class="retro-stem" style="
                    animation-delay: ${animationDelay}s;
                    animation-duration: ${animationDuration}s;
                "></div>
                <div class="retro-splat" style="
                    animation-delay: ${animationDelay}s;
                    animation-duration: ${animationDuration}s;
                "></div>
            </div>`;
        }
        // Create back layer drops (40% of total)
        else {
            backDrops += `<div class="retro-drop" style="
                left: ${leftPosition}%;
                animation-delay: ${animationDelay}s;
                animation-duration: ${animationDuration}s;
                opacity: ${dropOpacity * 0.6};
            ">
                <div class="retro-stem" style="
                    animation-delay: ${animationDelay}s;
                    animation-duration: ${animationDuration}s;
                "></div>
                <div class="retro-splat" style="
                    animation-delay: ${animationDelay}s;
                    animation-duration: ${animationDuration}s;
                "></div>
            </div>`;
        }
    }
    
    const frontRow = document.querySelector('.retro-rain.front-row');
    const backRow = document.querySelector('.retro-rain.back-row');
    
    if (frontRow) frontRow.innerHTML = frontDrops;
    if (backRow) backRow.innerHTML = backDrops;
}

// Global function to close toast game and restore button
function closeToastGame() {
    // Remove the game
    const gameContainer = document.querySelector('.toast-catcher-game');
    if (gameContainer) {
        gameContainer.remove();
    }
    
    // Check if we're still in coffee mode before recreating button
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'coffee') {
        // Recreate the game button
        createToastGameButton();
    }
}

// Create Shadow Fish Effect for Coffee Mode
function createShadowFish() {
    // Remove any existing shadow fish
    const existingFish = document.querySelectorAll('.coffee-aquarium, .coffee-fish, .coffee-seaweed');
    existingFish.forEach(element => element.remove());
    
    // Create aquarium container
    const aquarium = document.createElement('div');
    aquarium.className = 'coffee-aquarium';
    
    // Create seaweed elements
    const seaweed1 = document.createElement('div');
    seaweed1.className = 'coffee-seaweed coffee-seaweed--one';
    
    const seaweed2 = document.createElement('div');
    seaweed2.className = 'coffee-seaweed coffee-seaweed--two';
    
    const seaweed3 = document.createElement('div');
    seaweed3.className = 'coffee-seaweed coffee-seaweed--three';
    
    // Create fish with segments
    const fish = document.createElement('div');
    fish.className = 'coffee-fish animated';
    
    // Create nested fish segments (26 segments)
    let currentSegment = fish;
    for (let i = 1; i <= 26; i++) {
        const segment = document.createElement('div');
        segment.className = `coffee-segment coffee-segment-${i}`;
        currentSegment.appendChild(segment);
        currentSegment = segment;
    }
    
    // Append all elements
    aquarium.appendChild(seaweed1);
    aquarium.appendChild(seaweed2);
    aquarium.appendChild(seaweed3);
    aquarium.appendChild(fish);
    document.body.appendChild(aquarium);
}

// Create Toast Catcher Game Button for Coffee mode
function createToastGameButton() {
    // Remove any existing game button or game
    const existingButton = document.querySelector('.toast-game-button');
    const existingGame = document.querySelector('.toast-catcher-game');
    if (existingButton) existingButton.remove();
    if (existingGame) existingGame.remove();
    
    // Create game button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'toast-game-button';
    buttonContainer.innerHTML = `
        <button class="play-toast-game-btn">
            <span class="game-icon">🍞</span>
            <span class="game-text">Play Toast Catcher Game</span>
            <span class="game-subtitle">☕ Coffee Break Fun!</span>
        </button>
    `;
    
    document.body.appendChild(buttonContainer);
    
    // Add click event to start the game
    const playButton = buttonContainer.querySelector('.play-toast-game-btn');
    playButton.addEventListener('click', () => {
        buttonContainer.remove();
        createToastCatcherGame();
    });
}

// Create Toast Catcher Game for Coffee mode
function createToastCatcherGame() {
    // Remove any existing game
    const existingGame = document.querySelector('.toast-catcher-game');
    if (existingGame) {
        existingGame.remove();
    }
    
    // Create game container
    const gameContainer = document.createElement('div');
    gameContainer.className = 'toast-catcher-game';
    gameContainer.innerHTML = `
        <div class="frame">
            <!-- Close button for the game -->
            <button class="game-close-btn" onclick="closeToastGame();">×</button>
            <svg id="toast-game" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="450" height="680" fill="none" viewBox="0 0 450 680">
                <path fill="#7DC8CF" d="M0 1h450v680H0z"/>
                <path fill="#976F4A" d="M0 0h450v80H0z"/>
                <path fill="#FDC571" d="M0 631h450v50H0z"/>
                <path fill="#67442B" d="M0 74h450v6H0z"/>
                <rect width="430" height="54" x="10" y="10" fill="#67442B" rx="12"/>
                <g fill="#FEDAA1" font="inherit">
                    <text id="toast-score" x="25" y="46">00000000</text>
                    <text id="toast-lives" x="345" y="46" font="inherit"></text>
                </g>
                <path fill="#FEECBF" d="M104.139 183.699c1.5-19.5-32-23-32-1.5-15.5-5.5-20.5 13.5-12.5 16 14.5 0 43.5.5 55 .5 10.5-4-.5-22-10.5-15Zm295.5-2c1.642-21.263-33-24.5-34.5-3.5-18.5-6-24.258 16.956-15.5 19.682h60.837c11.495-4.362.111-23.815-10.837-16.182ZM93.078 379.908c1.792-23.22-34.939-29.209-41.439-2.209-16.5-8-22.677 16.903-13.12 19.88h66.384c12.543-4.763.121-26.007-11.825-17.671Zm192.561-69.209c1.295-16-22.804-22.105-27.5-3.5-11.919-5.513-18.639 12.448-11.736 14.5h47.954c9.061-3.282-.089-16.744-8.718-11Zm16 232.5c1.307-16.633-24.76-21.841-29.5-2.5-12.033-5.731-18.163 12.839-11.194 14.971h48.413c10.281-3.471.993-18.442-7.719-12.471Z"/>
                <g font-size="36" id="toast-game-over-screen" pointer-events="none" visibility="hidden">
                    <text x="225" y="220" text-anchor="middle" stroke="#603719" stroke-width="10">GAME OVER</text>
                    <text x="225" y="220" text-anchor="middle" fill="#f16f33">GAME OVER</text>
                    <text id="toast-final-score-info" x="225" y="260" text-anchor="middle" font-size="24" fill="white">Final Score: 0</text>
                </g>
                <!-- Toast symbol -->
                <symbol id="toast" xmlns="http://www.w3.org/2000/svg" width="95" height="57" viewBox="0 0 95 57">
                    <path class="toast__wings" fill="#FDE2A9" stroke="#7F3412" stroke-linejoin="round" stroke-width="3" d="M3.793 18.165c.905-.484 1.938-.526 2.887-.399 1.88.252 4.141 1.27 6.375 2.527 3.967 2.234 8.385 5.539 11.558 8.103l1.279 1.048.105.096a1.5 1.5 0 0 1 .424.87l1.47 11.701a1.5 1.5 0 0 1-.432 1.254c-3.981 3.94-8.147 4.232-10.628 2.541-1.168-.796-2.067-2.187-1.735-3.753.053-.25.135-.483.24-.702-1.743-.454-3.15-1.018-4.257-1.658-1.747-1.01-2.903-2.31-3.22-3.799-.292-1.363.181-2.602 1.058-3.47-1.424-.708-2.823-1.57-4-2.646-2.349-2.147-3.818-5.157-2.921-9.21l.05-.2c.265-.997.838-1.817 1.747-2.303Zm85.793-2.258c-1.486-.17-3.23.45-4.847 1.238-2.93 1.426-6.42 3.904-9.438 6.2l-1.26.971-.133.116a1.5 1.5 0 0 0-.448 1.1l.251 12.107a1.5 1.5 0 0 0 1.44 1.468c3.919.158 6.967-.368 9.192-1.296 2.19-.913 3.742-2.294 4.306-3.937.288-.837.307-1.725.002-2.556-.304-.828-.892-1.499-1.647-1.973a5.05 5.05 0 0 0-.67-.351 23.515 23.515 0 0 0 2.936-2.553c1.003-1.038 1.868-2.154 2.475-3.29.6-1.126.998-2.366.924-3.61-.055-.913-.297-1.79-.868-2.481-.595-.72-1.4-1.06-2.215-1.153Z"/>
                    <path fill="#C7511B" d="M63.941.713c6.616-.394 12.298 4.65 12.692 11.266l.12 2.016a12.94 12.94 0 0 1-1.657 7.165l1.421 23.884a8 8 0 0 1-7.51 8.461l-34.86 2.074a8 8 0 0 1-8.461-7.511l-1.343-22.575a12.946 12.946 0 0 1-3.543-8.17l-.06-1.017c-.427-7.167 5.038-13.323 12.204-13.75L63.941.714Z"/>
                    <path fill="#FEBB63" d="M64.353 3.719a9 9 0 0 1 9.518 8.45l.177 2.969a10.949 10.949 0 0 1-1.721 6.587l1.39 23.368a5 5 0 0 1-4.694 5.288l-32.78 1.95a5 5 0 0 1-5.288-4.694l-1.362-22.894a10.953 10.953 0 0 1-2.882-6.789l-.058-.973c-.36-6.064 4.263-11.273 10.327-11.634L64.353 3.72Z"/>
                    <path stroke="#7F3412" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M49.28 31.137c2.615 1.848 5.61 1.67 7.488-.445"/>
                    <g class="toast__eyes">
                        <ellipse cx="61.42" cy="25.123" fill="#7F3412" rx="2.5" ry="3.5" transform="rotate(-3.404 61.42 25.123)"/>
                        <ellipse cx="42.994" cy="26.502" fill="#7F3412" rx="2.5" ry="3.5" transform="rotate(-3.404 42.994 26.502)"/>
                    </g>
                </symbol>
            </svg>
        </div>
    `;
    
    document.body.appendChild(gameContainer);
    
    // Initialize the game
    new ToastCatcherGame();
}

// Toast Catcher Game Class
class ToastCatcherGame {
    constructor() {
        this.svg = document.getElementById('toast-game');
        if (!this.svg) return;
        
        this.toastSymbolId = '#toast';
        this.scoreEl = document.getElementById('toast-score');
        this.livesEl = document.getElementById('toast-lives');
        this.finalScoreInfoEl = document.getElementById('toast-final-score-info');
        this.gameOverScreenEl = document.getElementById('toast-game-over-screen');
        this.toasts = [];
        this.score = 0;
        this.spawnInterval = 2000;
        this.remainingLives = 5;
        this.gameOver = false;
        this.gameStartTime = performance.now();
        this.spawnTimer = null;
        
        this.loop = this.loop.bind(this);
        this.spawnToast();
        this.startSpawnTimer();
        this.updateLives();
        requestAnimationFrame(this.loop);
    }
    
    startSpawnTimer() {
        if (this.spawnTimer) {
            clearInterval(this.spawnTimer);
        }
        
        const gameTimeSeconds = (performance.now() - this.gameStartTime) / 1000;
        this.spawnInterval = Math.max(500, 2000 - Math.floor(gameTimeSeconds / 10) * 100);
        
        this.spawnTimer = setInterval(() => {
            if (!this.gameOver) {
                this.spawnToast();
                this.startSpawnTimer();
            }
        }, this.spawnInterval);
    }
    
    spawnToast() {
        if (this.gameOver) return;
        
        const startX = Math.random() * 350 + 25;
        const endX = Math.random() * 350 + 25;
        const peakY = 200 + Math.random() * 50;
        
        const toast = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        toast.setAttribute('href', this.toastSymbolId);
        toast.setAttribute('class', 'toast');
        toast.setAttribute('x', startX);
        toast.setAttribute('y', 680);
        this.svg.appendChild(toast);
        
        const toastObj = {
            el: toast,
            startX,
            endX,
            startY: 680,
            peakY,
            startTime: performance.now(),
            duration: 3000,
            clicked: false,
            upwardSpeed: -8,
            reachedBottom: false
        };
        
        toast.addEventListener('pointerdown', () => {
            if (!this.gameOver && !toastObj.clicked) {
                this.score += 1;
                this.scoreEl.textContent = this.score.toString().padStart(8, '0');
                toastObj.clicked = true;
            }
        });
        
        this.toasts.push(toastObj);
    }
    
    updateLives() {
        this.livesEl.textContent = 'Lives: ' + this.remainingLives;
    }
    
    checkGameOver() {
        if (this.remainingLives <= 0) {
            this.gameOver = true;
            clearInterval(this.spawnTimer);
            this.gameOverScreenEl.setAttribute('visibility', 'visible');
            this.finalScoreInfoEl.textContent = `Final Score: ${this.score}`;
        }
    }
    
    loop(timestamp) {
        if (this.gameOver) {
            requestAnimationFrame(this.loop);
            return;
        }
        
        this.toasts = this.toasts.filter(toast => {
            const t = (timestamp - toast.startTime) / toast.duration;
            
            if (toast.clicked) {
                const currentY = parseFloat(toast.el.getAttribute('y'));
                const newY = currentY + toast.upwardSpeed;
                toast.el.setAttribute('y', newY);
                toast.el.setAttribute('pointer-events', 'none');
                if (newY < -50) {
                    toast.el.remove();
                    return false;
                }
            } else {
                if (t > 1) {
                    if (!toast.reachedBottom) {
                        this.remainingLives--;
                        this.updateLives();
                        this.checkGameOver();
                        toast.reachedBottom = true;
                    }
                    toast.el.remove();
                    return false;
                }
                
                // Parabolic trajectory animation
                const normalizedTime = Math.min(t, 1);
                const x = toast.startX + (toast.endX - toast.startX) * normalizedTime;
                const y = toast.startY + (toast.peakY - toast.startY) * (1 - Math.pow(1 - normalizedTime, 2));
                
                toast.el.setAttribute('x', x);
                toast.el.setAttribute('y', y);
            }
            
            return true;
        });
        
        requestAnimationFrame(this.loop);
    }
}
function createCarAnimation() {
    // Remove any existing car animation
    const existingCar = document.querySelector('.car-animation-container');
    if (existingCar) {
        existingCar.remove();
    }
    
    // Create car animation container
    const carContainer = document.createElement('div');
    carContainer.className = 'car-animation-container';
    
    // Create car animation element
    const carElement = document.createElement('div');
    carElement.className = 'car-animation';
    
    carContainer.appendChild(carElement);
    document.body.appendChild(carContainer);
}

// Create Coffee Theme Animated Background
function createCoffeeAnimatedBackground() {
    // Remove any existing coffee background
    const existingBackground = document.querySelector('.coffee-animated-background');
    if (existingBackground) {
        existingBackground.remove();
    }
    
    // Create background container
    const backgroundContainer = document.createElement('div');
    backgroundContainer.className = 'coffee-animated-background';
    
    // Create SVG with coffee-themed animations
    backgroundContainer.innerHTML = `
        <svg width="100%" height="100%" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <!-- Coffee bean gradient -->
                <radialGradient id="coffeeBean" cx="30%" cy="30%">
                    <stop offset="0%" style="stop-color:#8B4513;stop-opacity:1" />
                    <stop offset="70%" style="stop-color:#5D2E0A;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#3E1A06;stop-opacity:1" />
                </radialGradient>
                
                <!-- Coffee cup gradient -->
                <linearGradient id="coffeeCup" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#D2B48C;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#8B7355;stop-opacity:1" />
                </linearGradient>
                
                <!-- Steam gradient -->
                <linearGradient id="steam" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" style="stop-color:#F5F5F5;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#F5F5F5;stop-opacity:0.2" />
                </linearGradient>
            </defs>
            
            <!-- Floating coffee beans -->
            <g class="coffee-beans-group">
                <ellipse class="floating-bean bean-1" cx="100" cy="150" rx="8" ry="12" fill="url(#coffeeBean)" transform="rotate(45 100 150)">
                    <animateTransform attributeName="transform" type="translate" values="0,0; 20,-10; 0,0" dur="4s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="rotate" values="45 100 150; 90 100 150; 45 100 150" dur="6s" repeatCount="indefinite" additive="sum"/>
                </ellipse>
                <path class="bean-crack bean-1-crack" d="M95,145 Q100,155 105,165" stroke="#3E1A06" stroke-width="2" fill="none">
                    <animateTransform attributeName="transform" type="translate" values="0,0; 20,-10; 0,0" dur="4s" repeatCount="indefinite"/>
                </path>
                
                <ellipse class="floating-bean bean-2" cx="300" cy="200" rx="10" ry="15" fill="url(#coffeeBean)" transform="rotate(120 300 200)">
                    <animateTransform attributeName="transform" type="translate" values="0,0; -15,15; 0,0" dur="5s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="rotate" values="120 300 200; 180 300 200; 120 300 200" dur="7s" repeatCount="indefinite" additive="sum"/>
                </ellipse>
                <path class="bean-crack bean-2-crack" d="M295,190 Q300,205 305,220" stroke="#3E1A06" stroke-width="2" fill="none">
                    <animateTransform attributeName="transform" type="translate" values="0,0; -15,15; 0,0" dur="5s" repeatCount="indefinite"/>
                </path>
                
                <ellipse class="floating-bean bean-3" cx="500" cy="100" rx="9" ry="13" fill="url(#coffeeBean)" transform="rotate(0 500 100)">
                    <animateTransform attributeName="transform" type="translate" values="0,0; 10,20; 0,0" dur="3.5s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="rotate" values="0 500 100; 45 500 100; 0 500 100" dur="5s" repeatCount="indefinite" additive="sum"/>
                </ellipse>
                <path class="bean-crack bean-3-crack" d="M495,95 Q500,105 505,115" stroke="#3E1A06" stroke-width="2" fill="none">
                    <animateTransform attributeName="transform" type="translate" values="0,0; 10,20; 0,0" dur="3.5s" repeatCount="indefinite"/>
                </path>
                
                <ellipse class="floating-bean bean-4" cx="700" cy="250" rx="7" ry="11" fill="url(#coffeeBean)" transform="rotate(180 700 250)">
                    <animateTransform attributeName="transform" type="translate" values="0,0; -20,-5; 0,0" dur="4.5s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="rotate" values="180 700 250; 225 700 250; 180 700 250" dur="6s" repeatCount="indefinite" additive="sum"/>
                </ellipse>
                <path class="bean-crack bean-4-crack" d="M695,245 Q700,255 705,265" stroke="#3E1A06" stroke-width="2" fill="none">
                    <animateTransform attributeName="transform" type="translate" values="0,0; -20,-5; 0,0" dur="4.5s" repeatCount="indefinite"/>
                </path>
                
                <ellipse class="floating-bean bean-5" cx="900" cy="180" rx="11" ry="16" fill="url(#coffeeBean)" transform="rotate(270 900 180)">
                    <animateTransform attributeName="transform" type="translate" values="0,0; 15,-15; 0,0" dur="6s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="rotate" values="270 900 180; 315 900 180; 270 900 180" dur="8s" repeatCount="indefinite" additive="sum"/>
                </ellipse>
                <path class="bean-crack bean-5-crack" d="M895,170 Q900,185 905,200" stroke="#3E1A06" stroke-width="2" fill="none">
                    <animateTransform attributeName="transform" type="translate" values="0,0; 15,-15; 0,0" dur="6s" repeatCount="indefinite"/>
                </path>
                
                <ellipse class="floating-bean bean-6" cx="1100" cy="120" rx="8" ry="12" fill="url(#coffeeBean)" transform="rotate(60 1100 120)">
                    <animateTransform attributeName="transform" type="translate" values="0,0; -10,25; 0,0" dur="5.5s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="rotate" values="60 1100 120; 105 1100 120; 60 1100 120" dur="7s" repeatCount="indefinite" additive="sum"/>
                </ellipse>
                <path class="bean-crack bean-6-crack" d="M1095,115 Q1100,125 1105,135" stroke="#3E1A06" stroke-width="2" fill="none">
                    <animateTransform attributeName="transform" type="translate" values="0,0; -10,25; 0,0" dur="5.5s" repeatCount="indefinite"/>
                </path>
            </g>
            
            <!-- Coffee cups with steam -->
            <g class="coffee-cups-group">
                <!-- Cup 1 -->
                <g class="coffee-cup cup-1" transform="translate(150,400)">
                    <ellipse cx="50" cy="80" rx="45" ry="8" fill="#654321" opacity="0.3"/>
                    <path d="M10,30 L10,70 Q10,80 20,80 L80,80 Q90,80 90,70 L90,30 Q90,20 80,20 L20,20 Q10,20 10,30" fill="url(#coffeeCup)" stroke="#5D4037" stroke-width="2"/>
                    <ellipse cx="50" cy="30" rx="35" ry="8" fill="#3E2723"/>
                    <path d="M90,40 Q105,35 105,50 Q105,65 90,60" fill="none" stroke="#8B7355" stroke-width="3"/>
                    
                    <!-- Steam -->
                    <g class="steam-group">
                        <path class="steam steam-1" d="M45,20 Q47,10 45,0" stroke="url(#steam)" stroke-width="2" fill="none" opacity="0.6">
                            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite"/>
                            <animateTransform attributeName="transform" type="translate" values="0,0; -2,-5; 2,-10; 0,-15" dur="3s" repeatCount="indefinite"/>
                        </path>
                        <path class="steam steam-2" d="M50,20 Q52,10 50,0" stroke="url(#steam)" stroke-width="2" fill="none" opacity="0.4">
                            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.5s" repeatCount="indefinite"/>
                            <animateTransform attributeName="transform" type="translate" values="0,0; 2,-5; -2,-10; 0,-15" dur="3.5s" repeatCount="indefinite"/>
                        </path>
                        <path class="steam steam-3" d="M55,20 Q57,10 55,0" stroke="url(#steam)" stroke-width="2" fill="none" opacity="0.5">
                            <animate attributeName="opacity" values="0.5;0.2;0.5" dur="1.8s" repeatCount="indefinite"/>
                            <animateTransform attributeName="transform" type="translate" values="0,0; -1,-5; 1,-10; 0,-15" dur="2.8s" repeatCount="indefinite"/>
                        </path>
                    </g>
                    
                    <animateTransform attributeName="transform" type="translate" values="150,400; 160,395; 150,400" dur="8s" repeatCount="indefinite"/>
                </g>
                
                <!-- Cup 2 -->
                <g class="coffee-cup cup-2" transform="translate(800,450)">
                    <ellipse cx="40" cy="70" rx="35" ry="6" fill="#654321" opacity="0.3"/>
                    <path d="M8,25 L8,60 Q8,68 16,68 L64,68 Q72,68 72,60 L72,25 Q72,18 64,18 L16,18 Q8,18 8,25" fill="url(#coffeeCup)" stroke="#5D4037" stroke-width="2"/>
                    <ellipse cx="40" cy="25" rx="28" ry="6" fill="#3E2723"/>
                    <path d="M72,35 Q85,32 85,42 Q85,52 72,49" fill="none" stroke="#8B7355" stroke-width="2.5"/>
                    
                    <!-- Steam -->
                    <g class="steam-group">
                        <path class="steam steam-1" d="M36,18 Q38,10 36,2" stroke="url(#steam)" stroke-width="1.5" fill="none" opacity="0.5">
                            <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.2s" repeatCount="indefinite"/>
                            <animateTransform attributeName="transform" type="translate" values="0,0; -1,-4; 1,-8; 0,-12" dur="3.2s" repeatCount="indefinite"/>
                        </path>
                        <path class="steam steam-2" d="M40,18 Q42,10 40,2" stroke="url(#steam)" stroke-width="1.5" fill="none" opacity="0.4">
                            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.8s" repeatCount="indefinite"/>
                            <animateTransform attributeName="transform" type="translate" values="0,0; 1,-4; -1,-8; 0,-12" dur="3.8s" repeatCount="indefinite"/>
                        </path>
                        <path class="steam steam-3" d="M44,18 Q46,10 44,2" stroke="url(#steam)" stroke-width="1.5" fill="none" opacity="0.6">
                            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.9s" repeatCount="indefinite"/>
                            <animateTransform attributeName="transform" type="translate" values="0,0; -0.5,-4; 0.5,-8; 0,-12" dur="2.9s" repeatCount="indefinite"/>
                        </path>
                    </g>
                    
                    <animateTransform attributeName="transform" type="translate" values="800,450; 790,445; 800,450" dur="7s" repeatCount="indefinite"/>
                </g>
            </g>
            
            <!-- Coffee aroma waves -->
            <g class="aroma-waves">
                <path class="aroma-wave wave-1" d="M200,300 Q250,280 300,300 Q350,320 400,300" stroke="#D2691E" stroke-width="1" fill="none" opacity="0.3">
                    <animate attributeName="opacity" values="0.3;0.1;0.3" dur="4s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-20; 0,-40" dur="6s" repeatCount="indefinite"/>
                </path>
                <path class="aroma-wave wave-2" d="M600,350 Q650,330 700,350 Q750,370 800,350" stroke="#CD853F" stroke-width="1" fill="none" opacity="0.4">
                    <animate attributeName="opacity" values="0.4;0.1;0.4" dur="5s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-25; 0,-50" dur="7s" repeatCount="indefinite"/>
                </path>
                <path class="aroma-wave wave-3" d="M900,280 Q950,260 1000,280 Q1050,300 1100,280" stroke="#DEB887" stroke-width="1" fill="none" opacity="0.2">
                    <animate attributeName="opacity" values="0.2;0.05;0.2" dur="3.5s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 0,-15; 0,-30" dur="5.5s" repeatCount="indefinite"/>
                </path>
            </g>
        </svg>
    `;
    
    document.body.appendChild(backgroundContainer);
}

// Create Sakura & Cozy Theme Animated Background
function createSakuraAnimatedBackground() {
    // Remove any existing sakura background
    const existingBackground = document.querySelector('.sakura-animated-background');
    if (existingBackground) {
        existingBackground.remove();
    }
    
    // Create background container
    const backgroundContainer = document.createElement('div');
    backgroundContainer.className = 'sakura-animated-background';
    
    // Create SVG with sakura & cozy themed animations
    backgroundContainer.innerHTML = `
        <svg width="100%" height="100%" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <!-- Sakura petal gradient -->
                <radialGradient id="sakuraPetal" cx="30%" cy="30%">
                    <stop offset="0%" style="stop-color:#FFE4E1;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#FFC0CB;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#FF69B4;stop-opacity:0.8" />
                </radialGradient>
                
                <!-- Cherry blossom gradient -->
                <radialGradient id="cherryBlossom" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
                    <stop offset="40%" style="stop-color:#FFB6C1;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#FF69B4;stop-opacity:0.9" />
                </radialGradient>
                
                <!-- Tree branch gradient -->
                <linearGradient id="treeBranch" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#8B4513;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#A0522D;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#654321;stop-opacity:1" />
                </linearGradient>
                
                <!-- Warm light gradient -->
                <radialGradient id="warmLight" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:#FFFACD;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#FFFACD;stop-opacity:0.2" />
                </radialGradient>
                
                <!-- Cozy lamp gradient -->
                <linearGradient id="lampShade" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#F5DEB3;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#DEB887;stop-opacity:1" />
                </linearGradient>
            </defs>
            
            <!-- Floating sakura petals -->
            <g class="sakura-petals-group">
                <!-- Petal 1 -->
                <g class="floating-petal petal-1" transform="translate(100,50)">
                    <path d="M0,0 Q-8,-15 0,-20 Q8,-15 0,0 Q15,-8 20,0 Q15,8 0,0" fill="url(#sakuraPetal)" opacity="0.7">
                        <animateTransform attributeName="transform" type="rotate" values="0;360" dur="20s" repeatCount="indefinite"/>
                    </path>
                    <animateTransform attributeName="transform" type="translate" values="100,50; 120,80; 90,120; 110,150; 80,200" dur="25s" repeatCount="indefinite"/>
                </g>
                
                <!-- Petal 2 -->
                <g class="floating-petal petal-2" transform="translate(300,80)">
                    <path d="M0,0 Q-6,-12 0,-16 Q6,-12 0,0 Q12,-6 16,0 Q12,6 0,0" fill="url(#sakuraPetal)" opacity="0.6">
                        <animateTransform attributeName="transform" type="rotate" values="45;405" dur="18s" repeatCount="indefinite"/>
                    </path>
                    <animateTransform attributeName="transform" type="translate" values="300,80; 280,110; 320,140; 290,180; 330,220" dur="22s" repeatCount="indefinite"/>
                </g>
                
                <!-- Petal 3 -->
                <g class="floating-petal petal-3" transform="translate(500,40)">
                    <path d="M0,0 Q-10,-18 0,-24 Q10,-18 0,0 Q18,-10 24,0 Q18,10 0,0" fill="url(#sakuraPetal)" opacity="0.8">
                        <animateTransform attributeName="transform" type="rotate" values="90;450" dur="24s" repeatCount="indefinite"/>
                    </path>
                    <animateTransform attributeName="transform" type="translate" values="500,40; 520,70; 480,100; 510,140; 470,180" dur="28s" repeatCount="indefinite"/>
                </g>
                
                <!-- Petal 4 -->
                <g class="floating-petal petal-4" transform="translate(700,60)">
                    <path d="M0,0 Q-7,-14 0,-18 Q7,-14 0,0 Q14,-7 18,0 Q14,7 0,0" fill="url(#sakuraPetal)" opacity="0.65">
                        <animateTransform attributeName="transform" type="rotate" values="180;540" dur="21s" repeatCount="indefinite"/>
                    </path>
                    <animateTransform attributeName="transform" type="translate" values="700,60; 680,90; 720,120; 690,160; 730,200" dur="26s" repeatCount="indefinite"/>
                </g>
                
                <!-- Petal 5 -->
                <g class="floating-petal petal-5" transform="translate(900,30)">
                    <path d="M0,0 Q-9,-16 0,-22 Q9,-16 0,0 Q16,-9 22,0 Q16,9 0,0" fill="url(#sakuraPetal)" opacity="0.75">
                        <animateTransform attributeName="transform" type="rotate" values="270;630" dur="19s" repeatCount="indefinite"/>
                    </path>
                    <animateTransform attributeName="transform" type="translate" values="900,30; 920,60; 880,90; 910,130; 870,170" dur="23s" repeatCount="indefinite"/>
                </g>
                
                <!-- Petal 6 -->
                <g class="floating-petal petal-6" transform="translate(1100,70)">
                    <path d="M0,0 Q-5,-10 0,-14 Q5,-10 0,0 Q10,-5 14,0 Q10,5 0,0" fill="url(#sakuraPetal)" opacity="0.6">
                        <animateTransform attributeName="transform" type="rotate" values="315;675" dur="17s" repeatCount="indefinite"/>
                    </path>
                    <animateTransform attributeName="transform" type="translate" values="1100,70; 1080,100; 1120,130; 1090,170; 1130,210" dur="24s" repeatCount="indefinite"/>
                </g>
            </g>
            
            <!-- Cherry blossom branches -->
            <g class="cherry-branches-group">
                <!-- Branch 1 -->
                <g class="cherry-branch branch-1" transform="translate(150,200)">
                    <path d="M0,0 Q50,-20 100,-10 Q150,-30 200,-15" stroke="url(#treeBranch)" stroke-width="4" fill="none" opacity="0.8"/>
                    
                    <!-- Blossoms on branch -->
                    <g class="blossom-cluster cluster-1" transform="translate(30,-10)">
                        <circle r="6" fill="url(#cherryBlossom)" opacity="0.9">
                            <animate attributeName="r" values="6;8;6" dur="4s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="8" cy="5" r="5" fill="url(#cherryBlossom)" opacity="0.8">
                            <animate attributeName="r" values="5;7;5" dur="4.5s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="-6" cy="3" r="4" fill="url(#cherryBlossom)" opacity="0.85">
                            <animate attributeName="r" values="4;6;4" dur="3.8s" repeatCount="indefinite"/>
                        </circle>
                    </g>
                    
                    <g class="blossom-cluster cluster-2" transform="translate(80,-25)">
                        <circle r="7" fill="url(#cherryBlossom)" opacity="0.9">
                            <animate attributeName="r" values="7;9;7" dur="3.5s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="10" cy="6" r="6" fill="url(#cherryBlossom)" opacity="0.8">
                            <animate attributeName="r" values="6;8;6" dur="4.2s" repeatCount="indefinite"/>
                        </circle>
                    </g>
                    
                    <g class="blossom-cluster cluster-3" transform="translate(140,-20)">
                        <circle r="5" fill="url(#cherryBlossom)" opacity="0.85">
                            <animate attributeName="r" values="5;7;5" dur="4.8s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="-7" cy="4" r="4" fill="url(#cherryBlossom)" opacity="0.8">
                            <animate attributeName="r" values="4;6;4" dur="3.9s" repeatCount="indefinite"/>
                        </circle>
                    </g>
                    
                    <animateTransform attributeName="transform" type="translate" values="150,200; 155,195; 150,200" dur="8s" repeatCount="indefinite"/>
                </g>
                
                <!-- Branch 2 -->
                <g class="cherry-branch branch-2" transform="translate(600,150)">
                    <path d="M0,0 Q-40,30 -80,25 Q-120,45 -160,40" stroke="url(#treeBranch)" stroke-width="3" fill="none" opacity="0.7"/>
                    
                    <g class="blossom-cluster cluster-4" transform="translate(-50,20)">
                        <circle r="6" fill="url(#cherryBlossom)" opacity="0.9">
                            <animate attributeName="r" values="6;8;6" dur="4.3s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="9" cy="-4" r="5" fill="url(#cherryBlossom)" opacity="0.85">
                            <animate attributeName="r" values="5;7;5" dur="3.7s" repeatCount="indefinite"/>
                        </circle>
                    </g>
                    
                    <g class="blossom-cluster cluster-5" transform="translate(-110,35)">
                        <circle r="7" fill="url(#cherryBlossom)" opacity="0.8">
                            <animate attributeName="r" values="7;9;7" dur="4.1s" repeatCount="indefinite"/>
                        </circle>
                    </g>
                    
                    <animateTransform attributeName="transform" type="translate" values="600,150; 595,155; 600,150" dur="9s" repeatCount="indefinite"/>
                </g>
            </g>
            
            <!-- Cozy warm lights -->
            <g class="warm-lights-group">
                <!-- Warm light 1 -->
                <circle class="warm-light light-1" cx="200" cy="120" r="40" fill="url(#warmLight)" opacity="0.4">
                    <animate attributeName="opacity" values="0.4;0.6;0.4" dur="6s" repeatCount="indefinite"/>
                    <animate attributeName="r" values="40;50;40" dur="8s" repeatCount="indefinite"/>
                </circle>
                
                <!-- Warm light 2 -->
                <circle class="warm-light light-2" cx="800" cy="180" r="35" fill="url(#warmLight)" opacity="0.3">
                    <animate attributeName="opacity" values="0.3;0.5;0.3" dur="7s" repeatCount="indefinite"/>
                    <animate attributeName="r" values="35;45;35" dur="9s" repeatCount="indefinite"/>
                </circle>
                
                <!-- Warm light 3 -->
                <circle class="warm-light light-3" cx="1000" cy="100" r="30" fill="url(#warmLight)" opacity="0.35">
                    <animate attributeName="opacity" values="0.35;0.55;0.35" dur="5.5s" repeatCount="indefinite"/>
                    <animate attributeName="r" values="30;40;30" dur="7.5s" repeatCount="indefinite"/>
                </circle>
            </g>
            
            <!-- Cozy lamp -->
            <g class="cozy-lamp" transform="translate(100,500)">
                <!-- Lamp base -->
                <rect x="-5" y="40" width="10" height="60" fill="#8B4513" rx="2"/>
                
                <!-- Lamp shade -->
                <path d="M-25,20 L25,20 L20,50 L-20,50 Z" fill="url(#lampShade)" stroke="#DEB887" stroke-width="1" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;0.9;0.8" dur="4s" repeatCount="indefinite"/>
                </path>
                
                <!-- Lamp glow -->
                <ellipse cx="0" cy="35" rx="30" ry="15" fill="url(#warmLight)" opacity="0.5">
                    <animate attributeName="opacity" values="0.5;0.7;0.5" dur="3s" repeatCount="indefinite"/>
                </ellipse>
                
                <animateTransform attributeName="transform" type="translate" values="100,500; 102,498; 100,500" dur="12s" repeatCount="indefinite"/>
            </g>
            
            <!-- Fireflies -->
            <g class="fireflies-group">
                <circle class="firefly firefly-1" cx="300" cy="250" r="2" fill="#FFFF99" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 20,-10; -15,15; 10,-5; 0,0" dur="15s" repeatCount="indefinite"/>
                </circle>
                
                <circle class="firefly firefly-2" cx="700" cy="300" r="1.5" fill="#FFFF99" opacity="0.6">
                    <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="translate" values="0,0; -25,10; 15,-20; -10,8; 0,0" dur="18s" repeatCount="indefinite"/>
                </circle>
                
                <circle class="firefly firefly-3" cx="950" cy="280" r="2.5" fill="#FFFF99" opacity="0.7">
                    <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.8s" repeatCount="indefinite"/>
                    <animateTransform attributeName="transform" type="translate" values="0,0; 18,15; -20,-8; 12,12; 0,0" dur="20s" repeatCount="indefinite"/>
                </circle>
            </g>
        </svg>
    `;
    
    document.body.appendChild(backgroundContainer);
}
