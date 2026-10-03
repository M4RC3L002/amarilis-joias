'use strict';
const $ = (s) => document.querySelector(s);
const esc = (s) =>
  String(s ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
// Tagged HTML keeps templates readable with Prettier; escaping remains explicit.
const html = (parts, ...values) =>
  parts.reduce(
    (result, part, index) => result + part + (index < values.length ? values[index] : ''),
    '',
  );
const categories = ['Brincos', 'Colares', 'Anéis', 'Pulseiras', 'Relógios', 'Conjuntos'];
let products = [],
  cart = {},
  favorites = [],
  productQuantity = 1,
  firstRender = true;
try {
  cart = JSON.parse(localStorage.getItem('amarilis-cart') || '{}');
  favorites = JSON.parse(localStorage.getItem('amarilis-favorites') || '[]');
  if (!cart || Array.isArray(cart) || typeof cart !== 'object') cart = {};
  if (!Array.isArray(favorites)) favorites = [];
} catch {
  cart = {};
  favorites = [];
}
function save() {
  try {
    localStorage.setItem('amarilis-cart', JSON.stringify(cart));
    localStorage.setItem('amarilis-favorites', JSON.stringify(favorites));
  } catch {}
  updateCounters();
}

function count() {
  return Object.values(cart).reduce((a, b) => a + b, 0);
}

// A repeated message retargets the existing transition instead of restarting it.
function toast(text) {
  const element = $('#toast');
  element.textContent = text;
  element.classList.add('is-visible');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => element.classList.remove('is-visible'), 3000);
}
