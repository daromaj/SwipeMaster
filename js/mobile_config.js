$(document).on("mobileinit", function () {
    $.mobile.loader.prototype.options.disabled = true;
    $.mobile.loader.prototype.options.text = "";
    $.mobile.loadingMessage = false;
    $.mobile.ajaxEnabled = false;
});
