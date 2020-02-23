class BookList {
  constructor(booksUrl, renderContainer, sliderContainer, btnInfo, cart) {
    this.cart = cart;
    fetch(booksUrl)
      .then(result => result.json())
      .then(books => {
        this.books = books;
        this.sliderBooks(sliderContainer, books);
        this.renderBooks(renderContainer, books);
        this.addEventListeners();
      });
  }
  getBooksById(id) {
    return this.books.find(el => el.id === id);
  }
  sliderBooks(container, books) {
    let sliderListDomString = '';

    let lastFive = books.slice(-8);
    lastFive.forEach(sliderBook => {
      sliderListDomString += `<div class="book_slide">
            <div class="slide_image">
              <img src="./img/${sliderBook.image}" alt="book-image" />
              <div class="testing">
                <div class="slide_name">
                  <span>Name:</span>
                  <span class="book_slide_name">${sliderBook.name}</span>
                </div>
                <div class="slide_author">
                  <span>Author:</span>
                  <span class="book_slide_author">${sliderBook.author}</span>
                </div>
                <div class="slide_genre">
                  <span>Genre:</span>
                  <span class="book_slide_genre">${sliderBook.genre}</span>
                </div>
                <div class="slide_year">
                  <span>Year:</span>
                  <span class="book_slide_year">${sliderBook.year}</span>
                </div>
                <div class="slide_desc">
                  <span class="book_slide_desc">${sliderBook.description}</span>
                </div>
              </div>
            </div>
            <div class="slide_btns">
              <a href="#" class="slide_btn_info" data-id="${sliderBook.id}">Read later</a>
              <a href="#" class="slide_btn_buy" data-id="${sliderBook.id}">Add to Cart</a>
            </div>
          </div>`;
    });
    container.html(sliderListDomString);
    $(container).slick({
      slidesToShow: 4,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            slidesToShow: 1
          }
        }
      ]
    });
  }
  renderBooks(container, books) {
    let bookListDomString = '';
    books.forEach(el => {
      let desc = el.description.substring(0, 280) + '...';
      el.description = desc;
    });
    books.forEach(book => {
      bookListDomString += `<div class="book">
              <div class="book_info">
                <div class="book_name_div">
                  <span>Name:</span>
                  <span class="book_name">${book.name}</span>
                </div>
                <div class="book_author_div">
                  <span>Author:</span>
                  <span class="book_author">${book.author}</span>
                </div>
                <div class="book_genre_div">
                  <span>Genre:</span>
                  <span class="book_genre">${book.genre}</span>
                </div>
                <div class="book_year_div">
                  <span>Year:</span>
                  <span class="book_year">${book.year}</span>
                </div>
                <div class="book_desc_div">
                  <span class="book_desc"
                    >${book.description}</span
                  >
                </div>
                <div class="book_price_div">
                  <span>Price:</span>
                  <span class="book_price">${book.price}</span>
                </div>
              </div>
              <div class="book_img">
                <img src="./img/${book.image}" alt="book-image" />
              </div>
              <div class="book_btn_div">
                <a href="#" class="book_btn_read" data-id="${book.id}">Read Later</a>
                <button class="book_btn_cart" data-id="${book.id}">Read Later</button>
                <a href="#" class="boosk_btn_cart" data-id="${book.id}">Add to cart</a>
              </div>
            </div>`;
    });
    container.html(bookListDomString);
  }
  addEventListeners() {
    // $('#productInfoModal').on('show.bs.modal', event => {
    //   const button = $(event.relatedTarget); // Button that triggered the modal
    //   const id = String(button.data('id')); // Extract info from data-* attributes
    //   const product = this.getProductById(id);
    //   const modal = $('#productInfoModal');
    //   modal
    //     .find('.modal-body .card-img-top')
    //     .attr('src', 'img/products/' + product.image)
    //     .attr('alt', product.title);
    //   modal.find('.modal-body .card-title').text(product.title);
    //   modal.find('.modal-body .card-text').text(product.description);
    //   modal
    //     .find('button.buy')
    //     .text(`${product.price} - Buy`)
    //     .data('id', id);
    // });
    // $('.card.product button.buy, #productInfoModal button.buy').click(event => {
    //   const button = $(event.target);
    //   const id = button.data('id');
    //   this.cart.addProduct(id);
    //   window.showAlert('Product added to cart');
    // });

    $('.book_btn_cart').click(event => {
      const button = $(event.target);
      const id = button.data('id');
      this.cart.addProduct(id);
      window.showAlert('Product added to cart');
    });
  }
}
