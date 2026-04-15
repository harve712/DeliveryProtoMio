// Menu Items Data
const menuItems = [
    {
        id: "1",
        name: "Grilled Ribeye Steak",
        description: "Prime ribeye with asparagus and roasted vegetables",
        price: 48.0,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1671193238908-d53616285ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwc3RlYWslMjBhc3BhcmFndXMlMjBmaW5lJTIwZGluaW5nfGVufDF8fHx8MTc3NDY2NjkzOHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
        id: "2",
        name: "Pan-Seared Salmon",
        description: "Atlantic salmon with herb butter and seasonal greens",
        price: 42.0,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1767785445931-c4c57ae1b4e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBkaXNoJTIwZmluZSUyMGRpbmluZyUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzc0NjY2OTM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
        id: "3",
        name: "Truffle Pasta",
        description: "Fresh pasta with black truffle and parmesan",
        price: 38.0,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1765100778802-f684a4b7fd20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2glMjBnb3VybWV0JTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzQ2NjY5Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
        id: "4",
        name: "Grilled Lobster Tail",
        description: "Butter-poached lobster with garlic herb sauce",
        price: 62.0,
        category: "Seafood",
        image: "https://images.unsplash.com/photo-1729707691140-d0a5a1d2bb7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2JzdGVyJTIwc2VhZm9vZCUyMGZpbmUlMjBkaW5pbmd8ZW58MXx8fHwxNzc0NjY2OTM5fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
        id: "5",
        name: "Chocolate Soufflé",
        description: "Decadent dark chocolate with vanilla ice cream",
        price: 16.0,
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1737700088850-d0b53f9d39ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2hvY29sYXRlJTIwZ291cm1ldHxlbnwxfHx8fDE3NzQ1NjExNjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
        id: "6",
        name: "Fine Wine Selection",
        description: "Curated selection of premium wines",
        price: 24.0,
        category: "Beverages",
        image: "https://images.unsplash.com/photo-1765021097487-6da56c1ce412?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwZ2xhc3MlMjBkYXJrJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzQ2NjY5Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
];

// State Management
let cart = [];
let currentCategory = "All";
let currentPage = "home";

// DOM Elements
const cartButton = document.getElementById('cartButton');
const cartSheet = document.getElementById('cartSheet');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const menuGrid = document.getElementById('menuGrid');
const categoryFilter = document.getElementById('categoryFilter');
const placeOrderBtn = document.getElementById('placeOrderBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalViewOrder = document.getElementById('modalViewOrder');
const toastNotification = document.getElementById('toastNotification');

// Initialize App
function init() {
    setupNavigation();
    setupCart();
    setupMenu();
    renderMenu();
    updateCartUI();
}

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const viewMenuBtn = document.querySelector('.view-menu-btn');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateToPage(page);
        });
    });

    if (viewMenuBtn) {
        viewMenuBtn.addEventListener('click', () => {
            navigateToPage('menu');
        });
    }
}

function navigateToPage(page) {
    currentPage = page;
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });

    // Show/hide pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });

    if (page === 'home') {
        document.getElementById('homePage').classList.add('active');
    } else if (page === 'menu') {
        document.getElementById('menuPage').classList.add('active');
    } else if (page === 'checkout') {
        document.getElementById('checkoutPage').classList.add('active');
        renderCheckout();
    }

    // Close cart when navigating
    closeCart();
}

// Cart Functions
function setupCart() {
    cartButton.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    checkoutBtn.addEventListener('click', () => {
        navigateToPage('checkout');
    });
    placeOrderBtn.addEventListener('click', placeOrder);
    modalClose.addEventListener('click', () => {
        closeModal();
        navigateToPage('menu');
    });
    modalViewOrder.addEventListener('click', () => {
        closeModal();
        // Since we reset the cart, "Viewing" the order could show a receipt 
        // For now, we'll just navigate to home or maintain a basic state
        navigateToPage('home');
    });
}

function openCart() {
    cartSheet.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSheet.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function addToCart(item) {
    const existingItem = cart.find(i => i.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    updateCartUI();
    showToast();
}

function showToast() {
    toastNotification.classList.add('active');
    setTimeout(() => {
        toastNotification.classList.remove('active');
    }, 3000);
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
}

function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCount.textContent = totalItems;
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;

    if (cart.length === 0) {
        cartEmpty.style.display = 'flex';
        cartFooter.style.display = 'none';
        cartItems.innerHTML = '';
    } else {
        cartEmpty.style.display = 'none';
        cartFooter.style.display = 'block';
        renderCartItems();
    }
}

function renderCartItems() {
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">−</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
            </div>
        </div>
    `).join('');
}

// Menu Functions
function setupMenu() {
    const categoryButtons = categoryFilter.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.dataset.category;
            
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            renderMenu();
        });
    });
}

function renderMenu() {
    const filteredItems = currentCategory === "All" 
        ? menuItems 
        : menuItems.filter(item => item.category === currentCategory);

    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-card">
            <div class="menu-card-image-wrapper">
                <img src="${item.image}" alt="${item.name}" class="menu-card-image">
                <div class="menu-card-overlay"></div>
            </div>
            <div class="menu-card-content">
                <div class="menu-card-header">
                    <div>
                        <p class="menu-card-category">${item.category}</p>
                        <h3 class="menu-card-name">${item.name}</h3>
                    </div>
                    <span class="menu-card-price">$${item.price.toFixed(2)}</span>
                </div>
                <p class="menu-card-description">${item.description}</p>
                <button class="add-to-cart-btn" onclick='addToCart(${JSON.stringify(item)})'>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add to Order
                </button>
            </div>
        </div>
    `).join('');
}

// Checkout Functions
function renderCheckout() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;

    const checkoutItems = document.getElementById('checkoutItems');
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <img src="${item.image}" alt="${item.name}" class="checkout-item-image">
            <div class="checkout-item-details">
                <h3 class="checkout-item-name">${item.name}</h3>
                <p class="checkout-item-quantity">Quantity: ${item.quantity}</p>
            </div>
            <span class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
}

function placeOrder() {
    // Show success modal
    modalOverlay.classList.add('active');
    
    // Reset cart
    cart = [];
    updateCartUI();
}

function closeModal() {
    modalOverlay.classList.remove('active');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
