function Templater(opt) {
    this.options = opt;
    this.run();
}

Templater.prototype = {
    run: function () {

        let object = this.options.tagsTemplate;

        for (let tagName in object) {
            let customTags = Array.from(document.getElementsByTagName(tagName));
            console.log(customTags);
            customTags.map((item) => {
                item.outerHTML = this.render(object[tagName], item);
            });
        }

        //let object = this.options.tagsTemplate;

        // Object.keys(object).map(function(tag, tagsTemplate) {
        //     function replacePanel() {
        //         let tags = document.getElementsByTagName(tag);
        //         console.log(tags)
        //         for (var i = 0; i < tags.length; i++) {
        //             let tagToReplace = tags[i];
        //             replacePanel(tagToReplace);
        //             tagToReplace.replaceWith(self.render(tagsTemplate, tagToReplace));
        //         }
        //     }
        //     replacePanel(self.holder)
        // });

        // $.each(this.options.tagsTemplate, function(tag, tagsTemplate) {
        //     function replacePanel(container) {
        //         let tags = container.find('>' + tag);
        //         tags.each(function(){
        //             let tagToReplace = $(this);
        //             replacePanel(tagToReplace);
        //             tagToReplace.replaceWith(self.render(tagsTemplate, tagToReplace));
        //         })
        //     }
        //     replacePanel(self.holder)
        // })
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