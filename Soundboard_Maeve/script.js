document.addEventListener('DOMContentLoaded', function() {
    var boxes = document.querySelectorAll('.box');

    boxes.forEach(function(box) {
        box.addEventListener('click', function() {
            var soundFile = box.getAttribute('data-sound');
            var audio = new Audio(soundFile);
            audio.play();
        });
    });
});
