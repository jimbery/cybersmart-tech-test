(function(){
  const VAT_RATE = 0.20;
  const SHIPPING_THRESHOLD = 50.00;
  const SHIPPING_FEE = 4.95;

  function round2(n){ return Math.round((n + Number.EPSILON) * 100) / 100; }
  function currency(n){ return '£' + n.toFixed(2); }

  function loadCart(){
    try {
      const raw = localStorage.getItem('cart');
      if (!raw) return { items: [], promoCode: null };
      return JSON.parse(raw);
    } catch(e){
      return { items: [], promoCode: null };
    }
  }
  function saveCart(state){ localStorage.setItem('cart', JSON.stringify(state)); }

  const state = {
    products: [],
    cart: loadCart()
  };

  async function loadProducts(){
    const res = await fetch('./public/products.json');
    state.products = await res.json();
    renderProducts();
    renderCart();
    populateFilters();
  }

  function populateFilters(){
    const sel = document.getElementById('filter-category');
    const cats = ['All', ...Array.from(new Set(state.products.map(p=>p.category)))];
    sel.innerHTML = cats.map(c=> `<option value="${c}">${c}</option>`).join('');
    sel.addEventListener('change', renderProducts);
    document.getElementById('sort-price').addEventListener('change', renderProducts);
  }

  function renderProducts(){
    const grid = document.getElementById('product-grid');
    const category = document.getElementById('filter-category').value || 'All';
    const sort = document.getElementById('sort-price').value || 'lh';

    let list = state.products.slice();
    if (category !== 'All') list = list.filter(p=> p.category === category);
    list.sort((a,b)=> sort === 'lh' ? a.price - b.price : b.price - a.price);

    grid.innerHTML = list.map(p => {
      return `<div class="card" data-testid="product-${p.id}">
        <div class="title">${p.name}</div>
        <div class="meta">Category: ${p.category}</div>
        <div class="price">${currency(p.price)}</div>
        <div class="qty">
          <label>Qty:
            <input type="number" min="1" max="${Math.min(10, p.stock ?? 10)}" value="1" data-testid="qty-${p.id}" />
          </label>
        </div>
        <button ${p.stock<=0?'disabled':''} data-testid="add-${p.id}">${p.stock<=0?'Out of stock':'Add to cart'}</button>
      </div>`
    }).join('');

    // attach events
    list.forEach(p => {
      const addBtn = document.querySelector(`[data-testid="add-${p.id}"]`);
      const qtyInput = document.querySelector(`[data-testid="qty-${p.id}"]`);
      if (addBtn) addBtn.addEventListener('click', () => {
        const qty = Math.max(1, Math.min(10, Number(qtyInput.value || 1)));
        addItem({ id: p.id, name: p.name, price: p.price }, qty);
      });
    });
  }

  function addItem(item, qty){
    const existing = state.cart.items.find(i => i.id === item.id);
    if (existing) existing.qty = Math.min(existing.qty + qty, 10);
    else state.cart.items.push({ ...item, qty });
    saveCart(state.cart);
    renderCart();
  }

  function setQty(id, qty){
    const it = state.cart.items.find(i => i.id === id);
    if (!it) return;
    it.qty = Math.max(1, Math.min(10, qty));
    saveCart(state.cart);
    renderCart();
  }

  function removeItem(id){
    state.cart.items = state.cart.items.filter(i => i.id !== id);
    saveCart(state.cart);
    renderCart();
  }

  function applyPromo(code){
    if ((code||'').trim().toUpperCase() === 'SAVE10'){
      state.cart.promoCode = 'SAVE10';
      saveCart(state.cart);
      renderCart();
      return true;
    }
    return false;
  }
  function clearPromo(){
    state.cart.promoCode = null;
    saveCart(state.cart);
    renderCart();
  }

  function calcSubtotal(){
    const raw = state.cart.items.reduce((s,it)=> s + it.price * it.qty, 0);
    const discounted = state.cart.promoCode === 'SAVE10' ? raw * 0.90 : raw;
    return round2(discounted);
  }
  function calcVat(sub){ return round2(sub * VAT_RATE); }
  function calcShipping(sub){ return sub >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE; }

  function renderCart(){
    const empty = document.getElementById('cart-empty');
    const table = document.getElementById('cart-table');
    const body = document.getElementById('cart-body');

    if (state.cart.items.length === 0){
      empty.style.display = 'block';
      table.style.display = 'none';
    } else {
      empty.style.display = 'none';
      table.style.display = 'table';
      body.innerHTML = state.cart.items.map(it => {
        const line = round2(it.price * it.qty);
        return `<tr data-testid="cart-row-${it.id}">
          <td>${it.name}</td>
          <td>${currency(it.price)}</td>
          <td><input data-testid="cart-qty-${it.id}" type="number" min="1" max="10" value="${it.qty}"></td>
          <td>${currency(line)}</td>
          <td><button data-testid="remove-${it.id}">Remove</button></td>
        </tr>`
      }).join('');

      // attach events
      state.cart.items.forEach(it => {
        const qtyInput = document.querySelector(`[data-testid="cart-qty-${it.id}"]`);
        const removeBtn = document.querySelector(`[data-testid="remove-${it.id}"]`);
        qtyInput.addEventListener('change', e => setQty(it.id, Number(e.target.value)));
        removeBtn.addEventListener('click', () => removeItem(it.id));
      });
    }

    // promo UI
    const promoInput = document.getElementById('promo-input');
    const applyBtn = document.getElementById('apply-promo');
    const clearBtn = document.getElementById('clear-promo');
    const errorEl = document.getElementById('promo-error');
    const appliedEl = document.getElementById('promo-applied');

    applyBtn.onclick = () => {
      const ok = applyPromo(promoInput.value);
      if (!ok){
        errorEl.textContent = 'Invalid code';
        errorEl.style.display = 'block';
        appliedEl.style.display = 'none';
      } else {
        errorEl.style.display = 'none';
        appliedEl.textContent = 'Applied: SAVE10';
        appliedEl.style.display = 'block';
        clearBtn.style.display = 'inline-block';
      }
    };
    clearBtn.onclick = () => { clearPromo(); promoInput.value=''; errorEl.style.display='none'; clearBtn.style.display='none'; appliedEl.style.display='none'; };

    if (state.cart.promoCode){
      appliedEl.textContent = 'Applied: ' + state.cart.promoCode;
      appliedEl.style.display = 'block';
      clearBtn.style.display = 'inline-block';
      errorEl.style.display = 'none';
    } else {
      appliedEl.style.display = 'none';
      clearBtn.style.display = 'none';
    }

    // totals
    const subtotal = calcSubtotal();
    const vat = calcVat(subtotal);
    const shipping = calcShipping(subtotal);
    const grand = round2(subtotal + vat + shipping);

    document.getElementById('subtotal').textContent = currency(subtotal);
    document.getElementById('vat').textContent = currency(vat);
    document.getElementById('shipping').textContent = currency(shipping);
    document.getElementById('grand').textContent = currency(grand);
  }

  window.addEventListener('DOMContentLoaded', loadProducts);
})();