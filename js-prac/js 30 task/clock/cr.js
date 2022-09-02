function SGRedirecto() {
    var e = {}
      , t = "";
    e.setDefaultData = function(e, t) {
        e.find("#spicegems_cr_mod_msg").html(t.customer_message),
        e.find("#spicegems_cr_btn_yes").html(t.yes_button_text),
        e.find("#spicegems_cr_btn_no").html(t.no_button_text)
    }
    ,
    e.sanitizeUrl = function(e) {
        return e.replace("//www.", "//").replace("http://", "").replace("https://", "").replace(/([^:])(\/\/+)/g, "$1/").replace("/?", "?").replace(/\/$/, "").split("?")[0]
    }
    ,
    e.isNewAndCurrentURLSame = function(e, t) {
        try {
            var o = window.location.href;
            o = (o = o.replace("//www.", "//").replace(/\/$/, "").split("/"))[2];
            var r = e.replace("//www.", "//").replace(/\/$/, "").replace("?", "/").split("/");
            if (o !== (r = r[2]))
                return !0
        } catch (e) {}
        return !1
    }
    ,
    e.addUtmParams = function(t, o) {
        if (1 == o)
            -1 === t.indexOf("utm_source") && "" != e.utm_source && (t = t + "?utm_source=" + e.utm_source),
            -1 === t.indexOf("utm_medium") && "" != e.utm_medium && (t = t + "?utm_medium=" + e.utm_medium),
            -1 === t.indexOf("utm_campaign") && "" != e.utm_campaign && (t = t + "?utm_campaign=" + e.utm_campaign);
        else {
            if (t.indexOf("?") > -1) {
                var r = t.slice(t.indexOf("?") + 1).split("&").filter(e.paramIsNotUtm)
                  , i = r.length ? "?" + r.join("&") : "";
                t = t.split("?")[0] + i
            }
            "" != e.utm_source && (t = t + "?utm_source=" + e.utm_source),
            "" != e.utm_medium && (t = t + "?utm_medium=" + e.utm_medium),
            "" != e.utm_campaign && (t = t + "?utm_campaign=" + e.utm_campaign)
        }
        return t
    }
    ,
    e.paramIsNotUtm = function(e) {
        return "utm_" !== e.slice(0, 4)
    }
    ,
    e.paramIsUtm = function(e) {
        return "utm_" == e.slice(0, 4)
    }
    ,
    e.redirect = function() {
        1 != e.autoredirect && e.isNewAndCurrentURLSame(e.countryURL, window.location.href) && 1 == e.cookieActionValue && "y" != SpiceGems_Cookies.get("country_redirect_spicegems") && (0 != e.cookieExpiryTime ? SpiceGems_Cookies.set("country_redirect_spicegems", "y", {
            expires: e.cookieExpiryTime,
            path: "/"
        }) : SpiceGems_Cookies.set("country_redirect_spicegems", "y", {
            path: "/"
        })),
        e.isNewAndCurrentURLSame(e.countryURL, window.location.href) || SpiceGems_Cookies.set("country_redirect_samedomain", "1", {
            path: "/"
        });
        var t = e.countryURL;
        if (t = -1 == t.indexOf("://") ? "http://" + t : t,
        1 == e.add_relative_url)
            t += e.getRelativeURL();
        else if (1 == e.enable_utm_forward && (t += e.getQueryParams()).indexOf("?") > -1) {
            var o = t.slice(t.indexOf("?") + 1).split("&").filter(e.paramIsUtm)
              , r = o.length ? "?" + o.join("&") : "";
            t = t.split("?")[0] + r
        }
        (t = e.addUtmParams(t, e.enable_utm_forward)).indexOf("?") > -1 && (countryURLParams = t.substring(t.indexOf("?") + 1),
        countryURLParams = countryURLParams.replace(/[?]/g, "&"),
        t = t.split("?")[0] + "?" + countryURLParams),
        e.sanitizeUrl(window.location.href) !== e.sanitizeUrl(t) && (window.location.href = t)
    }
    ,
    e.closeBox = function() {
        e.isNewAndCurrentURLSame(e.countryURL, window.location.href) ? 1 == e.cookieActionValue && 0 != e.cookieExpiryTime ? SpiceGems_Cookies.set("country_redirect_spicegems", "n", {
            expires: e.cookieExpiryTime,
            path: "/"
        }) : SpiceGems_Cookies.set("country_redirect_spicegems", "n", {
            path: "/"
        }) : SpiceGems_Cookies.set("country_redirect_samedomain", "1", {
            path: "/"
        });
        var t = $sgjQuery("#spicegems_cr_top_bar");
        t.length && t.remove();
        var o = $sgjQuery("#sg_country_redirect_mod");
        o.length && o.modal("hide")
    }
    ,
    e.closeGDPRBar = function() {
        SpiceGems_Cookies.get("country_redirect_gdpr_bar") || (0 !== e.gdpr_cookie_exp ? SpiceGems_Cookies.set("country_redirect_gdpr_bar", "1", {
            expires: e.gdpr_cookie_exp,
            path: "/"
        }) : SpiceGems_Cookies.set("country_redirect_gdpr_bar", "1", {
            path: "/"
        }));
        var t = $sgjQuery("#spicegems_gdpr_banner");
        t.length && t.remove()
    }
    ,
    e.extend = function(e, t) {
        var o, r = {};
        for (o in e)
            Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
        for (o in t)
            Object.prototype.hasOwnProperty.call(t, o) && (r[o] = t[o]);
        return r
    }
    ,
    e.isEUVisitor = function(e) {
        return -1 !== ["AX", "AL", "AD", "AT", "BY", "BE", "BA", "BG", "HR", "CZ", "DK", "EE", "FO", "FI", "FR", "DE", "GI", "GR", "GG", "VA", "HU", "IS", "IE", "IM", "IT", "JE", "LV", "LI", "LT", "LU", "MT", "MD", "MC", "ME", "NL", "MK", "NO", "PL", "PT", "RO", "RU", "SM", "RS", "SK", "SI", "ES", "SJ", "SE", "CH", "UA", "GB"].indexOf(e)
    }
    ,
    e.showGDPRCookieBar = function(t, o) {
        var r = $sgjQuery("body");
        $sgjQuery(document).on("click", "#spicegems_gdpr_main_btn", e.closeGDPRBar),
        "1" === o.gdpr_eu_only ? e.isEUVisitor(t) && (r.append(JSON.parse('\"<style>\\n    #spicegems_gdpr_banner {\\n        background-color: rgb(33, 43, 53);\\n        color: #fff;\\n        width: 100%;\\n        opacity: 1px;\\n        z-index: 400000000;\\n        box-shadow: 0 1px 3px 2px rgba(0, 0, 0, 0.15);\\n        padding: 6px 0;\\n    }\\n\\n    .spicegems_gdpr_banner_con {\\n        padding-right: 15px;\\n        padding-left: 15px;\\n        margin-right: auto;\\n        margin-left: auto;\\n        display: flex;\\n    }\\n    .spicegems_gdpr_banner_inner {\\n        display: inline-block;\\n        width: 90%;\\n        float: left;\\n        padding: 12px 5px;\\n    }\\n    #spicegems_gdpr_banner_msg {\\n        display: inline;\\n        color: #fff;\\n        font-family: sans-serif;\\n        font-size: 18px;\\n        letter-spacing: 0.3px;\\n        text-align: justify;\\n    }\\n\\n    #spicegems_gdpr_banner_link {\\n        display: inline;\\n        padding: 12px 5px;\\n        color: #0072ff;\\n        font-family: sans-serif;\\n        font-size: 18px;\\n        letter-spacing: 0.3px;\\n        text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);\\n    }\\n\\n    #spicegems_gdpr_main_btn {\\n        min-width: 100px;\\n        color: #000;\\n        background: #e5e5e5;\\n        font-size: 16px;\\n        letter-spacing: 0.8px;\\n        letter-spacing: 1.1px;\\n        text-align: center;\\n        padding: 8px 15px;\\n        font-weight: normal;\\n        border-radius: 2px;\\n        display: inline-block;\\n        text-decoration: none;\\n        font-family: \'Open Sans\', sans-serif;\\n        -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\\n        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\\n        transition: all 0.3s ease-in-out 0s;\\n        transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\\n        float: right;\\n        cursor: pointer;\\n    }\\n    #spicegems_gdpr_main_btn:hover,\\n    #spicegems_gdpr_main_btn:active {\\n        opacity: 0.8;\\n    }\\n\\n    #spicegems_gdpr_main_btn {\\n        align-self: center;\\n        margin-left: auto;\\n    }\\n    .spicegems_gdpr_top_pushdown_banner {\\n        position: static;\\n        top: 0;\\n        bottom: auto;\\n        left: 0;\\n    }\\n    .spicegems_gdpr_top_banner {\\n        position: fixed;\\n        top: 0;\\n        bottom: auto;\\n        left: 0;\\n    }\\n    .spicegems_gdpr_bottom_banner {\\n        position: fixed;\\n        top: auto;\\n        bottom: 0;\\n        left: 0;\\n    }\\n    .spicegems_gdpr_float-left_banner {\\n        position: fixed;\\n        top: auto;\\n        bottom: 20px;\\n        left: 20px;\\n        width: 30% !important;\\n    }\\n    .spicegems_gdpr_float-right_banner {\\n        position: fixed;\\n        top: auto;\\n        bottom: 20px;\\n        right: 20px;\\n        width: 30% !important;\\n    }\\n    .spicegems_gdpr_float-left_banner .spicegems_gdpr_banner_con, .spicegems_gdpr_float-right_banner .spicegems_gdpr_banner_con {\\n        display: block;\\n    }\\n    .spicegems_gdpr_float-left_banner .spicegems_gdpr_banner_inner, .spicegems_gdpr_float-right_banner .spicegems_gdpr_banner_inner {\\n        width: 100%;\\n    }\\n    .spicegems_gdpr_float-left_banner .spicegems_gdpr_banner_inner > *, .spicegems_gdpr_float-right_banner .spicegems_gdpr_banner_inner > *{\\n        display: block !important;\\n        width: 100%;\\n    }\\n\\n    .spicegems_gdpr_float-left_banner  #spicegems_gdpr_main_btn, .spicegems_gdpr_float-right_banner  #spicegems_gdpr_main_btn {\\n        display: block !important;\\n        width: 100%;\\n        transform: none;\\n        margin-bottom: 10px;\\n    }\\n\\n    #spicegems_gdpr_banner{\\n        display: none;\\n    }\\n\\n    @media only screen and (max-width: 600px) {\\n        .spicegems_gdpr_float-right_banner {\\n            width: 100% !important;\\n            right: 0;\\n            bottom: 0;\\n        }\\n\\n        .spicegems_gdpr_float-left_banner {\\n            width: 100% !important;\\n            left: 0;\\n            bottom: 0;\\n        }\\n    }\\n<\\/style>\"')),
        r.prepend('<div class="spicegems_gdpr_top_banner" id="spicegems_gdpr_banner">\n    <div class="spicegems_gdpr_banner_con">\n        <div class="spicegems_gdpr_banner_inner">\n            <msg id="spicegems_gdpr_banner_msg"></msg>\n            <a href="" id="spicegems_gdpr_banner_link"></a>\n        </div>\n\n        <a href="javascript:void(0)" id="spicegems_gdpr_main_btn"></a>\n\n    </div>\n</div>\n\n\n')) : (r.append(JSON.parse('\"<style>\\n    #spicegems_gdpr_banner {\\n        background-color: rgb(33, 43, 53);\\n        color: #fff;\\n        width: 100%;\\n        opacity: 1px;\\n        z-index: 400000000;\\n        box-shadow: 0 1px 3px 2px rgba(0, 0, 0, 0.15);\\n        padding: 6px 0;\\n    }\\n\\n    .spicegems_gdpr_banner_con {\\n        padding-right: 15px;\\n        padding-left: 15px;\\n        margin-right: auto;\\n        margin-left: auto;\\n        display: flex;\\n    }\\n    .spicegems_gdpr_banner_inner {\\n        display: inline-block;\\n        width: 90%;\\n        float: left;\\n        padding: 12px 5px;\\n    }\\n    #spicegems_gdpr_banner_msg {\\n        display: inline;\\n        color: #fff;\\n        font-family: sans-serif;\\n        font-size: 18px;\\n        letter-spacing: 0.3px;\\n        text-align: justify;\\n    }\\n\\n    #spicegems_gdpr_banner_link {\\n        display: inline;\\n        padding: 12px 5px;\\n        color: #0072ff;\\n        font-family: sans-serif;\\n        font-size: 18px;\\n        letter-spacing: 0.3px;\\n        text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);\\n    }\\n\\n    #spicegems_gdpr_main_btn {\\n        min-width: 100px;\\n        color: #000;\\n        background: #e5e5e5;\\n        font-size: 16px;\\n        letter-spacing: 0.8px;\\n        letter-spacing: 1.1px;\\n        text-align: center;\\n        padding: 8px 15px;\\n        font-weight: normal;\\n        border-radius: 2px;\\n        display: inline-block;\\n        text-decoration: none;\\n        font-family: \'Open Sans\', sans-serif;\\n        -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\\n        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\\n        transition: all 0.3s ease-in-out 0s;\\n        transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\\n        float: right;\\n        cursor: pointer;\\n    }\\n    #spicegems_gdpr_main_btn:hover,\\n    #spicegems_gdpr_main_btn:active {\\n        opacity: 0.8;\\n    }\\n\\n    #spicegems_gdpr_main_btn {\\n        align-self: center;\\n        margin-left: auto;\\n    }\\n    .spicegems_gdpr_top_pushdown_banner {\\n        position: static;\\n        top: 0;\\n        bottom: auto;\\n        left: 0;\\n    }\\n    .spicegems_gdpr_top_banner {\\n        position: fixed;\\n        top: 0;\\n        bottom: auto;\\n        left: 0;\\n    }\\n    .spicegems_gdpr_bottom_banner {\\n        position: fixed;\\n        top: auto;\\n        bottom: 0;\\n        left: 0;\\n    }\\n    .spicegems_gdpr_float-left_banner {\\n        position: fixed;\\n        top: auto;\\n        bottom: 20px;\\n        left: 20px;\\n        width: 30% !important;\\n    }\\n    .spicegems_gdpr_float-right_banner {\\n        position: fixed;\\n        top: auto;\\n        bottom: 20px;\\n        right: 20px;\\n        width: 30% !important;\\n    }\\n    .spicegems_gdpr_float-left_banner .spicegems_gdpr_banner_con, .spicegems_gdpr_float-right_banner .spicegems_gdpr_banner_con {\\n        display: block;\\n    }\\n    .spicegems_gdpr_float-left_banner .spicegems_gdpr_banner_inner, .spicegems_gdpr_float-right_banner .spicegems_gdpr_banner_inner {\\n        width: 100%;\\n    }\\n    .spicegems_gdpr_float-left_banner .spicegems_gdpr_banner_inner > *, .spicegems_gdpr_float-right_banner .spicegems_gdpr_banner_inner > *{\\n        display: block !important;\\n        width: 100%;\\n    }\\n\\n    .spicegems_gdpr_float-left_banner  #spicegems_gdpr_main_btn, .spicegems_gdpr_float-right_banner  #spicegems_gdpr_main_btn {\\n        display: block !important;\\n        width: 100%;\\n        transform: none;\\n        margin-bottom: 10px;\\n    }\\n\\n    #spicegems_gdpr_banner{\\n        display: none;\\n    }\\n\\n    @media only screen and (max-width: 600px) {\\n        .spicegems_gdpr_float-right_banner {\\n            width: 100% !important;\\n            right: 0;\\n            bottom: 0;\\n        }\\n\\n        .spicegems_gdpr_float-left_banner {\\n            width: 100% !important;\\n            left: 0;\\n            bottom: 0;\\n        }\\n    }\\n<\\/style>\"')),
        r.prepend('<div class="spicegems_gdpr_top_banner" id="spicegems_gdpr_banner">\n    <div class="spicegems_gdpr_banner_con">\n        <div class="spicegems_gdpr_banner_inner">\n            <msg id="spicegems_gdpr_banner_msg"></msg>\n            <a href="" id="spicegems_gdpr_banner_link"></a>\n        </div>\n\n        <a href="javascript:void(0)" id="spicegems_gdpr_main_btn"></a>\n\n    </div>\n</div>\n\n\n'));
        var i = [];
        i.position = o.gdpr_position ? o.gdpr_position : "bottom",
        i.text_msg = o.gdpr_msg ? o.gdpr_msg : "This website uses cookies to ensure you get the best experience on our website.",
        i.policy_text = o.gdpr_policy_text ? o.gdpr_policy_text : "Privacy Policy",
        i.policy_link = o.gdpr_policy_url ? o.gdpr_policy_url : "",
        i.btn_text = o.gdpr_btn_text ? o.gdpr_btn_text : "Got it!",
        $elm_selector = $sgjQuery("body").find("#spicegems_gdpr_banner"),
        $elm_selector.removeClass().addClass("spicegems_gdpr_" + i.position + "_banner"),
        $elm_selector.find("#spicegems_gdpr_banner_msg").html(i.text_msg),
        $elm_selector.find("#spicegems_gdpr_banner_link").html(i.policy_text).attr("href", i.policy_link).attr("target", "_blank"),
        $elm_selector.find("#spicegems_gdpr_main_btn").html(i.btn_text),
        o.gdpr_bg_color && $sgjQuery("#spicegems_gdpr_banner").css("background-color", o.gdpr_bg_color),
        o.gdpr_text_color && $sgjQuery("#spicegems_gdpr_banner_msg").css("color", o.gdpr_text_color),
        o.gdpr_policy_color && $sgjQuery("#spicegems_gdpr_banner_link").css("color", o.gdpr_policy_color),
        o.gdpr_btn_color && $sgjQuery("#spicegems_gdpr_main_btn").css("background-color", o.gdpr_btn_color),
        o.gdpr_btn_text_color && $sgjQuery("#spicegems_gdpr_main_btn").css("color", o.gdpr_btn_text_color),
        e.gdpr_position = o.gdpr_position,
        $sgjQuery("#spicegems_gdpr_banner").fadeIn("slow")
    }
    ,
    e.fetchURL = function(o, r) {
        var i, n = JSON.parse('{"users_batch":"2","countries":{"2":{"name":"Test","url":"https:\\/\\/spice-country-redirect-demo.myshopify.com\\/","store_name":"Test Store","add_relative_url":0,"utm_settings":"{\\"enable_utm_forward\\":\\"\\",\\"utm_source\\":\\"\\",\\"utm_medium\\":\\"\\",\\"utm_campaign\\":\\"\\"}"}},"countryData":[{"2":["AF","AX","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BQ","BA","BW","BV","BR","IO","BN","BG","BF","BI","KH","CM","CA","CV","KY","CF","TD","CL","CN","CX","CC","CO","KM","CG","CD","CK","CR","CI","HR","CU","CW","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","ET","FK","FO","FJ","FI","FR","GF","PF","TF","GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GG","GN","GW","GY","HT","HM","VA","HN","HK","HU","IS","IN","ID","IR","IQ","IE","IM","IL","IT","JM","JP","JE","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MO","MK","MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM","MD","MC","MN","ME","MS","MA","MZ","MM","NA","NR","NP","NL","NC","NZ","NI","NE","NG","NU","NF","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PN","PL","PT","PR","QA","RE","RO","RU","RW","BL","SH","KN","LC","MF","PM","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG","SX","SK","SI","SB","SO","ZA","GS","SS","ES","LK","SD","SR","SJ","SZ","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TK","TO","TT","TN","TR","TM","TC","TV","UG","UA","AE","GB","US","UM","UY","UZ","VU","VE","VN","VG","VI","WF","EH","YE","ZM","ZW"]}],"message_show_option":"box","yes_button_text":"Yes","no_button_text":"No","custom_css":".spicegems_cr_modal-content {\\r\\n    background: #2b2b2b;\\r\\n}\\r\\n\\r\\nmsg#spicegems_cr_mod_msg {\\r\\n    color: #f7f7f7;\\r\\n    font-size: 20px;\\r\\n    padding: 10px 10px;\\r\\n}\\r\\n\\r\\n.spicegems_cr_modal-header {\\r\\n    background: #2b2b2b;\\r\\n    color: #f7f7f7;\\r\\n    font-size: 25px;\\r\\n}\\r\\n\\r\\n.spicegems_cr_modal-body {\\r\\n    padding: 0px 15px 15px 15px;\\r\\n}\\r\\n\\r\\ndiv#spicegems_cr_mod_sitelogo {\\r\\n}\\r\\n\\r\\na#spicegems_cr_btn_yes {\\r\\n    background: #d72173;\\r\\n    color: #f7f7f7;\\r\\n}\\r\\n\\r\\na#spicegems_cr_btn_no {\\r\\n    background: #d72173;\\r\\n    color: #f7f7f7;\\r\\n}\\r\\n\\r\\n.spicegems_cr_modal-footer {\\r\\n    border: none;\\r\\n}\\r\\n\\r\\n#spicegems_cr_mod_sitelogo img {\\r\\n    margin: 20px auto;\\r\\n}\\r\\ndiv#sg_country_redirect_mod {\\r\\n    background-color: #80808040;\\r\\n}\\r\\n@media only screen and (max-width: 600px) {\\r\\n    .spicegems_cr_modal-header {\\r\\n        font-size: 19px;\\r\\n    }\\r\\n    #spicegems_cr_mod_sitelogo img{\\r\\n        margin: 15px auto;\\r\\n    }\\r\\n    msg#spicegems_cr_mod_msg{\\r\\n        font-size:15px;\\r\\n    }\\r\\n}\\r\\n\\r\\n\\r\\n","customer_message":"Shop in GBP \\u00a3, Get shipping options for the United Kingdom Visit UK store? ","exclude_ip":"","cookie_settings":{"cookie_time":"60","cookie_action":"2","cookie_match_value":1},"whitelist_settings":{"whitelist":[]},"gdpr_settings":null,"popup_box_title":"Run The Jewels ships to the United Kingdom","popup_box_img_enable":"1","popup_box_img":"https:\\/\\/cdn.shopify.com\\/s\\/files\\/1\\/0316\\/8708\\/2120\\/files\\/RTJ-logo-header.png?v=1627996560","autoredirect":0,"app_status":1,"default_rule":{"fallback_url":""},"all_countries":{"AF":"Afghanistan","AX":"\\u00c5land Islands","AL":"Albania","DZ":"Algeria","AS":"American Samoa","AD":"Andorra","AO":"Angola","AI":"Anguilla","AQ":"Antarctica","AG":"Antigua and Barbuda","AR":"Argentina","AM":"Armenia","AW":"Aruba","AU":"Australia","AT":"Austria","AZ":"Azerbaijan","BS":"Bahamas","BH":"Bahrain","BD":"Bangladesh","BB":"Barbados","BY":"Belarus","BE":"Belgium","BZ":"Belize","BJ":"Benin","BM":"Bermuda","BT":"Bhutan","BO":"Bolivia, Plurinational State of","BQ":"Bonaire, Sint Eustatius and Saba","BA":"Bosnia and Herzegovina","BW":"Botswana","BV":"Bouvet Island","BR":"Brazil","IO":"British Indian Ocean Territory","BN":"Brunei Darussalam","BG":"Bulgaria","BF":"Burkina Faso","BI":"Burundi","KH":"Cambodia","CM":"Cameroon","CA":"Canada","CV":"Cape Verde","KY":"Cayman Islands","CF":"Central African Republic","TD":"Chad","CL":"Chile","CN":"China","CX":"Christmas Island","CC":"Cocos (Keeling) Islands","CO":"Colombia","KM":"Comoros","CG":"Congo","CD":"Congo, the Democratic Republic of the","CK":"Cook Islands","CR":"Costa Rica","CI":"C\\u00f4te d`Ivoire","HR":"Croatia","CU":"Cuba","CW":"Cura\\u00e7ao","CY":"Cyprus","CZ":"Czech Republic","DK":"Denmark","DJ":"Djibouti","DM":"Dominica","DO":"Dominican Republic","EC":"Ecuador","EG":"Egypt","SV":"El Salvador","GQ":"Equatorial Guinea","ER":"Eritrea","EE":"Estonia","ET":"Ethiopia","FK":"Falkland Islands (Malvinas)","FO":"Faroe Islands","FJ":"Fiji","FI":"Finland","FR":"France","GF":"French Guiana","PF":"French Polynesia","TF":"French Southern Territories","GA":"Gabon","GM":"Gambia","GE":"Georgia","DE":"Germany","GH":"Ghana","GI":"Gibraltar","GR":"Greece","GL":"Greenland","GD":"Grenada","GP":"Guadeloupe","GU":"Guam","GT":"Guatemala","GG":"Guernsey","GN":"Guinea","GW":"Guinea-Bissau","GY":"Guyana","HT":"Haiti","HM":"Heard Island and McDonald Islands","VA":"Holy See (Vatican City State)","HN":"Honduras","HK":"Hong Kong","HU":"Hungary","IS":"Iceland","IN":"India","ID":"Indonesia","IR":"Iran, Islamic Republic of","IQ":"Iraq","IE":"Ireland","IM":"Isle of Man","IL":"Israel","IT":"Italy","JM":"Jamaica","JP":"Japan","JE":"Jersey","JO":"Jordan","KZ":"Kazakhstan","KE":"Kenya","KI":"Kiribati","KP":"Korea, Democratic People`s Republic of","KR":"Korea, Republic of","KW":"Kuwait","KG":"Kyrgyzstan","LA":"Lao People`s Democratic Republic","LV":"Latvia","LB":"Lebanon","LS":"Lesotho","LR":"Liberia","LY":"Libya","LI":"Liechtenstein","LT":"Lithuania","LU":"Luxembourg","MO":"Macao","MK":"Macedonia, the Former Yugoslav Republic of","MG":"Madagascar","MW":"Malawi","MY":"Malaysia","MV":"Maldives","ML":"Mali","MT":"Malta","MH":"Marshall Islands","MQ":"Martinique","MR":"Mauritania","MU":"Mauritius","YT":"Mayotte","MX":"Mexico","FM":"Micronesia, Federated States of","MD":"Moldova, Republic of","MC":"Monaco","MN":"Mongolia","ME":"Montenegro","MS":"Montserrat","MA":"Morocco","MZ":"Mozambique","MM":"Myanmar","NA":"Namibia","NR":"Nauru","NP":"Nepal","NL":"Netherlands","NC":"New Caledonia","NZ":"New Zealand","NI":"Nicaragua","NE":"Niger","NG":"Nigeria","NU":"Niue","NF":"Norfolk Island","MP":"Northern Mariana Islands","NO":"Norway","OM":"Oman","PK":"Pakistan","PW":"Palau","PS":"Palestine, State of","PA":"Panama","PG":"Papua New Guinea","PY":"Paraguay","PE":"Peru","PH":"Philippines","PN":"Pitcairn","PL":"Poland","PT":"Portugal","PR":"Puerto Rico","QA":"Qatar","RE":"R\\u00e9union","RO":"Romania","RU":"Russian Federation","RW":"Rwanda","BL":"Saint Barth\\u00e9lemy","SH":"Saint Helena, Ascension and Tristan da Cunha","KN":"Saint Kitts and Nevis","LC":"Saint Lucia","MF":"Saint Martin (French part)","PM":"Saint Pierre and Miquelon","VC":"Saint Vincent and the Grenadines","WS":"Samoa","SM":"San Marino","ST":"Sao Tome and Principe","SA":"Saudi Arabia","SN":"Senegal","RS":"Serbia","SC":"Seychelles","SL":"Sierra Leone","SG":"Singapore","SX":"Sint Maarten (Dutch part)","SK":"Slovakia","SI":"Slovenia","SB":"Solomon Islands","SO":"Somalia","ZA":"South Africa","GS":"South Georgia and the South Sandwich Islands","SS":"South Sudan","ES":"Spain","LK":"Sri Lanka","SD":"Sudan","SR":"Suriname","SJ":"Svalbard and Jan Mayen","SZ":"Swaziland","SE":"Sweden","CH":"Switzerland","SY":"Syrian Arab Republic","TW":"Taiwan, Province of China","TJ":"Tajikistan","TZ":"Tanzania, United Republic of","TH":"Thailand","TL":"Timor-Leste","TG":"Togo","TK":"Tokelau","TO":"Tonga","TT":"Trinidad and Tobago","TN":"Tunisia","TR":"Turkey","TM":"Turkmenistan","TC":"Turks and Caicos Islands","TV":"Tuvalu","UG":"Uganda","UA":"Ukraine","AE":"United Arab Emirates","GB":"United Kingdom","US":"United States","UM":"United States Minor Outlying Islands","UY":"Uruguay","UZ":"Uzbekistan","VU":"Vanuatu","VE":"Venezuela, Bolivarian Republic of","VN":"Viet Nam","VG":"Virgin Islands, British","VI":"Virgin Islands, U.S.","WF":"Wallis and Futuna","EH":"Western Sahara","YE":"Yemen","ZM":"Zambia","ZW":"Zimbabwe"}}'), c = "-1", a = (n = e.extend({
            exclude_ip: "",
            custom_css: ""
        }, n)).exclude_ip;
        a = a.trim();
        var s = n.gdpr_settings ? n.gdpr_settings : "";
        e.gdpr_cookie_exp = parseInt(s.gdpr_cookie_exp ? s.gdpr_cookie_exp : "0");
        var _ = "spiceGDPRBar"
          , p = (n.whitelist_settings ? n.whitelist_settings : {
            whitelist: []
        }).whitelist
          , u = window.location.href
          , d = window.location.hostname;
        if (u = e.sanitizeUrl(u),
        e.barAndModelDefaultData = function(t, o) {
            e.setDefaultData(t, o);
            var r = "<style>" + o.custom_css + "</style>";
            $sgjQuery("body").append(r)
        }
        ,
        p.filter(function(t) {
            if ("enable" === t.status) {
                var o = e.sanitizeUrl(t.match);
                if ("contain" === t.type)
                    return u.indexOf(o) > -1;
                if ("exact" === t.type)
                    return u === o
            }
        }).length < 1 && n.app_status && "-1" == a.indexOf(r)) {
            if (n.countryData) {
                var l, m, g = n.countryData;
                for (l in g)
                    for (m in g[l]) {
                        if ("-1" != g[l][m].indexOf(o)) {
                            c = m;
                            break
                        }
                    }
            }
            if (e.countryURL = "",
            null == n.countries[c] ? "" != n.default_rule && "1" == (i = n.default_rule).enable_fallback_settings && (e.countryURL = i.fallback_url) : (i = n.countries[c],
            e.countryURL = i.url,
            "/" === e.countryURL.slice(-1) && (e.countryURL = e.countryURL.slice(0, e.countryURL.length - 1))),
            "/" === (w = location.href.split("?")[0]).slice(-1) && (w = w.slice(0, w.length - 1)),
            w !== e.countryURL && "" !== e.countryURL)
                if (e.isNewAndCurrentURLSame(e.countryURL, u)) {
                    var f = n.all_countries[o]
                      , y = n.message_show_option;
                    e.autoredirect = n.autoredirect,
                    e.add_relative_url = i.add_relative_url,
                    e.countryURL.replace("http://", "").replace("https://", "").split(/[/?#]/)[0] === d && (e.add_relative_url = 0);
                    var h = n.cookie_settings ? n.cookie_settings : {
                        cookie_time: 60,
                        cookie_action: 2,
                        cookie_match_value: 1
                    };
                    e.cookieExpiryTime = parseInt(h.cookie_time),
                    e.cookieActionValue = parseInt(h.cookie_action),
                    e.cookieMatchValue = parseInt(h.cookie_match_value);
                    var b = i.utm_settings ? JSON.parse(i.utm_settings) : {
                        enable_utm_forward: "1",
                        utm_source: "",
                        utm_medium: "",
                        utm_campaign: ""
                    };
                    e.enable_utm_forward = parseInt(b.enable_utm_forward),
                    e.utm_source = b.utm_source,
                    e.utm_medium = b.utm_medium,
                    e.utm_campaign = b.utm_campaign,
                    1 == e.autoredirect ? e.redirect() : (_ = "spiceModalAndBar",
                    t = i.store_name,
                    "complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? e.loadJQuery(_, n, f, t, y, o, s) : document.addEventListener("DOMContentLoaded", function() {
                        e.loadJQuery(_, n, f, t, y, o, s)
                    }))
                } else {
                    var w = location.href.split("?")[0];
                    if ("/" === location.pathname && (w = w.slice(0, w.length - 1)),
                    w !== e.countryURL) {
                        f = n.all_countries[o],
                        y = n.message_show_option;
                        e.autoredirect = n.autoredirect,
                        e.add_relative_url = i.add_relative_url,
                        e.countryURL.replace("http://", "").replace("https://", "").split(/[/?#]/)[0] === d && (e.add_relative_url = 0);
                        b = i.utm_settings ? JSON.parse(i.utm_settings) : {
                            enable_utm_forward: "1",
                            utm_source: "",
                            utm_medium: "",
                            utm_campaign: ""
                        };
                        e.enable_utm_forward = parseInt(b.enable_utm_forward),
                        e.utm_source = b.utm_source,
                        e.utm_medium = b.utm_medium,
                        e.utm_campaign = b.utm_campaign;
                        h = {
                            cookie_time: 1,
                            cookie_action: 2,
                            cookie_match_value: 1
                        };
                        e.cookieExpiryTime = parseInt(h.cookie_time),
                        e.cookieActionValue = parseInt(h.cookie_action),
                        e.cookieMatchValue = parseInt(h.cookie_match_value),
                        1 == e.autoredirect ? "1" != SpiceGems_Cookies.get("country_redirect_samedomain") && e.redirect() : (_ = "spiceModalAndBar",
                        t = i.store_name,
                        n.same_domain = "1",
                        "complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? e.loadJQuery(_, n, f, t, y, o, s) : document.addEventListener("DOMContentLoaded", function() {
                            e.loadJQuery(_, n, f, t, y, o, s)
                        }))
                    }
                }
            else
                e.isNewAndCurrentURLSame(e.countryURL, u) || SpiceGems_Cookies.set("country_redirect_samedomain", "1", {
                    path: "/"
                })
        }
        "1" !== s.is_gdpr_active || SpiceGems_Cookies.get("country_redirect_gdpr_bar") || "spiceGDPRBar" !== _ || ("complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? e.loadJQuery(_, n, f, t, y, o, s) : document.addEventListener("DOMContentLoaded", function() {
            e.loadJQuery(_, n, f, t, y, o, s)
        }))
    }
    ,
    e.loadJQuery = function(t, o, r, i, n, c, a) {
        var s = document.createElement("script");
        s.type = "text/javascript",
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js",
        s.id = "sg-jquery-224",
        document.head.append(s),
        s.onload = function() {
            var s = document.createElement("script");
            s.type = "text/javascript",
            s.innerHTML = "window['$sgjQuery'] = jQuery.noConflict(true);",
            document.head.append(s),
            s.onload = void ("1" !== a.is_gdpr_active || SpiceGems_Cookies.get("country_redirect_gdpr_bar") || "spiceModalAndBar" !== t ? "spiceGDPRBar" === t ? e.showGDPRCookieBar(c, a) : e.showModalOrBar(o, r, i, n) : (e.showModalOrBar(o, r, i, n),
            e.showGDPRCookieBar(c, a)))
        }
    }
    ,
    e.showModalOrBar = function(t, o, r, i) {
        !function() {
            SpiceGems_Cookies.get("country_redirect_cookie_match") != e.cookieMatchValue && (SpiceGems_Cookies.remove("country_redirect_spicegems"),
            0 != e.cookieExpiryTime ? SpiceGems_Cookies.set("country_redirect_cookie_match", e.cookieMatchValue, {
                expires: e.cookieExpiryTime,
                path: "/"
            }) : SpiceGems_Cookies.set("country_redirect_cookie_match", e.cookieMatchValue, {
                path: "/"
            }));
            $sgjQuery(document).on("click", "#spicegems_cr_btn_yes", e.redirect),
            $sgjQuery(document).on("click", "#spicegems_cr_btn_no", e.closeBox)
        }();
        var n = $sgjQuery("body");
        if ("1" == t.same_domain && "1" == SpiceGems_Cookies.get("country_redirect_samedomain") || "n" == SpiceGems_Cookies.get("country_redirect_spicegems"))
            return !1;
        if ("y" == SpiceGems_Cookies.get("country_redirect_spicegems"))
            e.redirect();
        else {
            var c = n.find("#sg_country_redirect_mod")
              , a = t.customer_message;
            if (a = (a = a.split("[country-name]").join(o)).split("[store-name]").join(r),
            t.customer_message = a,
            t.yes_button_text = t.yes_button_text.split("[country-name]").join(o),
            t.yes_button_text = t.yes_button_text.split("[store-name]").join(r),
            t.no_button_text = t.no_button_text.split("[country-name]").join(o),
            t.no_button_text = t.no_button_text.split("[store-name]").join(r),
            "box" == i)
                n.append(JSON.parse('\"<style>\\n\\n    \\/*------New Button Style------------------------------------*\\/\\n    .spicegems_cr_main-btn {\\n        min-width: 100px;\\n        color: #fff;\\n        background: #3D9AD1;\\n        font-family: sans-serif;\\n        font-size: 16px;\\n        line-height: normal;\\n        padding: 10px 15px;\\n        font-weight: normal;\\n        margin: 6px 5px;\\n        border-radius: 2px;\\n        display: inline-block;\\n        text-decoration: none;\\n        font-family: \'Open Sans\', sans-serif;\\n        -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\\n        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\\n        transition: all 0.3s ease-in-out 0s;\\n        transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\\n\\n    }\\n\\n    .spicegems_cr_main-btn:hover,\\n    .spicegems_cr_main-btn:active {\\n        color: #fff;\\n        opacity: 0.8;\\n    }\\n<\\/style>\\n<style>\\n\\n    \\/*---------Country Redirect Model Css---------------------------------------------------*\\/\\n    #sg_country-redirect_mod{\\n\\n    }\\n    .spicegems_cr_modal {\\n        position: fixed;\\n        top: 0;\\n        right: 0;\\n        bottom: 0;\\n        left: 0;\\n        z-index: 500000000;\\n        display: none;\\n        overflow: hidden;\\n        -webkit-overflow-scrolling: touch;\\n        outline: 0;\\n    }\\n\\n    .spicegems_cr_modal.fade .spicegems_cr_modal-dialog {\\n        -webkit-transition: -webkit-transform .3s ease-out;\\n        -o-transition: -o-transform .3s ease-out;\\n        transition: transform .3s ease-out;\\n        -webkit-transform: translate3d(0, -25%, 0);\\n        -o-transform: translate3d(0, -25%, 0);\\n        transform: translate3d(0, -25%, 0);\\n    }\\n\\n    .spicegems_cr_modal.in .spicegems_cr_modal-dialog {\\n        top: 10%;\\n        -webkit-transform: translate3d(0, -10%, 0);\\n        -o-transform: translate3d(0, -10%, 0);\\n        transform: translate3d(0, -10%, 0);\\n    }\\n\\n    .spicegems_cr_modal-open .spicegems_cr_modal {\\n        overflow-x: hidden;\\n        overflow-y: auto;\\n    }\\n\\n    .spicegems_cr_modal-dialog {\\n        position: relative;\\n        width: auto;\\n        margin: 10px;\\n    }\\n\\n    .spicegems_cr_modal-content {\\n        position: relative;\\n        background-color: #fff;\\n        -webkit-background-clip: padding-box;\\n        background-clip: padding-box;\\n        border: 1px solid #999;\\n        border: 1px solid rgba(0, 0, 0, .2);\\n        border-radius: 4px;\\n        outline: 0;\\n        -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, .5);\\n        box-shadow: 0 3px 9px rgba(0, 0, 0, .5);\\n    }\\n\\n    .spicegems_cr_modal-backdrop {\\n        position: fixed;\\n        top: 0;\\n        right: 0;\\n        bottom: 0;\\n        left: 0;\\n        z-index: 400000000;\\n        background-color: #000;\\n    }\\n\\n    .spicegems_cr_modal-backdrop.fade {\\n        filter: alpha(opacity=0);\\n        opacity: 0;\\n    }\\n\\n    .spicegems_cr_modal-backdrop.in {\\n        filter: alpha(opacity=50);\\n        opacity: .5;\\n    }\\n\\n    .spicegems_cr_modal-header {\\n        background-color: rgb(33, 43, 53);\\n        color: #fff;\\n        border-bottom: 1px solid rgb(33, 43, 53);\\n        padding: 12px 15px;\\n        border-top-left-radius: 2px;\\n        border-top-right-radius: 2px;\\n        font-size: 18px;\\n        font-family: sans-serif;\\n        text-align: center;\\n    }\\n\\n    .spicegems_cr_modal-header .close {\\n        margin-top: -2px;\\n    }\\n\\n    .spicegems_cr_modal-title {\\n        text-align: center;\\n        margin: 0;\\n        line-height: 1.42857143;\\n    }\\n\\n    .spicegems_cr_modal-body {\\n        position: relative;\\n        padding: 50px 15px;\\n        text-align: center;\\n\\n    }\\n    #spicegems_cr_mod_msg {\\n        font-family: sans-serif;\\n        font-size: 20px;\\n        color: #333;\\n        line-height: normal;\\n        -webkit-font-smoothing: antialiased;\\n    }\\n    .spicegems_cr_modal-footer {\\n        text-align: center;\\n        border-top: 1px solid #ddd;\\n        padding: 10px 15px;\\n    }\\n\\n    .spicegems_cr_modal-scrollbar-measure {\\n        position: absolute;\\n        top: -9999px;\\n        width: 50px;\\n        height: 50px;\\n        overflow: scroll;\\n    }\\n\\n    .spicegems_cr_close {\\n        float: right;\\n        font-size: 21px;\\n        font-weight: bold;\\n        line-height: 1;\\n        color: #fff;\\n        text-shadow: 0 1px 0 #fff;\\n        filter: alpha(opacity=20);\\n        opacity: .2;\\n    }\\n\\n    .spicegems_cr_close:hover,\\n    .spicegems_cr_close:focus {\\n        color: #fff;\\n        text-decoration: none;\\n        cursor: pointer;\\n        filter: alpha(opacity=50);\\n        opacity: .5;\\n    }\\n\\n    button.spicegems_cr_close {\\n        -webkit-appearance: none;\\n        padding: 0;\\n        cursor: pointer;\\n        background: transparent;\\n        border: 0;\\n    }\\n\\n    .spicegems_cr_modal-open {\\n        overflow: hidden;\\n    }\\n\\n\\n    @media (min-width: 768px) {\\n        .spicegems_cr_modal-dialog {\\n            width: 600px;\\n            margin: 30px auto;\\n        }\\n\\n        .spicegems_cr_modal-content {\\n            -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);\\n            box-shadow: 0 5px 15px rgba(0, 0, 0, .5);\\n        }\\n\\n        .spicegems_cr_modal-sm {\\n            width: 300px;\\n        }\\n    }\\n\\n    @media (min-width: 992px) {\\n        .spicegems_cr_modal-lg {\\n            width: 900px;\\n        }\\n    }\\n\\n    #spicegems_cr_mod_sitelogo {\\n        text-align: center;\\n        margin-bottom: 15px;\\n    }\\n\\n    #spicegems_cr_mod_sitelogo img {\\n        width: 60%;\\n        display: block;\\n        margin: 0 auto;\\n    }\\n\\n    \\/*--Img Responsive----*\\/\\n    .sg_cbr_img-responsive {\\n        width: 100% \\\\9;\\n        max-width: 100%;\\n        height: auto;\\n    }\\n\\n\\n    #spicegems_cr_btn_yes {\\n        color: #fff;\\n        background-color: rgb(33, 43, 53);\\n    }\\n\\n    #spicegems_cr_btn_no {\\n        color: #000;\\n        background-color: #e5e5e5;\\n    }\\n<\\/style>\\n\\n\\n\\n<script>\\n    if(typeof($sgjQuery.fn.modal) === \'undefined\') {\\n        if(\\\"undefined\\\"==typeof $sgjQuery)throw new Error(\\\"Bootstrap\'s JavaScript requires jQuery\\\");+function(t){\\\"use strict\\\";var e=t.fn.jquery.split(\\\" \\\")[0].split(\\\".\\\");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||e[0]>3)throw new Error(\\\"Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4\\\")}($sgjQuery),+function(t){\\\"use strict\\\";function e(e,o){return this.each(function(){var s=t(this),n=s.data(\\\"bs.modal\\\"),r=t.extend({},i.DEFAULTS,s.data(),\\\"object\\\"==typeof e&&e);n||s.data(\\\"bs.modal\\\",n=new i(this,r)),\\\"string\\\"==typeof e?n[e](o):r.show&&n.show(o)})}var i=function(e,i){this.options=i,this.$body=t(document.body),this.$element=t(e),this.$dialog=this.$element.find(\\\".modal-dialog\\\"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(\\\".modal-content\\\").load(this.options.remote,t.proxy(function(){this.$element.trigger(\\\"loaded.bs.modal\\\")},this))};i.VERSION=\\\"3.3.7\\\",i.TRANSITION_DURATION=300,i.BACKDROP_TRANSITION_DURATION=150,i.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},i.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},i.prototype.show=function(e){var o=this,s=t.Event(\\\"show.bs.modal\\\",{relatedTarget:e});this.$element.trigger(s),this.isShown||s.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass(\\\"modal-open\\\"),this.escape(),this.resize(),this.$element.on(\\\"click.dismiss.bs.modal\\\",\'[data-dismiss=\\\"modal\\\"]\',t.proxy(this.hide,this)),this.$dialog.on(\\\"mousedown.dismiss.bs.modal\\\",function(){o.$element.one(\\\"mouseup.dismiss.bs.modal\\\",function(e){t(e.target).is(o.$element)&&(o.ignoreBackdropClick=!0)})}),this.backdrop(function(){var s=t.support.transition&&o.$element.hasClass(\\\"fade\\\");o.$element.parent().length||o.$element.appendTo(o.$body),o.$element.show().scrollTop(0),o.adjustDialog(),s&&o.$element[0].offsetWidth,o.$element.addClass(\\\"in\\\"),o.enforceFocus();var n=t.Event(\\\"shown.bs.modal\\\",{relatedTarget:e});s?o.$dialog.one(\\\"bsTransitionEnd\\\",function(){o.$element.trigger(\\\"focus\\\").trigger(n)}).emulateTransitionEnd(i.TRANSITION_DURATION):o.$element.trigger(\\\"focus\\\").trigger(n)}))},i.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event(\\\"hide.bs.modal\\\"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),t(document).off(\\\"focusin.bs.modal\\\"),this.$element.removeClass(\\\"in\\\").off(\\\"click.dismiss.bs.modal\\\").off(\\\"mouseup.dismiss.bs.modal\\\"),this.$dialog.off(\\\"mousedown.dismiss.bs.modal\\\"),t.support.transition&&this.$element.hasClass(\\\"fade\\\")?this.$element.one(\\\"bsTransitionEnd\\\",t.proxy(this.hideModal,this)).emulateTransitionEnd(i.TRANSITION_DURATION):this.hideModal())},i.prototype.enforceFocus=function(){t(document).off(\\\"focusin.bs.modal\\\").on(\\\"focusin.bs.modal\\\",t.proxy(function(t){document===t.target||this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger(\\\"focus\\\")},this))},i.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on(\\\"keydown.dismiss.bs.modal\\\",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off(\\\"keydown.dismiss.bs.modal\\\")},i.prototype.resize=function(){this.isShown?t(window).on(\\\"resize.bs.modal\\\",t.proxy(this.handleUpdate,this)):t(window).off(\\\"resize.bs.modal\\\")},i.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass(\\\"modal-open\\\"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger(\\\"hidden.bs.modal\\\")})},i.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},i.prototype.backdrop=function(e){var o=this,s=this.$element.hasClass(\\\"fade\\\")?\\\"fade\\\":\\\"\\\";if(this.isShown&&this.options.backdrop){var n=t.support.transition&&s;if(this.$backdrop=t(document.createElement(\\\"div\\\")).addClass(\\\"modal-backdrop \\\"+s).appendTo(this.$body),this.$element.on(\\\"click.dismiss.bs.modal\\\",t.proxy(function(t){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(t.target===t.currentTarget&&(\\\"static\\\"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),n&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass(\\\"in\\\"),!e)return;n?this.$backdrop.one(\\\"bsTransitionEnd\\\",e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):e()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass(\\\"in\\\");var r=function(){o.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass(\\\"fade\\\")?this.$backdrop.one(\\\"bsTransitionEnd\\\",r).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):r()}else e&&e()},i.prototype.handleUpdate=function(){this.adjustDialog()},i.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:\\\"\\\",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:\\\"\\\"})},i.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:\\\"\\\",paddingRight:\\\"\\\"})},i.prototype.checkScrollbar=function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()},i.prototype.setScrollbar=function(){var t=parseInt(this.$body.css(\\\"padding-right\\\")||0,10);this.originalBodyPad=document.body.style.paddingRight||\\\"\\\",this.bodyIsOverflowing&&this.$body.css(\\\"padding-right\\\",t+this.scrollbarWidth)},i.prototype.resetScrollbar=function(){this.$body.css(\\\"padding-right\\\",this.originalBodyPad)},i.prototype.measureScrollbar=function(){var t=document.createElement(\\\"div\\\");t.className=\\\"modal-scrollbar-measure\\\",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var o=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=i,t.fn.modal.noConflict=function(){return t.fn.modal=o,this},t(document).on(\\\"click.bs.modal.data-api\\\",\'[data-toggle=\\\"modal\\\"]\',function(i){var o=t(this),s=o.attr(\\\"href\\\"),n=t(o.attr(\\\"data-target\\\")||s&&s.replace(\\/.*(?=#[^\\\\s]+$)\\/,\\\"\\\")),r=n.data(\\\"bs.modal\\\")?\\\"toggle\\\":t.extend({remote:!\\/#\\/.test(s)&&s},n.data(),o.data());o.is(\\\"a\\\")&&i.preventDefault(),n.one(\\\"show.bs.modal\\\",function(t){t.isDefaultPrevented()||n.one(\\\"hidden.bs.modal\\\",function(){o.is(\\\":visible\\\")&&o.trigger(\\\"focus\\\")})}),e.call(n,r,this)})}($sgjQuery),+function(t){\\\"use strict\\\";function e(){var t=document.createElement(\\\"bootstrap\\\"),e={WebkitTransition:\\\"webkitTransitionEnd\\\",MozTransition:\\\"transitionend\\\",OTransition:\\\"oTransitionEnd otransitionend\\\",transition:\\\"transitionend\\\"};for(var i in e)if(void 0!==t.style[i])return{end:e[i]};return!1}t.fn.emulateTransitionEnd=function(e){var i=!1,o=this;t(this).one(\\\"bsTransitionEnd\\\",function(){i=!0});var s=function(){i||t(o).trigger(t.support.transition.end)};return setTimeout(s,e),this},t(function(){t.support.transition=e(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(e){return t(e.target).is(this)?e.handleObj.handler.apply(this,arguments):void 0}})})}($sgjQuery);}\\n<\\/script>\\n\"')),
                n.append('<div class="spicegems_cr_modal fade" id="sg_country_redirect_mod" tabindex="-1" role="dialog" data-keyboard="false" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true">\n    <div class="spicegems_cr_modal-dialog">\n        <div class="spicegems_cr_modal-content">\n            <div class="spicegems_cr_modal-header">\n                <div class="spicegems_cr_modal-title" id="spicegems_cr_myModalLabel"></div>\n            </div>\n            <div class="spicegems_cr_modal-body">\n\n                <div id="spicegems_cr_mod_sitelogo" style="display: none">\n                    <img id="sg_cbr_box_image" src="" class="sg_cbr_img-responsive">\n                </div>\n\n                <msg id="spicegems_cr_mod_msg"></msg>\n            </div>\n            <div class="spicegems_cr_modal-footer">\n                <a href="javascript:void(0)" class="spicegems_cr_main-btn" id="spicegems_cr_btn_yes"></a>\n                <a href="javascript:void(0)" class="spicegems_cr_main-btn" id="spicegems_cr_btn_no"></a>\n            </div>\n\n\n\n\n\n        </div>\n        \n    </div>\n</div>'),
                $sgjQuery(document).find("#sg_country_redirect_mod").modal(),
                (c = n.find("#sg_country_redirect_mod")).find("#spicegems_cr_myModalLabel").html(t.popup_box_title),
                1 == t.popup_box_img_enable && (c.find("#sg_cbr_box_image").attr("src", t.popup_box_img),
                c.find("#spicegems_cr_mod_sitelogo").show()),
                e.barAndModelDefaultData(c, t);
            else {
                if ("top_banner" != i)
                    return !1;
                n.append(JSON.parse('\"<style>\\n\\n    \\/*------New Button Style------------------------------------*\\/\\n    .spicegems_cr_main-btn {\\n        min-width: 100px;\\n        color: #fff;\\n        background: #3D9AD1;\\n        font-family: sans-serif;\\n        font-size: 16px;\\n        line-height: normal;\\n        padding: 10px 15px;\\n        font-weight: normal;\\n        margin: 6px 5px;\\n        border-radius: 2px;\\n        display: inline-block;\\n        text-decoration: none;\\n        font-family: \'Open Sans\', sans-serif;\\n        -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\\n        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\\n        transition: all 0.3s ease-in-out 0s;\\n        transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1);\\n\\n    }\\n\\n    .spicegems_cr_main-btn:hover,\\n    .spicegems_cr_main-btn:active {\\n        color: #fff;\\n        opacity: 0.8;\\n    }\\n<\\/style>\\n<style>\\n    \\/*--------Top Bar css------------------*\\/\\n    .spicegems_cr_top_bar {\\n        background-color: rgb(33, 43, 53);\\n        color: #fff;\\n        position: fixed;\\n        width: 100%;\\n        opacity: 0.9;\\n        z-index: 400000000;\\n        top: 0;\\n        left: 0;\\n        box-shadow: 0 1px 3px 2px rgba(0, 0, 0, 0.15);\\n        padding: 6px 0;\\n    }\\n\\n\\n    .spicegems_cr_top_bar #spicegems_cr_mod_msg {\\n        color: #fff;\\n        text-align: center;\\n        font-family: sans-serif;\\n        font-size: 18px;\\n        line-height: 30px;\\n        letter-spacing: 0.3px;\\n        text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);\\n    }\\n\\n    #spicegems_cr_btn_yes {\\n        margin-left: 15px;\\n    }\\n\\n    .spicegems_cr_top_bar_con-fluid {\\n        padding-right: 15px;\\n        padding-left: 15px;\\n        margin-right: auto;\\n        margin-left: auto;\\n    }\\n\\n    @media (min-width: 992px) {\\n        .spicegems_cr_col-md-3,\\n        .spicegems_cr_col-md-4,\\n        .spicegems_cr_col-md-5,\\n        .spicegems_cr_col-md-6,\\n        .spicegems_cr_col-md-7,\\n        .spicegems_cr_col-md-8,\\n        .spicegems_cr_col-md-9 {\\n            float: left;\\n        }\\n\\n        .spicegems_cr_col-md-12 {\\n            width: 100%;\\n            text-align: center;\\n        }\\n\\n        .spicegems_cr_col-md-9 {\\n            width: 75%;\\n        }\\n\\n        .spicegems_cr_col-md-8 {\\n            width: 66.66666667%;\\n        }\\n\\n        .spicegems_cr_col-md-7 {\\n            width: 58.33333333%;\\n        }\\n\\n        .spicegems_cr_col-md-6 {\\n            width: 50%;\\n        }\\n\\n    }\\n\\n\\n    #spicegems_cr_btn_yes {\\n        color: #000;\\n        background-color: #e5e5e5;\\n    }\\n\\n    #spicegems_cr_btn_no {\\n        color: #fff;\\n        background-color: #404e5d;\\n    }\\n<\\/style>\"')),
                n.append('<div class="spicegems_cr_top_bar" id="spicegems_cr_top_bar">\n    <div class="spicegems_cr_top_bar_con-fluid ">\n        <div class="spicegems_cr_col-md-12">\n            <msg id="spicegems_cr_mod_msg"></msg>\n\n            <a  href="javascript:void(0)" class="spicegems_cr_main-btn" id="spicegems_cr_btn_yes"></a>\n            <a  href="javascript:void(0)" class="spicegems_cr_main-btn" id="spicegems_cr_btn_no"></a>\n\n        </div>\n    </div>\n</div>'),
                c = n.find("#spicegems_cr_top_bar"),
                e.barAndModelDefaultData(c, t)
            }
            e.setDefaultData(c, t)
        }
    }
    ,
    e.parseCountry = function(t) {
        if (e.isGoogleBot(t.ua))
            return !0;
        e.fetchURL(t.country, t.ip)
    }
    ,
    e.isGoogleBot = function(e) {
        e = e.toLowerCase();
        for (var t = !1, o = ["googlebot", "www.google.com", "googlebot-mobile", "googlebot-image", "googlebot-news", "googlebot-video", "adsbot-google-mobile", "adsbot-google", "feedfetcher-google", "mediapartners-google", "google-adwords-instant", "appengine-google", "google web preview", "msnbot", "google search console", "google-shopping-quality", "google web preview analytics", "storebot-google", "googleweblight", "google favicon", "duplexweb-google", "google-read-aloud", "adsbot-google-mobile-apps", "apis-google"], r = 0; r < o.length; r++)
            if (e.indexOf(o[r]) > -1) {
                t = !0;
                break
            }
        return t
    }
    ,
    e.getRelativeURL = function() {
        var e = window.location;
        return e.pathname + e.search + e.hash
    }
    ,
    e.getQueryParams = function() {
        return window.location.search
    }
    ,
    window.SpiceCooikeLoaded ? console.log("cookie already exist") : (function(e) {
        var t;
        if ("function" == typeof define && define.amd && (define(e),
        t = !0),
        "object" == typeof exports && (module.exports = e(),
        t = !0),
        !t) {
            var o = window.SpiceGems_Cookies
              , r = window.SpiceGems_Cookies = e();
            r.noConflict = function() {
                return window.SpiceGems_Cookies = o,
                r
            }
        }
    }(function() {
        function e() {
            for (var e = 0, t = {}; e < arguments.length; e++) {
                var o = arguments[e];
                for (var r in o)
                    t[r] = o[r]
            }
            return t
        }
        function t(e) {
            return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
        }
        return function o(r) {
            function i() {}
            function n(t, o, n) {
                if ("undefined" != typeof document) {
                    "number" == typeof (n = e({
                        path: "/"
                    }, i.defaults, n)).expires && (n.expires = new Date(1 * new Date + 864e5 * n.expires)),
                    n.expires = n.expires ? n.expires.toUTCString() : "";
                    try {
                        var c = JSON.stringify(o);
                        /^[\{\[]/.test(c) && (o = c)
                    } catch (e) {}
                    o = r.write ? r.write(o, t) : encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                    t = encodeURIComponent(String(t)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
                    var a = "";
                    for (var s in n)
                        n[s] && (a += "; " + s,
                        !0 !== n[s] && (a += "=" + n[s].split(";")[0]));
                    return document.cookie = t + "=" + o + a
                }
            }
            function c(e, o) {
                if ("undefined" != typeof document) {
                    for (var i = {}, n = document.cookie ? document.cookie.split("; ") : [], c = 0; c < n.length; c++) {
                        var a = n[c].split("=")
                          , s = a.slice(1).join("=");
                        o || '"' !== s.charAt(0) || (s = s.slice(1, -1));
                        try {
                            var _ = t(a[0]);
                            if (s = (r.read || r)(s, _) || t(s),
                            o)
                                try {
                                    s = JSON.parse(s)
                                } catch (e) {}
                            if (i[_] = s,
                            e === _)
                                break
                        } catch (e) {}
                    }
                    return e ? i[e] : i
                }
            }
            return i.set = n,
            i.get = function(e) {
                return c(e, !1)
            }
            ,
            i.getJSON = function(e) {
                return c(e, !0)
            }
            ,
            i.remove = function(t, o) {
                n(t, "", e(o, {
                    expires: -1
                }))
            }
            ,
            i.defaults = {},
            i.withConverter = o,
            i
        }(function() {})
    }),
    window.SpiceCooikeLoaded = !0);
    var o, r, i, n = function(e) {
        var t = []
          , o = document.createElement("a");
        o.href = e;
        for (var r = o.search.substring(1).split("&"), i = 0; i < r.length; i++) {
            var n = r[i].split("=");
            t[n[0]] = n[1]
        }
        return t
    };
    (-1 == (i = document.referrer).indexOf("statictab") && -1 == i.indexOf("iframehost") && 1 != SpiceGems_Cookies.get("country_redirect_referrer_statictab") || (1 != SpiceGems_Cookies.get("country_redirect_referrer_statictab") && SpiceGems_Cookies.set("country_redirect_referrer_statictab", 1, {
        path: "/"
    }),
    0)) && (r = window.location.href,
    ("true" != n(r).no_rule && 1 != SpiceGems_Cookies.get("country_redirect_no_rule") || (1 != SpiceGems_Cookies("country_redirect_no_rule") && SpiceGems_Cookies.set("country_redirect_no_rule", 1, {
        path: "/"
    }),
    0)) && ((o = []).ip = "115.178.97.137",
    o.country = "IN",
    o.ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
    e.parseCountry(o)))
}
function inIframe() {
    try {
        return ("undefined" == typeof Shopify || 1 != Shopify.designMode) && window.location.href == window.top.location.href
    } catch (e) {
        return !0
    }
}
void 0 === window.spiceScriptLoaded && !0 === inIframe() && (SGRedirecto(),
window.spiceScriptLoaded = !0);
