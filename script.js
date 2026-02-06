const track = document.querySelector(".slider-track");
const images = document.querySelectorAll(".slider-track img");
let currentIndex = 0;


function slide(direction) {
  currentIndex += direction;

  // 2枚しかないので0か1に制限
  if (currentIndex < 0) currentIndex = 1;
  if (currentIndex > 1) currentIndex = 0;

  const width = images[0].offsetWidth;
  track.style.transform = `translateX(-${currentIndex * width}px)`;
}

/* ========= 商品データ ========= */
const products = [
  { id: 1, name: "Tops1", category: "tops", image: "images/img4.jpg", price: 4900 },
  { id: 2, name: "Tops2", category: "tops", image: "images/img4.jpg", price: 5200 },
  { id: 3, name: "Tops3", category: "tops", image: "images/img4.jpg", price: 4800 },

  { id: 4, name: "Bottoms1", category: "bottoms", image: "images/img5.jpg", price: 6500 },
  { id: 5, name: "Bottoms2", category: "bottoms", image: "images/img5.jpg", price: 6900 },
  { id: 6, name: "Bottoms3", category: "bottoms", image: "images/img5.jpg", price: 7200 },

  { id: 7, name: "Shoes1", category: "shoes", image: "images/img6.jpg", price: 12000 },
  { id: 8, name: "Shoes2", category: "shoes", image: "images/img6.jpg", price: 11500 },
  { id: 9, name: "Shoes3", category: "shoes", image: "images/img6.jpg", price: 13000 }
];

const productList = document.getElementById("product-list");
const buttons = document.querySelectorAll(".categories button");

/* ========= 商品表示 ========= */
function renderProducts(category) {
  productList.innerHTML = "";

  const filtered =
    category === "all"
      ? products
      : products.filter(p => p.category === category);

  filtered.forEach(p => {
    productList.innerHTML += `
      <div class="product">
        <img src="${p.image}" alt="${p.name}">
        <p>${p.name}</p>
        <p class="price">¥${p.price.toLocaleString()}</p>

        <!-- 追加 -->
        <select class="size">
          <option value="">サイズ</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
        </select>

        <button class="add-cart" data-id="${p.id}">
          カートに追加
        </button>
      </div>
    `;
  });
}

/* ========= カテゴリ切替 ========= */
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.category);
  });
});

/* ========= カート処理 ========= */
let cart = [];

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("add-cart")) return;

  const id = Number(e.target.dataset.id);
  const size = e.target.previousElementSibling.value;

  if (!size) {
    alert("サイズを選択してください");
    return;
  }

  const product = products.find(p => p.id === id);

  cart.push({
    name: product.name,
    size,
    price: product.price
  });

  e.target.previousElementSibling.value = "";
 renderCart();
});


function renderCart() {
  const list = document.getElementById("cart-list");
  const totalEl = document.getElementById("cart-total");

  list.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} / ${item.size} / ¥${item.price.toLocaleString()}`;
    list.appendChild(li);
    total += item.price;
  });

  totalEl.textContent = total.toLocaleString();
}

/* ========= チェックアウト ========= */
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("カートが空です");
    return;
  }

  alert("購入完了！（デモ）");
  cart = [];
  renderCart();
});

/* 初期表示 */
renderProducts("all");
