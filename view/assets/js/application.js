(function () {
    window.slotMachine = {};
    var image1 = document.getElementById('image1'),
        image2 = document.getElementById('image2'),
        image3 = document.getElementById('image3');

    function hasClass(el, className) {
        if (el.classList) {
            return el.classList.contains(className);
        }
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
    function addClass(el, className) {
        if (el.classList) {
            el.classList.add(className);
        } else if (!hasClass(el, className)) {
            el.className += " " + className;
        }
    }
    function removeClass(el, className) {
        if (el.classList) {
            el.classList.remove(className);
        } else if (hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    }
    function animate() {
        function animationCircle(element) {
            function step1() {
                addClass(element, 'animate');
                addClass(element, 'positioned');
                setTimeout(step2, 105)
            }
            function step2() {
                addClass(element, 'removed');

                setTimeout(step3, 105)
            }
            function step3() {
                removeClass(element, 'animate');
                removeClass(element, 'removed');
                removeClass(element, 'positioned');

                setTimeout(step1, 105)
            }
            step1();
        }

        animationCircle(image1)
    }

    window.slotMachine.animate = animate;
    window.slotMachine.addClass = addClass;
    window.slotMachine.removeClass = removeClass;
}());