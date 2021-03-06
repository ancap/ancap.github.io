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

$("h1").append(" <sup><a class='toggleS'>Переключить</a></sup>");
$(".toggleS").css("cursor", "pointer");

$(document).on("click", ".toggleS", function(){

  $("sup, .thumbinner").not("sup:contains('Переключить')").toggle();
  $("h2, h3, h4, h5").find("span:not(:first)").toggle();

  if (!$("ol li").children().first().is("span.hasht"))
    $("ol li").prepend($("<span class='hasht'># </span>").hide());

  if (!$("ul li").children().first().is("span.star"))
    $("ul li").prepend($("<span class='star'>* </span>").hide());

  $("ol li span.hasht, ul li span.star").each(function(){
    ($(this).css("display") == "inline") ? $(this).css("display", "none") : ($(this).css("display") == "none") ? $(this).css("display", "inline") : null;
  });

});

});