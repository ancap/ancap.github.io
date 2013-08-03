$(document).ready(function() {

$("pre").css({

  "white-space": "pre-wrap"

});

$("a.internal > img").each(function() {

  var src = $(this).attr("src");

  if(src.indexOf("magnify-clip") === -1) return true;
// атрибут target blank для иконки под картинкой
  $(this).parent("a").attr("target", "_blank");
//     $("body").prepend(src + "<br />");
  return true;

});

$("a.image").each(function() {

  $(this).attr({
    target: "_blank"
  });

  return true;

});

function getHostname(url) {

  var hostnameRegexp = new RegExp("^(http(s|):|)\/\/[^/]+");
  var m = url.match(hostnameRegexp);
  return m ? m[0].replace("http://", "").replace("https://", "").replace("www\.", "").replace("//", "") : null;

}

$("a").each(function() {

  var linkHref = $(this).attr("href");
  if (!linkHref) return true;
  linkHref = getHostname(linkHref);

  if (linkHref !== location.host && linkHref !== null) $(this).attr("target", "_blank");
// $("body").prepend(linkHref + " " + location.host + "<br />");
  return true;

});

$("sup").hide();

});