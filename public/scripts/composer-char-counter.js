$(function () {
  $('.new-tweet form').on('keyup', 'textarea', function () {
    let textArea = $(this);
    let keyCount = 140 - textArea.val().length;
    if (keyCount >= 0) {
      textArea.siblings('.counter').text(keyCount).css('color', 'black');
    } else {
      textArea.siblings('.counter').text(keyCount).css('color', 'red');
    }
  });
});