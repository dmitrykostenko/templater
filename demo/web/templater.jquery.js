$.fn.templater = function(opt) {
    this.each(function() {
        new Templater($.extend(opt, {
            holder: this
        }))
    });
};