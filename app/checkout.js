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
  function calc(subtotal, promoCode){
    const vat = round2(subtotal * VAT_RATE);
    const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const grand = round2(subtotal + vat + shipping);
    return { vat, shipping, grand };
  }
  function calcSubtotal(cart){
    const raw = cart.items.reduce((s,it)=> s + it.price * it.qty, 0);
    const discounted = cart.promoCode === 'SAVE10' ? raw * 0.90 : raw;
    return round2(discounted);
  }
  function render(){
    const cart = loadCart();
    const itemsEl = document.getElementById('summary-items');
    if (cart.items.length === 0){
      itemsEl.innerHTML = `<div class="badge">Your cart is empty.</div>`;
    } else {
      itemsEl.innerHTML = cart.items.map(i => {
        const line = round2(i.price * i.qty);
        return `<div style="display:flex;justify-content:space-between;margin:6px 0">
          <div>${i.name} × ${i.qty}</div>
          <div>${currency(line)}</div>
        </div>`
      }).join('');
    }
    const subtotal = calcSubtotal(cart);
    const {vat, shipping, grand} = calc(subtotal, cart.promoCode);
    document.getElementById('sum-subtotal').textContent = currency(subtotal);
    document.getElementById('sum-vat').textContent = currency(vat);
    document.getElementById('sum-shipping').textContent = currency(shipping);
    document.getElementById('sum-grand').textContent = currency(grand);

    const promo = document.getElementById('sum-promo');
    if (cart.promoCode){
      promo.style.display = 'inline-block';
      promo.textContent = `Promo applied: ${cart.promoCode}`;
    } else {
      promo.style.display = 'none';
    }
  }

  function validate(){
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const postcode = document.getElementById('postcode').value.trim();
    const errors = [];
    if (!name) errors.push('Full name is required.');
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push('A valid email is required.');
    if (!address) errors.push('Address is required.');
    if (!city) errors.push('City is required.');
    if (!postcode) errors.push('Postcode is required.');
    return { ok: errors.length === 0, errors };
  }

  function placeOrder(){
    const formError = document.getElementById('form-error');
    const ok = validate();
    if (!ok.ok){
      formError.style.display = 'block';
      formError.textContent = ok.errors.join(' ');
      return;
    }
    formError.style.display = 'none';

    // Simulate order placement
    const orderId = Math.random().toString(36).slice(2, 10).toUpperCase();
    localStorage.removeItem('cart');
    render();
    const success = document.getElementById('order-success');
    success.style.display = 'block';
    success.textContent = `Order placed! Reference: ${orderId}`;
  }

  window.addEventListener('DOMContentLoaded', () => {
    render();
    document.getElementById('place-order').addEventListener('click', placeOrder);
  });
})();