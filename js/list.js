class List {
  constructor(listContainer) {
    this.listContainer = listContainer;
    this.list = JSON.parse(localStorage['list'] || '{}');
    this.addEventListeners();
  }

  addEventListeners() {
    document
      .querySelector('#book_read')
      .addEventListener('click', () => this.renderList());
  }

  addBookToList(id) {
    this.list[id] = (this.list[id] || 0) + 1;
    this.saveList();
  }

  saveList() {
    localStorage['list'] = JSON.stringify(this.list);
  }

  deleteListBook(id) {
    if (this.list[id].value > 1) {
      this.list[id] -= 1;
    } else {
      delete this.list[id];
    }
    this.saveList();
  }

  renderList() {
    $('#list_popup').slideDown();
    let listDomString = '';
    for (const id in this.list) {
      const book = bookList.getBooksById(id);
      listDomString += `<div class="books_lict_items" data-id="${id}">
        <label><input type="checkbox">${book.name}</label><div class="list_btn_del"><button class="list_delete">X</button></div>
      </div>`;
    }

    this.listContainer.find('.books_lict_section').html(listDomString);
    $('input[type=checkbox]').change(function() {
      if ($('input[type=checkbox]:checked')) {
        $('input[type=checkbox]:checked').attr('disabled', 'disabled');
        $('input[type=checkbox]:checked')
          .parent('label')
          .css('opacity', '0.2');
      }
    });

    this.listContainer
      .find('.list_delete')
      .click(ev => this.changeList(ev, this.deleteListBook));

    $('.list_delete').click(function() {
      $(this)
        .parent()
        .parent('.books_lict_items')
        .slideUp();
    });
    $('.close').click(function() {
      $('#list_popup').slideUp();
    });
  }
  changeList(ev, operation) {
    const button = $(ev.target);
    const id = button
      .parent()
      .parent()
      .data('id');
    operation.call(this, id);
    this.renderList();
  }
}
