/* Polyfill for NodeList.forEach: not supporter by IEs&Edge */
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, argument) {
        argument = argument || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(argument, this[i], i, this);
        }
    };
}

function checkTextfieldValue() {
    // To make sure the label isn't on top of text query

    var textfields = document.querySelectorAll('[data-textfield]');
    // For each texfield, on focus event, apply .active
    textfields.forEach( function (field) {
        field.addEventListener('focus', function () {
            this.classList.add('active');
        });
        // If texfield is emtpy, on blur event, remove .active
        field.addEventListener('blur', function () {
            if(this.value !== '') {
                return;
            } else {
                this.classList.remove('active');
            }
        });
    });
}

var placeSearch, autocomplete;

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('job-location')),
        {types: ['geocode']});

}

document.addEventListener("DOMContentLoaded", function(event) {
    checkTextfieldValue();
    toggleMenu();
});

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
