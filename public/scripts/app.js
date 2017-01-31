/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {

  $('.new-tweet form textarea').focus();

  function createTweetElement(userObject) {
    let $tweet = $('<article>');
    let $header = $('<header>');
    let $contentDiv = $('<div>');
    let $footer = $('<footer>');

    // Framework
    $tweet.append($header).append($contentDiv).append($footer);
    $contentDiv.addClass('content');

    // header
    $header.append($('<div>').addClass('avatar')
              .append($('<img>').attr('src', userObject.user.avatars.small)))
           .append($('<div>').addClass('userName').text(userObject.user.name))
           .append($('<div>').addClass('handle').text(userObject.user.handle));

    // div
    $contentDiv.text(userObject.content.text);

    // // footer
    $footer.text(userObject.created_at);
    $footer.append($('<span>').addClass('fa fa-heart').attr('ria-hidden', true))
           .append($('<span>').addClass('fa fa-retweet').attr('ria-hidden', true))
           .append($('<span>').addClass('fa fa-flag').attr('ria-hidden', true));

    return $tweet;
  }// end of createTweetElement

  function renderTweets(tweetData) {
    for (let i = 0; i < tweetData.length; i++){
      var $tweetElement = createTweetElement(tweetData[i]);
      $('#tweetsContainer').prepend($tweetElement);
    }
  } // end of renderTweets

  function ajaxGet() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (tweetData) {
        renderTweets(tweetData);
      }
    });// end of ajax
  }
  ajaxGet();


  // form validation and submission
  $('form').on('submit', function (event) {
    event.preventDefault();

    if($('form').find('textArea').val().length > 140) {
      sweetAlert('Sorry...' ,'Please do not excess 140 characters limit.');
      return;
    } else {
      if (!$.trim($('textArea').val())) {
        sweetAlert('sorry...', 'Your input is empty.');
      } else {
          $.ajax({
            url: '/tweets',
            method: 'post',
            data: $(this).serialize(),
            success: function () {
                       ajaxGet();
                     },
            error: function(error){
              console.log('Please re-input!');
            }
          }); //end of ajax call
      }// end of inner else
    } //end of outer else
    $('textArea').val('').focus();
    $('textArea').siblings('.counter').text(140);
  });//end of form

  $('#compose').on('click', function () {
    $(this).closest('#nav-bar').siblings('.container').find('.new-tweet').slideToggle();
    $(this).closest('#nav-bar').siblings('.container').find('.new-tweet form textarea').focus();
  });

  // left top corner animation
  $('#nav-bar .logo').on('click', function () {
    $(this).css('display', 'none');
    $(this).siblings('#gifLogo').css('display', 'block');
  });
  $('#gifLogo').on('click', function () {
    $(this).css('display', 'none');
    $(this).siblings('.logo').css('display', 'block');
  });

});// end of whole function
