var format = [];

const svg = document.querySelector('#svg-preview');
const modalWindow = document.querySelector('#modalBookParametr');
const close = document.querySelector('#close');
const lists = document.querySelector('#count-list');
const alert = document.querySelector('#alert');
const btn = document.querySelector('#button');
btn.setAttribute('style', 'display:none');

const infoText = document.querySelectorAll('.info-t');



close.onclick = function() {
    if (lists.value == 0) {
        alert.setAttribute('value', 'укажите количество полос !');
        alert.setAttribute('style', 'display:block');
        return;
    } else if ((lists.value % 2) != 0) {
        alert.setAttribute('value', 'Полос должно быть кратно 2 !');
        alert.setAttribute('style', 'display:block');
    } else {
        svg.setAttribute('style', 'display:block');
        alert.setAttribute('style', 'display:none');
        modalWindow.setAttribute('style', 'display:none');
    }

}


window.onload = createDraw();

function createDraw() {
    let url = window.location.href;
    let urlArr = url.replace('http://86.62.123.179/calc/svgcover.html', '');
    urlArr = urlArr.replace('?', '');
    format = decodeURIComponent(urlArr);
    format = format.split(/\*/);
    let formatPre = [];
    formatPre[0] = format[0] * 3;
    formatPre[1] = Math.round(format[1] * 3);
    console.log(formatPre[1]);
    formatPre[2] = format[2] * 3;
    if (format.length != 3) {
        modalDialog();
    } else {
        draw(format);
        drawPreview(formatPre);
    }
}

function modalDialog() {
    const paperthinknes = [0.1, 0.135, 0.15, 0.19, 0.22, 0.09, 0.11, 0.13, 0.14, 0.19,
        0.126, 0.166, 0.2, 0.123, 0.131, 0.153, 0.173, 0.202, 0.333, 0.123, 0.202
    ]

    infoText[0].setAttribute('style', 'display:none');
    infoText[1].setAttribute('style', 'display:none');
    svg.setAttribute('style', 'display:none');
    modalWindow.setAttribute('style', 'display:block');
    const close = document.querySelector('#close');
    const select = document.querySelector('#formatbook');
    const bookWidth = document.querySelector('#book-width');
    const xb = document.querySelector('#xb');
    const bookHeight = document.querySelector('#book-height');
    const blockPaper = document.querySelector('#paper_block');
    blockPaper.setAttribute('style', 'display:block');


    modalWindow.onchange = function() {


        if ((lists.value % 2) != 0) {
            // todo alert
        }
        format = [0, 0, 0];
        formatPre = [0, 0, 0];
        if (select.value != 1) {
            bookWidth.setAttribute('style', 'display:none');
            xb.setAttribute('style', 'display:none');
            bookHeight.setAttribute('style', 'display:none');
        } else {
            bookWidth.setAttribute('style', 'display:block');
            xb.setAttribute('style', 'display:block');
            bookHeight.setAttribute('style', 'display:block');
        }
        switch (select.value) {
            case "2":
                bookWidth.value = 105;
                bookHeight.value = 148;
                break;
            case "3":
                bookWidth.value = 146;
                bookHeight.value = 206;
                break;
            case "4":
                bookWidth.value = 208;
                bookHeight.value = 293;
                break;
        }
        format[0] = bookWidth.value;
        format[1] = Math.round(paperthinknes[blockPaper.value] * lists.value / 2);
        format[2] = bookHeight.value;
        formatPre[0] = bookWidth.value * 3;
        formatPre[1] = Math.round(paperthinknes[blockPaper.value] * lists.value / 2 * 3);
        formatPre[2] = bookHeight.value * 3;

        draw(format);
        drawPreview(formatPre);

    }

}



function draw(format) {
    format[1] = Math.round(format[1]);


    if (format[1].length > 5) {
        format[1] = Math.round(format[1]);
    }
    if (format[1] == 0) {
        return;
    }

    let artboardWidth;
    if (format[0] > 220) {
        artboardWidth = 1000;
    } else {
        artboardWidth = 450;
    }


    let artboardCenter = 210;
    if (format[2] < 215) {
        artboardCenter = 160;
    }

    let bleedWidth = (+format[0] * 2) + +format[1] + 10;
    let bleedHeight = +format[2] + 10;
    let bleedPosX = (artboardWidth - bleedWidth) / 2;
    let bleedPosY = artboardCenter - (bleedHeight / 2);

    let bleed = document.querySelector('#bleed');
    bleed.setAttribute('x', bleedPosX + 'mm');
    bleed.setAttribute('y', bleedPosY + 'mm');
    bleed.setAttribute('width', bleedWidth + 'mm');
    bleed.setAttribute('height', bleedHeight + 'mm');

    let artboard = document.querySelector('#artboard');


    if (artboardWidth > 450) {
        artboard.setAttribute('width', artboardWidth + 'mm');
    } else {
        artboard.setAttribute('width', '450mm');
    }

    let widthCenter = +artboardWidth / 2



    let leftCover = document.querySelector('#left-c');
    let leftCoverPosX = widthCenter - +format[0] - (format[1] / 2);
    let leftCoverPosY = artboardCenter - (+format[2] / 2);


    leftCover.setAttribute('x', leftCoverPosX + 'mm');
    leftCover.setAttribute('y', leftCoverPosY + 'mm');
    leftCover.setAttribute('width', format[0] + 'mm');
    leftCover.setAttribute('height', format[2] + 'mm');
    leftCover.setAttribute('fill', '#cccacc');
    leftCover.setAttribute('stroke', 'black');
    leftCover.setAttribute('stroke-width', '2');


    let rightCover = document.querySelector('#right-c');
    let rightCoverPosX = widthCenter + (format[1] / 2);
    let rightCoverPosY = leftCoverPosY;

    rightCover.setAttribute('x', rightCoverPosX + 'mm');
    rightCover.setAttribute('y', rightCoverPosY + 'mm');
    rightCover.setAttribute('width', format[0] + 'mm');
    rightCover.setAttribute('height', format[2] + 'mm');
    rightCover.setAttribute('fill', '#cccacc');
    rightCover.setAttribute('stroke', 'black');
    rightCover.setAttribute('stroke-width', '2');




    let koreshokText = document.querySelector('#koreshok-text');
    let koreshok = document.querySelector('#koreshok');
    let koreshokPosX = widthCenter - (+format[1] / 2);
    koreshok.setAttribute('x', koreshokPosX + 'mm');
    koreshok.setAttribute('y', leftCoverPosY + 'mm');
    koreshok.setAttribute('width', format[1] + 'mm');
    koreshok.setAttribute('height', format[2] + 'mm');
    koreshokText.innerHTML = 'Корешок - ' + format[1] + ' мм.';



    let leftLineBig = document.querySelector('#left-line-big');
    let leftLineBigX = widthCenter - (+format[1] / 2) - 7;
    let leftLineBigY2 = rightCoverPosY + +format[2];

    leftLineBig.setAttribute('x1', leftLineBigX + 'mm');
    leftLineBig.setAttribute('x2', leftLineBigX + 'mm');
    leftLineBig.setAttribute('y1', rightCoverPosY + 'mm');
    leftLineBig.setAttribute('y2', leftLineBigY2 + 'mm');



    let rightLineBig = document.querySelector('#right-line-big');
    let rightLineBigX = widthCenter + (+format[1] / 2) + 7;
    let rightLineBigY2 = rightCoverPosY + +format[2];

    rightLineBig.setAttribute('x1', rightLineBigX + 'mm');
    rightLineBig.setAttribute('x2', rightLineBigX + 'mm');
    rightLineBig.setAttribute('y1', rightCoverPosY + 'mm');
    rightLineBig.setAttribute('y2', rightLineBigY2 + 'mm');



    let leftCenterLine = document.querySelector('#center-line-left');
    let leftLineX = leftCoverPosX + (format[0] / 2);
    let leftLineY2 = +bleedPosY + +format[2] + 10;


    leftCenterLine.setAttribute('x1', leftLineX + 'mm');
    leftCenterLine.setAttribute('x2', leftLineX + 'mm');
    leftCenterLine.setAttribute('y1', bleedPosY + 'mm');
    leftCenterLine.setAttribute('y2', leftLineY2 + 'mm');

    let rightCenterLine = document.querySelector('#center-line-right');
    let rightLineX = rightCoverPosX + (format[0] / 2);
    let rightLineY2 = +bleedPosY + +format[2] + 10;


    rightCenterLine.setAttribute('x1', rightLineX + 'mm');
    rightCenterLine.setAttribute('x2', rightLineX + 'mm');
    rightCenterLine.setAttribute('y1', bleedPosY + 'mm');
    rightCenterLine.setAttribute('y2', rightLineY2 + 'mm');


    let text1 = document.querySelector('#first-obl');
    let text1Y = leftCoverPosY + 20;

    text1.setAttribute('x', rightLineX + 'mm');
    text1.setAttribute('y', text1Y + 'mm');

    let text2 = document.querySelector('#second-obl');

    text2.setAttribute('x', leftLineX + 'mm');
    text2.setAttribute('y', text1Y + 'mm');

    const lineCenterText = document.querySelector('#line-center');
    lineCenterText.innerHTML = 'Линия центра обложки - ' + (+format[0] / 2) + ' мм.';

    const formatText = document.querySelector('#format');
    formatText.innerHTML += format[0] + ' x ' + format[2] + ' мм.';

    const formatBigText = document.querySelector('#format-big');
    formatBigText.innerHTML += (format[0] * 2 + +format[1]) + ' x ' + format[2] + ' мм.';

    btn.setAttribute('style', 'display:block');
    infoText[0].setAttribute('style', 'display:block');
    infoText[1].setAttribute('style', 'display:block');

}

function drawPreview(format) {
    let realFormat = [];
    realFormat[0] = format[0] / 3;
    realFormat[1] = Math.round(format[1] / 3);
    realFormat[2] = format[2] / 3;



    if (format[1].length > 5) {
        format[1] = Math.round(format[1]);

    }
    if (format[1] == 0) {
        return;
    }

    let artboardWidthPre;
    if (format[0] > 660) {
        artboardWidthPre = 3000;
    } else {
        artboardWidthPre = 1350;
    }


    let artboardCenterPre = 630;
    if (format[2] < 645) {
        artboardCenterPre = 480;
    }

    let bleedWidthPre = (+format[0] * 2) + +format[1] + 30;
    let bleedHeightPre = +format[2] + 30;
    let bleedPosXPre = (artboardWidthPre - bleedWidthPre) / 2;
    let bleedPosYPre = artboardCenterPre - (bleedHeightPre / 2);

    let bleedPre = document.querySelector('#bleed-pre');
    bleedPre.setAttribute('x', bleedPosXPre);
    bleedPre.setAttribute('y', bleedPosYPre);
    bleedPre.setAttribute('width', bleedWidthPre);
    bleedPre.setAttribute('height', bleedHeightPre);

    let artboardPre = document.querySelector('#artboard-pre');


    if (artboardWidthPre > 1350) {
        artboardPre.setAttribute('width', artboardWidthPre);
    } else {
        artboardPre.setAttribute('width', '1350');
    }

    let widthCenterPre = +artboardWidthPre / 2



    let leftCoverPre = document.querySelector('#left-c-pre');
    let leftCoverPosXPre = widthCenterPre - +format[0] - (format[1] / 2);
    let leftCoverPosYPre = artboardCenterPre - (+format[2] / 2);


    leftCoverPre.setAttribute('x', leftCoverPosXPre);
    leftCoverPre.setAttribute('y', leftCoverPosYPre);
    leftCoverPre.setAttribute('width', format[0]);
    leftCoverPre.setAttribute('height', format[2]);
    leftCoverPre.setAttribute('fill', '#cccacc');
    leftCoverPre.setAttribute('stroke', 'black');
    leftCoverPre.setAttribute('stroke-width', '2');
    leftCoverPre.setAttribute('stroke-width', '2');
    leftCoverPre.setAttribute('title', 'Задняя сторона обложки ' + realFormat[0].toFixed(2) + ' x ' + realFormat[2].toFixed(2) + ' мм');
    leftCoverPre.setAttribute('data-original-title', 'Задняя сторона обложки ' + realFormat[0].toFixed(2) + ' x ' + realFormat[2].toFixed(2) + ' мм');


    let rightCoverPre = document.querySelector('#right-c-pre');
    let rightCoverPosXPre = widthCenterPre + (format[1] / 2);
    let rightCoverPosYPre = leftCoverPosYPre;

    rightCoverPre.setAttribute('x', rightCoverPosXPre);
    rightCoverPre.setAttribute('y', rightCoverPosYPre);
    rightCoverPre.setAttribute('width', format[0]);
    rightCoverPre.setAttribute('height', format[2]);
    rightCoverPre.setAttribute('fill', '#cccacc');
    rightCoverPre.setAttribute('stroke', 'black');
    rightCoverPre.setAttribute('title', 'Передняя сторона обложки ' + realFormat[0].toFixed(2) + ' x ' + realFormat[2].toFixed(2) + ' мм');
    rightCoverPre.setAttribute('data-original-title', 'Передняя сторона обложки ' + realFormat[0].toFixed(2) + ' x ' + realFormat[2].toFixed(2) + ' мм');




    let koreshokTextPre = document.querySelector('#koreshok-text-pre');
    let koreshokPre = document.querySelector('#koreshok-pre');
    let koreshokPosXPre = widthCenterPre - (+format[1] / 2);
    koreshokPre.setAttribute('x', koreshokPosXPre);
    koreshokPre.setAttribute('y', leftCoverPosYPre);
    koreshokPre.setAttribute('width', format[1]);
    koreshokPre.setAttribute('height', format[2]);
    koreshokPre.setAttribute('x', koreshokPosXPre);
    koreshokPre.setAttribute('title', "Корешок " + realFormat[1].toFixed(2) + " x " + realFormat[2].toFixed(2) + " мм");
    koreshokTextPre.innerHTML = 'Корешок - ' + realFormat[1].toFixed(2) + ' мм.';
    koreshokPre.setAttribute('data-original-title', "Корешок " + realFormat[1].toFixed(2) + " x " + realFormat[2].toFixed(2) + " мм");
    koreshokTextPre.innerHTML = 'Корешок - ' + realFormat[1].toFixed(2) + ' мм.';

    let leftCenterLinePre = document.querySelector('#center-line-left-pre');
    let leftLineXPre = leftCoverPosXPre + (format[0] / 2);
    let leftLineY2Pre = +bleedPosYPre + +format[2] + 10;


    leftCenterLinePre.setAttribute('x1', leftLineXPre);
    leftCenterLinePre.setAttribute('x2', leftLineXPre);
    leftCenterLinePre.setAttribute('y1', bleedPosYPre);
    leftCenterLinePre.setAttribute('y2', leftLineY2Pre);

    let rightCenterLinePre = document.querySelector('#center-line-right-pre');
    let rightLineXPre = rightCoverPosXPre + (format[0] / 2);
    let rightLineY2Pre = +bleedPosYPre + +format[2] + 10;


    rightCenterLinePre.setAttribute('x1', rightLineXPre);
    rightCenterLinePre.setAttribute('x2', rightLineXPre);
    rightCenterLinePre.setAttribute('y1', bleedPosYPre);
    rightCenterLinePre.setAttribute('y2', rightLineY2Pre);


    let leftLineBigPre = document.querySelector('#left-line-big-pre');
    let leftLineBigXPre = widthCenterPre - (+format[1] / 2) - 21;
    let leftLineBigY2Pre = rightCoverPosYPre + +format[2];

    leftLineBigPre.setAttribute('x1', leftLineBigXPre);
    leftLineBigPre.setAttribute('x2', leftLineBigXPre);
    leftLineBigPre.setAttribute('y1', rightCoverPosYPre);
    leftLineBigPre.setAttribute('y2', leftLineBigY2Pre);



    let rightLineBigPre = document.querySelector('#right-line-big-pre');
    let rightLineBigXPre = widthCenterPre + (+format[1] / 2) + 21;
    let rightLineBigY2Pre = rightCoverPosYPre + +format[2];

    rightLineBigPre.setAttribute('x1', rightLineBigXPre);
    rightLineBigPre.setAttribute('x2', rightLineBigXPre);
    rightLineBigPre.setAttribute('y1', rightCoverPosYPre);
    rightLineBigPre.setAttribute('y2', rightLineBigY2Pre);


    const lineCenterTextPre = document.querySelector('#line-center-pre');
    lineCenterTextPre.innerHTML = 'Линия центра обложки - ' + (+realFormat[0] / 2) + ' мм.';

    const formatTextPre = document.querySelector('#format');
    formatTextPre.innerHTML += realFormat[0] + ' x ' + realFormat[2] + ' мм.';

    const formatBigTextPre = document.querySelector('#format-big-pre');
    formatBigTextPre.innerHTML += (realFormat[0] * 2 + +realFormat[1]) + ' x ' + realFormat[2] + ' мм.';

    btn.setAttribute('style', 'display:block');
    infoText[0].setAttribute('style', 'display:block');
    infoText[1].setAttribute('style', 'display:block');

    const formatPreText = document.querySelector('#format-pre');
    formatPreText.innerHTML += realFormat[0] + ' x ' + realFormat[2] + ' мм';

    const doformatPreText = document.querySelector('#do-format-pre');
    doformatPreText.innerHTML += (realFormat[0] * 2 + realFormat[1] + 10) + ' x ' + (realFormat[2] + 10) + ' мм';

}