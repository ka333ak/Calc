var datapaper = [],
    USD, EUR, RUB = "<img class=\"rub\" src=\"img/rub-light.svg\">",
    allCoasts;

document.addEventListener("DOMContentLoaded", LoadCurrensy());
document.addEventListener("DOMContentLoaded", loadPaper("json/paperall.json"));
document.addEventListener("DOMContentLoaded", loadCoasts());
var ITOG;
const lam = [0, 5.41, 7.22, 16.16, 34.28, 5.95, 13.71, 21.29, 7.80];

document.addEventListener("DOMContentLoaded", function() {
    var listpress = document.getElementById('collapse01');
    listpress.addEventListener('change', listprint, false);
})

function imposing(PaperWidth, PaperHeigh, ProductWidth, ProductHeigh) {
    // console.log(PaperWidth + "," + PaperHeigh + "," + ProductWidth + "," + ProductHeigh)
    let impose1, impose2, PaperHeighi, PaperWidthi, res = [];
    // res [0 количество изделий на листе, 1 высота листа, 2 ширина листа, 3 коэффицент]
    if (ProductWidth > 473 || ProductHeigh > 473) {
        PaperHeighi = PaperHeigh;
        if (PaperWidth >= 660) {
            PaperWidthi = 330;
            res[3] = 2;
        } else {
            PaperWidthi = 320;
        }
    } else if (PaperHeigh > 473) {
        PaperHeighi = 483;
        PaperWidthi = 330;
        res[3] = 1;
    } else {
        PaperHeighi = PaperHeigh;
        PaperWidthi = PaperWidth;
        res[3] = 1;
    }
    impose1 = Math.floor((PaperWidthi - 8) / ProductWidth) * Math.floor((PaperHeighi - 8) / ProductHeigh);
    impose2 = Math.floor((PaperWidthi - 8) / ProductHeigh) * Math.floor((PaperHeighi - 8) / ProductWidth);

    if (impose1 > impose2) {
        res[0] = impose1;
        res[1] = PaperHeighi;
        res[2] = PaperWidthi;
    } else {
        res[0] = impose2;
        res[1] = PaperHeighi;
        res[2] = PaperWidthi;

    }
    return res

}

function loadCoasts() {
    var xhr1 = new XMLHttpRequest();
    xhr1.open('GET', 'json/merge.json', true);
    xhr1.send();
    xhr1.onreadystatechange = function() {
        if (xhr1.readyState != 4) return;
        if (xhr1.status != 200) {
            // обработать ошибку
            showalert("Ошибка сервера при загрузке, обновите страницу", "alertpaper");
        } else {
            allCoasts = xhr1.responseText;
            allCoasts = JSON.parse(allCoasts);
        }
    }
}

function loadPaper(filename) {
    fetch(filename)
        .then(
            function(response) {
                if (response.status !== 200) {
                    showalert("Ошибка сервера при загрузке бумаги, обновите страницу", "alertpaper");
                    return;
                }
                response.json().then(function(data) {
                    datapaper = data;
                    createSelect(datapaper);
                });
            }
        )
        .catch(function(err) {
            showalert("Ошибка сервера при загрузке бумаги, обновите страницу", "alertpaper");
        });
}

function LoadCurrensy() {
    var app = "https://script.google.com/macros/s/AKfycbzqzryd7U9oLhR8ndb2MguhvL1P6Yv16_sFpNDc4_KQg2Ee1WM/exec",
        output = '',
        xhr = new XMLHttpRequest();
    xhr.open('GET', app);
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        if (xhr.status == 200) {
            try {
                var r = JSON.parse(xhr.responseText);
                var Curr = r["result"][0];
            } catch (e) {}
        } else {
            showalert("Ошибка сервера при загрузке данных курса валют, обновите страницу", "alertpaper");
        }
        USD = Curr[0];
        EUR = Curr[1];
    }
    xhr.send();
}

function createSelect(sel) {

    let sticker = sel.filter(sel => sel.sticker == true);
    let bookpaper = sel.filter(sel => sel.sticker == false);
    for (i = 0; i < sticker.length; i++) {
        document.getElementById('matherial').options[i] = new Option(sticker[i].name, [i], false, false);

    }
    for (i = 0; i < sel.length; i++) {
        document.getElementById('paper').options[i] = new Option(sel[i].name, [i], false, false);

    }
    for (i = 0; i < bookpaper.length; i++) {
        document.getElementById('paper_cover').options[i] = new Option(bookpaper[i].name, [i], false, false);
        document.getElementById('paper_block').options[i] = new Option(bookpaper[i].name, [i], false, false);
        document.getElementById('paper_for').options[i] = new Option(bookpaper[i].name, [i], false, false);
    }
    for (i = 0; i < bookpaper.length; i++) {
        document.getElementById('paper_cover_block').options[i] = new Option(bookpaper[i].name, [i], false, false);
        document.getElementById('paper_block-block').options[i] = new Option(bookpaper[i].name, [i], false, false);
        document.getElementById('paper_for_bl').options[i] = new Option(bookpaper[i].name, [i], false, false);
    }

}



listprint = function() {
    let countCreateSel = 1;
    const selectPaper = document.querySelector('#paper');
    if (selectPaper.length == 0) {
        loadPaper('json/paperall.json');
        countCreateSel++
        console.log('попытка ' + countCreateSel)

    }
    let arrformat = autoformat('format', 'item_01', 'item_02', 'x');
    let bleed = document.getElementById('one_rez').checked ? 0 : 4;
    let PW = arrformat[0],
        PH = arrformat[1];
    if (document.getElementById('format').value == 1) {
        PW = Number(document.getElementById('item_01').value);
        PH = Number(document.getElementById('item_02').value);
    }
    let tir = Number(document.getElementById('edition01').value);
    // console.log("PW: " + PW + "PH: " + PH + "tir: " + tir)
    if (PW == 0 || PH == 0 || tir == 0) {
        return;
    } else {
        var Pind = document.getElementById('paper');

        let MW = Number(datapaper[Pind.value].W);
        let MH = Number(datapaper[Pind.value].H);
        let imp = imposing(MW, MH, PW + bleed, PH + bleed);
        let paper = Math.ceil(Number(tir) / imp[0]);
        let click = document.getElementById('color_print').value;
        click = (click == 2 || click == 4) ? 2 : 1;
        click = click * paper;
        let priceind = pricing(click, 'pur_02');
        let colorPrint = document.getElementById('color_print');
        if (colorPrint.value > 2) {
            var coastPrint = allCoasts[priceind].PrintClickB;
            // console.log(coastPrint)
        } else {
            coastPrint = allCoasts[priceind].PrintClickColor;
        }
        let notCut = document.getElementById('without_rezka').checked;
        let cut = (notCut) ? 0 : allCoasts[0].Polar;
        if (imp[0] > 20 && paper >= 10) {
            let cutind = pricing(paper, 'pur_02');
            cutting = allCoasts[cutind].Polar * paper;
            cut += cutting;
        }
        cut = notCut ? 0 : cut; // обнуление резки
        let paperCost = [];
        paperCost[0] = datapaper[Pind.value].cost;
        paperCost[1] = datapaper[Pind.value].currency;
        if (paperCost[1] == "EUR") {
            paperCost[1] = EUR;
        } else if (paperCost[1] == "USD") {
            paperCost[1] = USD;
        } else {
            paperCost[1] = 1;
        }

        let ChangePaperCost = paperCost[0] * paperCost[1] * paper;
        // console.log(ChangePaperCost)
        let PP = document.getElementById("pp").checked ? postpresslist(tir, paper) : [0, '', ''];
        if (PP[0] == undefined) {
            PP[0] = 0;

        } else {
            // console.log("coastprint: " + coastPrint + " *click " + click + " *imp[3] " + imp[3] + " = " + (coastPrint * click * imp[3]))
            ITOG = (coastPrint * click * imp[3]) + allCoasts[0].PrintClickColor + cut + (ChangePaperCost * imp[3]);
            let ITOGround = (Math.round((ITOG + PP[0]) / 10) * 10);
            let postpress = notCut ? " сдача в листах" : " резка в формат";
            let PPtext1 = (typeof PP[1] !== 'undefined') ? PP[1] : "";
            let PPtext2 = (typeof PP[2] !== 'undefined') ? "</br>" + PP[2] : "";
            // TODO Поменять "Изделие" на наклейки
            let TZ = "Изделие " + formatIzd(PW, PH) + "</br> материал: " + Pind.options[Pind.selectedIndex].text + ", печать: " + colorPrint.options[colorPrint.selectedIndex].text +
                ", " + PPtext1 + "</br>" + postpress + "</br>Тираж: " + tir + " экз. - " + ITOGround + " рублей.<hr>" +
                imp[0] + " изделий на листе " + imp[1] + " x " + imp[2] + " мм, всего " + paper + " листов на тираж</br>" +
                "Печать: " + ((coastPrint * click * imp[3] + allCoasts[0].PrintClickColor)) + "р. , материал: " + (ChangePaperCost * imp[3]) + "р. , резка: " + cut + "р." + PPtext2;




            document.getElementById('itog_price01').innerHTML = ITOGround + RUB;
            document.getElementById("m10").innerHTML = (Math.round(((ITOG + PP[0]) * 1.1) / 10) * 10) + RUB;
            document.getElementById("m20").innerHTML = (Math.round(((ITOG + PP[0]) * 1.2) / 10) * 10) + RUB;
            document.getElementById("m30").innerHTML = (Math.round(((ITOG + PP[0]) * 1.3) / 10) * 10) + RUB;
            document.getElementById('zadanie_01').innerHTML = TZ;
        }
    }
}

function pricing(clicked, pur) {
    let discont = document.getElementById(pur).value;
    let arr = allCoasts.map(a => a.operation);
    if (clicked == 1) {
        i = 1;
    } else if (clicked == 2) {
        i = 2;
    } else {
        for (i = 3; clicked > arr[i]; i++) {
            // console.log("pricingFunction -clicked: " + clicked + " i: " + i);
            price = arr[i];
        }
    }
    if (discont == 3) {
        i = 16;
    } else if (discont == 2) {
        i = i + 3;
        i = (i > 16) ? 16 : i;
    } else {
        i;
    }
    return i;
}

function formatIzd(PW, PH) {
    if (PW == 210 && PH == 297 || PH == 210 && PW == 297) {
        return "A4, ";
    } else if (PW == 297 && PH == 420 || PH == 297 && PW == 420) {
        return "A3, ";
    } else if (PW == 210 && PH == 148 || PH == 210 && PW == 148) {
        return "A5, ";
    } else if (PW == 105 && PH == 148 || PH == 105 && PW == 148) {
        return "A6, ";
    } else {
        return PW + "x" + PH + "мм, ";
    }
}

function autoformat(formatsel, width, X, height) {
    let format = document.getElementById(formatsel).value;
    let PW, PH, display, arrformat = [];
    if (format == 2) {
        PW = 105;
        PH = 148;
        display = "none";
    } else if (format == 3) {
        PW = 148;
        PH = 210;
        display = "none";
    } else if (format == 4) {
        PW = 210;
        PH = 297;
        display = "none";
    } else if (format == 5) {
        PW = 420;
        PH = 297;
        display = "none";
    } else if (format == 1) {
        PW = 0;
        PH = 0;
        display = "block";
    }

    document.getElementById(width).style.display = display;
    document.getElementById(height).style.display = display;
    document.getElementById(X).style.display = display;
    arrformat[0] = PW;
    arrformat[1] = PH;
    return arrformat;
}

function postpresslist(tiraz, lists) {
    let lamVar = document.getElementById('lamination');
    let finalPP = [0, '', '']
    if (lamVar.value != 0) {

        let lamSide = document.getElementById('layer_out');
        let lamProgon = pricing(lists * lamSide.value, 'pur_02');
        lamProgon = (allCoasts[lamProgon].RollLam * lists * lamSide.value) + allCoasts[0].RollLam;
        finalPP[0] += (lam[lamVar.value] * lamSide.value * lists) + lamProgon;
        finalPP[1] += 'ламинация ' + lamVar.options[lamVar.selectedIndex].text + ' ' + lamSide.options[lamSide.selectedIndex].text + ", ";
        finalPP[2] += "ламинация " + Number((lam[lamVar.value] * lamSide.value * lists) + lamProgon) + "р. ";
    }
    let bigovka = document.getElementById('sel_02');
    if (bigovka.value != 0) {
        let bigPrice = pricing(bigovka.value * tiraz, 'pur_02');
        finalPP[0] += (allCoasts[bigPrice].Scoring * tiraz) + allCoasts[0].Scoring;
        finalPP[1] += bigovka.options[bigovka.selectedIndex].text + ", ";
        finalPP[2] += ", биговка " + Number((allCoasts[bigPrice].Scoring * tiraz) + allCoasts[0].Scoring) + "р. ";
    }
    let falc = document.getElementById('sel_03');
    if (falc.value != 0) {
        let falcPrice = pricing(falc.value * tiraz, 'pur_02');
        finalPP[0] += (allCoasts[falcPrice].Fold * tiraz) + allCoasts[0].Fold;
        finalPP[1] += falc.options[falc.selectedIndex].text + ", ";
        finalPP[2] += ", фальцовка " + Number((allCoasts[falcPrice].Fold * tiraz) + allCoasts[0].Fold) + "р. ";
    }
    let letter = document.getElementById('sel_06');
    if (letter.value != 0) {
        let letterPrice = pricing(letter.value * tiraz, 'pur_02');
        finalPP[0] += (allCoasts[letterPrice].Lettering * tiraz) + allCoasts[0].Lettering;
        finalPP[1] += letter.options[letter.selectedIndex].text + " тиснения, ";
        finalPP[2] += ", тиснение " + Number((allCoasts[letterPrice].Lettering * tiraz) + allCoasts[0].Lettering) + "р. ";
    }
    let drill = document.getElementById('sel_04');
    if (drill.value != 0) {
        let drillPrice = pricing(drill.value * tiraz, 'pur_02');
        finalPP[0] += (allCoasts[drillPrice].Drill * tiraz) + allCoasts[0].Drill;
        finalPP[1] += "сверление: " + drill.options[drill.selectedIndex].text + ", ";
        finalPP[2] += ", сверление: " + Number((allCoasts[drillPrice].Drill * tiraz) + allCoasts[0].Drill) + "р. ";
    }
    let roundi = document.getElementById('sel_05');
    if (roundi.value != 0) {
        let roundiPrice = pricing(roundi.value * tiraz, 'pur_02');
        finalPP[0] += (allCoasts[roundiPrice].Round * tiraz) + allCoasts[0].Round;
        finalPP[1] += "кругление: " + roundi.options[roundi.selectedIndex].text + ", ";
        finalPP[2] += ", кругление: " + Number((allCoasts[roundiPrice].Round * tiraz) + allCoasts[0].Round) + "р. ";
    }
    let personal = document.getElementById('person_num').checked;
    if (personal != false) {
        let personalPrice = pricing(personal * tiraz, 'pur_02');
        finalPP[0] += (allCoasts[personalPrice].Numeration * tiraz) + allCoasts[0].Numeration;
        finalPP[1] += "персонализация" + ",";
        finalPP[2] += ", персонализация: " + Number((allCoasts[personalPrice].Numeration * tiraz) + allCoasts[0].Numeration) + "р. ";
    }
    return finalPP
}

function refreshOnServer() {
    location.reload(true);

}


function hideToast() {
    const toastHide = document.querySelector('.toast');
    // const toastBtn = document.querySelector('#toast-close');
    toastHide.classList.remove('show');
    toastHide.classList.add('hide');
}