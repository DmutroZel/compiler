$('#font').on('change', function () {
    $('#text').css('font-family', $(this).val());
});


$('#boldBtn').click(function () {
    if ($('#text').css('font-weight') === '700' || $('#text').css('font-weight') === 'bold') {
        $('#text').css('font-weight', 'normal');
        $(this).css('background-color', 'rgb(13, 156, 13)');
    } else {
        $('#text').css('font-weight', 'bold');
        $(this).css('background-color', 'red');
    }
});

$('#italicBtn').click(function () {
    if ($('#text').css('font-style') === 'italic') {
        $('#text').css('font-style', 'normal');
        $(this).css('background-color', 'rgb(13, 156, 13)');
    } else {
        $('#text').css('font-style', 'italic');
        $(this).css('background-color', 'red');
    }
});

$('#underlineBtn').click(function () {
    const textDecoration = $('#text').css('text-decoration-line'); 
    if (textDecoration === 'underline') {
        $('#text').css('text-decoration', 'none');
        $(this).css('background-color', 'rgb(13, 156, 13)');
    } else {
        $('#text').css('text-decoration', 'underline');
        $(this).css('background-color', 'red');
    }
});

$('#fontSizeBtn').change(function () {
    const fontSize = $(this).val();
    $('#text').css('font-size', fontSize + 'px');
});

$('#colorPicker').change(function () {
    const color = $(this).val();
    $('#text').css('color', color);
});

let musicPlaying = false;
let audio = new Audio('audio/den.mp3');

$('#musicBtn').click(function() {
    if (musicPlaying) {
        audio.pause();
        audio.currentTime = 0;
        musicPlaying = false;
    } else {
        audio.play();
        musicPlaying = true;
    }
});


function saveToLocalStorage() {
    localStorage.setItem('htmlContent', $('#htmlArea').val());
    localStorage.setItem('cssContent', $('#cssArea').val());
    localStorage.setItem('jsContent', $('#jsArea').val());
}

function loadFromLocalStorage() {
    const htmlContent = localStorage.getItem('htmlContent');
    const cssContent = localStorage.getItem('cssContent');
    const jsContent = localStorage.getItem('jsContent');

    if (htmlContent) $('#htmlArea').val(htmlContent).trigger('keyup');
    if (cssContent) $('#cssArea').val(cssContent).trigger('keyup');
    if (jsContent) $('#jsArea').val(jsContent).trigger('keyup');
}

$('#htmlArea').on('keyup', function () {
    $('#text').html($(this).val());
    saveToLocalStorage();
});

$('#cssArea').on('keyup', function () {
    const cssContent = $(this).val();
    let styleTag = $('#dynamicStyles');
    if (styleTag.length === 0) {
        styleTag = $('<style id="dynamicStyles"></style>');
        $('head').append(styleTag);
    }
    styleTag.html(cssContent);
    saveToLocalStorage();
});

$('#jsArea').on('keyup', function () {
    const jsContent = $(this).val();
    try {
        eval(jsContent); 
    } catch (error) {
        console.error('Помилка у виконанні JavaScript:', error);
    }
    saveToLocalStorage();
});

$(document).ready(function () {
    loadFromLocalStorage();
});
