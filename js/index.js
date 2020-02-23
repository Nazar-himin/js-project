// ===== Book List====

let inputText = text;
let btnText = text_btn;
let textSpan = span_text;

btnText.addEventListener('click', function() {
  if (inputText.value.trim().length !== 0) {
    let createCeckbox = document.createElement('div');
    createCeckbox.className = 'div_check';
    createCeckbox.innerHTML = `<div><label><input type="checkbox">${inputText.value}</label><button class="aa">X</button></div>`;
    textSpan.prepend(createCeckbox);
    inputText.value = '';
  } else {
    return;
  }
});

// ===== Book Grid and Slider====

let bookList = new BookList(
  'books.json',
  $('.books_grid'),
  $('#slider_section'),
  cart
);

// ===== Boock Grid and Slider END====
