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
        console.log(11)
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