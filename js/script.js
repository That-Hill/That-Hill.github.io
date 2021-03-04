var ThemeRelationship = function ($controls, $target, options) {

	options = options || {};

	// If options is a string (as it is when taken from
	// an HTML attribute), parse it into an object
 	typeof options == "string" && (options = $.parseJSON(options));

	this.settings = $.extend(
		{
			//defaultTheme : "themeGoesHere"
		},
		options
	);

	var root = this;
	this.controls = $controls;
	this.target = $target;

	this.init();

}



ThemeRelationship.prototype.init = function () {

	var root = this;
	var $controlAnchors = this.controls.find("a[data-target-theme]");


	// Initial state --

	// Default to first theme in controls list
	var initialTargetTheme = $controlAnchors.eq(0).data("target-theme");

	// Higher priority is default set in JS
	if (this.settings.defaultTheme && this.isAvailableTheme(this.settings.defaultTheme)) initialTargetTheme = this.settings.defaultTheme;

	// Higher priority is default set in HTML
	if (this.controls.find("a[data-theme-default]").length) initialTargetTheme = this.controls.find("a[data-theme-default]").data("target-theme");

	// Higher priority is user pref (setting in cookie)
	if (Cookies.get("userTheme") && this.isAvailableTheme(Cookies.get("userTheme"))) initialTargetTheme = Cookies.get("userTheme");

	// Highest priority is setting in URL
	if (this.getParameterByName("theme") && this.isAvailableTheme(this.getParameterByName("theme"))) initialTargetTheme = this.getParameterByName("theme");

	console.log(this.getParameterByName("theme"));

	this.changeActiveTheme(initialTargetTheme, false);


	// Listeners --

	$controlAnchors.length && $controlAnchors.on(
		"click",
		function (e) {
			e.preventDefault();
			var targetTheme = $(this).data("target-theme");
			root.changeActiveTheme(targetTheme, true);
		}
	);

}



ThemeRelationship.prototype.changeActiveTheme = function (targetTheme, setPref) {
	this.target.data("active-theme", targetTheme).attr("data-active-theme", targetTheme);
	this.changeActiveControl(targetTheme);
	setPref && Cookies.set(
		"userTheme",
		targetTheme,
		{
			path: ''
		}
	);
}



ThemeRelationship.prototype.changeActiveControl = function (targetTheme) {
	this.getActiveControl().removeClass("active");
	this.getClosestControlLIByTheme(targetTheme).addClass("active");
}



ThemeRelationship.prototype.getActiveControl = function () {
	return this.controls.find("a[data-target-theme]").closest("li").filter(".active").eq(0);
}



ThemeRelationship.prototype.getClosestControlLIByTheme = function (targetTheme) {
	return this.controls.find("a[data-target-theme=" + targetTheme +"]").eq(0).closest("li");
}



ThemeRelationship.prototype.isAvailableTheme = function (potentialTheme) {
	return this.controls.find("a[data-target-theme=" + potentialTheme + "]").length;
}



// Gets a URL query string parameter by key
ThemeRelationship.prototype.getParameterByName = function (name) {
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}






// DEMO

var eventsThemeRel = new ThemeRelationship(
	$("main > header .theme-switch"),
	$("main")
);



function newbutton() {
    var div = document.querySelector('.m');
    var input = document.querySelector('#get_url');
    // ... make button with the given url

    var dom = '<a href="' + input.value + '" target="_blank">';
    dom += '<input type="button" class="menu" value="new button"></a>';

    div.innerHTML += dom;
}

/*
Add Buttons
Source: https://stackoverflow.com/questions/47626005/allow-user-to-add-buttons-to-html-page
*/



(function($) {
    $.fn.quicklinks = function(action, arg2, arg3) {
        var $container = $(this);

        var defaults = {
            buildLink: buildLink,
            linkClasses: 'btn btn-primary',
            editCallback: null,
            saveCallback: null
        };

        var settings = $container.data('quicklinks-options');
        if (settings == undefined) {
            $container.data('quicklinks-options', defaults);
        }

        switch (action) {
            case "init":
                settings = $.extend({}, defaults, arg2);
                $container.data('quicklinks-options', settings);
            break;

            case "showsettings":
                var settings = $container.data('quicklinks-options');
                debug(settings);
            break;

            case "editmodeon":
                debug("edit mode on");
                enableEditing($container);
            break;

            case "editmodeoff":
                debug("edit mode off");
                disableEditing($container);
                disableDeleting($container);
            break;

            case "deletemodeon":
                debug("delete mode on");
                disableEditing($container);
                enableDeleting($container);
            break;

            case "deletemodeoff":
                debug("delete mode off");
                disableDeleting($container);
                enableEditing($container);
            break;

            case "deletelink":
                var $element = $(arg2);

                var links = getLinks($container);
                if (links.length == 1) {
                    alert("You cannot delete the last quick link.");
                    break;
                }

                if (confirm('Are you sure you wish to delete this quicklink "' + $element.text() + '"?')) {
                    $element.remove();
                    saveLinks($container);
                }
            break;

            case "changelink":
                var settings = getSettings($container);
                var $element = $(arg2);
                var linkAttrs = {};
                linkAttrs.text = prompt("Button title", $element.text());

                while (linkAttrs.title == "") {
                    alert("Title cannot be blank");
                    linkAttrs.text = prompt("Button title", $element.text());
                }

                //cancel button
                if (linkAttrs.text == null) break;

                linkAttrs.href = prompt("Link", $element.attr("href"));
                while (linkAttrs.href == "") {
                    alert(
                        "Link cannot be blank and must start with http:// or https://"
                    );
                    linkAttrs.href = prompt("Link", $element.attr("href"));
                }

                var parent_this = this;

                //Prepare continue function
                var continue_rendering = function(rtn) {
                    linkAttrs = $.extend(linkAttrs, rtn);

                    var updatedLink = settings.buildLink.call(parent_this, $container, linkAttrs);
                    $element.replaceWith(updatedLink)

                    saveLinks($container);
                };

                //cancel button
                if (linkAttrs.href == null) break;

                if (settings.editCallback != null) {
                    settings.editCallback.call(this, $container, continue_rendering);
                }
                else {
                    continue_rendering({});
                }


            break;

            case "addlink":
                var settings = getSettings($container);
                var newLink = getLinks($container).first().clone();
                var linkAttrs = {};
                linkAttrs.text = prompt("Button title");

                while (linkAttrs.text == "") {
                    alert("Title cannot be blank");
                    linkAttrs.text = prompt("Button title");
                }

                //cancel button
                if (linkAttrs.text == null) break;

                linkAttrs.href = prompt("Link");
                while (linkAttrs.href == "") {
                    alert(
                        "Link cannot be blank and must start with http:// or https://"
                    );
                    linkAttrs.href = prompt("Link");
                }

                //cancel button
                if (linkAttrs.href == null) break;

                var parent_this = this;

                var continue_rendering = function(rtn) {

                    linkAttrs = $.extend(linkAttrs, rtn);

                    var newLink = settings.buildLink.call(parent_this, $container, linkAttrs);
                    getLinks($container).last().after(newLink);

                    saveLinks($container);
                    disableEditing($container);
                    enableEditing($container);
                }

                if (settings.editCallback != null) {
                    settings.editCallback.call(this, $container, continue_rendering);
                }
                else {
                    continue_rendering({});
                }


            break;

            case "loadlinks":
                loadLinks($container, arg2);
            break;
        }

        return $(this);
    };

    function getLinks($container) {
        return $container.find('a[data-quicklink="true"]');
    }

    function enableEditing($container) {
        $container.addClass("edit-mode");

        getLinks($container).each(function(index, el) {
            $(el).on("click.quicklink.edit", function(event) {
                event.preventDefault();
                $container.quicklinks("changelink", el);
            });
        });
    }

    function disableEditing($container) {
        $container.removeClass("edit-mode");
        getLinks($container).off("click.quicklink");
    }

    function enableDeleting($container) {
        $container.addClass("delete-mode");
        $container.addClass("edit-mode");

        getLinks($container).each(function(index, el) {
            $(el).on("click.quicklink.delete", function(event) {
                event.preventDefault();
                $container.quicklinks("deletelink", el);
            });
        });
    }

    function disableDeleting($container) {
        $container.removeClass("delete-mode");
        getLinks($container).off("click.quicklink.delete");
    }

    function saveLinks($container) {
        //convert link data to json
        debug('save links');
        var links = getLinks($container);
        var settings = getSettings($container);
        var data = [];

        var linkAttrs;
        links.each(function(index, el) {
            linkAttrs = {
                href: $(el).attr("href"),
                text: $(el).text()
            };

            if (settings.saveCallback != null) {
                //retrieve additional attributes from the element via custom function
                obj = settings.saveCallback.call(this, el, $container);
                linkAttrs = $.extend({}, linkAttrs, obj);
            }
            data.push(linkAttrs);
        });

        //debug(JSON.stringify(data));

//        Cookies.set("acer-intranet-quicklinks", data.serializeArray());
    }

    /**
     * Takes optional second argument as a selector for the element to inject links into
     */
    function loadLinks($container, arg2) {
        var settings = getSettings($container);

        var wrapper = $(arg2).first();
        if (!wrapper.length) wrapper = $container;
        $wrapper = $(wrapper);

        //call backend PHP file that uses existing session if available
        //to retrieve current quicklinks.
        //if no current session get the quicklinks row ID from the cookie

        var data = getJSON();

        json = $.parseJSON(data);

        var links = [];

        for(i=0; i < json.length; i++) {
            links.push(settings.buildLink.call(this, $container, json[i]));
        }

        //clear out existing links
        getLinks($wrapper).each(function(index, el) { $(el).remove(); })

        for(i=links.length-1; i >= 0; i--) {
            $wrapper.prepend(links[i]);
        }
    }

    function getJSON() {
        return '[{"href":"http://www.google.com","text":"link 1"},{"href":"http://www.yahoo.com","text":"link 2"},{"href":"http://www.acer.org","text":"Eric"}]';
    }

    /**
     * Build basic anchor element.
     * @param $container jQuery object of quicklink container
     * @param obj element attributes
     * @return jQuery element object
     */
    function buildLink($container, obj) {
        var settings = getSettings($container)
        var link = $('<a/>').attr('href',obj.href).text(obj.text).attr('data-quicklink','true');
        link.attr('class',)
        return link;
    }

    function getSettings($container) {
        return $container.data('quicklinks-options');
    }

    /**
     * Console.log polyfill
     */
    function debug(arg) {
        if (typeof console.log == "function") {
            console.log(arg);
        }
    }
})(jQuery);

function buildIntranetQuicklink($container, obj) {

    var linkdiv = $('<div />').attr({
        class: 'col-lg-4 col-md-6 col-sm-12 col-xs-6'
    });

    var anc = $('<a />').attr('href', obj.href).text(obj.text);

    if (obj.img_src != undefined) {
        var img = $('<img />').attr('src', obj.img_src).attr('alt', obj.text);
        $(anc).prepend(img);
    }

    if (obj.fa != undefined ) {
        var fa = $('<span />').attr('class', 'fa ' + obj.fa);
        $(anc).prepend(fa);
    }

    $(linkdiv).append(anc);

    return linkdiv;
}

function selectIcon ($container, continue_rendering) {
    var rtn = {fa:'fa-check'}
    //return rtn;

    var icons = ['fa-check', 'fa-pencil', 'fa-bank'];

        var modal = $('<div class="modal fade in" tabindex="-1" role="dialog" id="select-icon-modal"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">Select icon</h4></div><div class="modal-body"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button></div></div></div></div>');


    var icon_html = [];
    var icon_temp;
    for(i=0; i < icons.length; i++) {
        icon_temp = $('<span class="icon-option fa ' + icons[i] + '" data-icon="' + icons[i] + '"/>');
        icon_temp.click(function(event) {
           icon = $(event.target).data('icon');
           $('#select-icon-modal').modal('hide');
           continue_rendering({fa: icon});
        });

        icon_html.push(icon_temp);
    }


    for (i=0; i < icon_html.length; i++) {
        $(modal).find('.modal-body').first().append(icon_html[i]);
    }

    $('body').first().append(modal);
    $('#select-icon-modal').on('hidden.bs.modal', function (e) {
        $('#select-icon-modal').remove();
    });
    $('#select-icon-modal').modal('show');

    //continue_rendering(rtn);
}

function onSaveCallback(el, $container) {
    console.log('onSaveCallback');
    $el = $(el);
    console.log(el);
    var fa = $el.find('span').first();
            console.log(fa);
    if (fa.length) {
        var classes = $(fa).attr('class');

    }

    return {};
}

$('#box').quicklinks('init', {
    buildLink: buildIntranetQuicklink,
    editCallback: selectIcon,
    saveCallback: onSaveCallback
});

/*
Copyright (c) 2021 by Banana (https://codepen.io/gobananas/pen/Ljdgbj)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*
Copyright (c) 2021 by Randy (https://codepen.io/specificity/pen/MEoOwv)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
