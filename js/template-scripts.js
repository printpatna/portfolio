jQuery(document).ready(function($) {
  // One page navigation
  var lastId,
      headerHeight = $('header').outerHeight(),
      topMenu = $(".top-nav"),
      menuItems = topMenu.find("a"),
      scrollItems = menuItems.map(function() {
          var item = $($(this).attr("href"));
          if (item.length) {
              return item;
          }
      });
  menuItems.click(function(e) {
      var href = $(this).attr("href"),
          offsetTop = href === "#" ? 0 : $(href).offset().top + 1 - headerHeight;
      $('html, body').stop().animate({
          scrollTop: offsetTop
      }, 300);
      $('.top-nav > ul').toggleClass('show-menu', 'slow');
      e.preventDefault();
  });
  $(window).scroll(function() {
      var fromTop = $(this).scrollTop() + headerHeight + 1;
      var cur = scrollItems.map(function() {
          if ($(this).offset().top < fromTop)
              return this;
      });
      cur = cur[cur.length - 1];
      var id = cur && cur.length ? cur[0].id : "";
  
      if (lastId !== id) {
          lastId = id;
          menuItems
              .parent().removeClass("active-item")
              .end().filter("[href=#" + id + "]").parent().addClass("active-item");
      }
  });
  // Offset Section by height of header
  $("section").css('padding-top',headerHeight);
});  
