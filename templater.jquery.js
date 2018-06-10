import templater from './templater.js';

$.fn.templater = function(opt) {
    this.each(function() {
        new Templater($.extend(opt, {
            holder: block,
            templates: {
                'panel': '<div class="panel"><customBtn></customBtn><div class="panel-heading">{{heading}}</div><div class="panel-body">{{html}}</div></div>',
                'customBtn': '<a href="#">Link</a>'
            }
        }))
    });
};