$('.menu__nav li').on('mouseover', function() {
   var $menuItem = $(this),
   $submenuWrapperAF = $('.dot-group', $menuItem);

    		// grab the menu item's position relative to its positioned parent
    		var menuItemPos = $menuItem.position();

    		// place the submenu in the correct position relevant to the menu item
    		$submenuWrapperAF.css({
    			top: menuItemPos.top,
    			left: menuItemPos.left + Math.round($menuItem.outerWidth() * 0.85)
    		});
    	});

function NavbarFixed() {

    var width = $(window).width();

    if (width <= 577) {
        var menu = $('.nav__profile'),
        pos = menu.offset();

        $(window).scroll(function(){
            if($(this).scrollTop() > menu.height()){
                $('.nav__profile').addClass('nav__fixed');
            } else if($(this).scrollTop() <= menu.height()){
                $('.nav__profile').removeClass('nav__fixed');
            }
        });
    }else{
         $('.nav__profile').removeClass('nav__fixed');
    }
};

$(window).resize(function () {
    NavbarFixed();
});



$(window).on("load",function(){

  NavbarFixed();

  $('.menu__nav li').each(function (index, element) {

    var menuItemPos = $(element).position();
    var $submenuWrapperAF = $('.dot-group', $(element));

    $submenuWrapperAF.css({
        top: menuItemPos.top,
        left: menuItemPos.left + Math.round($(element).outerWidth() * 0.85)
    });
});

});

$('.sidebar').scroll(function (event) {
   var $menuItem = $(".menu__nav li"),
   $submenuWrapperAF = $('.dot-group', $menuItem);

    		// grab the menu item's position relative to its positioned parent
    		var menuItemPos = $menuItem.position();

    		// place the submenu in the correct position relevant to the menu item
    		$submenuWrapperAF.css({
    			top: menuItemPos.top,
    			left: menuItemPos.left + Math.round($menuItem.outerWidth() * 0.85)
    		});
    	});

