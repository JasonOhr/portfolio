(function(){
  'use strict';

  $(document).ready(function(){

      var renderOthers = function(){
          return topMenu.html(JST['main_menu']());
      };
       $('body').prepend(JST['application']());
      var dude = $(".port-skills").height();
        console.log(dude);
    // Cache selectors
    var topMenu = $("#top-menu");
    topMenu.append(JST['main_menu']());
    var lastId,

        topMenuHeight = topMenu.outerHeight()+15,
    // All list items from menu
        menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
            //pulls associated id from anchors href from the menu
            var inside = $(this).attr("href");
            //now find 'inside's ' anchor and assign it to item
            //this can be done in one step, tho I'm breaking it down for my own clarity
            var item = $(inside);
          if (item.length) { return item; }
            //here, the href # has no length because it doesn't have a
            //corresponding anchor accompany it
        });

// Bind click handler to menu items
// so we can get a fancy scroll animation
    menuItems.click(function(e){
      var href = $(this).attr("href"),
          offsetTop = href === "#" ? 0 : $(href).offset().top;
      $('html, body').stop().animate({
        scrollTop: offsetTop
      }, 700);
      e.preventDefault();
    });

// Bind to scroll
    $(window).scroll(function(){
      var mid = $(window).height()/2;
      // Get container scroll position
      var fromTop = $(this).scrollTop()+mid;

      // Get id of current scroll item
      var cur = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
          return this;
      });
      // Get the id of the current element
      cur = cur[cur.length-1];
      var id = cur && cur.length ? cur[0].id : "";

      if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
            .parent().removeClass("active")
            .end().filter("[href=#"+id+"]").parent().addClass("active");
      }

    });
      //$('.port-overlay').on(mouseenter,function(e){
      //
      //})
  }); //end of doc ready
})();
