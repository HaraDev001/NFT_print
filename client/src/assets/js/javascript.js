 // start:webiste
 function resizeWindow() {
    let widthsidebar = $(window).width();

    if (widthsidebar > 992) {
        $('.siderbar').addClass('active');
    }else{
        $('.siderbar').removeClass('active');
    }
}

$(window).resize(function () {
    resizeWindow();
});

$(window).on("load",function(){
    resizeWindow();
});


$(".slider__head-top-sm").slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots:false,
    adaptiveHeight:true,
    arrows: false,
    responsive: [
    {
        breakpoint: 9999,
        settings: "unslick"
    },
    {
        breakpoint: 577,
        settings: {
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots:false,
            adaptiveHeight:true,
            arrows: false,
        }
    },
    ],
});

$('.sidebar__menu').click(function () {
    $('.siderbar').toggleClass('active');
});

$('.siderbar.active ~ span').click(function () {
    $('.siderbar').toggleClass('active');
});


$('.select__health-event').each(function (index, element) {
    $(element).ddslick();
});

$('.select__health-mailestone').each(function (index, element) {
    $(element).ddslick();
});

$('.select__state-mailestone').each(function (index, element) {
    $(element).ddslick({
        width: 115,
    });
});
$('#select__health').ddslick();
$('#select__trend').ddslick({
    width: 110,
});
$('#select__stage').ddslick({
    width: 115,
});


$('.box__ds-milestones-date').daterangepicker({
    singleDatePicker: true,
    minDate:0,
});

$('.box__ds-events-date').daterangepicker({
    singleDatePicker: true,
    minDate:0,
    locale: {
        format: 'D MMM Y'
    }
});

$('.box__ds-gann-date').daterangepicker({
    minDate:0,
    locale: {
        format: 'MMMM'
    }
});


$('.box__ds-milestones-date, .box__ds-events-date, .box__ds-gann-date').on('show.daterangepicker', function(ev, picker) {
    $(this).addClass('open');
    $(this).prop('status', 'open');
});

$('.box__ds-milestones-date, .box__ds-events-date, .box__ds-gann-date').on('hide.daterangepicker', function(ev, picker) {
    $(this).removeClass('open');
    $(this).prop('status', 'close');
});

$('.box__ds-select-nice').niceSelect();
$('.role__select').niceSelect();



    // end:website

    // start:mobile
    // $('.mobile-version #select__health').ddslick();
    // $('.mobile-version #select__stage').ddslick({
    //     width: 130,
    // });

    // $('.mobile-version #select__trend').ddslick({
    //     width: 130,
    // });

    // $('.mobile-version .box__ds-milestone-date').daterangepicker({
    //     singleDatePicker: true,
    //     minDate:0,
    //     locale: {
    //         format: 'D/M/Y'
    //     }
    // });

    // $('.mobile-version .box__gann-date').daterangepicker({
    //     minDate:0,
    //     locale: {
    //         format: 'MMM'
    //     }
    // });

    // $('.mobile-version .box__ds-milestone-date, .box__gann-date').on('show.daterangepicker', function(ev, picker) {
    //     $(this).addClass('open');
    //     $(this).prop('status', 'open');
    // });

    // $('.mobile-version .box__ds-milestone-date, .box__gann-date').on('hide.daterangepicker', function(ev, picker) {
    //     $(this).removeClass('open');
    //     $(this).prop('status', 'close');
    // });

    // $(".wrapper__slider-manage").slick({
    //     infinite: false,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     dots:false,
    //     adaptiveHeight:true,
    //     arrows: false,
    // });

    // $('.mobile-version .btn__scope').click(function () {
    //     $(this).find('~ .dropdown-menu').toggleClass('show');
    //     $(this).find('~ .dropdown-menu').toggle();
    // });



    // var tasks = [
    // {
    //     id: 'Task 1',
    //     name: 'About 3 Days',
    //     start: '2020-12-14',
    //     end: '2020-12-20',
    //     progress: 100,
    //     // dependencies: 'Task 2',
    //     custom_class: 'milestone-red'
    // },  {
    //     id: 'Task 2',
    //     name: 'Redesign website',
    //     start: '2020-12-18',
    //     end: '2020-12-25',
    //     progress: 100,
    //     custom_class: 'milestone-blue'
    // },{
    //     id: 'Task 3',
    //     name: 'About 2.5 Days',
    //     start: '2020-12-20',
    //     end: '2020-12-28',
    //     progress: 100,
    //     custom_class: 'milestone-green'
    // },{
    //     id: 'Task 4',
    //     name: 'About 2.5 Days',
    //     start: '2020-12-16',
    //     end: '2020-12-20',
    //     progress: 100,
    //     custom_class: 'milestone-orange'
    // },{
    //     id: 'Task 5',
    //     name: 'About 2.5 Days',
    //     start: '2021-02-16',
    //     end: '2021-02-20',
    //     progress: 100,
    //     custom_class: 'milestone-orange'
    // },
    // ]


    // var gantt = new Gantt(".mobile-version #gantt-chart", tasks, {
    //     header_height: 50,
    //     column_width: 30,
    //     step: 24,
    //     view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
    //     bar_height: 20,
    //     bar_corner_radius: 3,
    //     arrow_curve: 5,
    //     padding: 18,
    //     view_mode: 'Day',   
    //     date_format: 'YYYY-MM-DD',
    //     custom_popup_html: null,
    //     on_click: function (task) {
    //     },
    //     on_date_change: function(task, start, end) {
    //     },
    //     on_progress_change: function(task, progress) {
    //     },
    //     on_view_change: function(mode) {
    //     }
    // });
    // end:mobile
    