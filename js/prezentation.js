var count = 0;

function prezentationCost(format, polos, tir, cov, blok) {
    if (count == 0) {
        document.getElementById('paper_cover').value = 6;
        document.getElementById('color_bl').value = 2;
        document.getElementById('paper_block').value = 4;
        document.getElementById('paper_for').value = 41;
        document.getElementById('color_for').value = 5;
        count += 1;
    }


    // cov и blok  - два массива:
    // [0 - бумага, 1 - цветность печати, 2 - ламинация, 3 - стороны ламинирования]
    viewCoverBlock();
    document.getElementById("alertform").setAttribute("style", "display:none;");
    document.getElementById('pruz').setAttribute("style", "display:block;");
    if (cov[2] > 0 && cov[2] < 9) {
        document.getElementById('lamb_cov').setAttribute("style", "display:block;");
    } else {
        document.getElementById('lamb_cov').setAttribute("style", "display:none;");
    }
    blok[3] = 2;
    blok[1] = document.getElementById('color_bl').value;

    document.getElementById('forz').checked = true;
    let f1 = document.getElementById('forzblockall');
    f1.setAttribute("style", "display:block;");
    let f2 = document.getElementById('forz2');
    f2.setAttribute("style", "display:block;");
    let f3 = document.getElementById('forz3');
    f3.setAttribute("style", "display:block;");
    let f4 = document.getElementById('forz4');
    f4.setAttribute("style", "display:none;");
    document.getElementById('forzlabel').innerHTML = "ПОДЛОЖКА";
    let podlog = []
    podlog[0] = document.getElementById('paper_for').value;
    podlog[1] = document.getElementById('color_for').value;
    podlog[2] = document.getElementById('lam_for').value;
    podlog[3] = document.getElementById('lam_for_side').value;
    if (podlog[2] > 0 && podlog[2] < 9) {
        document.getElementById('lam_for_side').setAttribute("style", "display:block;");
    } else {
        document.getElementById('lam_for_side').setAttribute("style", "display:none;");
    }
    if (podlog[2] != 0) {
        f4.setAttribute("style", "display:block;");
    }
    let prWidth = format[0] + bleedbook;
    let prHeight = format[1] + bleedbook;
    let prCoverLists = imposing(datapaper[cov[0]].W, datapaper[cov[0]].H, prWidth, prHeight);
    let prBlockLists = imposing(datapaper[blok[0]].W, datapaper[blok[0]].H, prWidth, prHeight);
    let prPodlLists = imposing(datapaper[podlog[0]].W, datapaper[podlog[0]].H, prWidth, prHeight);
    let paperCostCover = paperCost(tir, prCoverLists[0], cov[0]);
    let paperCostBlock = paperCost((tir * polos / 2), prBlockLists[0], blok[0]);
    let paperCostPodl = paperCost(tir, prPodlLists[0], podlog[0]);
    let printCostCov = printCost((tir / prCoverLists[0]), cov[1], 'pr_book');
    let printCostBlock = printCost((tir * (polos / 2 / prBlockLists[0])), blok[1], 'pr_book');
    let printCostPodl = printCost((tir / prPodlLists[0]), podlog[1], 'pr_book');
    let lamCover = laminationPreznt(tir, cov, format);

    let lamBlock = laminationPreznt((tir * polos / 2), blok, format);
    let lamPodl = laminationPreznt(tir, podlog, format);
    // console.log("lamC: " + lamCover + " lamB: " + lamBlock + " lamP: " + lamPodl);

    let pricePruz = pricing(tir, 'pr_book');
    let pruz = allCoasts[pricePruz].Bind * tir + allCoasts[0].Bind;
    let itogCost = paperCostCover + printCostCov + lamCover + paperCostBlock + printCostBlock + lamBlock + paperCostPodl + printCostPodl + lamPodl + pruz;
    document.getElementById('CostFinal_price').innerHTML = Math.round((itogCost / 10) * 10) + RUB;

    let colorCoverPrint = document.getElementById('color_obl');
    let colorBlockPrint = document.getElementById('color_bl');
    let colorPodlPrint = document.getElementById('color_for');
    let lamCovertz = ["", "", ""];
    if (cov[2] != 0) {
        if (cov[2] == 9) {
            lamCovertz[0] = ", пластик прозрач. глянец, 150 мкм";
            lamCovertz[1] = ", пластик ";
            lamCovertz[2] = lamCover;
        } else {
            let lmCvText = document.getElementById('laminacia_cover');
            lmCvText = lmCvText.options[cov[2]].text;
            let lmCvSideText = document.getElementById('lamb_cov');
            lmCvSideText = lmCvSideText.options[lmCvSideText.selectedIndex].text;
            lamCovertz[0] = ", ламинация " + lmCvText + " " + lmCvSideText;
            lamCovertz[1] = ", ламинация ";
            lamCovertz[2] = lamCover;
        }
    }


    let lamBlocktz = ["", "", ""];
    if (blok[2] != 0) {
        let lmBkText = document.getElementById('laminacia_block');
        lmBkText = lmBkText.options[blok[2]].text;
        lamBlocktz[0] = ", ламинация " + lmBkText + "  1 + 1";
        lamBlocktz[1] = ", ламинация ";
        lamBlocktz[2] = lamBlock;


    }
    let lamPodltz = ["", "", ""];
    if (podlog[2] != 0) {
        if (podlog[2] == 9) {
            lamPodltz[0] = ", пластик прозрач. глянец, 150 мкм";
            lamPodltz[1] = ", пластик ";
            lamPodltz[2] = lamPodl;
        } else {
            let lmPLText = document.getElementById('lam_for');
            lmPLText = lmPLText.options[lmPLText.selectedIndex].text;
            let lmPLSideText = document.getElementById('lam_for_side');
            lmPLSideText = lmPLSideText.options[lmPLSideText.selectedIndex].text;
            lamPodltz[0] = ", ламинация " + lmPLText + " " + lmPLSideText;
            lamPodltz[1] = ", ламинация ";
            lamPodltz[2] = lamPodl;
        }
    }
    let pruzTz;
    let pruzT = document.getElementById("inlineRadio1");
    if (pruzT.checked) {
        pruzTz = ",</br>Пружина по короткой стороне";
    } else {
        pruzTz = ",</br>Пружина по длинной стороне";
    }

    let prezTZ = "Презентация, формат " + format[0] + " x " + format[1] + ", </br>Обложка: " +
        datapaper[cov[0]].name + ", печать: " + colorCoverPrint.options[colorCoverPrint.selectedIndex].text + lamCovertz[0] + ", </br>Блок: " +
        datapaper[blok[0]].name + ", " + polos + " полос, печать: " + colorBlockPrint.options[colorBlockPrint.selectedIndex].text + lamBlocktz[0] + ", </br>Подложка: " +
        datapaper[podlog[0]].name + ", печать: " + colorPodlPrint.options[colorPodlPrint.selectedIndex].text + lamPodltz[0] + pruzTz + ", </br>Тираж: " +
        +tir + " экз. Стоимость - " + itogCost.toFixed(2) + " рублей.";
    let prezTZdetail = "<hr>На обложку: " + (tir / prCoverLists[0]) + " листов, (бумага: " + paperCostCover.toFixed(2) + ", печать: " + printCostCov.toFixed(2) + lamCovertz[1] + lamCovertz[2] + ")<br> На блок: " +
        +(tir * polos / 2 / prBlockLists[0]) + " листов, (бумага: " + paperCostBlock.toFixed(2) + ", печать: " + printCostBlock.toFixed(2) + lamBlocktz[1] + lamBlocktz[2] + ")<br> На подложку: " +
        (tir / prPodlLists[0]) + " листов, (бумага: " + paperCostPodl.toFixed(2) + ", печать: " + printCostPodl.toFixed(2) + lamPodltz[1] + lamPodltz[2] + ")<br> Пружина " + pruz;


    let prezTZcont = document.getElementById('zadanie_03');
    prezTZcont.innerHTML = prezTZ + prezTZdetail;



    // console.log("printCostCov " + printCostCov + " printCostBlock " + printCostBlock + " printCostPodl " + printCostPodl)




}


function laminationPreznt(lists, arr, format) {
    let lamSide = arr[3];
    let lamProgon;
    if (arr[2] == 0) {
        lamProgon = 0;
    } else {
        lamProgon = pricing(lists * lamSide, 'pr_book');
        lamProgon = (allCoasts[lamProgon].RollLam * lists) + allCoasts[0].RollLam + (lam[arr[2]] * lamSide * lists);
        if (arr[2] == 9) {
            lamProgon = korex(format, lists);
        }
    }
    return lamProgon;
}

function korex(format, tirazh) {
    alertform = document.getElementById("alertform");
    const kor = 9;
    let list;
    width = format[0] - 8;
    height = format[1] - 8;
    if (format[0] > 420 || format[1] > 297) {
        list = 0;
        alertform.innerHTML = "Пластик не может быть более А3 формата";
        alertform.setAttribute("style", "display:block;");
        return list;
    } else {
        alertform.setAttribute("style", "display:none;");
        const corexCost = 9;
        let li = imposing(420, 297, width, height);
        list = tirazh / li[0] * 9;
    }
    return list;
}