function toggleMenu() {
    var toggleButton = document.querySelector('.toggle-menu');
    var menuLink = document.querySelectorAll('.menu a');

    toggleButton.addEventListener('click', function () {
        this.classList.toggle('open');
    });

    menuLink.forEach(function (link) {
        link.addEventListener('click', function () {
            toggleButton.classList.remove('open');
        });
    });
}
