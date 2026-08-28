import { useState } from 'react';
import { 
  ShoppingBag, Search, MapPin, Star, Zap, 
  Bell, Layers, Lock, LogOut, X, 
  ChevronRight, Monitor, BarChart2, Filter, Package,
  User, CheckCircle2, DollarSign, Activity, Cpu, ArrowUpRight,
  Building, RefreshCw, CreditCard, ShieldCheck, Truck
} from 'lucide-react';
import type { Order, OrderStatus, CatalogItem, ShippingAddress } from './types';

interface ProductItem extends CatalogItem {
  rating: number;
  reviews: number;
  mrp: number;
  image: string;
  colorName: string;
  colorHex: string;
}

// Expanded Amazon / Flipkart style wholesale fabric & apparel catalog with color variants
const ECOM_PRODUCTS: ProductItem[] = [
  // Apparel & Clothing - T-Shirts
  { id: 'cat_01a', name: 'Premium Cotton T-Shirts Pack (10x)', price: 49.99, mrp: 69.99, rating: 4.8, reviews: 1420, category: 'Apparel & Clothing', icon: '👕', image: '/assets/cotton_tshirts.png', colorName: 'Bright White', colorHex: '#ffffff' },
  { id: 'cat_01b', name: 'Premium Cotton T-Shirts Pack (10x)', price: 49.99, mrp: 69.99, rating: 4.9, reviews: 1180, category: 'Apparel & Clothing', icon: '👕', image: '/assets/cotton_tshirts.png', colorName: 'Onyx Black', colorHex: '#18181b' },
  { id: 'cat_01c', name: 'Premium Cotton T-Shirts Pack (10x)', price: 49.99, mrp: 69.99, rating: 4.7, reviews: 920, category: 'Apparel & Clothing', icon: '👕', image: '/assets/cotton_tshirts.png', colorName: 'Navy Blue', colorHex: '#1e3a8a' },
  { id: 'cat_01d', name: 'Premium Cotton T-Shirts Pack (10x)', price: 49.99, mrp: 69.99, rating: 4.8, reviews: 850, category: 'Apparel & Clothing', icon: '👕', image: '/assets/cotton_tshirts.png', colorName: 'Heather Grey', colorHex: '#9ca3af' },

  // Apparel & Clothing - Denim Jeans
  { id: 'cat_02a', name: 'Heavyweight Denim Jeans (5x Bulk)', price: 89.99, mrp: 119.99, rating: 4.7, reviews: 980, category: 'Apparel & Clothing', icon: '👖', image: '/assets/denim_jeans.png', colorName: 'Raw Indigo Blue', colorHex: '#1d4ed8' },
  { id: 'cat_02b', name: 'Heavyweight Denim Jeans (5x Bulk)', price: 89.99, mrp: 119.99, rating: 4.9, reviews: 1250, category: 'Apparel & Clothing', icon: '👖', image: '/assets/denim_jeans.png', colorName: 'Jet Black', colorHex: '#09090b' },
  { id: 'cat_02c', name: 'Heavyweight Denim Jeans (5x Bulk)', price: 89.99, mrp: 119.99, rating: 4.6, reviews: 740, category: 'Apparel & Clothing', icon: '👖', image: '/assets/denim_jeans.png', colorName: 'Vintage Light Blue', colorHex: '#60a5fa' },

  // Apparel & Clothing - Formal Linen Shirts
  { id: 'cat_03a', name: 'Formal Linen Shirts Set (6x)', price: 74.99, mrp: 99.99, rating: 4.9, reviews: 2150, category: 'Apparel & Clothing', icon: '👔', image: '/assets/linen_shirts.png', colorName: 'Oatmeal Beige', colorHex: '#d4b996' },
  { id: 'cat_03b', name: 'Formal Linen Shirts Set (6x)', price: 74.99, mrp: 99.99, rating: 4.8, reviews: 1640, category: 'Apparel & Clothing', icon: '👔', image: '/assets/linen_shirts.png', colorName: 'Pure White', colorHex: '#ffffff' },
  { id: 'cat_03c', name: 'Formal Linen Shirts Set (6x)', price: 74.99, mrp: 99.99, rating: 4.7, reviews: 1100, category: 'Apparel & Clothing', icon: '👔', image: '/assets/linen_shirts.png', colorName: 'Sky Blue', colorHex: '#93c5fd' },
  { id: 'cat_03d', name: 'Formal Linen Shirts Set (6x)', price: 74.99, mrp: 99.99, rating: 4.8, reviews: 890, category: 'Apparel & Clothing', icon: '👔', image: '/assets/linen_shirts.png', colorName: 'Olive Green', colorHex: '#4d7c0f' },

  // Curtains & Drapes
  { id: 'cat_04a', name: 'Velvet Blackout Window Curtains (Pair)', price: 34.99, mrp: 49.99, rating: 4.8, reviews: 1120, category: 'Curtains & Drapes', icon: '🪟', image: '/assets/velvet_curtains.png', colorName: 'Emerald Green', colorHex: '#047857' },
  { id: 'cat_04b', name: 'Velvet Blackout Window Curtains (Pair)', price: 34.99, mrp: 49.99, rating: 4.9, reviews: 1430, category: 'Curtains & Drapes', icon: '🪟', image: '/assets/velvet_curtains.png', colorName: 'Royal Navy', colorHex: '#1e1b4b' },
  { id: 'cat_04c', name: 'Velvet Blackout Window Curtains (Pair)', price: 34.99, mrp: 49.99, rating: 4.7, reviews: 880, category: 'Curtains & Drapes', icon: '🪟', image: '/assets/velvet_curtains.png', colorName: 'Wine Crimson', colorHex: '#881337' },
  { id: 'cat_04d', name: 'Velvet Blackout Window Curtains (Pair)', price: 34.99, mrp: 49.99, rating: 4.8, reviews: 950, category: 'Curtains & Drapes', icon: '🪟', image: '/assets/velvet_curtains.png', colorName: 'Charcoal Grey', colorHex: '#3f3f46' },

  // Bed Sheets & Bedding
  { id: 'cat_05a', name: 'Egyptian Cotton 800-TC King Bed Sheet Set', price: 54.99, mrp: 79.99, rating: 4.9, reviews: 3400, category: 'Bed Sheets & Bedding', icon: '🛏️', image: '/assets/bed_sheets.png', colorName: 'Snow White', colorHex: '#f8fafc' },
  { id: 'cat_05b', name: 'Egyptian Cotton 800-TC King Bed Sheet Set', price: 54.99, mrp: 79.99, rating: 4.8, reviews: 2100, category: 'Bed Sheets & Bedding', icon: '🛏️', image: '/assets/bed_sheets.png', colorName: 'Slate Grey', colorHex: '#64748b' },
  { id: 'cat_05c', name: 'Egyptian Cotton 800-TC King Bed Sheet Set', price: 54.99, mrp: 79.99, rating: 4.7, reviews: 1540, category: 'Bed Sheets & Bedding', icon: '🛏️', image: '/assets/bed_sheets.png', colorName: 'Blush Pink', colorHex: '#fbcfe8' },
  { id: 'cat_05d', name: 'Egyptian Cotton 800-TC King Bed Sheet Set', price: 54.99, mrp: 79.99, rating: 4.9, reviews: 1890, category: 'Bed Sheets & Bedding', icon: '🛏️', image: '/assets/bed_sheets.png', colorName: 'Sage Green', colorHex: '#a7f3d0' },

  // Linen & Fabrics
  { id: 'cat_06a', name: 'Raw Organic Linen Fabric Bolt (10 Yards)', price: 64.99, mrp: 89.99, rating: 4.8, reviews: 790, category: 'Linen & Fabrics', icon: '🧵', image: '/assets/fabric_bolt.png', colorName: 'Natural Flax', colorHex: '#e5d5c5' },
  { id: 'cat_06b', name: 'Raw Organic Linen Fabric Bolt (10 Yards)', price: 64.99, mrp: 89.99, rating: 4.9, reviews: 920, category: 'Linen & Fabrics', icon: '🧵', image: '/assets/fabric_bolt.png', colorName: 'Bleached White', colorHex: '#f8fafc' },
  { id: 'cat_06c', name: 'Raw Organic Linen Fabric Bolt (10 Yards)', price: 64.99, mrp: 89.99, rating: 4.7, reviews: 610, category: 'Linen & Fabrics', icon: '🧵', image: '/assets/fabric_bolt.png', colorName: 'Terracotta Rust', colorHex: '#c2410c' }
];

const RETAILER_FRANCHISE_MAP: Record<string, string> = {
  'retailer_east': 'East Coast Logistics Hub',
  'retailer_west': 'West Coast Distribution Center',
  'retailer_south': 'Southern Fulfillment Depot'
};

interface UserAccount {
  id: string;
  email: string;
  name: string;
  role: 'retailer' | 'franchise' | 'admin';
  retailerId?: string;
  franchiseId?: string;
  avatar: string;
  description: string;
}

const DEMO_ACCOUNTS: UserAccount[] = [
  {
    id: 'ret_east',
    email: 'retailer.east@supplychain.com',
    name: 'Retailer East Branch',
    role: 'retailer',
    retailerId: 'retailer_east',
    avatar: '🛒',
    description: 'Retailer East Storefront & Orders'
  },
  {
    id: 'ret_west',
    email: 'retailer.west@supplychain.com',
    name: 'Retailer West Branch',
    role: 'retailer',
    retailerId: 'retailer_west',
    avatar: '🛒',
    description: 'Retailer West Storefront & Orders'
  },
  {
    id: 'fran_east',
    email: 'franchise.east@supplychain.com',
    name: 'East Coast Logistics Operator',
    role: 'franchise',
    franchiseId: 'East Coast Logistics Hub',
    avatar: '🏪',
    description: 'East Hub Fulfillment Queue'
  },
  {
    id: 'fran_west',
    email: 'franchise.west@supplychain.com',
    name: 'West Coast Distribution Operator',
    role: 'franchise',
    franchiseId: 'West Coast Distribution Center',
    avatar: '🏪',
    description: 'West Hub Fulfillment Queue'
  },
  {
    id: 'admin_master',
    email: 'admin@supplychain.com',
    name: 'Azure Supply Chain Administrator',
    role: 'admin',
    avatar: '👑',
    description: 'Master Access Across All Systems'
  }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [appMode, setAppMode] = useState<'retailer' | 'franchise' | 'admin'>('retailer');

  // Single Login Form Inputs
  const [emailInput, setEmailInput] = useState<string>('retailer.east@supplychain.com');
  const [passwordInput, setPasswordInput] = useState<string>('••••••••');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Retailer App States
  const [retailerTab, setRetailerTab] = useState<'catalog' | 'orders'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping_payment'>('cart');

  // Shipping Address Form State
  const [shipName, setShipName] = useState<string>('Retailer East Branch - John Doe');
  const [shipStreet, setShipStreet] = useState<string>('742 Evergreen Terrace, Suite 100');
  const [shipCityZip, setShipCityZip] = useState<string>('New York, NY 10001');
  const [shipPhone, setShipPhone] = useState<string>('+1 (555) 019-2834');

  // Payment Method State
  const [selectedPayment, setSelectedPayment] = useState<string>('Wholesale Net 30 Line of Credit');
  const [cardNumber, setCardNumber] = useState<string>('•••• •••• •••• 4242');

  // Admin Interactive Drill-down View State
  const [adminTab, setAdminTab] = useState<'overview' | 'revenue' | 'pipeline' | 'kafka' | 'hubs'>('overview');
  const [selectedHub, setSelectedHub] = useState<string | null>(null);

  // Global Real-Time Orders State
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-8812',
      items: [{ id: 'cat_01', name: 'Premium Cotton T-Shirts Pack (10x)', quantity: 2, price: 49.99 }],
      totalPrice: 99.98,
      retailerId: 'retailer_east',
      franchiseId: 'East Coast Logistics Hub',
      status: 'Delivered',
      timestamp: new Date(Date.now() - 7200000).toLocaleTimeString(),
      shippingAddress: {
        fullName: 'Retailer East Outlet',
        street: '742 Evergreen Terrace, Suite 100',
        cityStateZip: 'New York, NY 10001',
        phone: '+1 (555) 019-2834'
      },
      paymentMethod: 'Wholesale Net 30 Line of Credit'
    },
    {
      id: 'ORD-9023',
      items: [{ id: 'cat_05', name: 'Egyptian Cotton 800-TC King Bed Sheet Set', quantity: 1, price: 54.99 }],
      totalPrice: 54.99,
      retailerId: 'retailer_west',
      franchiseId: 'West Coast Distribution Center',
      status: 'Dispatched',
      timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(),
      shippingAddress: {
        fullName: 'Retailer West Depot',
        street: '100 Bay Street, Suite 400',
        cityStateZip: 'San Francisco, CA 94105',
        phone: '+1 (555) 982-1144'
      },
      paymentMethod: 'Credit Card (Visa ending in 4242)'
    }
  ]);

  // Notifications
  const [toast, setToast] = useState<{ title: string; body: string } | null>(null);

  const showToast = (title: string, body: string) => {
    setToast({ title, body });
    setTimeout(() => setToast(null), 4000);
  };

  // Cart Helper
  const updateQty = (id: string, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const getCartTotalItems = () => Object.values(cart).reduce((a, b) => a + b, 0);
  const getCartTotalPrice = () => Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = ECOM_PRODUCTS.find(p => p.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  // Submit Login Handler
  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedAccount = DEMO_ACCOUNTS.find(a => a.email.toLowerCase() === emailInput.trim().toLowerCase());
    if (matchedAccount) {
      setCurrentUser(matchedAccount);
      setLoginError(null);
      if (matchedAccount.role === 'retailer') setAppMode('retailer');
      if (matchedAccount.role === 'franchise') setAppMode('franchise');
      if (matchedAccount.role === 'admin') setAppMode('admin');
    } else {
      setLoginError('Invalid email address. Please select a demo account below.');
    }
  };

  // Quick Select Account Pill
  const handleQuickSelectEmail = (account: UserAccount) => {
    setEmailInput(account.email);
    setCurrentUser(account);
    setLoginError(null);
    if (account.role === 'retailer') setAppMode('retailer');
    if (account.role === 'franchise') setAppMode('franchise');
    if (account.role === 'admin') setAppMode('admin');
  };

  // Logout Handler
  const handleLogout = () => {
    setCurrentUser(null);
    setCart({});
    setIsCartOpen(false);
    setCheckoutStep('cart');
  };

  // Place Order Handler with Shipping & Payment details
  const handlePlaceOrder = () => {
    if (!currentUser || !currentUser.retailerId) return;

    const items = Object.entries(cart)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => {
        const item = ECOM_PRODUCTS.find(p => p.id === id)!;
        return { id, name: item.name, quantity: qty, price: item.price };
      });

    if (items.length === 0) return;

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const assignedFranchise = RETAILER_FRANCHISE_MAP[currentUser.retailerId] || 'East Coast Logistics Hub';
    
    const shippingInfo: ShippingAddress = {
      fullName: shipName,
      street: shipStreet,
      cityStateZip: shipCityZip,
      phone: shipPhone
    };

    const newOrder: Order = {
      id: orderId,
      items,
      totalPrice: parseFloat(getCartTotalPrice().toFixed(2)),
      retailerId: currentUser.retailerId,
      franchiseId: assignedFranchise,
      status: 'Placed',
      timestamp: new Date().toLocaleTimeString(),
      shippingAddress: shippingInfo,
      paymentMethod: selectedPayment
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart({});
    setIsCartOpen(false);
    setCheckoutStep('cart');
    setRetailerTab('orders');
    showToast('Wholesale Order Placed!', `Order ${orderId} routed to ${assignedFranchise}`);
  };

  // Update Status Handler
  const handleUpdateStatus = (orderId: string, nextStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));
    showToast(`Order Status Updated: ${nextStatus}`, `Order ${orderId} updated to ${nextStatus}.`);
  };

  // Filtered Products
  const filteredProducts = ECOM_PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesColor = selectedColor === 'All' || product.colorName === selectedColor;
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.colorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesColor && matchesSearch;
  });

  // Scoped Data
  const getScopedRetailerOrders = () => {
    if (!currentUser) return [];
    if (currentUser.role === 'admin') return orders;
    return orders.filter(o => o.retailerId === currentUser.retailerId);
  };

  const getScopedFranchiseOrders = () => {
    if (!currentUser) return [];
    if (currentUser.role === 'admin') return orders;
    return orders.filter(o => o.franchiseId === currentUser.franchiseId);
  };

  const totalRevenue = orders.reduce((sum, o) => o.status === 'Delivered' ? sum + o.totalPrice : sum, 0);
  const pendingOrdersCount = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;

  // IF NOT LOGGED IN: Render Authentic Amazon Login Screen
  if (!currentUser) {
    return (
      <div className="full-app-container">
        <div className="amazon-login-wrapper">
          <div className="amazon-login-logo">
            <div className="ecom-logo-icon">⚡</div>
            <span>AZA-Express</span>
          </div>

          <div className="amazon-login-box">
            <h1 className="amazon-login-title">Sign in</h1>

            {loginError && (
              <div style={{ padding: '10px', borderRadius: '6px', background: '#fee2e2', color: '#dc2626', fontSize: '12px', marginBottom: '14px' }}>
                {loginError}
              </div>
            )}

            <form onSubmit={handleFormLogin}>
              <div className="amazon-field-group">
                <label className="amazon-field-label">Email or mobile phone number</label>
                <input 
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="amazon-input"
                  required
                />
              </div>

              <div className="amazon-field-group">
                <label className="amazon-field-label">Password</label>
                <input 
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="amazon-input"
                  required
                />
              </div>

              <button type="submit" className="btn-amazon-primary">
                Sign in
              </button>
            </form>

            <div style={{ fontSize: '11px', color: '#555', marginTop: '16px', lineHeight: '1.4' }}>
              By continuing, you agree to AZA Express's Conditions of Use and Privacy Notice.
            </div>

            <div className="quick-email-selector-title">
              <User size={14} /> Quick Demo Accounts (Select to Auto-fill)
            </div>

            <div className="email-pills-list">
              {DEMO_ACCOUNTS.map(acc => (
                <div 
                  key={acc.id}
                  className="email-pill-btn"
                  onClick={() => handleQuickSelectEmail(acc)}
                >
                  <div>
                    <div className="email-address-text">{acc.email}</div>
                    <div style={{ fontSize: '11px', color: '#666' }}>{acc.name}</div>
                  </div>
                  <span className={`email-role-badge badge-${acc.role}`}>
                    {acc.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="full-app-container">
      
      {/* Top Header */}
      <header className="ecom-top-header">
        <div className="ecom-logo-brand" onClick={() => setRetailerTab('catalog')}>
          <div className="ecom-logo-icon">⚡</div>
          <span>AZA-Express</span>
        </div>

        <div className="ecom-location-pill">
          <MapPin size={16} style={{ color: '#ea580c' }} />
          <div>
            <div>Deliver to <strong>{currentUser.name}</strong></div>
            <div style={{ fontSize: '10px' }}>Wholesale Hub • 10001</div>
          </div>
        </div>

        <div className="ecom-search-bar">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="ecom-search-category-select"
          >
            <option value="All">All Categories</option>
            <option value="Apparel & Clothing">Apparel & Clothing</option>
            <option value="Curtains & Drapes">Curtains & Drapes</option>
            <option value="Bed Sheets & Bedding">Bed Sheets & Bedding</option>
            <option value="Linen & Fabrics">Linen & Fabrics</option>
          </select>

          <input 
            type="text"
            placeholder="Search 10,000+ Wholesale Items (e.g. T-Shirts, Curtains, Bed Sheets)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ecom-search-input"
          />

          <button className="ecom-search-btn">
            <Search size={18} />
          </button>
        </div>

        <div className="ecom-nav-actions">
          <div className="ecom-action-item">
            <span className="ecom-action-label">Hello, {currentUser.name}</span>
            <span className="ecom-action-val" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              Account ({currentUser.role.toUpperCase()})
            </span>
          </div>

          <div className="ecom-action-item" onClick={() => { setAppMode('retailer'); setRetailerTab('orders'); }}>
            <span className="ecom-action-label">Returns &</span>
            <span className="ecom-action-val">Orders ({getScopedRetailerOrders().length})</span>
          </div>

          <button className="ecom-cart-btn" onClick={() => { setIsCartOpen(true); setCheckoutStep('cart'); }}>
            <ShoppingBag size={18} />
            <span>Cart</span>
            <span className="cart-badge-num">{getCartTotalItems()}</span>
          </button>

          <button className="btn-signout" onClick={handleLogout}>
            <LogOut size={14} />
          </button>
        </div>
      </header>

      {/* Sub Header */}
      <div className="ecom-sub-nav">
        <div 
          className={`sub-nav-link ${appMode === 'retailer' && retailerTab === 'catalog' ? 'active' : ''}`}
          onClick={() => { setAppMode('retailer'); setRetailerTab('catalog'); }}
        >
          <ShoppingBag size={15} /> All Wholesale Inventory
        </div>
        
        <div 
          className={`sub-nav-link ${appMode === 'retailer' && retailerTab === 'orders' ? 'active' : ''}`}
          onClick={() => { setAppMode('retailer'); setRetailerTab('orders'); }}
        >
          <Package size={15} /> Track Packages & Delivery ({getScopedRetailerOrders().length})
        </div>

        {(currentUser.role === 'franchise' || currentUser.role === 'admin') && (
          <div 
            className={`sub-nav-link ${appMode === 'franchise' ? 'active' : ''}`}
            onClick={() => setAppMode('franchise')}
          >
            <Monitor size={15} /> Franchise Operations Portal
          </div>
        )}

        {currentUser.role === 'admin' && (
          <div 
            className={`sub-nav-link ${appMode === 'admin' ? 'active' : ''}`}
            onClick={() => setAppMode('admin')}
          >
            <BarChart2 size={15} /> Executive Analytics Dashboard
          </div>
        )}
      </div>

      {/* Notification Toast */}
      {toast && (
        <div className="push-toast">
          <Bell size={20} style={{ color: '#ea580c', flexShrink: 0 }} />
          <div>
            <div className="toast-title">{toast.title}</div>
            <div className="toast-body">{toast.body}</div>
          </div>
        </div>
      )}

      {/* RETAILER APP */}
      {appMode === 'retailer' && (
        <div style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '24px' }}>
          
          {retailerTab === 'catalog' && (
            <div>
              <div className="ecom-hero-banner">
                <div>
                  <span className="hero-banner-tag">
                    <Zap size={12} /> Same-Day Express Dispatch
                  </span>
                  <h1 className="hero-banner-title">
                    Wholesale Apparel & Textile Deals <br />
                    Up to 40% OFF Bulk Linens & Clothing
                  </h1>
                  <p className="hero-banner-subtitle">
                    Automated regional hub routing from {currentUser.name} to {RETAILER_FRANCHISE_MAP[currentUser.retailerId || 'retailer_east']}.
                  </p>
                </div>

                <div className="hero-deal-badge">
                  <div className="hero-deal-discount">SAVE 40%</div>
                  <div className="hero-deal-text">On Clothing, Bed Sheets & Curtains</div>
                </div>
              </div>

              <div className="ecom-main-layout">
                <div className="ecom-sidebar-filters">
                  <div className="filter-section-title">
                    <Filter size={14} style={{ display: 'inline', marginRight: '6px' }} /> Categories
                  </div>
                  <div className="filter-list" style={{ marginBottom: '20px' }}>
                    {['All', 'Apparel & Clothing', 'Curtains & Drapes', 'Bed Sheets & Bedding', 'Linen & Fabrics'].map(cat => (
                      <div 
                        key={cat}
                        className={`filter-item ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                      >
                        <span>{cat}</span>
                        <ChevronRight size={14} />
                      </div>
                    ))}
                  </div>

                  <div className="filter-section-title">
                    <Filter size={14} style={{ display: 'inline', marginRight: '6px' }} /> Filter by Color
                  </div>
                  <div className="filter-list">
                    <div 
                      className={`filter-item ${selectedColor === 'All' ? 'active' : ''}`}
                      onClick={() => setSelectedColor('All')}
                    >
                      <span>🎨 All Colors</span>
                    </div>
                    {Array.from(new Set(ECOM_PRODUCTS.map(p => p.colorName))).map(cName => {
                      const colorObj = ECOM_PRODUCTS.find(p => p.colorName === cName);
                      return (
                        <div 
                          key={cName}
                          className={`filter-item ${selectedColor === cName ? 'active' : ''}`}
                          onClick={() => setSelectedColor(cName)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ 
                              width: '10px', 
                              height: '10px', 
                              borderRadius: '50%', 
                              background: colorObj?.colorHex || '#ccc',
                              border: '1px solid #cbd5e1',
                              display: 'inline-block'
                            }} />
                            <span>{cName}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="ecom-products-grid">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="ecom-product-card">
                      <span className="prime-tag">⚡ Express</span>
                      
                      <div className="ecom-product-img-box">
                        <img src={product.image} alt={product.name} className="product-real-img" />
                      </div>

                      <div>
                        <div className="ecom-product-title">{product.name}</div>
                        
                        {/* Color Swatch Badge */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '4px 0 8px' }}>
                          <span style={{ 
                            width: '11px', 
                            height: '11px', 
                            borderRadius: '50%', 
                            background: product.colorHex,
                            border: '1px solid #94a3b8',
                            display: 'inline-block',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.15)'
                          }} />
                          <span style={{ fontSize: '11px', color: '#52525b', fontWeight: '600' }}>
                            Color: <strong style={{ color: '#27272a' }}>{product.colorName}</strong>
                          </span>
                        </div>

                        <div className="ecom-rating-row">
                          <Star size={14} fill="#ea580c" color="#ea580c" />
                          <span style={{ fontWeight: 'bold' }}>{product.rating}</span>
                          <span className="ecom-rating-count">({product.reviews.toLocaleString()})</span>
                        </div>

                        <div className="ecom-price-row">
                          <span className="ecom-price-main">${product.price.toFixed(2)}</span>
                          <span className="ecom-price-mrp">${product.mrp.toFixed(2)}</span>
                          <span className="ecom-price-discount">
                            {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                          </span>
                        </div>
                      </div>

                      <div>
                        {(cart[product.id] || 0) > 0 ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button className="btn-qty" onClick={() => updateQty(product.id, -1)}>-</button>
                            <span style={{ fontWeight: 'bold', fontSize: '14px', flex: 1, textAlign: 'center' }}>
                              {cart[product.id]} in cart
                            </span>
                            <button className="btn-qty" onClick={() => updateQty(product.id, 1)}>+</button>
                          </div>
                        ) : (
                          <button className="btn-ecom-add" onClick={() => updateQty(product.id, 1)}>
                            + Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {retailerTab === 'orders' && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '4px' }}>Your Orders</h2>
              <p style={{ color: '#52525b', fontSize: '14px', marginBottom: '24px' }}>Track packages & review shipment details for {currentUser.name}</p>

              {getScopedRetailerOrders().length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2ddd3' }}>
                  <Layers size={36} style={{ marginBottom: '12px', opacity: 0.5 }} />
                  <p>No placed orders found for {currentUser.name}</p>
                </div>
              ) : (
                getScopedRetailerOrders().map(order => {
                  const sequence = ['Placed', 'Confirmed', 'Dispatched', 'Delivered'];
                  const currentIdx = sequence.indexOf(order.status);
                  const progressPct = (currentIdx / (sequence.length - 1)) * 100;

                  return (
                    <div key={order.id} className="amazon-tracker-card">
                      {/* Top Summary */}
                      <div className="amazon-tracker-top-summary">
                        <div>
                          <div className="summary-block-label">ORDER PLACED</div>
                          <div className="summary-block-val">{order.timestamp}</div>
                        </div>

                        <div>
                          <div className="summary-block-label">TOTAL</div>
                          <div className="summary-block-val">${order.totalPrice.toFixed(2)}</div>
                        </div>

                        <div>
                          <div className="summary-block-label">SHIP TO</div>
                          <div className="summary-block-val">{order.shippingAddress?.fullName || currentUser.name}</div>
                        </div>

                        <div>
                          <div className="summary-block-label">ORDER # {order.id}</div>
                          <div className="summary-block-val" style={{ color: '#ea580c', cursor: 'pointer' }}>View Invoice Details</div>
                        </div>
                      </div>

                      {/* Delivery Status Title */}
                      <div className="amazon-delivery-status-header">
                        {order.status === 'Delivered' ? '✓ Delivered Today' : 
                         order.status === 'Dispatched' ? '🚚 Out for Delivery' : 
                         order.status === 'Confirmed' ? '📦 Order Confirmed by Franchise' : 
                         '🕒 Order Placed & Buffered'}
                      </div>
                      <div className="amazon-delivery-subtext">
                        Package processed at <strong>{order.franchiseId}</strong>
                      </div>

                      {/* Stepper Progress Line */}
                      <div className="amazon-progress-container">
                        <div className="amazon-progress-line-bg"></div>
                        <div className="amazon-progress-line-fill" style={{ width: `${progressPct}%` }}></div>

                        <div className="amazon-steps-grid">
                          {[
                            { state: 'Placed', label: 'Ordered' },
                            { state: 'Confirmed', label: 'Confirmed' },
                            { state: 'Dispatched', label: 'Out for delivery' },
                            { state: 'Delivered', label: 'Delivered' }
                          ].map((step, idx) => {
                            const isDone = sequence.indexOf(step.state) < currentIdx;
                            const isActive = step.state === order.status;

                            return (
                              <div key={step.state} className="amazon-step-item">
                                <div className={`amazon-step-circle ${isDone ? 'done' : isActive ? 'active' : ''}`}>
                                  {isDone ? <CheckCircle2 size={18} /> : (idx + 1)}
                                </div>
                                <span className={`amazon-step-title ${isDone ? 'done' : isActive ? 'active' : ''}`}>
                                  {step.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Shipping Address & Payment Method Details */}
                      <div className="fedex-tracking-detail-box">
                        <div>
                          <div style={{ fontWeight: 'bold', marginBottom: '2px', color: '#27272a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MapPin size={14} style={{ color: '#ea580c' }} /> Delivery Address:
                          </div>
                          <div style={{ color: '#52525b', fontSize: '11px' }}>
                            {order.shippingAddress?.street || '742 Evergreen Terrace'}, {order.shippingAddress?.cityStateZip || 'New York, NY 10001'}
                          </div>
                        </div>

                        <div>
                          <div style={{ fontWeight: 'bold', marginBottom: '2px', color: '#27272a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <CreditCard size={14} style={{ color: '#059669' }} /> Payment Method:
                          </div>
                          <div style={{ color: '#059669', fontSize: '11px', fontWeight: 'bold' }}>
                            {order.paymentMethod || 'Wholesale Net 30 Line of Credit'}
                          </div>
                        </div>

                        <div>
                          <span style={{ color: '#71717a' }}>Tracking ID:</span> <strong style={{ fontFamily: 'var(--mono)', color: '#27272a' }}>FEDEX-AZA-{order.id.replace('ORD-','')}</strong>
                          <span style={{ marginLeft: '12px', color: '#71717a' }}>Carrier:</span> <strong style={{ color: '#059669' }}>FedEx Ground Express</strong>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

        </div>
      )}

      {/* CHECKOUT MODAL DRAWER WITH SHIPPING ADDRESS & PAYMENT SELECTOR */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer-card" onClick={(e) => e.stopPropagation()}>
            <div>
              <div className="cart-drawer-header">
                <span className="cart-drawer-title">
                  {checkoutStep === 'cart' ? `Shopping Cart (${getCartTotalItems()} items)` : 'Checkout: Shipping & Payment'}
                </span>
                <button className="cart-drawer-close" onClick={() => setIsCartOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              {checkoutStep === 'cart' ? (
                /* CART ITEMS LIST VIEW */
                <div className="cart-items-list">
                  {Object.entries(cart).filter(([_, qty]) => qty > 0).map(([id, qty]) => {
                    const item = ECOM_PRODUCTS.find(p => p.id === id)!;
                    return (
                      <div key={id} className="cart-item-row">
                        <div>
                          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{item.name}</div>
                          <div style={{ fontSize: '12px', color: '#059669', fontWeight: 'bold' }}>${item.price.toFixed(2)}</div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button className="btn-qty" onClick={() => updateQty(id, -1)}>-</button>
                          <span style={{ fontWeight: 'bold' }}>{qty}</span>
                          <button className="btn-qty" onClick={() => updateQty(id, 1)}>+</button>
                        </div>
                      </div>
                    );
                  })}

                  {getCartTotalItems() === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: '#71717a' }}>
                      Your shopping cart is empty.
                    </div>
                  )}
                </div>
              ) : (
                /* CHECKOUT FORM VIEW: SHIPPING ADDRESS & PAYMENT SELECTOR */
                <div style={{ padding: '16px 0' }}>
                  
                  {/* Step 1: Shipping Address */}
                  <div className="checkout-section-box">
                    <div className="checkout-section-title">
                      <MapPin size={16} style={{ color: '#ea580c' }} /> 1. Shipping Address Details
                    </div>

                    <div className="checkout-input-grid">
                      <div className="checkout-field" style={{ gridColumn: '1 / -1' }}>
                        <label className="checkout-field-label">Full Name / Business Name</label>
                        <input 
                          type="text"
                          value={shipName}
                          onChange={(e) => setShipName(e.target.value)}
                          className="checkout-input"
                        />
                      </div>

                      <div className="checkout-field" style={{ gridColumn: '1 / -1' }}>
                        <label className="checkout-field-label">Street Address</label>
                        <input 
                          type="text"
                          value={shipStreet}
                          onChange={(e) => setShipStreet(e.target.value)}
                          className="checkout-input"
                        />
                      </div>

                      <div className="checkout-field">
                        <label className="checkout-field-label">City, State, ZIP Code</label>
                        <input 
                          type="text"
                          value={shipCityZip}
                          onChange={(e) => setShipCityZip(e.target.value)}
                          className="checkout-input"
                        />
                      </div>

                      <div className="checkout-field">
                        <label className="checkout-field-label">Phone Number</label>
                        <input 
                          type="text"
                          value={shipPhone}
                          onChange={(e) => setShipPhone(e.target.value)}
                          className="checkout-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Payment Method */}
                  <div className="checkout-section-box">
                    <div className="checkout-section-title">
                      <CreditCard size={16} style={{ color: '#059669' }} /> 2. Choose Payment Method
                    </div>

                    <div className="payment-options-grid">
                      {[
                        { id: 'Wholesale Net 30 Line of Credit', title: '🏛️ Wholesale Net 30 Line of Credit', sub: 'Auto-approved $50,000 line of credit' },
                        { id: 'Credit / Debit Card', title: '💳 Credit / Debit Card', sub: 'Visa, MasterCard, Amex (Ending in 4242)' },
                        { id: 'Direct ACH Wire Transfer', title: '⚡ Direct ACH Wire Transfer', sub: 'Instant wholesale bank transfer' },
                        { id: 'Cash on Delivery (Pay on Fulfillment)', title: '💵 Cash on Delivery (Pay on Delivery)', sub: 'Pay upon truck arrival at hub' }
                      ].map(opt => (
                        <div 
                          key={opt.id}
                          className={`payment-card-option ${selectedPayment === opt.id ? 'selected' : ''}`}
                          onClick={() => setSelectedPayment(opt.id)}
                        >
                          <div>
                            <div className="payment-title-text">{opt.title}</div>
                            <div className="payment-sub-text">{opt.sub}</div>
                          </div>
                          {selectedPayment === opt.id && <CheckCircle2 size={18} style={{ color: '#ea580c' }} />}
                        </div>
                      ))}
                    </div>

                    {selectedPayment === 'Credit / Debit Card' && (
                      <div style={{ marginTop: '12px' }}>
                        <label className="checkout-field-label">Card Number</label>
                        <input 
                          type="text" 
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="checkout-input"
                        />
                      </div>
                    )}
                  </div>

                </div>
              )}
            </div>

            {getCartTotalItems() > 0 && (
              <div className="cart-drawer-footer">
                <div className="summary-row">
                  <span>Items Subtotal</span>
                  <span>${getCartTotalPrice().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping & Handling</span>
                  <span style={{ color: '#059669', fontWeight: 'bold' }}>FREE Express</span>
                </div>
                <div className="summary-row" style={{ fontSize: '18px', fontWeight: '800', marginTop: '8px', color: '#27272a' }}>
                  <span>Total Amount</span>
                  <span>${getCartTotalPrice().toFixed(2)}</span>
                </div>

                {checkoutStep === 'cart' ? (
                  <button className="btn-proceed-checkout" onClick={() => setCheckoutStep('shipping_payment')}>
                    <Truck size={18} /> Proceed to Shipping & Payment Details
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <button className="admin-pill-btn" onClick={() => setCheckoutStep('cart')}>
                      Back to Cart
                    </button>
                    <button className="btn-proceed-checkout" style={{ flex: 1 }} onClick={handlePlaceOrder}>
                      <ShieldCheck size={18} /> Place Your Wholesale Order
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* FRANCHISE PORTAL */}
      {appMode === 'franchise' && (
        <div className="franchise-app-wrapper">
          <div className="franchise-header">
            <div className="hub-title-block">
              <h1>{currentUser.role === 'admin' ? 'All Franchise Operations' : currentUser.franchiseId}</h1>
              <p>Fulfillment queue dynamically reflected from Retailer order submissions</p>
            </div>

            <div className="hub-stats-row">
              <div className="stat-pill">
                <span className="stat-pill-num" style={{ color: '#ea580c' }}>{getScopedFranchiseOrders().length}</span>
                <span className="stat-pill-label">Queue Total</span>
              </div>
              <div className="stat-pill">
                <span className="stat-pill-num" style={{ color: '#d97706' }}>
                  {getScopedFranchiseOrders().filter(o => o.status !== 'Delivered').length}
                </span>
                <span className="stat-pill-label">Pending Action</span>
              </div>
            </div>
          </div>

          <div className="orders-grid-view">
            {getScopedFranchiseOrders().length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#71717a', gridColumn: '1 / -1' }}>
                <Monitor size={36} style={{ marginBottom: '12px', opacity: 0.5 }} />
                <p>No active orders routed to this franchise hub.</p>
              </div>
            ) : (
              getScopedFranchiseOrders().map(order => (
                <div key={order.id} className="order-fulfillment-card">
                  <div>
                    <div className="of-card-header">
                      <span className="of-order-id">{order.id}</span>
                      <span className={`badge-order-status status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#52525b', marginTop: '4px', marginBottom: '12px' }}>
                      Retailer: <strong style={{ color: '#27272a' }}>{order.retailerId}</strong> • Hub: <span style={{ color: '#ea580c' }}>{order.franchiseId}</span>
                    </div>

                    <div className="of-items-list">
                      {order.items.map(item => (
                        <div key={item.id} className="of-item-row">
                          <span>{item.name}</span>
                          <span>x{item.quantity} (${(item.price * item.quantity).toFixed(2)})</span>
                        </div>
                      ))}
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 'bold', borderTop: '1px solid #e2ddd3', paddingTop: '6px', marginTop: '4px', color: '#27272a' }}>
                        <span>Order Value</span>
                        <span style={{ color: '#059669' }}>${order.totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  <div className="of-card-actions">
                    {order.status === 'Placed' && (
                      <button className="btn-action-primary" onClick={() => handleUpdateStatus(order.id, 'Confirmed')}>
                        Accept Order
                      </button>
                    )}
                    {order.status === 'Confirmed' && (
                      <button className="btn-action-primary" style={{ background: '#4f46e5' }} onClick={() => handleUpdateStatus(order.id, 'Dispatched')}>
                        Dispatch Shipment
                      </button>
                    )}
                    {order.status === 'Dispatched' && (
                      <button className="btn-action-primary" style={{ background: '#d97706' }} onClick={() => handleUpdateStatus(order.id, 'Delivered')}>
                        Deliver Shipment
                      </button>
                    )}
                    {order.status === 'Delivered' && (
                      <div style={{ width: '100%', textAlign: 'center', color: '#059669', fontWeight: 'bold', fontSize: '13px', padding: '8px 0' }}>
                        ✓ Order Fulfilled
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ADMIN DASHBOARD */}
      {appMode === 'admin' && (
        <div className="admin-app-wrapper">
          {currentUser.role !== 'admin' ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', background: '#fee2e2', borderRadius: '24px', border: '1px solid #fca5a5' }}>
              <Lock size={48} style={{ color: '#dc2626', marginBottom: '16px' }} />
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#dc2626', marginBottom: '8px' }}>403 - Access Forbidden</h2>
              <p style={{ color: '#52525b', maxWidth: '450px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                Your active persona <code style={{ color: '#dc2626' }}>{currentUser.name}</code> does not hold Admin claims.
              </p>
              <button className="btn-proceed-checkout" style={{ margin: '0 auto', width: 'auto' }} onClick={handleLogout}>
                Switch to Admin Persona
              </button>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: '800' }}>Master Executive Telemetry Dashboard</h1>
                  <p style={{ color: '#52525b', fontSize: '13px' }}>Click any metric card to open its detailed analytics deep-dive screen</p>
                </div>
                <span className="badge-order-status status-delivered">
                  ADMIN AUTHORIZED
                </span>
              </div>

              <div className="admin-nav-pills">
                <button 
                  className={`admin-pill-btn ${adminTab === 'overview' ? 'active' : ''}`}
                  onClick={() => { setAdminTab('overview'); setSelectedHub(null); }}
                >
                  <BarChart2 size={16} /> Overview
                </button>

                <button 
                  className={`admin-pill-btn ${adminTab === 'revenue' ? 'active' : ''}`}
                  onClick={() => setAdminTab('revenue')}
                >
                  <DollarSign size={16} /> Revenue Deep-Dive
                </button>

                <button 
                  className={`admin-pill-btn ${adminTab === 'pipeline' ? 'active' : ''}`}
                  onClick={() => setAdminTab('pipeline')}
                >
                  <Activity size={16} /> Order Stream Pipeline
                </button>

                <button 
                  className={`admin-pill-btn ${adminTab === 'kafka' ? 'active' : ''}`}
                  onClick={() => setAdminTab('kafka')}
                >
                  <Cpu size={16} /> Live Order Stream
                </button>

                <button 
                  className={`admin-pill-btn ${adminTab === 'hubs' ? 'active' : ''}`}
                  onClick={() => setAdminTab('hubs')}
                >
                  <Building size={16} /> Regional Hub Performance
                </button>
              </div>

              {adminTab === 'overview' && (
                <div>
                  <div className="admin-kpi-grid">
                    <div className="admin-kpi-card" onClick={() => setAdminTab('revenue')}>
                      <div>
                        <div className="admin-kpi-header">
                          <span className="admin-kpi-label">Total System Revenue</span>
                          <div className="admin-kpi-icon"><DollarSign size={20} /></div>
                        </div>
                        <div className="admin-kpi-value" style={{ color: '#059669' }}>${totalRevenue.toFixed(2)}</div>
                        <div className="admin-kpi-trend trend-up">
                          <ArrowUpRight size={14} /> +18.4% vs last period
                        </div>
                      </div>
                      <div className="click-hint-tag">
                        Tap for Revenue Breakdown <ArrowUpRight size={12} />
                      </div>
                    </div>

                    <div className="admin-kpi-card" onClick={() => setAdminTab('pipeline')}>
                      <div>
                        <div className="admin-kpi-header">
                          <span className="admin-kpi-label">Total Orders System-Wide</span>
                          <div className="admin-kpi-icon"><Package size={20} /></div>
                        </div>
                        <div className="admin-kpi-value">{orders.length}</div>
                        <div className="admin-kpi-trend trend-purple">
                          100% Orders Processed
                        </div>
                      </div>
                      <div className="click-hint-tag">
                        Tap for Pipeline Analytics <ArrowUpRight size={12} />
                      </div>
                    </div>

                    <div className="admin-kpi-card" onClick={() => setAdminTab('pipeline')}>
                      <div>
                        <div className="admin-kpi-header">
                          <span className="admin-kpi-label">Active Orders in Pipeline</span>
                          <div className="admin-kpi-icon"><Activity size={20} /></div>
                        </div>
                        <div className="admin-kpi-value" style={{ color: '#d97706' }}>{pendingOrdersCount}</div>
                        <div className="admin-kpi-trend trend-amber">
                          Fulfillment queue active
                        </div>
                      </div>
                      <div className="click-hint-tag">
                        Tap for Queue Throughput <ArrowUpRight size={12} />
                      </div>
                    </div>

                    <div className="admin-kpi-card" onClick={() => setAdminTab('kafka')}>
                      <div>
                        <div className="admin-kpi-header">
                          <span className="admin-kpi-label">System Reliability</span>
                          <div className="admin-kpi-icon"><Cpu size={20} /></div>
                        </div>
                        <div className="admin-kpi-value" style={{ color: '#ea580c' }}>99.9%</div>
                        <div className="admin-kpi-trend trend-up">
                          0s Processing Delay • 1,450 orders/min
                        </div>
                      </div>
                      <div className="click-hint-tag">
                        Tap for Live Stream Logs <ArrowUpRight size={12} />
                      </div>
                    </div>
                  </div>

                  <div className="admin-chart-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Regional Distribution Hub Performance</h3>
                      <span style={{ fontSize: '12px', color: '#ea580c', fontWeight: 'bold' }}>Tap hub to view deep-dive analytics</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {['East Coast Logistics Hub', 'West Coast Distribution Center', 'Southern Fulfillment Depot'].map(hub => {
                        const hubOrders = orders.filter(o => o.franchiseId === hub);
                        const completed = hubOrders.filter(o => o.status === 'Delivered').length;
                        const pct = hubOrders.length > 0 ? (completed / hubOrders.length) * 100 : 0;

                        return (
                          <div 
                            key={hub} 
                            style={{ background: '#f8f6f0', padding: '16px', borderRadius: '14px', border: '1px solid #e2ddd3', cursor: 'pointer' }}
                            onClick={() => { setAdminTab('hubs'); setSelectedHub(hub); }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                              <span style={{ fontWeight: 'bold', color: '#27272a' }}>{hub}</span>
                              <span style={{ color: '#52525b' }}>{completed} / {hubOrders.length} Completed</span>
                            </div>
                            <div style={{ height: '10px', background: '#e2ddd3', borderRadius: '5px', overflow: 'hidden' }}>
                              <div style={{ height: '100%', background: '#059669', width: `${pct || 10}%`, transition: 'width 0.5s ease' }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {adminTab === 'revenue' && (
                <div className="drilldown-panel-card">
                  <div className="drilldown-header">
                    <div className="drilldown-title-block">
                      <h2>💰 Detailed Revenue & Financial Analytics Screen</h2>
                      <p>Itemized sales revenue, financial reconciliation status, and category yield</p>
                    </div>
                    <button className="admin-pill-btn" onClick={() => setAdminTab('overview')}>
                      Back to Overview
                    </button>
                  </div>

                  <div className="metrics-table-grid">
                    <div className="metric-box-subcard">
                      <div className="subcard-title">Category Revenue Yield</div>
                      <div className="stat-row-item">
                        <span>👕 Apparel & Clothing</span>
                        <strong>$99.98 (64.5%)</strong>
                      </div>
                      <div className="stat-row-item">
                        <span>🛏️ Bed Sheets & Bedding</span>
                        <strong>$54.99 (35.5%)</strong>
                      </div>
                      <div className="stat-row-item">
                        <span>🪟 Curtains & Drapes</span>
                        <strong>$0.00 (0.0%)</strong>
                      </div>
                      <div className="stat-row-item">
                        <span>🧵 Linen & Fabrics</span>
                        <strong>$0.00 (0.0%)</strong>
                      </div>
                    </div>

                    <div className="metric-box-subcard">
                      <div className="subcard-title">Financial Reconciliation Ledger</div>
                      <div className="stat-row-item">
                        <span>Status</span>
                        <strong style={{ color: '#059669' }}>Synced & Reconciled</strong>
                      </div>
                      <div className="stat-row-item">
                        <span>Gross Profit Margin</span>
                        <strong>42.8%</strong>
                      </div>
                      <div className="stat-row-item">
                        <span>Average Order Value (AOV)</span>
                        <strong>${(totalRevenue / (orders.length || 1)).toFixed(2)}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {adminTab === 'pipeline' && (
                <div className="drilldown-panel-card">
                  <div className="drilldown-header">
                    <div className="drilldown-title-block">
                      <h2>📦 Order Stream Pipeline & SLA Screen</h2>
                      <p>Throughput breakdown, fulfillment status distribution, and active bottleneck queue</p>
                    </div>
                    <button className="admin-pill-btn" onClick={() => setAdminTab('overview')}>
                      Back to Overview
                    </button>
                  </div>

                  <div className="metrics-table-grid">
                    <div className="metric-box-subcard">
                      <div className="subcard-title">Fulfillment Stage Distribution</div>
                      {['Placed', 'Confirmed', 'Dispatched', 'Delivered'].map(st => {
                        const cnt = orders.filter(o => o.status === st).length;
                        return (
                          <div key={st} className="stat-row-item">
                            <span>Stage: <strong>{st}</strong></span>
                            <strong>{cnt} Orders</strong>
                          </div>
                        );
                      })}
                    </div>

                    <div className="metric-box-subcard">
                      <div className="subcard-title">SLA Compliance Metrics</div>
                      <div className="stat-row-item">
                        <span>Avg Fulfillment SLA</span>
                        <strong style={{ color: '#059669' }}>98.4% Compliant</strong>
                      </div>
                      <div className="stat-row-item">
                        <span>Avg Dispatch Time</span>
                        <strong>18.2 minutes</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {adminTab === 'kafka' && (
                <div className="drilldown-panel-card">
                  <div className="drilldown-header">
                    <div className="drilldown-title-block">
                      <h2>⚡ Live Real-Time Order Stream Screen</h2>
                      <p>Real-time system processing metrics, queue delay, and live event log</p>
                    </div>
                    <button className="admin-pill-btn" onClick={() => setAdminTab('overview')}>
                      Back to Overview
                    </button>
                  </div>

                  <div className="metrics-table-grid" style={{ marginBottom: '24px' }}>
                    <div className="metric-box-subcard">
                      <div className="subcard-title">System Throughput & Health</div>
                      <div className="stat-row-item">
                        <span>Processing Speed</span>
                        <strong>1,450 orders/min</strong>
                      </div>
                      <div className="stat-row-item">
                        <span>Queue Delay</span>
                        <strong style={{ color: '#059669' }}>0 seconds (Real-time)</strong>
                      </div>
                    </div>

                    <div className="metric-box-subcard">
                      <div className="subcard-title">Order Pipeline Channels</div>
                      <div className="stat-row-item">
                        <span>Active Order Channel</span>
                        <strong>Wholesale-Orders-Channel</strong>
                      </div>
                      <div className="stat-row-item">
                        <span>Active Express Lanes</span>
                        <strong>12 Lanes</strong>
                      </div>
                    </div>
                  </div>

                  <div className="subcard-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RefreshCw size={14} /> Live Stream Event Ticker
                  </div>

                  <div className="kafka-log-ticker">
                    <div>[INFO] 2026-08-27T08:48:00Z - [Order-System] Order ORD-8812 received and assigned to express lane 2</div>
                    <div>[INFO] 2026-08-27T08:48:01Z - [East-Coast-Hub] Order queue updated for East Coast Logistics Operator</div>
                    <div>[INFO] 2026-08-27T08:48:03Z - [Database-Sync-Worker] Synced order ORD-8812 record to Azure SQL DB</div>
                    <div>[INFO] 2026-08-27T08:48:05Z - [Express-Lane-04] Fulfillment capacity optimized</div>
                  </div>
                </div>
              )}

              {adminTab === 'hubs' && (
                <div className="drilldown-panel-card">
                  <div className="drilldown-header">
                    <div className="drilldown-title-block">
                      <h2>🏪 Regional Hub Detailed Performance Screen</h2>
                      <p>Staffing count, inventory stock levels, and fulfillment SLA per hub</p>
                    </div>
                    <button className="admin-pill-btn" onClick={() => setAdminTab('overview')}>
                      Back to Overview
                    </button>
                  </div>

                  <div className="metrics-table-grid">
                    {['East Coast Logistics Hub', 'West Coast Distribution Center', 'Southern Fulfillment Depot'].map(hub => (
                      <div 
                        key={hub} 
                        className="metric-box-subcard"
                        style={{ border: selectedHub === hub ? '2px solid #ea580c' : '1px solid #e2ddd3' }}
                      >
                        <div className="subcard-title">{hub}</div>
                        <div className="stat-row-item">
                          <span>Active Staff</span>
                          <strong>{hub.includes('East') ? '24 Operators' : '18 Operators'}</strong>
                        </div>
                        <div className="stat-row-item">
                          <span>Inventory Stock</span>
                          <strong>14,200 Textile Units</strong>
                        </div>
                        <div className="stat-row-item">
                          <span>SLA Compliance</span>
                          <strong style={{ color: '#059669' }}>99.1%</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      )}
    </div>
  );
}
