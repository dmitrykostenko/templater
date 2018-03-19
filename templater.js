var Templater = {

    run: function () {
        var elements = document.getElementsByTagName('bootstrap_button');
        var length =  elements.length;

        for(var i=0; i<length; i++) {

            var newTag = document.createElement('button');

            newTag.className = "btn btn-default";
            newTag.setAttribute('type', 'Submit');
            newTag.innerHTML = 'Some Text';

            elements[0].parentNode.replaceChild(newTag, elements[0]);
        }
    }
}