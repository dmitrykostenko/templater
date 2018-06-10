(function (global) {
    'use strict';

   class Templater {
        constructor(opt) {
            this.holder = opt.holder;
            this.templates = opt.templates;

            this.run();
        }

        run() {
            for (let tag in this.templates) {
                const template = this.templates[tag];
                const elements = Array.from(this.holder.getElementsByTagName(tag));

                elements.forEach((element) => {
                    this.replace(element, template)
                })
            }

            this.isDocumentHasCustomTags();
        }

        isDocumentHasCustomTags() {
            for (let tag in this.templates) {
                const customTag = document.querySelectorAll(tag);
                if (customTag.length) {
                    this.run();
                }
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

    if (typeof define === 'function' && define.amd) {
        define(function () { return Templater; });
    } else if (typeof module === 'object' && module.exports) {
        exports = module.exports = Templater;
    } else {
        global.Templater = Templater;
    }
})(this);
