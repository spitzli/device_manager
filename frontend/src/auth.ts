import showPassword from "./utils/show_password";
import validator from "./utils/validator";

toastr.options.closeButton = true;
toastr.options.debug = false;
toastr.options.newestOnTop = true;
toastr.options.progressBar = true;
toastr.options.positionClass = "toast-top-right";
toastr.options.preventDuplicates = false;
toastr.options.onclick = null;
toastr.options.showDuration = 300;
toastr.options.hideDuration = 1000;
toastr.options.timeOut = 5000;
toastr.options.extendedTimeOut = 1000;
toastr.options.showEasing = "swing";
toastr.options.hideEasing = "linear";
toastr.options.showMethod = "fadeIn";
toastr.options.hideMethod = "fadeOut";

$(window).on("load", function () {
  $("#signupCaptcha").on("verified", async (e) => {
    const result = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: $("input#email").val(),
        password: $("input#password").val(),
        //@ts-ignore
        captcha: e.originalEvent.key,
      }),
    }).then((res) => res.json());

    if (result.status === 200) {
      return window.location.replace("/overview");
    } else {
      return toastr["error"](result.message, "Error");
    }
  });

  $("input#username,input#email,input#password,input#checkPassword").on("blur", validator);
  $("input#username,input#email,input#password,input#checkPassword").on("blur", () => {
    if (
      $("input#username").hasClass("is-invalid") ||
      $("input#email").hasClass("is-invalid") ||
      $("input#password").hasClass("is-invalid") ||
      $("input#checkPassword").hasClass("is-invalid")
    ) {
      return $("button#submit").addClass("disabled, cursor-not-allowed");
    }
    $("button#submit").removeClass("disabled, cursor-not-allowed");
  });

  $("svg#on,svg#off").on("click", showPassword);

  $("form#form").on("submit", async (event) => {
    event.preventDefault();

    hcaptcha.execute();
  });
});
