var Templater = {

    tags: {},

    addTag: function (tag, template) {
        this.tags[tag] = template;
    },

    run: function () {
        for (var tagName in this.tags) {
            var customTags = document.getElementsByTagName(tagName);
            var length = customTags.length;
            for (var i = 0; i < length; i++) {
                var customTag = customTags[0];
                customTag.outerHTML = this.tags[tagName];
            }
        }
    },

}