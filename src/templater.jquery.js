$.fn.templater = function(opt) {
    new Templater($.extend(opt, {
        holder: this
    }))
};