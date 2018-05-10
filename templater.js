var Templater = {
    tags: {},

    addTag: function (tag, template) {
        this.tags[tag] = template;
    },

    run: function () {
        for (let tagName in this.tags) {
            let customTags = Array.from(document.getElementsByTagName(tagName));
            customTags.forEach( (item) => {
                item.outerHTML = this.render(this.tags[tagName], item);
        });
        }
    },

    render: function (template, element) {
        let result = template.replace(/{{([a-zA-Z]+)}}/g, function (attr, template) {
            if (template === 'html') {
                return element.innerHTML;
            } else {
                return element.getAttribute(template);
            }
        });
        return result;
    }
};