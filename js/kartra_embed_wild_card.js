var gdpr_cookie_banner_settings = {"display":false,"gdpr_active":false,"gdpr_cookie_banner":"We use cookies to improve our service, track analytics, remember preferences, etc. By using our site, you consent to these cookies.","gdpr_cookie_banner_url":"","gdpr_privacy_banner_url":"","all_cookies_selected":"selected","esential_cookies_selected":"","accepted_cookies_checked":"","cookie_banner_html":"<!-- GDPR cookie BANNER -->\n<div class=\"gdpr_cookie_banner js_gdpr_cookie_banner\" style=\"display: none;\">\n    <button type=\"button\" class=\"gdpr-uncollapse-button js_show_gdpr_banner\">\n        Cookies\n    <\/button>\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-xs-12\">\n                <div class=\"d-grid grid-gdpr-banner grid-col-gap-60px\">\n                    <div>\n                        <div class=\"js_gdrp_cookie_banner_text gdpr-text\">\n                            We use cookies to improve our service, track analytics, remember preferences, etc. By using our site, you consent to these cookies.\n                        <\/div>\n                        <div class=\"gdpr_link_wrapper\">\n                            <a href=\"\" target=\"_blank\" class=\"js_gdpr_button\">Privacy policy<\/a>\n                            <span><\/span>\n                            <a href=\"\" target=\"_blank\" class=\"\">Cookie policy<\/a>\n                        <\/div>\n                    <\/div>\n                    <div class=\"gdpr_button_block\">\n                        <div class=\"gdpr_toggler\">\n                            <label class=\"toggler_label selected\">Accept all cookies<\/label>\n                            <div class=\"switcher\">\n                                <input type=\"checkbox\" name=\"gdpr_cookies\" id=\"gdpr_cookies\" class=\"cmn-toggle js_accepted_cookies\"  value=\"2\">\n                                <label for=\"gdpr_cookies\"><\/label>\n                            <\/div>\n                            <label class=\"toggler_label \">Only essential cookies<\/label>\n                        <\/div>\n                        <button class=\"gdpr_close js_gdpr_close\" type=\"button\" data-type=\"{asset_type}\" data-type-id=\"{asset_type_id}\" data-type-owner=\"{owner_hashed_id}\">SAVE<\/button>\n                    <\/div>\n                <\/div>\n            <\/div>\n        <\/div>\n    <\/div>\n<\/div>\n<!--\/\/ GDPR cookie BANNER -->  \n"};

jQuery(document).ready(function() {
    //load old variables
    var asset_type = jQuery('.js_gdpr_cookie_banner .js_gdpr_close').attr('data-type');
    var asset_type_id = jQuery('.js_gdpr_cookie_banner .js_gdpr_close').attr('data-type-id');
    var asset_owner = jQuery('.js_gdpr_cookie_banner .js_gdpr_close').attr('data-type-owner');
    jQuery('.js_gdpr_cookie_banner').replaceWith(gdpr_cookie_banner_settings.cookie_banner_html);
    //asign them back to button
    jQuery('.js_gdpr_cookie_banner .js_gdpr_close').attr('data-type', asset_type);
    jQuery('.js_gdpr_cookie_banner .js_gdpr_close').attr('data-type-id', asset_type_id);
    jQuery('.js_gdpr_cookie_banner .js_gdpr_close').attr('data-type-owner', asset_owner);

    if (gdpr_cookie_banner_settings.gdpr_active) {
        if (gdpr_cookie_banner_settings.display) {
            jQuery('.js_gdpr_cookie_banner').removeClass('collapsed');

            setTimeout(function(){
                jQuery('.js_gdpr_cookie_banner').slideDown(300, function(){
                    // jQuery('.js_gdpr_close').fadeIn(300);
                    jQuery('.js_gdpr_cookie_banner').css('overflow', '');
                });

                jQuery(document).trigger('kartra:gdprbanner:loaded');
            }, 1000);
        } else {
            jQuery('.js_gdpr_cookie_banner').addClass('collapsed');
            setTimeout(function() {
                jQuery('.js_gdpr_cookie_banner').slideDown(300, function () {
                    jQuery('.js_gdpr_cookie_banner').css('overflow', '');
                });

                jQuery(document).trigger('kartra:gdprbanner:loaded');
            }, 1000);
        }
    }

    jQuery('.js_show_gdpr_banner').on('click', function () {
        jQuery('.js_gdpr_cookie_banner').removeClass('collapsed');
    });

    jQuery(document).on('change', ".js_accepted_cookies", function() {
        if (jQuery(this).is(':checked')) {
            jQuery(this).parents(".switcher").siblings('label.toggler_label:first').removeClass('selected');
            jQuery(this).parents(".switcher").siblings('label.toggler_label:last').addClass('selected');
        } else {
            jQuery(this).parents(".switcher").siblings('label.toggler_label:last').removeClass('selected');
            jQuery(this).parents(".switcher").siblings('label.toggler_label:first').addClass('selected');
        }
    });

	jQuery('.js_gdpr_close').on('click', function() {
        jQuery('.js_gdpr_cookie_banner').addClass('collapsed');
        var asset_type = jQuery(this).attr('data-type'),
            asset_type_id = jQuery(this).attr('data-type-id'),
            asset_owner = jQuery(this).attr('data-type-owner'),
            cookie_accepted = jQuery('.js_gdpr_cookie_banner .js_accepted_cookies').is(':checked') ? 2 : 1;

        jQuery(document).trigger('kartra:gdprbanner:clicked');

        jQuery.ajax({
            type: 'POST',
            url: 'https://app.kartra.com/gdpr_settings/',
            data: {
                'asset_type': asset_type,
                'asset_type_id': asset_type_id,
                'asset_owner': asset_owner,
                'cookie_accepted': cookie_accepted,
            },
            xhrFields: {
                withCredentials: true
            }
        }).done(function(){
            if (!isKartraDomain(window.location.host)) {
                jQuery.ajax({
                    type: 'POST',
                    url: 'https://' + window.location.host + '/gdpr_settings/',
                    data: {
                        'asset_type': asset_type,
                        'asset_type_id': asset_type_id,
                        'asset_owner': asset_owner,
                        'cookie_accepted': cookie_accepted,
                    },
                    xhrFields: {
                        withCredentials: true
                    }
                })
            }
        });
    });       
});

function isKartraDomain(domain) {
    var domainRegex = new RegExp('(.+?\\.)?(kartra|kartradev)\\.com'),
        domainMatch = domainRegex.exec(domain);
    return null !== domainMatch;
}