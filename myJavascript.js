$(document).ready(function() {

  jQuery.fn.sortElements=(function(){var sort=[].sort;return function(comparator,getSortable){getSortable=getSortable||function(){return this};var placements=this.map(function(){var sortElement=getSortable.call(this),parentNode=sortElement.parentNode,nextSibling=parentNode.insertBefore(document.createTextNode(''),sortElement.nextSibling);return function(){if(parentNode===this){throw new Error("You can't sort elements if any one is a descendant of another.");}parentNode.insertBefore(this,nextSibling);parentNode.removeChild(nextSibling)}});return sort.call(this,comparator).each(function(i){placements[i].call(getSortable.call(this))})}})();

  if (window.location.hostname !== "aniwiki.net") {

    setTimeout(function(){window.location.href = "http://aniwiki.net" + window.location.pathname;}, 5000);

  }

  $("head").append($('<link rel="stylesheet" type="text/css" />').attr("href", "https://ancap.github.io/Highslide.css"));
  $("head").append("<!--[if IE 6]>" + $('<link rel="stylesheet" type="text/css" />').attr("href", "https://ancap.github.io/Highslide-ie6.css").wrap('<p>').parent().html() + "<![endif]-->");

/********************* Галерея картинок *********************/

function montageImages($container) {

  var $imgs		= $container.find('img'),
  	totalImgs	= $imgs.length,
  	cnt			= 0;

  var gHeight = $imgs.first().attr("height");

  $imgs.each(function(i) {

  	var $img	= $(this);
  	$('<img/>').load(function() {

      ++cnt;
      if( cnt === totalImgs ) {

        $imgs.show();
        $container.montage({
          alternateHeight			: true,
          alternateHeightRange	: {
            min	: gHeight - 50,
            max	: gHeight
          }
        });

      }

  	}).attr('src', $img.attr('src'));

  });

}

/********************* Галерея картинок *********************/

  $.getScript("https://ancap.github.io/highslide-full.js", function() {
  $.getScript("https://ancap.github.io/settings.js", function() {
  $.getScript("https://ancap.github.io/jquery.montage.min.js", function() {

    $("a.image").each(function() {

      var src = $(this).children("img").attr("src");
      var attrhref = $(this).attr("href")

      if(src.indexOf("thumb") === -1) {

        $(this).attr({
          target: "_blank"
        });

        return true;

      }
      var matches = src.match(/\/images\/thumb\/(.)\/(..)\/(.*?)\//);

      $(this).attr({
        href: "/images/" + matches[1] + "/" + matches[2] + "/" + matches[3],
        class: "highslide",
        onclick: "return hs.expand(this)"
      });

      return true;

    });

    montageImages($(".am-container").not(".mySpoiler .am-container"));

  })})});

  $("a.internal > img").each(function() {

    var src = $(this).attr("src");

    if(src.indexOf("magnify-clip") === -1) return true;

    $(this).parent("a").attr("target", "_blank");

//     $("body").prepend(src + "<br />");

    return true;

  });

/********************* Открывать в новых вкладках внешние ссылки *********************/

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

// 	$("body").prepend(linkHref + " " + location.host + "<br />");

	  return true;

	});

/********************* Открывать в новых вкладках внешние ссылки *********************/

/********************* Обрезать длинные теги для вставки *********************/

  $('a[onclick*="insertTags"]').each(function() {

    var strLength = $(this).html($(this).html()).text().length;
    var maxLength = 40;

    if (strLength > maxLength) {

      $(this).text($(this).html($(this).html()).text().substr(0, maxLength) + '...').html();

    }

  });

/********************* Обрезать длинные теги для вставки *********************/

/********************* Шаблон иконки *********************/

  function get_hostname(url) {
    var hostnameRegexp = new RegExp("^http(s|):\/\/[^/]+");
    var m = url.match(hostnameRegexp);
    return m ? m[0] : null;
  }

  function favicognize($elink) {

    $elink.before($("<img>").attr("src", "https://getfavicon.appspot.com/" + get_hostname($elink.attr("href")) + "?defaulticon=bluepng").css("vertical-align", "text-bottom")).before(" ");

    $elink.prev("img").attr("width", "16px");

    if ($elink.attr("href") == $elink.text())
    $elink.text(get_hostname($elink.attr("href")).replace("http://", "").replace("https://", "").replace("www\.", ""));

    $elink.css("background-image", "none").css("padding", "0px");

    return;

  }

  var nonfavicognize = "[href*=webcitation], [href*=peeep], [href*=aniwiki]";

  if ($("div.favicognize").length) {

    $("div#bodyContent a.external").not(nonfavicognize).each(function() {

      favicognize($(this));

    });

  } else {

    $("div.favicons a.external").not(nonfavicognize).each(function() {

      favicognize($(this));

    });

  }

/********************* Шаблон иконки *********************/

/********************* Видео not safe for work *********************/

  $("body").on('click', 'img[src="http://stocknote.ru/images/1/1b/Alert16.9.png"], img[src="http://stocknote.ru/images/3/3f/Alert4.3.png"]', function() {

    $(this).hide();
    $(this).parent("div.eVideo").children("div.eVideoUrl").hide();
    $(this).parent("div.eVideo").children("iframe").show();

  });

  $("div.eVideo").each(function() {

    var vheight = $(this).children("iframe").attr("height");
    var vwidth = $(this).children("iframe").attr("width");

    if ($(this).hasClass("vNSFW")) {

      $(this).append("<div>");
      $(this).children("div").text(get_hostname($(this).children("iframe").attr("src")).replace("http://", "").replace("https://", "").replace("www\.", ""));
      $(this).children("div").attr("class", "eVideoUrl");

      $(this).children("iframe").hide();

      if (((vwidth / vheight) * 10) > 16) {

        $(this).append('<img src="http://stocknote.ru/images/1/1b/Alert16.9.png">');

      } else {

        $(this).append('<img src="http://stocknote.ru/images/3/3f/Alert4.3.png">');

      }

      $(this).children("img").attr("height", vheight);
      $(this).children("img").attr("width", vwidth);
      $(this).css("width", vwidth);
      $(this).children("img").attr("class", "eVideoImg");

      // $(this).children("img").hide();

    }

    $(this).css("width", vwidth);

  });

/********************* Видео not safe for work *********************/

/********************* Спойлер *********************/

  function mySpoilerHide($mySpoiler) {

    var myContent = $mySpoiler.parent(".mySpoiler").children(".mySpoilerContent");

    myContent.slideToggle();
    $mySpoiler.parent(".mySpoiler").children(".mySpoilerBottomButton").toggle();
    $mySpoiler.toggleClass("mySpoilerPlus").toggleClass("mySpoilerMinus");

  }

  $(".mySpoilerTopButton").each(function() {

    if ($.trim($(this).text()).length == 0) {

      $(this).prepend("Открыть");

    }

  });

  $(".mySpoilerTopButton").parent(".mySpoiler").children(".mySpoilerContent").hide();

  $(".mySpoilerTopButton").parent(".mySpoiler").children(".mySpoilerBottomButton").hide();
  $(".mySpoilerTopButton").toggleClass("mySpoilerPlus").toggleClass("mySpoilerMinus");

  $(".mySpoilerTopButton").click(function(){

    mySpoilerHide($(this));
    // перезагрузка iframe ов
    $(this).parent(".mySpoiler").children("iframe").attr( 'src', function ( i, val ) { return val; });
    montageImages($(this).parent(".mySpoiler").find(".am-container"));

  });

  $(".mySpoilerBottomButton").click(function(){

    $(this).parent(".mySpoiler").children(".mySpoilerContent").slideToggle();
    var myDiv = $(this).parent(".mySpoiler").children(".mySpoilerTopButton");
    $('html, body').animate({
         scrollTop: myDiv.offset().top - 100
     }, 500);
    $(this).toggle();
    myDiv.toggleClass("mySpoilerPlus").toggleClass("mySpoilerMinus");

  });

/********************* Спойлер *********************/

/********************* Gcard *********************/

  $(".gcardTabContent").hide();
  $(".gcardTabContent").first().show();
  $(".gcardTabContent table").attr("cellspacing", "3");
  $(".gcardTabContent table tr").each(function (){

    $(this).find("td").first().css("width", "1px");
    $(this).find("td").first().wrapInner('<span />');
    $(this).find("td").first().find("span").css("white-space", "nowrap");

  });

  $(".gcardTabContent table tr:odd td").css("background-color", "#E6F7FF");

  $(".gcardTabTitle").prependTo(".gcardTabs");

  $(".gcardTabTitle").removeClass("gcardTabTitleSelected");
  $(".gcardTabTitle").first().addClass("gcardTabTitleSelected");
  $(".gcardTabTitle").first().css("margin-left", "8px");

  $(".gcardTabTitle").hover(
    function () {
      $(this).addClass("gcardTabTitleHover");
    },
    function () {
      $(this).removeClass("gcardTabTitleHover");
  });

  $("body").on("click", ".gcardTabTitle", function() {

    $(".gcardTabContent").hide();
    $(".gcardTabTitle").removeClass("gcardTabTitleSelected");
    $(this).addClass("gcardTabTitleSelected");

    var index = $(".gcardTabTitle").index(this);
//      $(this).text("That was div index #" + index);
    $(".gcardTabContent").eq(index).show();

  });

  $.each(["a[href*='myanimelist']", "a[href*='animenewsnetwork.com']"], function (_, v) {

    $(".gcardMain").find(v).sortElements(function(a, b){

      return parseInt(
               $(a).attr("href").replace(/[^0-9]/g, ''), 10
             ) > parseInt(
               $(b).attr("href").replace(/[^0-9]/g, ''), 10
             ) ? 1 : -1;

    });

  });

  $(".brAfterLink").find("a").after("<div style='height:4px; visibility:hidden; margin-bottom:-1px;' />");

  $(".splitToComma").html(function(i, val) {

    return val.replace(/,/g, "<br />");

  });

  $(".splitBySlash td").html(function(i, val) {

    return val.replace(/ \/ /g, "<br />");

  });
/* .sortElements(function(a, b){
          return parseInt($(a).text(), 10) > parseInt($(b).text(), 10) ? 1 : -1;
  }) */

/********************* Gcard *********************/

/********************* Жанры аниме и студии *********************/

  function animeStudios() {

    var divAN = $("div.NavHead:contains('Аниме по жанрам'), div.NavHead:contains('Студии'), div.NavHead:contains('Аниме по количеству эпизодов')").next();

    if ($("div.NavHead:contains('Аниме по количеству эпизодов')").length)
      divAN.find("li").sortElements(function(a, b){
          return parseInt($(a).text(), 10) > parseInt($(b).text(), 10) ? 1 : -1;
      });
    else
      divAN.find("li").sortElements(function(a, b){
          return $(a).text() > $(b).text() ? 1 : -1;
      });

    var myTable = "<table>";
    var numOfElem = Math.ceil(divAN.find("li").length / 5);

    divAN.find("li").each(function(i){

      if (i == 0)
        myTable += "<tr><td>" + $(this).html() + "</td>";
      else if (i % 5 == 0)
        myTable += "</tr><tr><td>" + $(this).html() + "</td>";
      else
        myTable += "<td>" + $(this).html() + "</td>";

    });

    myTable += "</tr></table>";

     divAN.html(
       $("<div><div>" + myTable + "</div></div>")
         .find("div").css("padding", "3px")
           .find("table").attr("cellspacing", "3px")
             .find("td").css("width", "160px").css("padding-left", "5px").css("background", "#F0F0FF")
             .end()
           .end()
         .end()
       .html()
     );

    divAN.find("a, strong").each(function(){

      var le = 19;

      if ($(this).text().length > le)
        $(this).text(
          $(this).html(
            $(this).html()
          )
          .text()
          .substr(0, le)
        ).append('...');

    });

    addGenreAndTimeLink(divAN, "studioCT");

  }

  animeStudios();

/********************* Жанры аниме *********************/

/********************* Аниме по годам *********************/

  function addGenreAndTimeLink(divAN, n) {

  var myLink = $("<a>")
                .attr("class", n)
                .css("border-bottom", "1px dashed #002BB8")
                .css("cursor", "pointer")
                .text("показать все");

    divAN.find("table").before(myLink.clone());
    divAN.find("table").after(myLink.clone());

    divAN.find("." + n).hover(function(){$(this).css("text-decoration", "none");})

    divAN
      .find("a:first, a:last")
        .wrap("<div>").parent()
          .css("width", "100%").css("text-align", "center");

    if (divAN.find("tr:has(strong)").length)
      divAN.find("tr").not(":has(strong)").hide();
    else
      divAN.find("a").first().text("скрыть");

    $(document).on("click", "." + n, function(){

      divAN.find("tr").not(":has(strong)").toggle();

      $("html, body").animate({

        scrollTop: divAN.find("tr:has(strong)").offset().top - 176

      }, 500);

      divAN.find("tr:has(strong) td").fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500);

      if ($(this).text() == "скрыть")
         $(this).text("показать все")
      else
         $(this).text("скрыть");

    });

    return true;

  }

  function animeOnYears() {

    var divAN = $("div.NavHead:contains('Аниме по времени')").next();

    var myTable = "<table>";

    for (i = 1900; i <= 2020; i++) {

      divAN.find("li:contains('" + i + "')").each(function () {

        if ($(this).text().replace(/ г./, "") == i) {

          myTable += "<tr><td>" + $(this).html() + "</td>";

          var myMonthes = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

          $.each(myMonthes, function(key, val) {

            if (divAN.find("li:contains('" + val + " " + i + " г.')").length)
            myTable += "<td>" + divAN.find("li:contains('" + val + " " + i + " г.')").clone().find("a, strong").text(val).end().html() + "</td>";
            else
            myTable += "<td></td>";

          });

          myTable += "</tr>";

        }

      });

    }

    myTable += "</table>";

    divAN.html(
     $("<div><div>" + myTable + "</div></div>")
       .find("div").css("padding", "3px")
         .find("table").attr("cellspacing", "3px")
           .find("td").css("width", "61px").css("padding-left", "5px")
           .end()
         .end()
       .end()
     .html()
    );

    divAN.find("tr").css("background", "#F0F0FF");

    divAN.find("tr").hover(function() {

        $(this).css("background", "#CCCCFF");

    }, function() {

        $(this).css("background", "#F0F0FF");

    });

    addGenreAndTimeLink(divAN, "timeCT");

    return true;

  }

  animeOnYears();

/********************* Аниме по годам *********************/

/********************* Cover для gCard *********************/

  function getCovers(animeID) {

    console.log("Запрос страницы /animeCovers.php");

    return $.ajax({
        type: "POST",
        url: "/animeCovers.php",
        data: {
          get: animeID
        },
        timeout: 2000, // in milliseconds
        error: function(request, status, err) {
            if(status == "timeout") {
                console.log("Таймаут");
            }
        }
    });

  }

  function appendCoversLinks() {

    var mainImage = $("td.gcardCover").find("img").first().attr("src");

    $("td.gcardCover").children().remove();

    $("td.gcardCover")
    .append(
      $("<div>").attr("class", "imageCoversDiv").css("min-height", "350px").css("min-width", "240px")
    )
    .append(
      $("<div>").attr("class", "linksCoversDiv")
        .css("text-align", "center")
        .css("font-size", "10px")
        .append($("<a>").attr("class", "coversLink").text("aniwiki"))
        .append(" | ")
        .append($("<a>").attr("class", "coversLink").text("anidb"))
        .append(" | ")
        .append($("<a>").attr("class", "coversLink").text("MAL"))
        .append(" | ")
        .append($("<a>").attr("class", "coversLink").text("WA"))
    );

    $(".coversLink").css("cursor", "pointer");

    $("td.gcardCover div.imageCoversDiv").append($("<img />").attr("class", "mainCoverImage").attr("src", mainImage));

    var malID = [], getObj = {};

    if ($(".gcardMain").find("a[href*='myanimelist.net']").length) {

      $(".gcardMain").find("a[href*='myanimelist.net']").each(function(){

        malID.push($(this).attr("href").split("anime/")[1]);

      });

      if (malID)
        malID = "http://myanimelist.net/anime/" + malID.sort(function(a,b){return a - b})[0];

      if (malID)
        getObj.mal = malID.match(/http\:\/\/myanimelist\.net\/anime\/([0-9]{1,6})/)[1];

    }

    var anidbID = $(".gcardMain").find("a[href*='anidb.net']").attr("href");

    if (anidbID)
      getObj.anidb = anidbID.match(/http:\/\/anidb.net\/(?:a|perl-bin\/animedb\.pl\?show\=anime\&aid\=)([0-9]{1,6})/)[1];

    var waID = $(".gcardMain").find("a[href*='world-art.ru']").attr("href");

    if (waID)
      getObj.wa = waID.match(/http:\/\/www\.world-art\.ru\/animation\/animation\.php\?id\=([0-9]{1,6})/)[1];


    $.when(getCovers(JSON.stringify(getObj))).then(function(r){

      r = JSON.parse(r);

      if (!r) return true;

      $.each(r, function(key, val){

        if(val)
          $(".imageCoversDiv").append($("<img>").attr("src", "/" + val).attr("class", key + "Cover").css("max-height", "350px").css("max-width", "240px"));

      });

      if ($("img[src*='images/e/ed/Unknown_Cover.png']").length && $(".imageCoversDiv img").length > 1) {

        $(".imageCoversDiv").find("img").hide();

        $(".imageCoversDiv").find("img[src*='animeCovers']").first().show();
        var cl = $(".imageCoversDiv").find("img[src*='animeCovers']").first().attr("src").match(/animeCovers\/([^\/]+)/)[1];

        $(".linksCoversDiv").find("strong a").unwrap();
        $(".linksCoversDiv").find("a:contains('" + cl.toLowerCase() + "')").wrap("<strong>");

      } else {

        $(".imageCoversDiv").find("img").hide();
        $(".imageCoversDiv").find("img").first().show();

      }

    });

  }

  appendCoversLinks();

  function toggleCovers(link, name) {

    if (link.text() != name) return true;

    $(".imageCoversDiv").find("img").hide();

    if (name == "aniwiki")
      name = "images/";

    var findImage = $(".imageCoversDiv").find("img[src*='" + name.toLowerCase() + "']");

    if (findImage.length)
      findImage.first().show();
    else
      $(".mainCoverImage").show();

    link.parent().find("strong a").unwrap();
    link.wrap("<strong>");

  }

  $(document).on("click", ".coversLink", function(){

    var link = $(this);

    $.each(["aniwiki", "anidb", "MAL", "WA"], function(key, val){

      toggleCovers(link, val);

    });

  });


/********************* Cover для gCard *********************/

/********************* В какой последовательности *********************/

  $(".gcardOrder").find("a, strong").each(function(){

    var le = 30;

    if ($(this).text().length > le)
      $(this).text(
        $(this).html($(this).html())
          .text()
          .substr(0, le).trim()
      ).append('...');

  });

/********************* В какой последовательности *********************/

});
/********************* Конец $(document).ready(function() { *********************/

/********************* Кнопки Редактирования *********************/
 mwCustomEditButtons[mwCustomEditButtons.length] = {
  "imageFile":"http://lh5.ggpht.com/-gXGZ0ury9QI/UNBQ9T8Ha5I/AAAAAAAAABk/WwgzvrXLN-Q/s0/button_bold.png",
  "speedTip": "Сделать шрифт жирным",
  "tagOpen": "\'\'\'",
  "tagClose": "\'\'\'",
  "sampleText": "пример"}

 mwCustomEditButtons[mwCustomEditButtons.length] = {
  "imageFile":"http://lh6.ggpht.com/-7SuzCwu2oWk/UNBQ-OUFoUI/AAAAAAAAABo/qsPBgwnLzTM/s0/button_italic.png",
  "speedTip": "Сделать шрифт курсивом",
  "tagOpen": "\'\'",
  "tagClose": "\'\'",
  "sampleText": "пример"}

 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://lh5.ggpht.com/-QD8mIJ4L21U/UNBQ-831ZMI/AAAAAAAAABw/7C41Jz6nS_8/s0/Button_strike.png",
     "speedTip": "Зачеркнутый",
     "tagOpen": '<s>',
     "tagClose": '</s>',
     "sampleText": "Зачеркнутый"};

 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://lh3.ggpht.com/-aMU3mnWlPuw/UNBQ_rxgGzI/AAAAAAAAAB4/4YzAJkCr5K4/s0/Button_underline.png",
     "speedTip": "Подчеркнутый",
     "tagOpen": '<u>',
     "tagClose": '</u>',
     "sampleText": "Подчеркнутый"};

 mwCustomEditButtons[mwCustomEditButtons.length] = {
  "imageFile":"http://lh4.ggpht.com/-XDMOcllsDi8/UNBRAPBrB3I/AAAAAAAAACA/1leZp1czDBg/s0/Button_internal_link_ukr.png",
  "speedTip": "Внутренняя ссылка",
  "tagOpen": "[[",
  "tagClose": "]]",
  "sampleText": "пример"}

 mwCustomEditButtons[mwCustomEditButtons.length] = {
  "imageFile":"http://lh3.ggpht.com/-c4Xe2WtvAtw/UNBRA1czJ4I/AAAAAAAAACI/F0NdgyhI44o/s0/button_extlink.png",
  "speedTip": "Внешняя ссылка",
  "tagOpen": "[",
  "tagClose": "]",
  "sampleText": "http://example.ru текст ссылки"}

 mwCustomEditButtons[mwCustomEditButtons.length] = {
  "imageFile":"http://lh5.ggpht.com/-5qm-evUxQ_A/UNBRBo0eVWI/AAAAAAAAACQ/Ch9xwfi44hA/s0/button_nowiki.png",
  "speedTip": "Игнорировать вики-форматирование",
  "tagOpen": "<nowiki>",
  "tagClose": "</nowiki>",
  "sampleText": "текст который не надо форматированать"}

 mwCustomEditButtons[mwCustomEditButtons.length] = {
  "imageFile":"http://lh4.ggpht.com/-0XNMnEetb60/UNBRBzd0u7I/AAAAAAAAACY/ePLxp4FAcaU/s0/button_sig.png",
  "speedTip": "Ваша подпись и текущее время",
  "tagOpen": "\-\-\~\~\~\~",
  "tagClose": "",
  "sampleText": ""}

 mwCustomEditButtons[mwCustomEditButtons.length] = {
  "imageFile":"http://lh6.ggpht.com/-ZhITV9r9l6U/UNBRCsaXMRI/AAAAAAAAACk/bUYmjJU_vBc/s0/button_hr.png",
  "speedTip": "Горизонтальная линия",
  "tagOpen": "\n\-\-\-\-\n",
  "tagClose": "",
  "sampleText": ""}

 mwCustomEditButtons[mwCustomEditButtons.length] = {
  "imageFile":"http://lh3.ggpht.com/-jzcND_BghL8/UNBRDntc3GI/AAAAAAAAACo/iQ4IbVij2WY/s0/Button_redirect_rus.png",
  "speedTip": "Перенаправление",
  "tagOpen": "\#перенаправление \[\[",
  "tagClose": "\]\]",
  "sampleText": "название страницы"}

 mwCustomEditButtons[mwCustomEditButtons.length] = {
  "imageFile":"http://lh6.ggpht.com/-N_8GX9gBPfw/UNBREtkX4QI/AAAAAAAAACw/eJkmjleQh64/s0/Button_advanced_image.png",
  "speedTip": "Добавить картинку",
  "tagOpen": "[[Файл:",
  "tagClose": "|200px|thumb|left|описание]]",
  "sampleText": "File.png"}

 mwCustomEditButtons[mwCustomEditButtons.length] = {
  "imageFile":"http://lh6.ggpht.com/-jQXh7TszUlI/UWAr9Fl5zRI/AAAAAAAAAAg/jRSJv-egdWw/s0/clipboard21.png",
  "speedTip": "Добавить картинку",
  "tagOpen": "[[Файл:",
  "tagClose": "|x300px]]",
  "sampleText": "File.png"}

 mwCustomEditButtons[mwCustomEditButtons.length] = {
  "imageFile":"http://lh6.ggpht.com/-xh4g1ffJ0U0/UNBRFKUddEI/AAAAAAAAAC4/MKlHf53hW8g/s0/Button_IFilm.png",
  "speedTip": "Добавить видео с youtube",
  "tagOpen": "\{\{#evp:youtube|",
  "tagClose": "|Работает|right|250}}",
  "sampleText": "oHg5SJYRHA0"}

 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://lh4.ggpht.com/-JylhckHf5tU/UNBRFkMpY8I/AAAAAAAAADA/PeJQUS8r848/s0/Button_cat_ru.png",
     "speedTip": "Категория",
     "tagOpen": '[[Категория:',
     "tagClose": ']]',
     "sampleText": "Название категории"};

 mwCustomEditButtons[mwCustomEditButtons.length] = {
  "imageFile":"http://lh5.ggpht.com/-XrXXLZqtcMw/UNBRGAPonmI/AAAAAAAAADI/Yl4Z35LmYrU/s0/Button_head_A1.png",
  "speedTip": "Заголовок 1-го уровня",
  "tagOpen": "\n==",
  "tagClose": "==",
  "sampleText": "Заголовок"}

 mwCustomEditButtons[mwCustomEditButtons.length] = {
  "imageFile":"http://lh4.ggpht.com/-NzQDlejUW7U/UNBRG7pkclI/AAAAAAAAADQ/41dN9lgNfOs/s0/Button_head_A2.png",
  "speedTip": "Заголовок 2-го уровня",
  "tagOpen": "\n===",
  "tagClose": "===",
  "sampleText": "Заголовок"}

 mwCustomEditButtons[mwCustomEditButtons.length] = {
  "imageFile":"http://lh3.ggpht.com/-qiVch3fwZWY/UNBRHY3F0hI/AAAAAAAAADY/VFM7m-hV7Zs/s0/Button_head_A3.png",
  "speedTip": "Заголовок 3-го уровня",
  "tagOpen": "\n====",
  "tagClose": "====",
  "sampleText": "Заголовок"}

 mwCustomEditButtons[mwCustomEditButtons.length] = {
  "imageFile":"http://lh5.ggpht.com/-dZES6dGqsxg/UNBRIIwQtvI/AAAAAAAAADg/YK4EvMg7O_0/s0/Button_head_A4.png",
  "speedTip": "Заголовок 4-го уровня",
  "tagOpen": "\n=====",
  "tagClose": "=====",
  "sampleText": "Заголовок"}

 mwCustomEditButtons[mwCustomEditButtons.length] = {
  "imageFile":"http://lh4.ggpht.com/-fq1Kw6hfeKI/UNBRI-wMWSI/AAAAAAAAADo/4U-xw58d9cc/s0/Button_head_A5.png",
  "speedTip": "Заголовок 5-го уровня",
  "tagOpen": "\n======",
  "tagClose": "======",
  "sampleText": "Заголовок"}

 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://lh3.ggpht.com/-pQrJkWH4qvc/UNBRJml05_I/AAAAAAAAADw/2WFn9dW4Ky0/s0/Button_Link_DifferentName.png",
     "speedTip": "Название страницы|Текст который нужен на странице",
     "tagOpen": '[[Страница|',
     "tagClose": ']]',
     "sampleText": "Текст"};

 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://lh3.ggpht.com/-qpZ9gUoNTEg/UNBRJ_xzauI/AAAAAAAAAD4/zxGiUfH03yE/s0/Sharp_button.png",
     "speedTip": "Линк на заголовок",
     "tagOpen": '[[#Название заголовка|',
     "tagClose": ']]',
     "sampleText": "Текст ссылки"};

 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://lh5.ggpht.com/-s-13HwqoLt0/UNBRKhVy2dI/AAAAAAAAAEE/S9bDIKyMBtc/s0/Button_align_left.png",
     "speedTip": "Слева",
     "tagOpen": '<div style="text-align:left">',
     "tagClose": '</div>',
     "sampleText": ""};

 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://lh6.ggpht.com/-IwhMBXmyeMQ/UNBRLnAX2-I/AAAAAAAAAEI/hdJfHtkm8Ms/s0/Button_center.png",
     "speedTip": "По центру",
     "tagOpen": '<center>',
     "tagClose": '</center>',
     "sampleText": ""};

 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://lh6.ggpht.com/-bX_CVUnN0Ec/UNBRMFMV3kI/AAAAAAAAAEQ/u-_Sk8bN894/s0/Button_align_right.png",
     "speedTip": "Справа",
     "tagOpen": '<div style="text-align:right">',
     "tagClose": '</div>',
     "sampleText": ""};

 mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://lh5.ggpht.com/-a_NQ4U9Q9eM/UNBRM2hFhWI/AAAAAAAAAEY/RnFiZ0kJiYk/s0/Br.png",
     "speedTip": "br ",
     "tagOpen": '<br />',
     "tagClose": '',
     "sampleText": ""};
// https://github.com/madapaja/jquery.selection/wiki/API
// http://madapaja.github.io/jquery.selection/
  $.getScript("https://raw.github.com/madapaja/jquery.selection/master/src/jquery.selection.js");

  function appendButtons() {

    if ($("#toolbar img").length) {

      $("#toolbar").append(
        $("<img>").attr("src", "http://lh3.ggpht.com/-x19v8YbdLwA/UeLhgpDeRUI/AAAAAAAAAFY/IIKdfu_Yj_w/s0/clipboard2.png")
        .css("cursor", "pointer")
      );

      return true;

    }

    setTimeout(appendButtons, 100);

  }

  appendButtons();

  $(document).on("click", "img[src*='x19v8YbdLwA']", function(){

    $("#wpTextbox1").selection("replace", {
        text: "* [[:Категория:" + $("#wpTextbox1").selection() + "|" + $("#wpTextbox1").selection() + "]]",
        caret: "end"
    });

  });

/********************* Кнопки Редактирования *********************/

/********************* Кнопка Показать/Скрыть *********************/
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[**MAINTAINERS**]]
 */
var autoCollapse = 2;
var collapseCaption = 'скрыть';
var expandCaption = 'показать';

function collapseTable( tableIndex ) {
	var Button = document.getElementById( 'collapseButton' + tableIndex );
	var Table = document.getElementById( 'collapsibleTable' + tableIndex );

	if ( !Table || !Button ) {
		return false;
	}

	var Rows = Table.rows;

	if ( Button.firstChild.data == collapseCaption ) {
		for ( var i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = 'none';
		}
		Button.firstChild.data = expandCaption;
	} else {
		for ( var i = 1; i < Rows.length; i++ ) {
			Rows[i].style.display = Rows[0].style.display;
		}
		Button.firstChild.data = collapseCaption;
	}
}

function createCollapseButtons() {
	var tableIndex = 0;
	var NavigationBoxes = new Object();
	var Tables = document.getElementsByTagName( 'table' );

	for ( var i = 0; i < Tables.length; i++ ) {
		if ( hasClass( Tables[i], 'collapsible' ) ) {
			/* only add button and increment count if there is a header row to work with */
			var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
			if( !HeaderRow ) continue;
			var Header = HeaderRow.getElementsByTagName( 'th' )[0];
			if( !Header ) continue;

			NavigationBoxes[tableIndex] = Tables[i];
			Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );

			var Button     = document.createElement( 'span' );
			var ButtonLink = document.createElement( 'a' );
			var ButtonText = document.createTextNode( collapseCaption );

			Button.className = 'collapseButton'; // Styles are declared in MediaWiki:Common.css

			ButtonLink.style.color = Header.style.color;
			ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
			ButtonLink.setAttribute( 'href', "javascript:collapseTable(" + tableIndex + ");" );
			ButtonLink.appendChild( ButtonText );

			Button.appendChild( document.createTextNode( '[' ) );
			Button.appendChild( ButtonLink );
			Button.appendChild( document.createTextNode( ']' ) );

			Header.insertBefore( Button, Header.childNodes[0] );
			tableIndex++;
		}
	}

	for ( var i = 0;  i < tableIndex; i++ ) {
		if ( hasClass( NavigationBoxes[i], 'collapsed' ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], 'autocollapse' ) ) ) {
			collapseTable( i );
		}
	}
}

addOnloadHook( createCollapseButtons );

/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */

// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';

// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled
function toggleNavigationBar(indexNavigationBar)
{
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

    if (!NavFrame || !NavToggle) {
        return false;
    }

    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavContent') || hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;

    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavContent') || hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
}

// adds show/hide-button to navigation bars
function createNavigationBarToggleButton()
{
    var indexNavigationBar = 0;
    // iterate over all < div >-elements
    var divs = document.getElementsByTagName("div");
    for (var i = 0; NavFrame = divs[i]; i++) {
        // if found a navigation bar
        if (hasClass(NavFrame, "NavFrame")) {

            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

            var isCollapsed = hasClass( NavFrame, "collapsed" );
            /*
             * Check if any children are already hidden.  This loop is here for backwards compatibility:
             * the old way of making NavFrames start out collapsed was to manually add style="display:none"
             * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
             * the content visible without JavaScript support), the new recommended way is to add the class
             * "collapsed" to the NavFrame itself, just like with collapsible tables.
             */
            for (var NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling) {
                if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                    if ( NavChild.style.display == 'none' ) {
                        isCollapsed = true;
                    }
                }
            }
            if (isCollapsed) {
                for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
                    if ( hasClass( NavChild, 'NavPic' ) || hasClass( NavChild, 'NavContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode(isCollapsed ? NavigationBarShow : NavigationBarHide);
            var NavToggleText2 = document.createTextNode(NavigationBarHide);
            var NavToggle2 = NavToggle.cloneNode(true);
            NavToggle2.appendChild(NavToggleText2);
            NavToggle.appendChild(NavToggleText);

            // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
            for(var j=0; j < NavFrame.childNodes.length; j++) {
                if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }

            for(var r=0; r < NavFrame.childNodes.length; r++) {
                if (hasClass(NavFrame.childNodes[r], "NavContent")) {
                    NavFrame.childNodes[r].appendChild(NavToggle2);
                }
            }

            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
}

addOnloadHook( createNavigationBarToggleButton );


/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */

var hasClass = (function() {
	var reCache = {};
	return function( element, className ) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
	};
})();


function toggle_element_activation(ida,idb) {
      if (!document.getElementById)
          return;
     document.getElementById(ida).disabled=true;
     document.getElementById(idb).disabled=false;
  }

function toggle_show(id) {
    document.getElementById(id).style.display = document.getElementById(id).style.display == 'none' ? 'block' : 'none';
}
/********************* Кнопка Показать/Скрыть *********************/

/********************* Кнопки комментариев к правке *********************/
//Summary buttons
function SummaryButtons(){
 var sum = document.getElementById('wpSummary')
 if (!sum || (sum.form.wpSection && sum.form.wpSection.value == 'new')) return
 var sp = document.createElement('span'); sp.id = 'userSummaryButtonsA'
 sum.parentNode.insertBefore(sp, sum.nextSibling)
 sum.parentNode.insertBefore(document.createElement('br'), sum.nextSibling)
 addSumButton('оформл.','оформление')
 addSumButton('орфогр.','орфография')
 addSumButton('пункт.','пунктуация')
 addSumButton('кат.','категория','Исправлена категоризация')
 addSumButton('шаб.','шаблон','Добавлен / изменён шаблон')
 addSumButton('доп.','дополнение')
 addSumButton('иллюстрация','иллюстрация')
 addSumButton('обнов.','обновление данных')
}
function addSumButton(name, text, title) {
 var btn = document.createElement('a')
 btn.appendChild(document.createTextNode(name))
 btn.title = title || text
 btn.onclick = function(){insertSummary(text)}
 document.getElementById('userSummaryButtonsA').appendChild(btn)
}
function insertSummary(text) {
 var sum = document.getElementById('wpSummary')
 if (sum.value.indexOf(text) != -1) return
 if (sum.value.match(/[^,; \/]$/)) sum.value += ','
 if (sum.value.match(/[^ ]$/)) sum.value += ' '
 sum.value += text
}
addOnloadHook(SummaryButtons);
/********************* Кнопки комментариев к правке *********************/

/********************* Ajax превью *********************/
function ajaxPreviewInit(){
 if (typeof ajaxPreviewKey != 'string') ajaxPreviewKey = 'p'
 if (typeof ajaxDiffKey != 'string') ajaxDiffKey  = 'v'
 ajaxPreviewPos = window.ajaxPreviewPos || 'right'
 if (ajaxPreviewPos != 'bottom'){
   var tOld = document.getElementById('toolbar') || document.getElementById('wpTextbox1')
   tOld.style.clear = 'none'
   var d = document.createElement('div'); d.style.cssText = 'width:100%; clear:both'
   tOld.parentNode.insertBefore(d, tOld)
   var tNew = document.createElement('div'); tNew.style.cssText = 'float:'+ ajaxPreviewPos
   tOld.parentNode.insertBefore(tNew, tOld)
 }
 addBtn(window.ajaxPreviewButton, 'wpPreview', ajaxPreviewKey)
 addBtn(window.ajaxDiffButton, 'wpDiff', ajaxDiffKey)
 function addBtn(name, id, akey){
  var btnOld = document.getElementById(id)
  if (!btnOld) return
  var btn = document.createElement('input'); btn.type = 'button'
  btn.onclick = ajaxPreviewClick;  btn.id = id + 'Live'
  if (!name){ //extract last word from standard buttons
    name = btnOld.value.split(' '); name = name[name.length-1]
    name = name.substring(0,1).toUpperCase() + name.substring(1)
  }
  btn.value = name;  btn.title = btnOld.value + ' (Ajax)'
  if (ajaxPreviewPos == 'bottom'){
    btnOld.parentNode.insertBefore(btn, btnOld)
    btn.value = btnOld.value
    btnOld.value = '>'
  }else{
    btn.style.cssText = 'height:22px; padding:0 1px'
    tNew.appendChild(btn)
  }
  if (akey){ //reassign acces key
    if (btnOld.accessKey == akey){
      btnOld.accessKey = ''
      btnOld.title = btnOld.title.replace(tooltipAccessKeyRegexp, '')
    }
	btn.accessKey = akey
    btn.title += ' ['+tooltipAccessKeyPrefix+akey+']'
  }
  btn.value2 = btn.value
 }
}



function ajaxPreviewClick(){ajaxPreviewRun(this)}

function ajaxPreviewRun(btn){
 var wkPreview = document.getElementById('wikiPreview'), form = document.editform
 var aj = sajax_init_object()
 if (!wkPreview || !form || !aj) return
 var oldHeight = wkPreview.offsetHeight
 var el, htm, isDiff = (btn.id=='wpDiffLive')
 wkPreview.style.opacity = '0.3'; wkPreview.style.color = 'gray'; document.body.style.cursor = 'wait'
 if (el=document.getElementById('wikiDiff')) el.style.display = 'none'
 if (el=document.getElementById('newarticletext')) el.style.display = 'none'
 btn.style.width = Math.max(btn.scrollWidth, btn.offsetWidth) + 'px';  btn.value = '...'
 //prepare
 var txt = form.wpTextbox1.value, action = form.action
 var boundary = '--------123xyz', data = ''
 if (isDiff){
   addData('wpDiff', ''); addData('wpStarttime'); addData('wpEdittime')
   if (!window.ajaxPreview_CSS) ajaxPreview_CSS = importStylesheetURI('/skins/common/diff.css')
 }else{
   action += '&live'
   if (form.wpSection && form.wpSection.value) txt += '\n<br /><references />'
 }
 addData('wpTextbox1', txt); addData('wpSection'); addData('wpSummary')
 //send
 aj.open('POST', action, true)
 aj.setRequestHeader('Content-Type', 'multipart/form-data; charset=UTF-8; boundary='+boundary)
 aj.send(data + '--' + boundary)
 aj.onreadystatechange = function(){
  if (aj.readyState != 4) return
  wkPreview.style.display = 'block'
  if (isDiff){
    var htm = aj.responseText
    var p1 = htm.indexOf("<table class='diff'>" )
    var p2 = htm.indexOf('</table>', p1)
    htm = (p1!=-1 && p2!=-1) ? htm.substring(p1, p2+8) : 'Error'
  }else{
    htm = aj.responseText.replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&apos;/g,"'")
  }
  wkPreview.innerHTML = htm
  btn.value = btn.value2

  if (el = wkPreview.getElementsByTagName('h2')[0]){
    if (el.style.textAlign != 'right') el.innerHML +=  ' (Ajax)'
    el.style.textAlign = 'right'
  }

  if (window.ajaxPreviewScrollTop && wkPreview.scrollIntoView) wkPreview.scrollIntoView()
  else document.documentElement.scrollTop +=  wkPreview.offsetHeight - oldHeight

  wkPreview.style.opacity = ''; wkPreview.style.color = ''; document.body.style.cursor = ''
  if (!isDiff) ajaxPreviewFinish(wkPreview)
 }

 function addData(name, value){
   if (!value) value = form[name] ? form[name].value : ''
   data += '--' + boundary + '\nContent-Disposition: form-data; name="'+name+'"\n\n' + value + '\n'
 }
}


function ajaxPreviewFinish(el){
 collapsibleDivs()
 collapsibleTables()
 sortables_init()
}


if (wgAction=='edit' || wgAction=='submit') addOnloadHook(ajaxPreviewInit);

/********************* Ajax превью *********************/