---
---

{% include js/countdown.min.js %}
{% include js/jquery.slabtext.min.js %}

$('#expo_countdown p').countdown('2019/02/21 14:00:00', function(event) {
  $(this).html(event.strftime('%T'));
});
