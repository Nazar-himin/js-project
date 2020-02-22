// ===== SLIDER ====

$(document).ready(function() {
  $('#slider_section').slick({
    slidesToShow: 3,
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
});

// ===== SLIDER END ====

// ===== Scroll to Top ====
$(window).scroll(function() {
  if ($(this).scrollTop() >= 50) {
    // If page is scrolled more than 50px
    $('#return-to-top').fadeIn(200); // Fade in the arrow
  } else {
    $('#return-to-top').fadeOut(200); // Else fade out the arrow
  }
});
$('#return-to-top').click(function() {
  // When arrow is clicked
  $('body,html').animate(
    {
      scrollTop: 0 // Scroll to top of body
    },
    500
  );
});
// ===== Scroll to Top END====

// ===== Smooth Scroll ====
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

// ===== Smooth Scroll ====
