const products = [
    {
      id: 1,
      name: "Heating Pads",
      price: 20,
      image: "heatingpad.png",
      quantity:1
    },
    {
      id: 2,
      name: "Sanitary Pads",
      price: 10,
      image: "pads.png",
      quantity:1
    },
    {
      id: 3,
      name: "Tampons",
      price: 10,
      image: "tampon.png",
      quantity:1
    },
    {
      id: 4,
      name: "Period Underwear",
      price: 20,
      image: "underwear.png",
      quantity:1,
    }
  ];
  
  
  let cart = []
  
  const productsHTML = products.map(
    (product) => `
      <div class="product-card">
          <img src="${product.image}" alt="${product.name}" class="product-image" />
          <h2 class="product-name">${product.name}</h2>
          <strong>$${product.price}</strong>
          <button class="product-btn" id="${product.id}">Add to Cart</button>
      </div>`
  );
  
  const result = document.querySelector(".result");
  result.innerHTML = productsHTML.join("");
  
  
  function updateCart() {
    const cartHTML = cart.map(
      (item) => `<div class="cart-item">
              <h3>${item.name}</h3>
              <div class="cart-detail"><div class="mid">
                  <button onclick={decrItem(${item.id})}>-</button>
                  <p>${item.quantity}</p>
                  <button onclick={incrItem(${item.id})}>+</button>
              </div>
              <p>$${item.price}</p>
              <button onclick={deleteItem(${item.id})} class="cart-product" id=${item.id}>D</button></div>
             </div>`
    );
  
    const cartItems = document.querySelector(".cart-items");
    cartItems.innerHTML = cartHTML.join("");
  }
  
  let num = document.querySelectorAll(".product-btn").length;
  for (let i = 0; i < num; i++) {
    document
      .querySelectorAll(".product-btn")
    [i].addEventListener("click", function (e) {
      addToCart(products, parseInt(e.target.id));
    });
  }
  
  function addToCart(products, id){
    const product = products.find((product) => product.id === id);
    const cartProduct = cart.find((product) => product.id === id);
    if (cartProduct != undefined && product.id == cartProduct.id) {
      incrItem(id);
    } else {
      cart.unshift(product);
    }
    updateCart();
    getTotal(cart);
  };
  
  function getTotal(cart) {
    let { totalItem, cartTotal } = cart.reduce(
      (total, cartItem) => {
        total.cartTotal += cartItem.price * cartItem.quantity;
        total.totalItem += cartItem.quantity;
        return total;
      },
      { totalItem: 0, cartTotal: 0 }
    );
    const totalItemsHTML = document.querySelector(".noOfItems");
    totalItemsHTML.innerHTML = `${totalItem} items`;
    const totalAmountHTML = document.querySelector(".total");
    totalAmountHTML.innerHTML = `$${cartTotal}`;
  }
  
  function incrItem(id) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i] && cart[i].id == id) {
        cart[i].quantity += 1;
      }
    }
    updateCart();
    getTotal(cart);
  }
  
  function decrItem(id) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id == id && cart[i].quantity > 1) {
        cart[i].quantity -= 1;
      }
    }
    updateCart();
    getTotal(cart);
  }
  
  function deleteItem(id) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        cart[i].quantity = 1;
        cart.splice(i, 1);
      }
    }
    updateCart();
    getTotal(cart);
  }
