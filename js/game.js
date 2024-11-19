var btn2 = $("#button2");

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn2.addClass("show2");
  } else {
    btn2.removeClass("show2");
  }
});

btn2.on("click", function (e) {
  e.preventDefault();
  $("html, body").animate({ scrollTop: $("#app").offset().top }, "300");
});
