/* ================================================================
   MAIN.JS  —  Kalelo Print · Sandton, Gauteng
   All interactive functionality in one modular namespace (KP)
   ================================================================
   Modules:
     KP.toast       — notification toasts
     KP.modal       — all modal dialogs
     KP.nav         — mobile navigation drawer
     KP.cart        — shopping cart state + sidebar
     KP.shop        — product grid, filtering, load-more
     KP.auth        — login + register (UI only, no backend)
     KP.quote       — quote form submission
     KP.wa          — WhatsApp widget
     KP.calc        — live price calculator
     KP.upload      — drag-and-drop file upload area
     KP.countdown   — discount banner countdown timer
     KP.testimonials— render testimonial cards
     KP.faq         — render + toggle FAQ accordion
     KP.blog        — render blog cards
     KP.scroll      — active nav link on scroll
   ================================================================ */

'use strict';

/* ──────────────────────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────────────────────── */
const DATA = {

  products: [
    { id:1,  name:'A2 Wall Calendar',          cat:'calendars',    icon:'fa-calendar-alt', price:220, rating:4.9, reviews:42, badge:'new' },
    { id:2,  name:'A3 Wall Calendar',          cat:'calendars',    icon:'fa-calendar-alt', price:180, rating:4.8, reviews:31, badge:'' },
    { id:3,  name:'A5 Fridge Calendar',        cat:'calendars',    icon:'fa-calendar-alt', price:95,  rating:4.7, reviews:18, badge:'new' },
    { id:4,  name:'DL Tent Calendar',          cat:'calendars',    icon:'fa-calendar-alt', price:75,  rating:4.6, reviews:12, badge:'' },
    { id:5,  name:'Digital Flyers (A5)',       cat:'printing',     icon:'fa-print',        price:350, rating:4.9, reviews:88, badge:'hot' },
    { id:6,  name:'Business Cards (250)',      cat:'printing',     icon:'fa-id-card',      price:180, rating:4.9, reviews:120,badge:'hot' },
    { id:7,  name:'Folded Leaflets (A4)',      cat:'printing',     icon:'fa-file-alt',     price:420, rating:4.7, reviews:35, badge:'' },
    { id:8,  name:'Notepads (A5, 50 sheets)', cat:'stationery',   icon:'fa-pen',          price:290, rating:4.8, reviews:27, badge:'' },
    { id:9,  name:'T-Shirt Sublimation',       cat:'apparel',      icon:'fa-tshirt',       price:150, rating:4.8, reviews:64, badge:'hot' },
    { id:10, name:'Large Format (A0)',         cat:'printing',     icon:'fa-expand',       price:480, rating:4.7, reviews:22, badge:'' },
    { id:11, name:'Alu Panel Printing',        cat:'signage',      icon:'fa-sign',         price:360, rating:4.8, reviews:19, badge:'' },
    { id:12, name:'Correx Boards',             cat:'signage',      icon:'fa-sign',         price:220, rating:4.6, reviews:15, badge:'' },
    { id:13, name:'T-Shirt Screen Print',      cat:'apparel',      icon:'fa-tshirt',       price:120, rating:4.7, reviews:48, badge:'' },
    { id:14, name:'Name Badges',               cat:'stationery',   icon:'fa-id-badge',     price:45,  rating:4.8, reviews:33, badge:'new' },
    { id:15, name:'Branded Mugs',              cat:'sublimation',  icon:'fa-mug-hot',      price:85,  rating:4.9, reviews:72, badge:'hot' },
    { id:16, name:'Pull-Up Banners',           cat:'signage',      icon:'fa-image',        price:750, rating:4.9, reviews:56, badge:'' },
    { id:17, name:'Laser Engraving',           cat:'specialty',    icon:'fa-fire',         price:200, rating:4.8, reviews:28, badge:'new' },
    { id:18, name:'3D Letter Fabrication',     cat:'specialty',    icon:'fa-cube',         price:1200,rating:4.9, reviews:11, badge:'' },
    { id:19, name:'Vinyl Sticker Printing',    cat:'printing',     icon:'fa-star',         price:190, rating:4.7, reviews:45, badge:'' },
    { id:20, name:'Roller Banners',            cat:'signage',      icon:'fa-image',        price:820, rating:4.8, reviews:38, badge:'' },
    { id:21, name:'Branded Tumblers',          cat:'sublimation',  icon:'fa-coffee',       price:120, rating:4.9, reviews:29, badge:'hot' },
    { id:22, name:'Letterheads (500)',         cat:'stationery',   icon:'fa-file-alt',     price:310, rating:4.8, reviews:21, badge:'' },
    { id:23, name:'Website Design',            cat:'specialty',    icon:'fa-laptop',       price:3500,rating:5.0, reviews:17, badge:'new' },
    { id:24, name:'Logo Design',               cat:'specialty',    icon:'fa-pencil-ruler', price:800, rating:4.9, reviews:34, badge:'' },
  ],

  testimonials: [
    { initials:'SM', name:'Sarah Motsepe',    text:'Fast, professional and the quality is outstanding. Best printing service in Sandton — highly recommended!',                              date:'2 weeks ago' },
    { initials:'JD', name:'James Dlamini',    text:'Kalelo Print delivered our corporate calendars ahead of schedule and the quality blew us away. Will definitely use again.',               date:'1 month ago' },
    { initials:'NP', name:'Nomsa Pillay',     text:'Ordered 500 T-shirts for our team event. Delivered in 48 hours, printed perfectly. The team was incredibly helpful throughout.',        date:'3 weeks ago' },
    { initials:'PV', name:'Pieter van Wyk',   text:'Our new office signage looks phenomenal. Great attention to detail, competitive pricing, and delivered on time. 5 stars.',              date:'1 month ago' },
    { initials:'AT', name:'Ama Tshabalala',   text:'Used Kalelo Print for our event banners and pull-up stands. Stunning result — several guests asked who our print supplier was!',        date:'2 months ago' },
    { initials:'BM', name:'Brandon Mokoena',  text:'The free design assistance is a game-changer. My business cards came out exactly how I imagined them. Exceptional service.',            date:'6 weeks ago' },
  ],

  faqs: [
    { q:'How do I place an order?',              a:'Browse our shop, select your product, configure your specifications, upload your artwork and proceed to checkout — it\'s that simple! You can also call or WhatsApp us to place an order directly.' },
    { q:'What file formats do you accept?',      a:'We accept PDF, AI, EPS, PSD, JPG, PNG, SVG and TIFF files. Vector formats (PDF, AI, EPS) are preferred for sharp results. Files should be 300 DPI minimum at final print size, in CMYK colour mode with 3mm bleed.' },
    { q:'Do you offer design services?',         a:'Yes! Our in-house design team offers free artwork checks and basic adjustments on all orders. Full design services are also available — contact us for a design quote.' },
    { q:'What are your turnaround times?',       a:'Standard turnaround is 2–3 business days. Express (next-day) and same-day options are available for most products at an additional charge. Same-day orders must be placed before 10am.' },
    { q:'Do you deliver nationwide?',            a:'Yes, we deliver across South Africa via reliable courier. Delivery to Sandton / Johannesburg is R80, Gauteng R120, and nationwide R150. Orders over R500 qualify for free delivery.' },
    { q:'What is your quality guarantee?',       a:'If you are not satisfied with the quality of your print, we will reprint your order at no charge. We stand behind every job that leaves our studio. Simply contact us within 7 days of receiving your order.' },
    { q:'Can I get a sample or proof?',          a:'Yes — we can provide a digital proof (PDF) for your approval before going to press, included at no charge. Physical printed samples are available on request for larger orders.' },
    { q:'What payment methods do you accept?',   a:'We accept Visa, Mastercard, PayFast and EFT (bank transfer). Invoicing on 30-day terms is available for registered businesses subject to approval. Contact us to set up a trade account.' },
  ],

  blog: [
    { cat:'Design Tips',        title:'10 Tips for Print-Ready Artwork',               excerpt:'Avoid costly reprints by getting your files right the first time. From DPI to bleed — here\'s everything you need to know before sending your artwork to print.', icon:'fa-paint-brush' },
    { cat:'Industry News',      title:'The Future of Large Format Printing in SA',     excerpt:'Large-format printing is booming across Gauteng. We explore the trends shaping the industry and what it means for businesses investing in outdoor advertising.', icon:'fa-newspaper' },
    { cat:'Business Branding',  title:'Why Business Cards Still Matter in 2025',       excerpt:'In a digital age, the humble business card remains one of the most powerful networking tools. Here\'s how to make yours stand out from the crowd.',              icon:'fa-id-card' },
    { cat:'Case Study',         title:'How We Printed 1,000 Calendars in 48 Hours',   excerpt:'When a financial services client needed 1,000 custom wall calendars in two days, our team rose to the challenge. Here\'s how we made it happen.',                icon:'fa-calendar-alt' },
    { cat:'Sustainability',     title:'Our Commitment to Eco-Friendly Printing',       excerpt:'Kalelo Print is committed to reducing our environmental impact. Discover the sustainable materials and practices we use to make print more responsible.',          icon:'fa-leaf' },
    { cat:'How-To Guide',       title:'Choosing the Right Paper Stock for Your Print', excerpt:'Glossy vs matte, coated vs uncoated — paper choice has a huge impact on how your print looks and feels. Our guide helps you pick the right stock every time.',  icon:'fa-file-alt' },
  ],

  waOptions: [
    { icon:'fa-print',        label:'Printing Services',  msg:'Hi Kalelo Print! I would like to know more about your printing services.' },
    { icon:'fa-file-invoice', label:'Request a Quote',    msg:'Hi Kalelo Print! I would like to request a quote for a printing job.' },
    { icon:'fa-upload',       label:'Send Artwork',       msg:'Hi Kalelo Print! I need to send artwork for my order.' },
    { icon:'fa-box',          label:'Order Status',       msg:'Hi Kalelo Print! I would like to check on the status of my order.' },
    { icon:'fa-headset',      label:'Talk to Support',    msg:'Hi Kalelo Print! I need some assistance with my printing project.' },
  ],

};

/* ──────────────────────────────────────────────────────────────
   STATE
   ────────────────────────────────────────────────────────────── */
const STATE = {
  cart:      [],        // { id, name, price, qty, icon }
  cartTotal: 0,
  wishlist:  new Set(),
  filter:    'all',
  shown:     8,
  qvProduct: null,      // product shown in quick-view
};

/* ──────────────────────────────────────────────────────────────
   NAMESPACE
   ────────────────────────────────────────────────────────────── */
const KP = {};

/* ================================================================
   KP.toast  —  Notification toasts
   ================================================================ */
KP.toast = {
  icons: { success:'fa-check-circle', error:'fa-exclamation-circle', info:'fa-info-circle' },

  show(msg, type = 'info') {
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<i class="fas ${this.icons[type]}"></i><span>${msg}</span>`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  },
};

/* ================================================================
   KP.modal  —  All modals
   ================================================================ */
KP.modal = {
  open(id) {
    const el = document.getElementById(`${id}Modal`);
    if (el) { el.classList.add('open'); document.body.classList.add('locked'); }
  },
  close(id) {
    const el = document.getElementById(`${id}Modal`);
    if (el) el.classList.remove('open');
    // Only unlock if no other modals open
    if (!document.querySelector('.modal.open')) document.body.classList.remove('locked');
  },
  closeAll() {
    document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open'));
    document.body.classList.remove('locked');
  },
  tab(btn, panelId) {
    // Switch modal tabs
    const box = btn.closest('.modal-box');
    box.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
    box.querySelectorAll('.modal-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById(panelId);
    if (panel) panel.classList.add('active');
  },
};

/* ================================================================
   KP.nav  —  Mobile navigation drawer
   ================================================================ */
KP.nav = {
  toggle() {
    const drawer = document.getElementById('navDrawer');
    const icon   = document.getElementById('hamburgerIcon');
    if (!drawer) return;
    const isOpen = drawer.classList.toggle('open');
    if (icon) icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
  },
  close() {
    const drawer = document.getElementById('navDrawer');
    const icon   = document.getElementById('hamburgerIcon');
    if (drawer) drawer.classList.remove('open');
    if (icon)   icon.className = 'fas fa-bars';
  },
};

/* ================================================================
   KP.cart  —  Shopping cart
   ================================================================ */
KP.cart = {
  add(id, name, price, icon) {
    const existing = STATE.cart.find(i => i.id === id);
    if (existing) {
      existing.qty++;
    } else {
      STATE.cart.push({ id, name, price, qty:1, icon: icon || 'fa-print' });
    }
    STATE.cartTotal += price;
    this.render();
    KP.toast.show(`${name} added to cart!`, 'success');
  },

  remove(id) {
    const idx = STATE.cart.findIndex(i => i.id === id);
    if (idx === -1) return;
    STATE.cartTotal -= STATE.cart[idx].price * STATE.cart[idx].qty;
    STATE.cart.splice(idx, 1);
    this.render();
  },

  updateQty(id, delta) {
    const item = STATE.cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    STATE.cartTotal += item.price * delta;
    if (item.qty <= 0) { this.remove(id); return; }
    this.render();
  },

  render() {
    const count = STATE.cart.reduce((s,i) => s + i.qty, 0);
    const total = STATE.cart.reduce((s,i) => s + i.price * i.qty, 0);

    // Update nav badge
    const badge = document.getElementById('cartBadge');
    const tot   = document.getElementById('cartTot');
    if (badge) badge.textContent = count;
    if (tot)   tot.textContent   = `R${total.toFixed(2)}`;

    // Update sidebar subtotal
    const sub = document.getElementById('cartSub');
    if (sub) sub.textContent = `R${total.toFixed(2)}`;

    // Free delivery note
    const note = document.getElementById('cartDeliveryNote');
    if (note) {
      if (total > 0 && total < 500) {
        note.style.display = 'flex';
        document.getElementById('cartDeliveryMsg').textContent =
          `Add R${(500 - total).toFixed(2)} more for free delivery!`;
      } else if (total >= 500) {
        note.style.display = 'flex';
        document.getElementById('cartDeliveryMsg').textContent = '🎉 You qualify for free delivery!';
      } else {
        note.style.display = 'none';
      }
    }

    // Render cart items
    const body = document.getElementById('cartBody');
    if (!body) return;

    if (!STATE.cart.length) {
      body.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-shopping-cart"></i>
          <p>Your cart is empty</p>
        </div>`;
      return;
    }

    body.innerHTML = STATE.cart.map(item => `
      <div class="cart-row">
        <div class="cart-row-icon"><i class="fas ${item.icon}"></i></div>
        <div class="cart-row-info">
          <h4>${item.name}</h4>
          <div class="cart-row-price">R${item.price.toFixed(2)}</div>
          <div class="cart-row-qty">
            <button class="qty-btn" onclick="KP.cart.updateQty(${item.id},-1)">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="KP.cart.updateQty(${item.id},1)">+</button>
          </div>
        </div>
        <button class="btn-cart-rm" onclick="KP.cart.remove(${item.id})" aria-label="Remove ${item.name}">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>`).join('');
  },

  toggle() {
    const sidebar  = document.getElementById('cartSidebar');
    const overlay  = document.getElementById('cartOverlay');
    if (!sidebar) return;
    const isOpen = sidebar.classList.toggle('open');
    overlay?.classList.toggle('on', isOpen);
    document.body.classList.toggle('locked', isOpen);
  },

  checkout() {
    if (!STATE.cart.length) { KP.toast.show('Your cart is empty!', 'error'); return; }
    KP.cart.toggle(); // close cart
    const num = 'KP-' + Math.floor(Math.random() * 900000 + 100000);
    const el  = document.getElementById('confirmOrderNum');
    if (el) el.textContent = num;
    KP.toast.show('Processing your order…', 'info');
    setTimeout(() => {
      STATE.cart      = [];
      STATE.cartTotal = 0;
      KP.cart.render();
      KP.modal.open('confirm');
    }, 1200);
  },
};

/* ================================================================
   KP.shop  —  Product grid, filtering, quick-view
   ================================================================ */
KP.shop = {
  filter(cat, btn) {
    STATE.filter = cat;
    STATE.shown  = 8;
    document.querySelectorAll('.filt').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    this.render();
  },

  loadMore() {
    STATE.shown += 4;
    this.render();
  },

  getFiltered() {
    if (STATE.filter === 'all') return DATA.products;
    return DATA.products.filter(p => p.cat === STATE.filter);
  },

  starHTML(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let html = '';
    for (let i = 0; i < full; i++) html += '<i class="fas fa-star"></i>';
    if (half) html += '<i class="fas fa-star-half-alt"></i>';
    return html;
  },

  render() {
    const grid = document.getElementById('prodGrid');
    const btn  = document.getElementById('loadMoreBtn');
    if (!grid) return;

    const list = this.getFiltered();
    const visible = list.slice(0, STATE.shown);

    grid.innerHTML = visible.map(p => {
      const was = Math.floor(p.price * 1.3);
      const badgeLabel = p.badge === 'new' ? 'NEW' : p.badge === 'hot' ? 'HOT' : 'SALE';
      const badgeHTML  = p.badge ? `<div class="prod-badge ${p.badge}">${badgeLabel}</div>` : '';
      const wl = STATE.wishlist.has(p.id);
      return `
        <article class="prod" data-id="${p.id}">
          ${badgeHTML}
          <div class="prod-img">
            <img src="uploads/product-${p.id}.jpg" alt="${p.name}" loading="lazy"
                 onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <div class="prod-img-fallback" style="display:none">
              <i class="fas ${p.icon} prod-img-icon"></i>
            </div>
            <div class="prod-overlay">
              <button class="btn-qv" onclick="KP.shop.quickView(${p.id})">
                <i class="fas fa-eye"></i> Quick View
              </button>
            </div>
          </div>
          <div class="prod-body">
            <div class="prod-cat">${p.cat}</div>
            <div class="prod-name">${p.name}</div>
            <div class="prod-stars">${this.starHTML(p.rating)}<span>(${p.reviews})</span></div>
            <div class="prod-price">
              <span class="prod-price-now">R${p.price}</span>
              <span class="prod-price-was">R${was}</span>
            </div>
            <div class="prod-actions">
              <button class="btn-atc" onclick="KP.cart.add(${p.id},'${p.name.replace(/'/g,'&#39;')}',${p.price},'${p.icon}')">
                Add to Cart <i class="fas fa-cart-plus"></i>
              </button>
              <button class="btn-wl ${wl ? 'active' : ''}" onclick="KP.shop.toggleWish(${p.id},this)" aria-label="Wishlist">
                <i class="fa${wl ? 's' : 'r'} fa-heart"></i>
              </button>
            </div>
          </div>
        </article>`;
    }).join('');

    if (btn) btn.style.display = list.length > STATE.shown ? 'flex' : 'none';
  },

  toggleWish(id, btn) {
    const on = STATE.wishlist.has(id);
    if (on)  { STATE.wishlist.delete(id); }
    else     { STATE.wishlist.add(id); }
    btn.classList.toggle('active', !on);
    btn.innerHTML = `<i class="fa${!on ? 's' : 'r'} fa-heart"></i>`;
    const p = DATA.products.find(x => x.id === id);
    KP.toast.show(!on ? `${p?.name} added to wishlist!` : `${p?.name} removed`, !on ? 'success' : 'info');
  },

  quickView(id) {
    const p = DATA.products.find(x => x.id === id);
    if (!p) return;
    STATE.qvProduct = p;
    const qvImg   = document.getElementById('qvImg');
    const qvCat   = document.getElementById('qvCat');
    const qvName  = document.getElementById('qvName');
    const qvPrice = document.getElementById('qvPrice');
    const qvDesc  = document.getElementById('qvDesc');
    if (qvImg)   qvImg.innerHTML   = `<img src="uploads/product-${p.id}.jpg" alt="${p.name}" onerror="this.outerHTML='<i class=\\'fas ${p.icon}\\'></i>'">`;
    if (qvCat)   qvCat.textContent  = p.cat;
    if (qvName)  qvName.textContent = p.name;
    if (qvPrice) qvPrice.textContent= `R${p.price}`;
    if (qvDesc)  qvDesc.textContent = `High-quality ${p.name.toLowerCase()} printed to your specifications. Contact us for custom sizing, quantities or finishes.`;
    KP.modal.open('quickview');
  },

  addFromQV() {
    if (!STATE.qvProduct) return;
    const p = STATE.qvProduct;
    KP.cart.add(p.id, p.name, p.price, p.icon);
    KP.modal.close('quickview');
  },
};

/* ================================================================
   KP.auth  —  Login / Register (UI only)
   ================================================================ */
KP.auth = {
  login() {
    const email = document.getElementById('lEmail')?.value;
    const pass  = document.getElementById('lPass')?.value;
    if (!email || !pass) { KP.toast.show('Please fill in all fields', 'error'); return; }
    KP.toast.show(`Welcome back, ${email}!`, 'success');
    KP.modal.close('login');
  },
  register() {
    const name  = document.getElementById('rName')?.value;
    const email = document.getElementById('rEmail')?.value;
    const pass  = document.getElementById('rPass')?.value;
    if (!name || !email || !pass) { KP.toast.show('Please fill in all fields', 'error'); return; }
    KP.toast.show(`Account created for ${name}! Welcome to Kalelo Print.`, 'success');
    KP.modal.close('login');
  },
};

/* ================================================================
   KP.quote  —  Quote request form
   ================================================================ */
KP.quote = {
  submit() {
    const name    = document.getElementById('qName')?.value;
    const email   = document.getElementById('qEmail')?.value;
    const product = document.getElementById('qProduct')?.value;
    if (!name || !email || !product) { KP.toast.show('Please complete all required fields', 'error'); return; }
    KP.toast.show('Quote request submitted! We\'ll respond within 2 hours.', 'success');
    KP.modal.close('quote');
  },
};

/* ================================================================
   KP.wa  —  WhatsApp widget
   ================================================================ */
KP.wa = {
  init() {
    const opts = document.getElementById('waOpts');
    if (!opts || opts.children.length) return;
    DATA.waOptions.forEach(o => {
      const btn  = document.createElement('button');
      btn.className = 'wa-opt';
      btn.innerHTML = `<i class="fas ${o.icon}"></i>${o.label}`;
      btn.onclick   = () => window.open(`https://wa.me/27831234567?text=${encodeURIComponent(o.msg)}`, '_blank');
      opts.appendChild(btn);
    });
  },
  toggle() {
    const panel = document.getElementById('waPanel');
    if (!panel) return;
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) KP.wa.init();
  },
  send() {
    const inp  = document.getElementById('waIn');
    const msgs = document.getElementById('waMsgs');
    if (!inp || !msgs) return;
    const msg = inp.value.trim();
    if (!msg) return;
    msgs.innerHTML += `<div class="wa-msg sent">${msg}</div>`;
    inp.value = '';
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => {
      msgs.innerHTML += `<div class="wa-msg recv">Thanks for your message! For faster assistance, chat with us directly on <strong>+27 83 123 4567</strong> or call <strong>+27 11 345 6789</strong>.</div>`;
      msgs.scrollTop = msgs.scrollHeight;
    }, 900);
  },
};

/* ================================================================
   KP.calc  —  Price calculator
   ================================================================ */
KP.calc = {
  basePrices: {
    'flyer':0.85, 'business-card':0.65, 'banner':180, 'booklet':4.5,
    'tshirt':85, 'mug':55, 'sticker':1.2, 'calendar':95,
  },
  sizeMulti:  { a6:0.6, a5:0.8, a4:1, a3:1.4, a2:1.9, a1:2.6, custom:1.5 },
  matMulti:   { standard:1, premium:1.25, gloss:1.3, matte:1.2, recycled:1.05 },
  finishExtra:{ none:0, 'gloss-lam':0.3, 'matte-lam':0.35, uv:0.5, foil:0.8 },
  deliveryCost:{ collection:0, local:80, gauteng:120, national:150 },

  updateQty(val) {
    const el = document.getElementById('qtyDisplay');
    if (el) el.textContent = parseInt(val).toLocaleString();
    this.update();
  },

  update() {
    const product     = document.getElementById('calcProduct')?.value    || 'flyer';
    const material    = document.getElementById('calcMaterial')?.value   || 'standard';
    const size        = document.getElementById('calcSize')?.value       || 'a4';
    const finish      = document.getElementById('calcFinish')?.value     || 'none';
    const sides       = parseInt(document.getElementById('calcSides')?.value || '1');
    const turnaround  = document.getElementById('calcTurnaround')?.value || 'standard';
    const delivery    = document.getElementById('calcDelivery')?.value   || 'collection';
    const qty         = parseInt(document.getElementById('calcQty')?.value || '100');

    const base     = (this.basePrices[product] || 1) * qty;
    const sized    = base * (this.sizeMulti[size] || 1);
    const matted   = sized * (this.matMulti[material] || 1);
    const sided    = matted * (sides === 2 ? 1.3 : 1);
    const finExtra = sized * (this.finishExtra[finish] || 0);
    const expExtra = turnaround === 'express' ? sided * 0.25 : turnaround === 'sameday' ? sided * 0.5 : 0;
    const deliv    = this.deliveryCost[delivery] || 0;
    const subtotal = sided + finExtra + expExtra + deliv;

    const fmt = v => `R${v.toFixed(2)}`;
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };

    set('calcPrice',   subtotal.toFixed(0));
    set('bkPrint',     fmt(sided));
    set('bkFinish',    fmt(finExtra));
    set('bkExpress',   fmt(expExtra));
    set('bkDelivery',  fmt(deliv));
    set('bkSubtotal',  fmt(subtotal));
  },
};

/* ================================================================
   KP.upload  —  Artwork drag-and-drop upload area
   ================================================================ */
KP.upload = {
  files: [],

  dragOver(e) {
    e.preventDefault();
    document.getElementById('uploadArea')?.classList.add('drag-over');
  },
  dragLeave(e) {
    e.preventDefault();
    document.getElementById('uploadArea')?.classList.remove('drag-over');
  },
  drop(e) {
    e.preventDefault();
    document.getElementById('uploadArea')?.classList.remove('drag-over');
    this.handleFiles(e.dataTransfer.files);
  },
  handleFiles(fileList) {
    Array.from(fileList).forEach(f => this.addFile(f));
  },
  addFile(file) {
    this.files.push(file);
    this.renderList();
    KP.toast.show(`${file.name} uploaded!`, 'success');
  },
  removeFile(idx) {
    this.files.splice(idx, 1);
    this.renderList();
  },
  renderList() {
    const list = document.getElementById('fileList');
    if (!list) return;
    list.innerHTML = this.files.map((f, i) => `
      <div class="file-item">
        <div class="file-item-info">
          <i class="fas fa-file-pdf"></i>
          <div>
            <div>${f.name}</div>
            <div class="file-item-meta">${(f.size / 1024 / 1024).toFixed(2)} MB</div>
          </div>
        </div>
        <button class="btn-file-rm" onclick="KP.upload.removeFile(${i})" aria-label="Remove file">
          <i class="fas fa-times"></i>
        </button>
      </div>`).join('');
  },
};

/* ================================================================
   KP.countdown  —  Discount banner timer
   ================================================================ */
KP.countdown = {
  target: null,
  timer:  null,

  init() {
    // Set target to 7 days from now (stored in sessionStorage to persist on reload)
    const stored = sessionStorage.getItem('kp_countdown');
    this.target  = stored ? parseInt(stored) : Date.now() + 7 * 24 * 60 * 60 * 1000;
    sessionStorage.setItem('kp_countdown', this.target);
    this.tick();
    this.timer = setInterval(() => this.tick(), 1000);
  },

  tick() {
    const diff = this.target - Date.now();
    if (diff <= 0) { clearInterval(this.timer); return; }

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000)  / 60000);
    const secs  = Math.floor((diff % 60000)    / 1000);

    const pad = v => String(v).padStart(2, '0');
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = pad(v); };

    set('cdDays',  days);
    set('cdHours', hours);
    set('cdMins',  mins);
    set('cdSecs',  secs);
  },
};

/* ================================================================
   KP.testimonials  —  Render review cards
   ================================================================ */
KP.testimonials = {
  render() {
    const grid = document.getElementById('testiGrid');
    if (!grid) return;
    grid.innerHTML = DATA.testimonials.map(t => `
      <div class="tcard">
        <div class="tcard-head">
          <div class="tcard-av">${t.initials}</div>
          <div>
            <div class="tcard-name">${t.name}</div>
            <div class="tcard-stars">
              <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
              <i class="fas fa-star"></i><i class="fas fa-star"></i>
            </div>
          </div>
        </div>
        <p class="tcard-text">"${t.text}"</p>
        <div class="tcard-platform"><i class="fab fa-google"></i>Google Review</div>
        <div class="tcard-date">${t.date}</div>
      </div>`).join('');
  },
};

/* ================================================================
   KP.faq  —  Render + accordion toggle
   ================================================================ */
KP.faq = {
  render() {
    const list = document.getElementById('faqList');
    if (!list) return;
    list.innerHTML = DATA.faqs.map((f, i) => `
      <div class="faq-item ${i === 0 ? 'open' : ''}">
        <div class="faq-q" onclick="this.closest('.faq-item').classList.toggle('open')">
          <span>${f.q}</span>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="faq-a">${f.a}</div>
      </div>`).join('');
  },
};

/* ================================================================
   KP.blog  —  Render blog cards
   ================================================================ */
KP.blog = {
  render() {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;
    grid.innerHTML = DATA.blog.map(b => `
      <div class="bcard">
        <div class="bcard-img">
          <img src="uploads/blog-${b.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}.jpg"
               alt="${b.title}"
               onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
          <i class="fas ${b.icon}" style="display:none"></i>
        </div>
        <div class="bcard-body">
          <div class="bcard-cat">${b.cat}</div>
          <div class="bcard-title">${b.title}</div>
          <div class="bcard-excerpt">${b.excerpt}</div>
          <a href="#" class="btn-read" onclick="KP.toast.show('Full article coming soon!','info');return false">
            Read More <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>`).join('');
  },
};

/* ================================================================
   KP.scroll  —  Active nav link on scroll
   ================================================================ */
KP.scroll = {
  init() {
    window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 140) {
          document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${sec.id}`);
          });
        }
      });
    }, { passive: true });
  },
};

/* ================================================================
   GLOBAL EVENT LISTENERS
   ================================================================ */

// ESC closes everything
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  KP.modal.closeAll();
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  if (sidebar?.classList.contains('open')) {
    sidebar.classList.remove('open');
    overlay?.classList.remove('on');
  }
  KP.nav.close();
  const waPanel = document.getElementById('waPanel');
  if (waPanel) waPanel.classList.remove('open');
  document.body.classList.remove('locked');
});

/* ================================================================
   INIT — Run on DOM ready
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  KP.shop.render();
  KP.testimonials.render();
  KP.faq.render();
  KP.blog.render();
  KP.countdown.init();
  KP.calc.update();
  KP.scroll.init();
  KP.cart.render();

  console.log('%c Kalelo Print · main.js loaded ✓', 'color:#c8382a;font-weight:bold;font-size:13px;');
});
