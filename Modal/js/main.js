$(function () {
    let modal = new Modal('sampleModal');
    let $name = $('#name');
    let $age = $('#age');

    function escapeHTML(str) {
        str = str.replace(/&/g, '&amp;');
        str = str.replace(/</g, '&lt;');
        str = str.replace(/>/g, '&gt;');
        str = str.replace(/"/g, '&quot;');
        str = str.replace(/'/g, '&#39;');
        return str;
    }

    function doSomethingAsync(callback) {
        setTimeout(() => {
            callback();
        }, 500)
    }

    $('#sampleModalOpenButton').on('click', () => {
        modal.open();
    });

    $('#sampleModalNext').on('click', () => {
        modal.nextScene();
    });

    $('#sampleModalAdd').on('click', () => {
        modal.showLoading();

        doSomethingAsync(() => {
            $('#userList').append($('<li class="userList__item">' + escapeHTML($name.prop('value')) + '（' + escapeHTML($age.prop('value')) + '）' + '</li>'));
            $name.prop('value', '');
            $age.prop('value', '');
            modal.close();
        });
    });
});