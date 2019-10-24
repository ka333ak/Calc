var count = 0;

function kbsCost(format, polos, tir, cov, blok) {

    hiddenForzac();
    viewCoverBlock();
    lamBlockHidden();
    if (polos % 2 != 0) {
        showalert("Должно быть кратно 2!", 'alertpolos');
    }
    if (count == 0) {
        document.getElementById('paper_cover').value = 5;
        cov[0] = 5;
        document.getElementById('color_bl').value = 4;
        blok[1] = 4;
        document.getElementById('paper_block').value = 29;
        blok[0] = 29
        count += 1;
    }
    // console.log(datapaper[cov[0]].name);

    let thickn = polos / 2 * datapaper[blok[0]].thickness;
    let coverwidth = format[0] * 2 + thickn;
    let paperOnCov = imposing(datapaper[cov[0]].W, datapaper[cov[0]].H, coverwidth, format[1]);
    let paperOnBlock = imposing(datapaper[blok[0]].W, datapaper[blok[0]].H, format[0], format[1]);
    let coverPaperCost = paperCost(tir, paperOnCov[0], cov[0]);
    let blockPaperCost = paperCost((tir * (polos / 2)), paperOnBlock[0], blok[0]);
    let coverPrintCost = printCost(paperOnCov[0], cov[1], 'pr_book');
    // console.log(tir * (polos / 2) / paperOnBlock[0]);
    let blockPrintCost = printCost((tir * (polos / 2) / paperOnBlock[0]), blok[1], 'pr_book');
    let lamCover = laminationPreznt((paperOnCov[0] * tir), cov, 0);
    let indkley = pricing(tir, "pr_book");
    let kley = allCoasts[indkley].KBS * tir + allCoasts[0].KBS;
    let final = (coverPaperCost + coverPrintCost + lamCover + blockPaperCost + blockPrintCost + kley)
    let cena = document.getElementById("CostFinal_price");
    cena.innerHTML = Math.round((final / 10) * 10) + RUB;

    let lamtz = "";
    let lamName = document.getElementById('laminacia_cover');
    lamName = lamName.options[cov[2]].text;
    if (lamCover != 0) {
        lamtz = ", ламинация " + lamName + " 1+0 "
    }

    let coverDraw = createLink(format[0], thickn, format[1]);

    let tzDetail = '<hr>На обложку: ' + (tir / paperOnCov[0]) + ' листов (бумага ' + coverPaperCost + "р., печать " + coverPrintCost + "р., ламинация " + lamCover + ' р.)' +
        '<br>На блок: ' + ((polos / 2 * tir) / paperOnBlock[0]) + ' листов (бумага ' + blockPaperCost + "р., печать " + blockPrintCost + 'р.)' + ' Склейка ' + kley + ' руб.' +
        '<br>' + coverDraw + coverwidth + ' x ' + format[1] + ' мм';


    let tzKBS = document.getElementById("zadanie_03");
    let colorCoverPrint = document.getElementById('color_obl');
    let colorBlockPrint = document.getElementById('color_bl');

    let tz = "Книга, формат: " + format[0] + " x " + format[1] + ", КБС<br>" +
        "Обложка: " + datapaper[cov[0]].name + ", " + colorCoverPrint.options[colorCoverPrint.selectedIndex].text + lamtz + "</br>" +
        "Блок: " + polos + " полос, " + datapaper[blok[0]].name + ", " + colorBlockPrint.options[colorBlockPrint.selectedIndex].text + "</br>" +
        "Тираж: " + tir + " экз. Стоимость " + final + " рублей." + tzDetail;

    tzKBS.innerHTML = tz;
    let link = document.querySelectorAll('a')[1];
    link.setAttribute('target', '_blank');


    // console.log("Обложка: бум " + coverPaperCost + " печать " + coverPrintCost + " лам " + lamCover);
    // console.log("Блок: бум " + blockPaperCost + " печать " + blockPrintCost);
    // console.log("KБС " + kley);



}

function createLink(coverwidth, korshok, coverheight) {
    let link = 'http://86.62.123.179/calc/svgcover.html?';
    link += coverwidth + '*' + korshok.toFixed(2) + '*' + coverheight;
    let href = '<a class="badge badge-success" href="' + link + '" title="Ссылка на шаблон откроется в новом окне">Обложка </a>';
    return href;
}

function lamBlockHidden() {
    document.getElementById('laminacia_block').setAttribute("style", "display:none;");
    document.getElementById('lamBlock').setAttribute("style", "display:none;");
    document.getElementById('lamb_cov').setAttribute("disabled", "disabled"); //


}

function sendSVG() {
    var svgText = document.getElementById('svg-download').innerHTML;
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "http://86.62.123.179/calc/svg.php");
    form.setAttribute("accept-charset", "UTF-8");
    var hiddenSVGField = document.createElement("input");
    hiddenSVGField.setAttribute("type", "hidden");
    hiddenSVGField.setAttribute("name", "svgText");
    hiddenSVGField.setAttribute("value", svgText);

    form.appendChild(hiddenSVGField);
    document.body.appendChild(form);
    form.submit();
}

function printCost(lists, sideColorPrintSelect, id) {

    let clicked, pressColor, res = 0;
    clicked = (sideColorPrintSelect % 2 == 0) ? 2 : 1;
    clicked *= lists
    let i = pricing(clicked, id);
    if (sideColorPrintSelect == 1) {
        pressColor = allCoasts[i].PrintClickColor;
        pressPriladka = allCoasts[0].PrintClickColor;
    } else if (sideColorPrintSelect == 2) {
        pressColor = allCoasts[i].PrintClickColor;
        pressPriladka = allCoasts[0].PrintClickColor;
    } else if (sideColorPrintSelect == 3) {
        pressColor = allCoasts[i].PrintClickB;
        pressPriladka = allCoasts[0].PrintClickB;
    } else if (sideColorPrintSelect == 4) {
        pressColor = allCoasts[i].PrintClickB;
        pressPriladka = allCoasts[0].PrintClickB;
    } else if (sideColorPrintSelect == 5) {
        res = 0
        return res;
    }
    // console.log("clicked " + clicked + " pressColor " + pressColor + " pressPriladka " + pressPriladka)
    res = Number(pressColor * clicked) + Number(pressPriladka);
    return res;
}