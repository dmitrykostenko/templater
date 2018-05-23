describe("Stage 6", function() {

    it("must create method `templater` for `jQuery.fn`", function() {
        (typeof jQuery.fn.templater).should.equals('function');
    });

    it("must replace element with tag `panel` to element with tag 'div' and class 'panel' for templates", function() {
        $('#templates').length.should.equals(1);
        $('#templates').templater({
            tagsTemplate: {
                'panel': '<div class="panel">' + '<div class="panel-heading">{{heading}}</div>' + '<div class="panel-body">{{html}}</div>' + '</div>'
            }
        });
        var replaced = $('.panel');
        replaced.length.should.equals(2, 'Element with `div` tag was not created. Amount of `div` elements in DOM');
        replaced.attr('class').should.equals('panel', 'Element with `div` tag has wrong class. It has class');
    });
    it("add element with tag 'div' , class 'panel-heading' and innerHtml 'Outer Panel' for templates", function() {
        $('#templates').length.should.equals(1);
        $('#templates').templater({
            tagsTemplate: {
                'panel': '<div class="panel">' + '<div class="panel-heading">{{heading}}</div>' + '<div class="panel-body">{{html}}</div>' + '</div>'
            }
        });
        var replaced = $('.panel-heading');
        replaced.length.should.equals(2, 'Element with `div` tag was not created. Amount of `div` elements in DOM');
        replaced.attr('class').should.equals('panel-heading', 'Element with `div` tag has wrong class. It has class');
        replaced.html().should.equals('Outer Panel', 'Element with `button` tag innerHTML');
    });

    it("add element with tag 'div' and class 'panel-body' for templates", function() {
        $('#templates').length.should.equals(1);
        $('#templates').templater({
            tagsTemplate: {
                'panel': '<div class="panel">' + '<div class="panel-heading">{{heading}}</div>' + '<div class="panel-body">{{html}}</div>' + '</div>'
            }
        });
        var replaced = $('.panel-body');
        replaced.length.should.equals(2, 'Element with `div` tag was not created. Amount of `div` elements in DOM');
        replaced.attr('class').should.equals('panel-body', 'Element with `div` tag has wrong class. It has class');
    });
});