---
---

{% include js/countdown.min.js %}
{% include js/jquery.slabtext.min.js %}

$('#expo_countdown p').countdown('2019/02/21 14:00:00', function(event) {
  $(this).html(event.strftime('%T'));
});

function set_height(){
  var height = $(window).outerHeight();
  $('.placeholder__inner').css('min-height', height);
}
set_height();

$('.placeholder__inner').click( function( e ){
  if (e.target !== this) {
    return;
  }
  $(this).toggleClass('active');
})
