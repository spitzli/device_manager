$(document).ready(async function () {
  $("#preloader").hide(500);

  if (window.location.pathname === "/overview") {
    $("li#overviewLi").addClass("active");
    $("li#deviceLi").removeClass("active");
    $("li#softwareLi").removeClass("active");
    $("li#licenseLi").removeClass("active");
  }

  if (window.location.pathname === "/device") {
    $("li#overviewLi").removeClass("active");
    $("li#deviceLi").addClass("active");
    $("li#softwareLi").removeClass("active");
    $("li#licenseLi").removeClass("active");
  }

  if (window.location.pathname === "/software") {
    $("li#overviewLi").removeClass("active");
    $("li#deviceLi").removeClass("active");
    $("li#softwareLi").addClass("active");
    $("li#licenseLi").removeClass("active");
  }

  if (window.location.pathname === "/license") {
    $("li#overviewLi").removeClass("active");
    $("li#deviceLi").removeClass("active");
    $("li#softwareLi").removeClass("active");
    $("li#licenseLi").addClass("active");
  }
});
