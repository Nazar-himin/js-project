// class Cart {
//   constructor(cartContainer) {
//     this.cartContainer = cartContainer;
//     this.cart = JSON.parse(localStorage['cart'] || '{}');
//     this.addEventListener();
//     this.updateBadge();
//   }
//   addProduct(id) {
//     this.cart[id] = (this.cart[id] || 0) + 1;
//     this.saveCart();
//     this.updateBadge();
//   }
//   deleteProduct(id) {
//     if (this.cart[id] > 1) {
//       this.cart[id] -= 1;
//     } else {
//       delete this.cart[id];
//     }
//     this.saveCart();
//     this.updateBadge();
//   }
//   saveCart() {
//     localStorage['cart'] = JSON.stringify(this.cart);
//   }
//   renderCart() {
//     let total = 0;
//     let cartDomString = `<div class="cart_div">
//             <div class="cart_row">
//                 <div class="cart_product_row">Product</div>
//                 <div class="cart_price_row">Price</div>
//                 <div class="cart_quantity_row">Quantity</div>
//             </div>
//         </div>`;
//     for (let id in this.cart) {
//       let product = productList.getProductById(id);
//       total += product.price * this.cart[id];
//       cartDomString += `<div class="cart_row" data-id="${id}">
//             <div>${product.title}</div>
//             <div>${product.price}</div>
//             <div>${this.cart[id]}</div>
//             <div><button class="btn_plus">+</button></div>
//             <div><button class="btn_minus">-</button></div>
//           </div>`;
//     }
//     total = total.toFixed(2);
//     cartDomString += `<div class="cart_row">
//         <div>TOTAL</div>
//         <div>${total}$</div>
//       </div>`;
//     this.cartContainer.find('.cart_dom_container').html(cartDomString);
//   }
// }
