function slideToggle() {
  (function($) {
    var $body = $('body'),
      $navSlide = $('#nav-slide');

    function showNavSlide() {
      // show overlay
      var options = {
        onclose: function() {
          $navSlide
            .removeClass('active')
            .appendTo(document.body);
          $('.hide-nav-slide')
            .removeClass('hide-nav-slide')
            .addClass('show-nav-slide')
        }
      };

      $navSlide.addClass('active');
      var $overlayEl = $(mui.overlay('on', options));

      // show element
      $navSlide.appendTo($overlayEl);
      setTimeout(function() {
        $navSlide.addClass('active');
        $('.show-nav-slide')
          .removeClass('show-nav-slide')
          .addClass('hide-nav-slide');
      }, 20);
    }

    function hideNavSlide() {
      $body.toggleClass('hide-nav-slide');
    }

    $('.show-nav-slide').on('click', hideNavSlide);
    $('.hide-nav-slide').on('click', showNavSlide);
  })(jQuery);
};

module.exports = slideToggle;