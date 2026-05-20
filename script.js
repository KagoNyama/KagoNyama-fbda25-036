
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Interactive Shop with Alerts</title>

<style>
body { font-family: Arial; padding: 20px; }
.product { border: 1px solid #ccc; padding: 10px; margin: 10px; display:inline-block; }
button { padding: 5px 10px; cursor: pointer; }
table { margin-top: 20px; border-collapse: collapse; width: 60%; }
th, td { border: 1px solid black; padding: 8px; text-align:center; }
input { padding: 8px; margin: 5px; }
</style>

</head>
<body>

<h1>🛍 My Shop</h1>

<!-- PRODUCTS -->
<div class="product">
  <h3>Phone</h3>
  <p>$300</p>
  <button onclick="addToCart('Phone',300)">Add to Cart</button>
</div>

<div class="product">
  <h3>Laptop</h3>
  <p>$800</p>
  <button onclick="addToCart('Laptop',800)">Add to Cart</button>
</div>

<div class="product">
  <h3>Headphones</h3>
  <p>$50</p>
  <button onclick="addToCart('Headphones',50)">Add to Cart</button>
</div>

<!-- CART -->
<h2>🛒 Cart</h2>

<table>
<thead>
<tr>
  <th>Product</th>
  <th>Price</th>
  <th>Action</th>
</tr>
</thead>
<tbody id="cartTable"></tbody>
</table>

<h3>Total: $<span id="total">0</span></h3>

<button onclick="clearCart()">Clear Cart</button>

<!-- FORM -->
<h2>📋 Checkout Form</h2>

<form id="checkoutForm">
  <input type="text" id="name" placeholder="Your Name"><br>
  <input type="email" id="email" placeholder="Email"><br>
  <button type="submit">Submit Order</button>
</form>

<p id="message"></p>

<!-- LINKS -->
<h2>🔗 Links</h2>
#Go to Google</a>

<script>

// CART DATA
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART
function addToCart(name, price) {
  cart.push({name, price});
  saveCart();
  displayCart();

  alert("✅ " + name + " added to cart!");
}

// REMOVE ITEM
function removeItem(index) {
  if(confirm("Remove this item from cart?")){
    cart.splice(index, 1);
    saveCart();
    displayCart();
    alert("❌ Item removed from cart");
  }
}

// SAVE CART
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// DISPLAY CART
function displayCart() {
  let table = document.getElementById("cartTable");
  let total = 0;
  table.innerHTML = "";

  if(cart.length === 0){
    table.innerHTML = "<tr><td colspan='3'>Cart is empty</td></tr>";
  }

  cart.forEach((item, index) => {
    total += item.price;

    let row = document.createElement("tr");

    row.innerHTML = `
      <td>P{item.name}</td>
      <td>$${item.price}</td>
      <td><button onclick="removeItem(${index})">Remove</button></td>
    `;

    table.appendChild(row);
  });

  document.getElementById("total").innerText = total;
}

// CLEAR CART
function clearCart() {
  if(cart.length === 0){
    alert("⚠️ Cart already empty!");
    return;
  }

  if(confirm("Are you sure you want to clear cart?")){
    cart = [];
    saveCart();
    displayCart();
    alert("🗑 Cart cleared!");
  }
}

// FORM VALIDATION
document.getElementById("checkoutForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();

  if(name === "" || email === ""){
    alert("⚠️ Please fill in all fields!");
    return;
  }

  if(cart.length === 0){
    alert("⚠️ Your cart is empty!");
    return;
  }

  if(!email.includes("@")){
    alert("⚠️ Please enter a valid email!");
    return;
  }

  alert("✅ Order successful!");

  document.getElementById("message").innerHTML =
    "🎉 Thank you " + name + "! Your order has been placed.";

  clearCart();
});

// LINK CONTROL
function openLink(event) {
  event.preventDefault();
  alert("Opening Google...");
  window.open("https://www.google.com", "_blank");
}

// LOAD CART
window.onload = displayCart;

</script>

</body>
</html>

