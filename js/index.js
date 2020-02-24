let cart = new Cart($('#cartPopup'));

let list = new List($('#list-to-read'));

let bookList = new BookList(
  'books.json',
  $('.books_grid'),
  $('#slider_section'),
  cart,
  list
);
