$(function() {
  $('.smooth_btn a').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      event.preventDefault();
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: target.offset().top
          },
          800
        );
    }
  });
});

$(window).scroll(function() {
  if ($(this).scrollTop() > 300) {
    $('#return-to-top').addClass('show');
  } else {
    $('#return-to-top').removeClass('show');
  }
});

$('#return-to-top').on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, '300');
});
