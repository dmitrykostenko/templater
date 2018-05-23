jQuery(function() {
    initTemplate();
})

function initTemplate() {
    $('#templates').templater({
        tagsTemplate: {
            'panel': '<div class="panel"><div class="panel-heading">{{heading}}</div><div class="panel-body">{{html}}</div></div>'
        }
    });
}

;(function($) {
    function Templater(opt) {
        this.options = opt;
        this.holder = $(opt.holder);
        this.run();
    }
    Templater.prototype = {
        run: function() {
            var self = this;
            $.each(this.options.tagsTemplate, function(tag, tagsTemplate) {
                function replacePanel(container) {
                    var tags = container.find('>' + tag);
                    tags.each(function(){
                        var tagToReplace = $(this);
                        console.log(tagToReplace)
                        replacePanel(tagToReplace)
                        tagToReplace.replaceWith(self.render(tagsTemplate, tagToReplace));
                    })
                }
                replacePanel(self.holder)
            })
        },
        render: function (template, element) {
            let result = template.replace(/{{([a-zA-Z]+)}}/g, function (attr, template) {
                if (template === 'html') {
                    return element.html();
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
