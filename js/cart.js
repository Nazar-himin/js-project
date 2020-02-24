class Cart {
  constructor(cartContainer) {
    this.cartContainer = cartContainer;
    this.cart = JSON.parse(localStorage['cart'] || '{}');
    this.addEventListeners();
    this.updateBadge();
  }
  addEventListeners() {
    document
      .querySelector('#cart')
      .addEventListener('click', () => this.renderCart());

    this.cartContainer.find('.order').click(ev => this.order(ev));
  }
  addBook(id) {
    this.cart[id] = (this.cart[id] || 0) + 1;
    this.saveCart();
    this.updateBadge();
  }
  deleteBook(id) {
    if (this.cart[id] > 1) {
      this.cart[id] -= 1;
    } else {
      delete this.cart[id];
    }
    this.saveCart();
    this.updateBadge();
  }
  saveCart() {
    localStorage['cart'] = JSON.stringify(this.cart);
  }
  renderCart() {
    $('#cartPopup').slideDown();

    let total = 0;
    let cartDomString = `<div class="cart-book-container">
                <div class="popup-row popup-title">
                    <div class="popup-grid"><strong>Book</strong></div>
                    <div class="popup-grid popup-center"><strong>Price</strong></div>
                    <div class="popup-grid popup-center"><strong>Quantity</strong></div>
                    <div class="popup-grid popup-center math-btn"></div>
                    <div class="popup-grid popup-center math-btn"></div>
                </div>`;
    for (const id in this.cart) {
      const book = bookList.getBooksById(id);
      total += book.price * this.cart[id];
      cartDomString += `<div class="popup-row popup-book-title" data-id="${id}"> 
                    <div class="popup-grid">${book.name}</div>
                    <div class="popup-grid popup-center">${book.price}</div>
                    <div class="popup-grid popup-center">${this.cart[id]}</div>
                    <div class="popup-grid popup-center math-btn"><button class="btn btn-sm plus">+</button></div>
                    <div class="popup-grid popup-center math-btn"><button class="btn btn-sm minus">-</button></div>
                </div>`;
    }
    total = total.toFixed(2);
    cartDomString += `
                <div class="popup-row popup-total-title">
                    <div class="popup-grid"><strong>TOTAL</strong></div>
                    <div class="popup-grid popup-center" id="cart-total"><strong>$${total}</strong></div>
                </div>            
        </div>`;
    this.cartContainer.find('.cart-book-list-container').html(cartDomString);
    this.cartContainer
      .find('.plus')
      .click(ev => this.changeQuantity(ev, this.addBook));
    this.cartContainer
      .find('.minus')
      .click(ev => this.changeQuantity(ev, this.deleteBook));
    $('.close').click(function() {
      $('#cartPopup').slideUp();
    });
    $('.btn-secondary').click(function() {
      $('#cartPopup').slideUp();
    });
  }
  changeQuantity(ev, operation) {
    const button = $(ev.target);
    const id = button
      .parent()
      .parent()
      .data('id');
    operation.call(this, id);
    this.renderCart();
  }
  updateBadge() {
    $('#cart-badge').text(Object.keys(this.cart).length);
  }
  order(ev) {
    let cartLength = document.getElementById('cart-badge').textContent;
    if (cartLength == 0) {
      window.showAlert('Please choose books to order', false);
      return;
    }
    let form = document.querySelector('.form-contacts');

    if (form.checkValidity()) {
      ev.preventDefault();
      $.ajax({
        url: 'https://www.formbackend.com/f/d5ee66927ad81e31',
        method: 'POST',
        data: {
          clientName: $('#client-name').val(),
          clientEmail: $('#client-email').val(),
          cart: this.cart,
          total: $('#cart-total strong').text()
        },
        dataType: 'json'
      });
      window.showAlert(
        'Your order has been shipped for processing, our manager will contact you shortly',
        true
      );
    } else {
      window.showAlert('Please fill all fields', false);
    }
  }
}
