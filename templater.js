function Templater(opt) {
    this.options = opt;
    this.holder = opt.holder;
    this.run();
}

Templater.prototype = {
    run: function() {
        let self = this;

        for (let tag in this.options.tagsTemplate) {
            let tagsTemplate = this.options.tagsTemplate[tag];

            function replacePanel(container) {
                let tagToReplace = container.querySelector(tag);
                if (tagToReplace) {
                    let parent = tagToReplace.parentNode;
                    let tempDiv = document.createElement('div');
                    tempDiv.innerHTML = self.render(tagsTemplate, tagToReplace);
                    parent.replaceChild(tempDiv.childNodes[0],tagToReplace);
                    replacePanel(self.holder);
                }
            }
            replacePanel(this.holder);
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