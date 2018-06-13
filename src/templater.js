(function (VDOM) {
    'use strict';

   class Templater {
        constructor(opt, dom = document) {
            this.templates = opt.templates;

            this.run(dom);
        }

       run(dom) {
            let customTags = Object.keys(this.templates).join(',');
            for (let tag in this.templates) {
                const template = this.templates[tag];
                const elements = Array.from(dom.getElementsByTagName(tag));

                elements.forEach((element) => {
                    this.replace(element, template)
                })
            }
            this.isDocumentHasCustomTags(customTags, dom);
        }

        isDocumentHasCustomTags(customTags,dom) {
            if (dom.querySelectorAll(customTags).length) {
                this.run(dom);
            }
        }

        replace(element, template) {
            element.outerHTML = this.render(template, element);
        }

        render(template, element) {
            return template.replace(/{{([a-zA-Z]+)}}/g, (template, attr) => {
                if (attr === 'html') {
                    return element.innerHTML;
                } else {
                    return element.getAttribute(attr);
                }
            });
        }
    }


    if (typeof window !== 'undefined') {
        window.Templater = Templater;
    }
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = Templater;
    }
    if (typeof exports !== 'undefined') {
        exports.Templater = Templater;
    }
})();
