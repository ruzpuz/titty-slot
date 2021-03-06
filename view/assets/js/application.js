(function () {
    'use strict';

    window.slotMachine = {};
    var animationDuration = 600,
        slotAudio = new Audio('/assets/sounds/slot.mp3'),
        jackpotAudio = new Audio('/assets/sounds/jackpot.mp3');

    slotAudio.currentTime = 5;

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
    function animateWheel(images) {
        var animationActive = false,
            stopAnimation = false;

        function finishAnimation() {
            slotAudio.pause();
            slotAudio.currentTime = 5;
            removeClass(images[0], 'animate');
            removeClass(images[0], 'gone');

            removeClass(images[1], 'animate');
            removeClass(images[1], 'gone');

            removeClass(images[2], 'animate');
            removeClass(images[2], 'gone');

            animationActive = false;

        }
        function resetCircle(element) {
            removeClass(element, 'animate');
            removeClass(element, 'gone');
            setTimeout(animationCircle, 20, element);
        }
        function animationCircle(element) {
            if(stopAnimation) {
                setTimeout(finishAnimation, animationDuration);
                addClass(images[3], 'jackpot');
                return;
            }
            addClass(element, 'animate');
            addClass(element, 'gone');
            setTimeout(resetCircle, animationDuration, element);
        }

        if(animationActive) {
            return;
        }
        animationActive = true;
        stopAnimation = false;
        setTimeout(animationCircle, 0, images[0]);
        setTimeout(animationCircle, animationDuration / 3, images[1]);
        setTimeout(animationCircle, 2 * animationDuration / 3, images[2]);
        setTimeout(function () { stopAnimation = true; }, 6 * animationDuration);


    }
    function clearModal() {
        removeClass(document.querySelector('.modal'), 'jackpot');
    }
    function startModal() {
        addClass(document.querySelector('.modal'), 'jackpot');
    }
    function resetSlot() {
        removeClass(document.getElementById('jackpot-image1'), 'jackpot');
        removeClass(document.getElementById('jackpot-image2'), 'jackpot');
        removeClass(document.getElementById('jackpot-image3'), 'jackpot');

    }
    function jackpot() {

        var contentHolder = document.querySelector('.content-holder'),
            interval;

        function singleAnimation() {
            addClass(contentHolder, 'jackpot');
            setTimeout(removeClass, animationDuration, contentHolder, 'jackpot');
        }

        interval = setInterval(singleAnimation, 2 * animationDuration);
        setTimeout(function() { jackpotAudio.play(); }, 3 * animationDuration);
        setTimeout(function() {
            startModal();
            jackpotAudio.pause();
            removeClass(contentHolder, 'jackpot');
            resetSlot();
            clearInterval(interval);
        }, 6 * animationDuration);

    }
    function getBoobs() {
        var request = new XMLHttpRequest();
        request.open('GET', '/api/boobs', true);

        request.onreadystatechange = function () {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                document.getElementById('jackpot-image').src = '/assets/images/boobs/' + JSON.parse(request.responseText);
            }
        };
        request.send();
    }
    function animate() {

        var wheels = [
            [
                document.getElementById('image1'),
                document.getElementById('image2'),
                document.getElementById('image3'),
                document.getElementById('jackpot-image1')
            ],[
                document.getElementById('image4'),
                document.getElementById('image5'),
                document.getElementById('image6'),
                document.getElementById('jackpot-image2')
            ],[
                document.getElementById('image7'),
                document.getElementById('image8'),
                document.getElementById('image9'),
                document.getElementById('jackpot-image3')
            ]
        ];

        setTimeout(function() {
            getBoobs();
            slotAudio.play();
        });
        setTimeout(animateWheel, 0, wheels[0]);
        setTimeout(animateWheel, animationDuration / 3, wheels[1]);
        setTimeout(animateWheel, 2 * animationDuration / 3, wheels[2]);
        setTimeout(jackpot, 4 * animationDuration);
    }

    window.slotMachine.animate = animate;
    window.slotMachine.addClass = addClass;
    window.slotMachine.removeClass = removeClass;
    window.slotMachine.clearModal = clearModal;
    window.slotMachine.getBoobs = getBoobs;
}());