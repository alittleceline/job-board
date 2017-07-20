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
