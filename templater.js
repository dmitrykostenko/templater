;(function($) {
    function Templater(opt) {
        this.options = opt;
        this.holder = $(opt.holder);
        this.run();
    }
    Templater.prototype = {
        run: function() {
            var self = this;

            $.each(this.options.tags, function(tagName) {
                self.holder.find(tagName).each(function() {
                    var element = $(this);
                    element.replaceWith(self.render(self.options.tags[tagName], element))
                });
            })
        },
        render: function (template, element) {
            let result = template.replace(/{{([a-zA-Z]+)}}/g, function (attr, template) {
                if (template === 'html') {
                    //return element.html();
                    return element.innerHTML = 'Some Text';
                } else {
                    return element.attr(template);
                }
            });
            return result;
        }
    }
    $.fn.templater = function(opt) {
        this.each(function() {
            new Templater($.extend(opt, {
                holder: this
            }))
        });
    };
})(jQuery);