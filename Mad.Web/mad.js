function initMad() {
    var data = {
        "carousel": [
            ["MAIN1.png", "1200", "700"],
            ["MAIN2.png", "1200", "700"],
            ["MAIN3.png", "1200", "700"],
        ],
        "photos": [
            ["MAD-01.png", "600", "900"],
            ["MAD-02.png", "1094", "900"],
            ["MAD-03.png", "1349", "900"],
            ["MAD-04.png", "2213", "900"],
            ["MAD-05.png", "1349", "900"],
            ["MAD-06.png", "1349", "900"],
            ["MAD-07.png", "900", "900"],
            ["MAD-08.png", "1200", "900"],
            ["MAD-09.png", "600", "900"],
            ["MAD-10.png", "1007", "900"],
            ["MAD-11.png", "1048", "900"]
        ],
        "reports": [
            ["Reports_01.png", "1200", "831"],
            ["Reports_02.png", "1200", "839"],
            ["Reports_03.png", "1200", "839"],
            ["Reports_04.png", "1200", "839"],
            ["Reports_05.png", "1200", "834"],
            ["Reports_06.png", "1200", "773"],
            ["Reports_07.png", "1200", "772"],
            ["Reports_08.png", "1200", "839"],
            ["Reports_09.png", "1200", "839"],
            ["Reports_10.png", "1200", "791"]
        ],
        "prints": [
            ["AD_adidas.png", "1200", "900"],
            ["AD_adidas2.png", "900", "900"],
            ["AD_SGK_a4.png", "600", "900"],
            ["AD_SGK_a4v2.png", "600", "900"],
            ["AD_SGK_spectraban_tall.png", "300", "900"],
            ["AD_SGK_spectraban_wide.png", "1200", "450"],
            ["AD_SGK_tall.png", "400", "1065"],
            ["AD_SGK_tall2.png", "338", "900"],
            ["AD_SGK_tall3.png", "338", "900"],
            ["AD_SGK_wide.png", "1603", "1202"],            
            ["packaging_b45_barako.png", "1200", "750"],
            ["packaging_b45_pula.png", "1200", "750"],
            ["packaging_b45_puti.png", "1200", "750"],
            ["packaging_b45_whitesugarfree.png", "1200", "791"],
            ["packaging_gt_brown.png", "1200", "791"],
            ["packaging_gt_original.png", "1200", "791"],
            ["packaging_gt_white.png", "1200", "791"],
            ["poster_b45_barako.png", "1200", "791"],
            ["poster_b45_pula.png", "1200", "791"],
            ["poster_b45_puti.png", "1200", "791"]
        ]
    };

    initCarousel(data.carousel, "Images/");
    initWall(data.photos, "Images/", "photo", 250, "#photoWall");
    initWall(data.reports, "Images/Reports/", "report", 155, "#reportWall");
    initWall(data.prints, "Images/Prints/", "print", 165, "#printWall");

    $("a[rel='photo']").fancybox({
        buttons: ["close"]
    });

    $("a[rel='report'], a[rel='print']").fancybox({
        buttons: ["close"]
    });

    emailjs.init("user_W4oMRathYxpVpn1vW2JQa");
    $('#cForm').submit(function () {
        var n = $("#cName");
        var e = $("#cEmail");
        var m = $("#cMessage");
        if (n.val() && e.val() && m.val()) {
            submitContact(true);
            emailjs.send("cr8madness", "cr8madness", { "name": n.val(), "email": e.val(), "message": m.val() })
                .then(function (response) {
                    console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
                    submitContact(false);
                }, function (err) {
                    console.log("FAILED. error=", err);
                    submitContact(false);
                });
        }
        return false;
    });
}

function initCarousel(items, url) {
    var temp = "<div class='{c}'><img src='{u}' width='{w}' height='{h}'></div>";
    var html = "";
    for (var i = 0; i <= items.length - 1; i++) {
        var item = items[i];
        var cl = 'item';
        if (i == 0)
            cl += ' active';
        html += temp.replace(/\{c\}/g, cl).replace(/\{u\}/g, url + item[0]).replace(/\{w\}/g, item[1]).replace(/\{h\}/g, item[2]);
    }

    $("#carInner").html(html);
}

function initWall(items, url, type, size, name) {
    var d = new Date();
    var temp = "<div class='brick'><a rel='" + type + "' data-fancybox='images' href='{u}' data-width='{w}' data-height='{h}'><img src='{u}' /></a></div>";
    var html = "";
    for (var i = 0; i <= items.length - 1; i++) {
        var item = items[i];
        html += temp.replace(/\{u\}/g, url + item[0] + "?t=" + d.getTime()).replace(/\{w\}/g, item[1]).replace(/\{h\}/g, item[2]);
    }

    $(name).html(html);  
    $(name).imagesLoaded().always(function (instance) {
        freewallize(name, size);
    });
}

function freewallize(name, size) {
    $(".brick").each(function (index, item) {
        var h = parseInt($(item).children('a').attr("data-height"));
        var w = parseInt($(item).children('a').attr("data-width"));
        if (h > w) {
            $(item).height(size).width(w / (h / size));
        }
        else
            $(item).height(h / (w / size)).width(size);
    });

    var wall = new Freewall(name);
    wall.reset({
        selector: ".brick",
        animate: false,
        cellW: size,
        cellH: 'auto',
        onResize: function () {
            wall.fitWidth();
        }
    });

    wall.fitWidth();
    $(window).trigger("resize");

    /*$(".brick img").one("load", function () {
        wall.fitWidth();
    }).each(function () {
        if (this.complete)
            $(this).load();
        });*/
}


function submitContact(value) {
    if (value) {
        $("#cName").prop("disabled", true);
        $("#cEmail").prop("disabled", true);
        $("#cMessage").prop("disabled", true);
        $("#sendMsg").text("Sending");
        $("#sendMsg").prop("disabled", true);
    }
    else {
        $("#cName").prop("disabled", false);
        $("#cEmail").prop("disabled", false);
        $("#cMessage").prop("disabled", false);
        $("#cName").prop("value", "");
        $("#cEmail").prop("value", "");
        $("#cMessage").prop("value", "");
        $("#sendMsg").prop("disabled", false);
        $("#sendMsg").text("Send");
    }
}