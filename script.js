// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Featured dishes data with Indian prices and image paths
const featuredDishes = [
    { 
        id: 1, 
        name: "Butter Chicken", 
        price: 450, 
        image: "https://majasrecipes.com/wp-content/uploads/2024/12/butter-chicken-recipe-5.jpg",
        description: "Creamy tomato-based curry with tender chicken",
        category: "mains"
    },
    { 
        id: 2, 
        name: "Biryani", 
        price: 380, 
        image: "https://www.thehosteller.com/_next/image/?url=https%3A%2F%2Fstatic.thehosteller.com%2Fhostel%2Fimages%2Fimage.jpg%2Fimage-1744199226259.jpg&w=3840&q=75",
        description: "Fragrant rice with spices and choice of meat",
        category: "mains"
    },
    { 
        id: 3, 
        name: "Palak Paneer", 
        price: 320, 
        image: "https://mealpractice.b-cdn.net/40153435563233280/palak-paneer-with-garlic-naan-bpsZSa4KQi.webp",
        description: "Grilled cottage cheese with Indian spices",
        category: "appetizers"
    },
    { 
        id: 4, 
        name: "Gulab Jamun", 
        price: 120, 
        image: "https://www.jcookingodyssey.com/wp-content/uploads/2025/09/kala-jamun.jpg",
        description: "Sweet milk dumplings in rose-flavored syrup",
        category: "desserts"
    }
];

// Menu items data
const menuItems = [
    { 
        id: 1, 
        name: "Samosa", 
        category: "appetizers", 
        price: 80, 
        image: "https://mumbistro.com/cdn/shop/products/vegetable-somasa_720x.jpg?v=1590589465", 
        description: "Crispy pastry with spiced potatoes" 
    },
    { 
        id: 2, 
        name: "Pakora", 
        category: "appetizers", 
        price: 90, 
        image: "https://images.immediate.co.uk/production/volatile/sites/30/2022/06/Courgette-pakoras-7798988.jpg?quality=90&webp=true&resize=700,636", 
        description: "Deep-fried vegetable fritters" 
    },
    { 
        id: 3, 
        name: "Butter Chicken", 
        category: "mains", 
        price: 450, 
        image: "https://majasrecipes.com/wp-content/uploads/2024/12/butter-chicken-recipe-5.jpg", 
        description: "Creamy tomato-based curry" 
    },
    { 
        id: 4, 
        name: "Biryani", 
        category: "mains", 
        price: 380, 
        image: "https://www.thehosteller.com/_next/image/?url=https%3A%2F%2Fstatic.thehosteller.com%2Fhostel%2Fimages%2Fimage.jpg%2Fimage-1744199226259.jpg&w=3840&q=75", 
        description: "Fragrant rice with spices" 
    },
    { 
        id: 5, 
        name: "Palak Paneer", 
        category: "mains", 
        price: 320, 
        image: "https://mealpractice.b-cdn.net/40153435563233280/palak-paneer-with-garlic-naan-bpsZSa4KQi.webp", 
        description: "Spinach with cottage cheese" 
    },
    { 
        id: 6, 
        name: "Gulab Jamun", 
        category: "desserts", 
        price: 120, 
        image: "https://www.jcookingodyssey.com/wp-content/uploads/2025/09/kala-jamun.jpg", 
        description: "Sweet milk dumplings" 
    },
    { 
        id: 7, 
        name: "Rasmalai", 
        category: "desserts", 
        price: 140, 
        image: "https://thumbs.dreamstime.com/b/delicious-rasmalai-dessert-saffron-garnishes-bowl-close-up-shot-creamy-popular-indian-swimming-rich-milk-topped-417886250.jpg?w=768", 
        description: "Cheese patties in sweet milk" 
    },
    { 
        id: 8, 
        name: "Mango Lassi", 
        category: "drinks", 
        price: 80, 
        image: "https://sixhungryfeet.com/wp-content/uploads/2022/07/Vegan-Mango-Lassi-7.jpg", 
        description: "Sweet yogurt mango drink" 
    },
    { 
        id: 9, 
        name: "Masala Chai", 
        category: "drinks", 
        price: 40, 
        image: "https://spicestationsilverlake.com/wp-content/uploads/2023/03/An-Introduction-to-Masala-Chai-Indias-Spiced-Tea.jpg", 
        description: "Spiced Indian tea" 
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load featured dishes if on home page
    if (document.getElementById('featured-dishes')) {
        loadFeaturedDishes();
    }
    
    // Load menu if on menu page
    if (document.getElementById('menu-items')) {
        loadMenu();
    }
    
    updateCartCount();
    
    // Add event listeners for cart (works on all pages)
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', openCart);
    }
    
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }

    // Add image loading error handling
    setupImageErrorHandling();
    
    // Inject the complete image visibility CSS
    injectImageVisibilityCSS();
});

// Inject CSS for complete image visibility
function injectImageVisibilityCSS() {
    const imageVisibilityCSS = `
        /* Complete Image Visibility Styles */
        .dish-image-container {
            position: relative;
            overflow: hidden;
            height: 250px; /* Increased height for better image display */
            width: 100%;
        }
        
        .dish-image {
            width: 100%;
            height: 100%;
            object-fit: contain; /* Changed from cover to contain to show full image */
            background: linear-gradient(135deg, #f8f6ff, #e6d8ff);
            transition: all 0.5s ease;
            padding: 10px;
            border-radius: 10px;
        }
        
        .dish-image.zoom-effect {
            transform: scale(1.05);
        }
        
        .dish-card:hover .dish-image {
            transform: scale(1.08);
            object-fit: cover; /* Switch to cover on hover for artistic effect */
        }
        
        /* Royal overlay adjustments for contained images */
        .royal-overlay {
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            bottom: 10px;
            background: linear-gradient(135deg, rgba(74, 44, 141, 0.85) 0%, rgba(212, 175, 55, 0.75) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            border-radius: 8px;
        }
        
        /* Menu page specific adjustments */
        .menu-page .dish-image-container {
            height: 280px; /* Even taller for menu page */
        }
        
        .menu-page .dish-image {
            object-fit: contain;
            background: white;
            border: 2px solid #e6d8ff;
        }
        
        /* Featured dishes adjustments */
        .featured-dishes .dish-image-container {
            height: 220px;
        }
        
        /* Ensure images maintain aspect ratio */
        .dish-image[src*=".jpg"], 
        .dish-image[src*=".jpeg"], 
        .dish-image[src*=".png"], 
        .dish-image[src*=".webp"] {
            max-width: 100%;
            max-height: 100%;
            margin: 0 auto;
            display: block;
        }
        
        /* Loading state for images */
        .dish-image.loading {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        
        /* Image error fallback */
        .dish-image.error {
            background: linear-gradient(135deg, #4a2c8d, #6b4caf);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #d4af37;
            font-weight: bold;
            font-size: 1.1rem;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .dish-image-container {
                height: 200px;
            }
            
            .menu-page .dish-image-container {
                height: 220px;
            }
            
            .featured-dishes .dish-image-container {
                height: 180px;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = imageVisibilityCSS;
    document.head.appendChild(styleSheet);
}

// Setup image error handling for missing images
function setupImageErrorHandling() {
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG' && e.target.classList.contains('dish-image')) {
            const dishName = e.target.alt || 'Dish';
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNGEyYzhkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2Q0YWYzNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KICA8dGV4dCB4PSI1MCUiIHk9IjU1JSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjZTZkOGZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+JHtkaXNoTmFtZX08L3RleHQ+Cjwvc3ZnPg==';
            e.target.classList.add('error');
            e.target.alt = `Image not available for ${dishName}`;
        }
    }, true);
}

// Enhanced image loading with better handling
function createDishImage(imageUrl, altText, dishName) {
    const img = new Image();
    img.src = imageUrl;
    img.alt = altText;
    img.classList.add('dish-image', 'loading');
    img.loading = 'lazy';
    
    img.onload = function() {
        img.classList.remove('loading');
        img.classList.add('loaded');
    };
    
    img.onerror = function() {
        img.classList.remove('loading');
        img.classList.add('error');
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNGEyYzhkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2Q0YWYzNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KICA8dGV4dCB4PSI1MCUiIHk9IjU1JSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjZTZkOGZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+JHtkaXNoTmFtZX08L3RleHQ+Cjwvc3ZnPg==';
    };
    
    return img;
}

// Load featured dishes with images
function loadFeaturedDishes() {
    const dishesGrid = document.getElementById('featured-dishes');
    if (dishesGrid) {
        dishesGrid.innerHTML = featuredDishes.map(dish => `
            <div class="dish-card" data-dish-id="${dish.id}">
                <div class="dish-image-container">
                    ${createDishImage(dish.image, dish.name, dish.name).outerHTML}
                    <div class="royal-overlay">
                        <div class="overlay-content">
                            <span class="view-details">View Details</span>
                            <span class="royal-badge">Royal Special</span>
                        </div>
                    </div>
                </div>
                <div class="dish-info">
                    <h3>${dish.name}</h3>
                    <p class="dish-description">${dish.description}</p>
                    <p class="dish-price">₹${dish.price}</p>
                    <button class="add-to-cart royal-btn" onclick="addToCart(${dish.id})">
                        <span class="btn-icon">👑</span>
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');

        // Add royal hover effects
        addRoyalHoverEffects();
    }
}

// Load menu items with images
function loadMenu(category = 'all') {
    const menuContainer = document.getElementById('menu-items');
    if (!menuContainer) return;
    
    // Add menu page class for specific styling
    document.body.classList.add('menu-page');
    
    const filteredItems = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);
    
    menuContainer.innerHTML = filteredItems.map(item => `
        <div class="dish-card" data-dish-id="${item.id}">
            <div class="dish-image-container">
                ${createDishImage(item.image, item.name, item.name).outerHTML}
                <div class="royal-overlay">
                    <div class="overlay-content">
                        <span class="view-details">View Details</span>
                        <span class="royal-badge">${getCategoryBadge(item.category)}</span>
                    </div>
                </div>
            </div>
            <div class="dish-info">
                <h3>${item.name}</h3>
                <p class="dish-category">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
                <p class="dish-description">${item.description}</p>
                <p class="dish-price">₹${item.price}</p>
                <button class="add-to-cart royal-btn" onclick="addToCart(${item.id})">
                    <span class="btn-icon">👑</span>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    // Add royal hover effects
    addRoyalHoverEffects();
}

// Get appropriate badge for category
function getCategoryBadge(category) {
    const badges = {
        'appetizers': '🍽️ Starter',
        'mains': '👑 Main Course',
        'desserts': '🍰 Dessert',
        'drinks': '🥤 Beverage'
    };
    return badges[category] || 'Royal Special';
}

// Add royal hover effects to dish cards
function addRoyalHoverEffects() {
    const dishCards = document.querySelectorAll('.dish-card');
    
    dishCards.forEach(card => {
        // Mouse enter effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(74, 44, 141, 0.3), 0 0 0 2px #d4af37';
            this.style.zIndex = '10';
            
            const overlay = this.querySelector('.royal-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
                overlay.style.visibility = 'visible';
            }
            
            const image = this.querySelector('.dish-image');
            if (image && image.classList.contains('loaded')) {
                image.style.transform = 'scale(1.08)';
                image.style.objectFit = 'cover'; // Switch to cover on hover
            }
        });
        
        // Mouse leave effect
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(44, 26, 77, 0.15)';
            this.style.zIndex = '1';
            
            const overlay = this.querySelector('.royal-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
            }
            
            const image = this.querySelector('.dish-image');
            if (image && image.classList.contains('loaded')) {
                image.style.transform = 'scale(1)';
                image.style.objectFit = 'contain'; // Back to contain for full image
            }
        });
    });
}

// Filter menu by category
function filterMenu(category) {
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    loadMenu(category);
}

// Cart functions
function addToCart(itemId) {
    const allItems = [...featuredDishes, ...menuItems];
    const dish = allItems.find(d => d.id === itemId);
    
    if (!dish) return;
    
    const existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...dish, quantity: 1 });
    }
    
    updateCart();
    showRoyalNotification(`${dish.name} added to cart! 👑`);
    
    // Add royal animation to cart icon
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2)';
        cartIcon.style.background = '#b8941f';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
            cartIcon.style.background = '#d4af37';
        }, 300);
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
    showRoyalNotification('Item removed from cart', 'warning');
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Add pulse animation when count changes
        if (totalItems > 0) {
            cartCount.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 300);
        }
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div style="text-align: center; color: #6b4caf; padding: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">👑</div>
                    <p style="font-size: 1.1rem;">Your royal cart is empty</p>
                    <p style="color: #4a2c8d; font-size: 0.9rem;">Add some delicious items to begin your feast!</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item royal-cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}" loading="lazy" style="object-fit: cover; width: 60px; height: 60px;">
                    </div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p class="cart-item-price">₹${item.price} x ${item.quantity}</p>
                        <p class="cart-item-total">₹${item.price * item.quantity}</p>
                    </div>
                    <button class="royal-remove-btn" onclick="removeFromCart(${item.id})">
                        <span class="remove-icon">✕</span>
                    </button>
                </div>
            `).join('');
        }
    }
    
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total;
    }
}

function openCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.add('open');
    updateCartDisplay();
    
    // Add royal entrance animation
    cartSidebar.style.transform = 'translateX(0)';
}

function closeCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.remove('open');
    cartSidebar.style.transform = 'translateX(100%)';
}

function checkout() {
    if (cart.length === 0) {
        showRoyalNotification('Your royal cart is empty!', 'warning');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Royal checkout confirmation
    const confirmed = confirm(`👑 Royal Order Confirmation 👑\n\nTotal Amount: ₹${total}\n\nProceed with this magnificent order?`);
    
    if (confirmed) {
        showRoyalNotification(`Order placed successfully! Total: ₹${total}\nThank you for your royal patronage! 👑`, 'success');
        cart = [];
        updateCart();
        closeCart();
        
        // Add confetti effect for successful order
        createRoyalConfetti();
    }
}

// Enhanced royal notification system
function showRoyalNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? '#27ae60' : type === 'warning' ? '#e74c3c' : '#4a2c8d';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, ${bgColor} 0%, #2c1a4d 100%);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 15px;
        z-index: 1002;
        animation: slideIn 0.3s ease;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        font-weight: bold;
        border: 2px solid #d4af37;
        max-width: 300px;
        font-size: 1rem;
        line-height: 1.4;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.5rem;">👑</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Enhanced Royal confetti effect for successful orders
function createRoyalConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.id = 'royal-confetti-container';
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1003;
        overflow: hidden;
    `;
    
    document.body.appendChild(confettiContainer);
    
    const colors = ['#d4af37', '#4a2c8d', '#b8941f', '#6b4caf', '#e6d8ff'];
    const emojis = ['👑', '🍛', '🍽️', '🥘', '🌟', '✨', '🎉', '💫'];
    const animations = ['confettiFall', 'confettiFallLeft', 'confettiFallRight', 'confettiFallZigzag'];
    
    // Create confetti pieces
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const animationType = animations[Math.floor(Math.random() * animations.length)];
            const duration = Math.random() * 2 + 3; // 3-5 seconds
            const delay = Math.random() * 0.3; // 0-0.3 seconds delay
            
            confetti.className = 'confetti-piece';
            confetti.style.cssText = `
                position: fixed;
                top: 0px;
                left: ${Math.random() * 100}%;
                font-size: ${Math.random() * 25 + 20}px;
                color: ${colors[Math.floor(Math.random() * colors.length)]};
                animation: ${animationType} ${duration}s ease-in ${delay}s forwards;
                pointer-events: none;
                text-shadow: 0 2px 8px rgba(0,0,0,0.3);
                z-index: 1004;
            `;
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, (duration + delay) * 1000 + 100);
            
        }, i * 40); // Stagger the creation
    }
    
    // Remove container after all animations complete
    setTimeout(() => {
        if (confettiContainer.parentNode) {
            confettiContainer.remove();
        }
    }, 7000);
}

// AJAX form submission for reservations
function submitReservation(formData) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'process.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    showRoyalNotification('Royal reservation submitted successfully! 👑');
                    if (document.getElementById('reservation-form')) {
                        document.getElementById('reservation-form').reset();
                    }
                } else {
                    showRoyalNotification('Error: ' + response.message, 'warning');
                }
            } catch (e) {
                showRoyalNotification('Thank you! Your royal reservation has been received. 👑');
                if (document.getElementById('reservation-form')) {
                    document.getElementById('reservation-form').reset();
                }
            }
        }
    };
    
    xhr.send(formData);
}

// Handle reservation form submission
document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = new URLSearchParams(formData);
            
            submitReservation(data);
        });
    }
    
    // Load menu if on menu page
    if (document.getElementById('menu-items')) {
        loadMenu();
    }
});