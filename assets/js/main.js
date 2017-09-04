/* Form link: https://docs.google.com/forms/d/e/1FAIpQLSekWRFSegSBZJw7FY-Pc8S6bTDq1xE4Mt1L0dfRPOB2NB7HiA/viewform?embedded=true */
function submitDataForm() {
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var email = $('#email').val();
    var question = $('#question').val();
    $.ajax({
        url: "https://docs.google.com/a/tamumake.com/forms/d/e/1FAIpQLSekWRFSegSBZJw7FY-Pc8S6bTDq1xE4Mt1L0dfRPOB2NB7HiA/formResponse",
        data: { "entry.2056851858": firstName, "entry.34306630": lastName, "entry.744878428": email, "entry.1414487174": question },
        type: "POST",
        dataType: "xml",
        statusCode: { 0: function() { alert("Thanks for your interest! We will be in touch."); } }
    });
}

function submittedForm() {
    alert("Thanks for your interest! We will be in touch.");
    window.location.replace("http://ieee-tamu.org");
}

function validateForm(formName) {
    var userData = "";

    userData += validateName(formName.firstName);
    userData += validateName(formName.lastName);
    //userData += validateEmail(formName.email);
}

function validateName(elementID) {
    var numericExpression = /^[0-9a-zA-Z]+$/;
    if (elementID.value.match(numericExpression)) {
        return elementID.value;
    } else {
        elementID.focus();
        alert("Invalid name input!")
        return false;
    }
}

/* TODO: validate/sanitize emails
function validateEmail(elementID) {
	var numericExpression = /^[w-.+]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]$/;
	if(elementID.value.match(numericExpression)) {
		return elementID.value;
	}else {
		elementID.focus();
		alert("Invalid email input!")
		return false;
}
*/

(function($) {

    "use strict";

    skel.breakpoints({
        xlarge: '(max-width: 1680px)',
        large: '(max-width: 1280px)',
        medium: '(max-width: 980px)',
        small: '(max-width: 736px)',
        xsmall: '(max-width: 480px)'
    });

    $(function() {

        var $window = $(window),
            $body = $('body'),
            $header = $('#header'),
            $banner = $('#banner');

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-loading');
            }, 100);
        });

        // Fix: Placeholder polyfill.
        $('form').placeholder();

        // Prioritize "important" elements on medium.
        skel.on('+medium -medium', function() {
            $.prioritize(
                '.important\\28 medium\\29',
                skel.breakpoint('medium').active
            );
        });

        // Header.
        if (skel.vars.IEVersion < 9)
            $header.removeClass('alt');

        if ($banner.length > 0 &&
            $header.hasClass('alt')) {

            $window.on('resize', function() { $window.trigger('scroll'); });

            $banner.scrollex({
                bottom: $header.outerHeight(),
                terminate: function() { $header.removeClass('alt'); },
                enter: function() { $header.addClass('alt'); },
                leave: function() { $header.removeClass('alt'); }
            });

        }

        // Menu.
        var $menu = $('#menu');

        $menu._locked = false;

        $menu._lock = function() {

            if ($menu._locked)
                return false;

            $menu._locked = true;

            window.setTimeout(function() {
                $menu._locked = false;
            }, 350);

            return true;

        };

        $menu._show = function() {

            if ($menu._lock())
                $body.addClass('is-menu-visible');

        };

        $menu._hide = function() {

            if ($menu._lock())
                $body.removeClass('is-menu-visible');

        };

        $menu._toggle = function() {

            if ($menu._lock())
                $body.toggleClass('is-menu-visible');

        };

        $menu
            .appendTo($body)
            .on('click', function(event) {

                event.stopPropagation();

                // Hide.
                $menu._hide();

            })
            .find('.inner')
            .on('click', '.close', function(event) {

                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();

                // Hide.
                $menu._hide();

            })
            .on('click', function(event) {
                event.stopPropagation();
            })
            .on('click', 'a', function(event) {

                var href = $(this).attr('href');

                event.preventDefault();
                event.stopPropagation();

                // Hide.
                $menu._hide();

                // Redirect.
                window.setTimeout(function() {
                    window.location.href = href;
                }, 350);

            });

        $body
            .on('click', 'a[href="#menu"]', function(event) {

                event.stopPropagation();
                event.preventDefault();

                // Toggle.
                $menu._toggle();

            })
            .on('keydown', function(event) {

                // Hide on escape.
                if (event.keyCode == 27)
                    $menu._hide();

            });

    });

})(jQuery);