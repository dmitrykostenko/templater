(() => {
    'use strict';

   class Templater {
        constructor(opt, dom = document) {
            this.templates = opt.templates;

            this.run(dom);
        }

       run(dom) {
            for (let tag in this.templates) {
                const template = this.templates[tag];
                const elements = Array.from(dom.getElementsByTagName(tag));

                elements.forEach((element) => {
                    this.replace(element, template)
                })
            }
            if(this.isDocumentHasCustomTags(dom)) {
                this.run(dom);
            }
        }

        isDocumentHasCustomTags(dom) {
            let customTags = Object.keys(this.templates).join(',');
            if (dom.querySelectorAll(customTags).length) {
                return true;
            }
            return false;
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

    if (typeof module !== 'undefined') {
        module.exports = Templater;
    }
})();
