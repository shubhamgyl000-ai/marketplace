const API_URL = "http://localhost:8080/api/products";
const demoProducts = [
  {id:1,name:"Wireless Headphones",category:"Tech",price:1499,emoji:"🎧",description:"Comfortable sound for every day"},
  {id:2,name:"Everyday Sneakers",category:"Fashion",price:1999,emoji:"👟",description:"Easy style, all-day comfort"},
  {id:3,name:"Desk Lamp",category:"Home",price:899,emoji:"💡",description:"A little light for big ideas"},
  {id:4,name:"Smart Watch",category:"Tech",price:2499,emoji:"⌚",description:"Keep your day in view"},
  {id:5,name:"Canvas Backpack",category:"Fashion",price:1199,emoji:"🎒",description:"Carry your essentials"},
  {id:6,name:"Coffee Mug",category:"Home",price:299,emoji:"☕",description:"Your favourite morning ritual"},
  {id:7,name:"Portable Speaker",category:"Tech",price:1799,emoji:"🔊",description:"Bring music wherever you go"},
  {id:8,name:"Classic Cap",category:"Fashion",price:499,emoji:"🧢",description:"A simple finishing touch"}
];
let products = [...demoProducts];
let cart = [];
const grid = document.getElementById("productGrid");
const statusText = document.getElementById("status");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");
const money = value => "₹" + Number(value).toLocaleString("en-IN");

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const visible = products.filter(p =>
    (p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)) &&
    (category === "All" || p.category === category)
  );
  statusText.textContent = visible.length ? visible.length + " products to explore" : "No products found. Try another search.";
  grid.innerHTML = visible.map(p => `
    <article class="product-card">
      <div class="product-art" aria-hidden="true">${p.emoji || "🛍️"}</div>
      <p class="product-category">${escapeHtml(p.category || "General")}</p>
      <h3>${escapeHtml(p.name)}</h3>
      <p class="product-category">${escapeHtml(p.description || "")}</p>
      <div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-button" data-add="${p.id}" aria-label="Add ${escapeHtml(p.name)} to cart">+</button></div>
    </article>`).join("");
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function renderCart() {
  document.getElementById("cartCount").textContent = cart.reduce((sum,item) => sum + item.quantity,0);
  document.getElementById("cartItems").innerHTML = cart.length ? cart.map(item => `
    <div class="cart-row"><span class="cart-emoji">${item.emoji || "🛍️"}</span><div class="cart-row-info"><strong>${escapeHtml(item.name)}</strong><small>${money(item.price)} × ${item.quantity}</small></div><button class="remove-item" data-remove="${item.id}">Remove</button></div>`).join("") : "<p>Your cart is empty. Add a product to get started.</p>";
  document.getElementById("cartTotal").textContent = money(cart.reduce((sum,item) => sum + Number(item.price)*item.quantity,0));
}
function openCart(){cartPanel.classList.add("open");cartPanel.setAttribute("aria-hidden","false");overlay.classList.add("show")}
function closeCart(){cartPanel.classList.remove("open");cartPanel.setAttribute("aria-hidden","true");overlay.classList.remove("show")}
grid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const product = products.find(p => String(p.id) === button.dataset.add);
  if (!product) return;
  const existing = cart.find(item => String(item.id) === String(product.id));
  if (existing) existing.quantity++; else cart.push({...product,quantity:1});
  renderCart();
  button.textContent = "✓";
  setTimeout(() => { if(button.isConnected) button.textContent = "+"; }, 700);
});
document.getElementById("cartItems").addEventListener("click", event => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;
  cart = cart.filter(item => String(item.id) !== button.dataset.remove);
  renderCart();
});
document.getElementById("searchForm").addEventListener("submit", event => {event.preventDefault();renderProducts()});
searchInput.addEventListener("input",renderProducts);
categoryFilter.addEventListener("change",renderProducts);
document.getElementById("cartToggle").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
overlay.addEventListener("click",closeCart);
document.getElementById("checkoutButton").addEventListener("click",() => {
  if (!cart.length) { alert("Your cart is empty."); return; }
  alert("Demo order created! Real checkout and payment are not connected yet.");
  cart = []; renderCart(); closeCart();
});
async function loadProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("API unavailable");
    const data = await response.json();
    if (Array.isArray(data) && data.length) products = data.map(p => ({...p,emoji:p.emoji || "🛍️"}));
  } catch (_) {
    // Keep demo products so the storefront also works without starting Java.
  }
  renderProducts();
}
renderCart();
loadProducts();