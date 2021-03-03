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

/*
Copyright (c) 2021 by Randy (https://codepen.io/specificity/pen/MEoOwv)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
