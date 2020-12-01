var footerCookie = document.querySelector("#footer-cookie");
var footerCookieAccept = document.querySelector("#accept");

if (document.cookie.indexOf("cookiebanner=") == -1) {
  footerCookie.style.display = "block";
}

footerCookieAccept.onclick = function (e) {
  var cookieDate = new Date();
  cookieDate.setTime(new Date().getTime() + 86400000); // shows up again after 1 day

  document.cookie = "cookiebanner = 1; path=/; secure; expires=" + cookieDate.toUTCString();

  footerCookie.style.display = "none";
};
