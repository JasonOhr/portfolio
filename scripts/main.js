(function(){
  'use strict';

    $(document).ready(function(){
        var projects = {
            project:[
            {
                name:"Nutrasight",
                href: "nutrasight/app/#/ingredients",
                alt:"nutrasight",
                img:"nutrasight",
                github:"final-project",
                description:"This is my first Angular site and is a work in progress.  For the final project at the Iron Yard, I decided to learn as much as I could about Angular and build a site, this is what I came up with.  It looks up food items from a list of 8500 and displays their computed nutritional value.  It also has the ability to find the nutritional value of custom recipes.",
                skills:["AngularJS","JavaScript","Restful API","JSON","Highcharts","Sass","Parse"]
            },
            {
                name:"Majestic Thai",
                href: "majestic-thai",
                alt:"majestic-thai",
                img:"majestic-thai",
                github:"majestic-thai",
                description:"A Backbone app developed over the weekend at the Iron Yard.  It combines the Backbone router and child views to allow the user to add and remove items from an order.  In addition, it collects and displays the most popular food items.",
                skills:["Backbone.js","JavaScript","Handlebars","Neat","Sass"]
            },
            {
                name:"Sonfast",
                href: "sonfast",
                alt:"sonfast",
                img:"sonfast",
                github:"sonfast",
                description:"This is a site I built for a fastener business and is currently still active.  It is mostly a Bootstrap site with custom LESS and a couple of Google maps on the Contact page.  While I used Bootstrap for the site, I did not use their scroll spy for the main menu, instead I used JavaScript and JQuery.",
                skills:["JavaScript","JQuery","Responsive","Bootstrap","LESS","Google Maps"]
            },
            {
                name:"Etsy recreation",
                href: "etsy-recreation",
                alt:"etsy-recreation",
                img:"etsy-recreation",
                github:"3.4-etsy-recreation",
                description:"This is a reproduction of part of the Etsy site. It uses Etsy's Api to build the listed items.  Currently, the rest of the site is not functional.",
                skills:["JavaScript","RESTful API","JSON","Handelbars","Sass"]
            }
        ]};
        var place = ['l','m','r'];
        var inPlace = 0;//place and inPlace are used to set the class of each portfolio

        Handlebars.registerHelper('position', function() {

            if(inPlace < 3){
                 // console.log('inPlace1',inPlace);
                  var p = place[inPlace];
                  inPlace++;
                  if(inPlace>2){
                      inPlace = 0;
                  }
             }

             return p;
        });
        Handlebars.registerHelper('skills', function(context){
            var list = '<ul class="port-skills">';
            for(var i = 0, j = context.length; i < j; i++) {
                list += "<li>" + context[i] + "</li>";
            }
            return list + "</ul>";
        });

        $('body').prepend(JST['application']());
        //var dude = $(".port-skills").height();
        //console.log(dude);
        // Cache selectors
        var topMenu = $("#top-menu");
        topMenu.append(JST['main_menu']());
          $('#portfolio-list').append(JST['portfolio'](projects));

        var lastId,
            innerMenu = $('#inner-menu'),

        // All list items from menu
            menuItems = innerMenu.find("a"),
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
        //console.log('height',$('.port-skills').height());

        $('.port-skills').each(function(){
            var ulMargin = Math.floor(300 - $(this).height())/2;
            $(this).css('marginTop', ulMargin);
        });


      }); //end of doc ready
})();
