var countb = 0;

function broshureCost(format, polos, tir, cov, blok) {
    viewCoverBlock();
    hiddenForzac();
    if (countb == 0) {
        document.getElementById('paper_cover').selectedIndex = 6;
        cov[0] = 6;
        document.getElementById('paper_block').selectedIndex = 2;
        blok[0] = 2;
        countb += 1
    }


    // cov и blok  - два массива:
    // [0 - бумага, 1 - цветность печати, 2 - ламинация, 3 - стороны ламинирования]
    if (document.getElementById('color_bl1') != null) {
        document.getElementById('color_bl1').parentNode.removeChild(document.getElementById('color_bl1'));
    }
    if (document.getElementById('color_bl2') != null) {
        document.getElementById('color_bl2').parentNode.removeChild(document.getElementById('color_bl2'));
    }


    let bwidth = format[0] * 2 + bleedbook;
    let bheigh = format[1] + bleedbook;
    // console.log("ширина = " + bwidth + " x высота " + bheigh);
    let coverlists = imposing(datapaper[cov[0]].W, datapaper[cov[0]].H, bwidth, bheigh);
    coverlists[0] = Math.ceil(tir / coverlists[0]);
    let blocklists = imposing(datapaper[blok[0]].W, datapaper[blok[0]].H, bwidth, bheigh);
    blocklists[0] = Math.ceil(((polos / 4) * tir) / blocklists[0]);
    let costPaperCover = curPaper(cov[0]);
    costPaperCover *= coverlists[0] * coverlists[3];
    let costPaperBlock = curPaper(blok[0]);
    costPaperBlock *= blocklists[0] * blocklists[3];
    let priceCoverPrint, priceBlockPrint;
    let indCover;
    if (cov[1] == 1 || cov[1] == 3) {
        indCover = 1;
    } else {
        indCover = 2;
    }
    priceCoverPrint = pricing(coverlists[0] * indCover, 'pr_book');
    priceBlockPrint = pricing(blocklists[0] * 2, 'pr_book');
    let costCoverPrint, costBlockPrint;
    if (cov[1] < 3) {
        costCoverPrint = allCoasts[priceCoverPrint].PrintClickColor * (coverlists[0] * indCover) + allCoasts[0].PrintClickColor;
    } else {
        costCoverPrint = allCoasts[priceCoverPrint].PrintClickB * (coverlists[0] * indCover) + allCoasts[0].PrintClickB;
    }
    if (blok[1] == 2) {
        costBlockPrint = allCoasts[priceBlockPrint].PrintClickColor * (blocklists[0] * 2) + allCoasts[0].PrintClickColor;
    } else {
        costBlockPrint = allCoasts[priceBlockPrint].PrintClickB * (blocklists[0] * 2) + allCoasts[0].PrintClickB;
    }
    let priceskoba = pricing(tir, 'pr_book');
    let skoba = allCoasts[priceskoba].Clamp * tir + allCoasts[0].Clamp;
    let bigovkaCover = bigovka(cov[0], tir);
    let bigovkaBlock = bigovka(blok[0], (polos / 4 * tir));
    let coverlam = lam[cov[2]];
    coverlam *= cov[3];
    let coverlamPrice = pricing(coverlists[0], "pr_book");
    let coverlamCost = (coverlam * coverlists[0]) + (coverlists[0] * allCoasts[coverlamPrice].RollLam) + allCoasts[0].RollLam;
    coverlamCost = (cov[2] == 0) ? 0 : coverlamCost;

    let blocklam = lam[cov[2]];
    blocklam *= blok[3];
    let blocklamPrice = pricing(blocklists[0], "pr_book");
    let blocklamCost = (blocklam * blocklists[0]) + (blocklists[0] * allCoasts[blocklamPrice].RollLam) + allCoasts[0].RollLam;
    blocklamCost = (blok[2] == 0) ? 0 : blocklamCost;





    let itogBroshureCost = costBlockPrint + costPaperBlock + bigovkaBlock + costCoverPrint + costPaperCover + bigovkaCover + allCoasts[0].Polar + skoba + coverlamCost + blocklamCost;
    document.getElementById('CostFinal_price').innerHTML = Math.round((itogBroshureCost / 10) * 10) + RUB;
    let lamCovertz = '';
    if (coverlamCost != 0) {
        let lamcovname = document.getElementById('laminacia_cover');
        lamcovname = lamcovname.options[lamcovname.selectedIndex].text
        let lamsidename = document.getElementById('lamb_cov');
        lamsidename = lamsidename.options[lamsidename.selectedIndex].text
        lamCovertz = ", ламинация " + lamcovname + " " + lamsidename
    }
    let lamBlocktz = '';
    if (blocklamCost != 0) {
        let lamblockname = document.getElementById('laminacia_block');
        lamblockname = lamblockname.options[lamblockname.selectedIndex].text
        lamBlocktz = ", ламинация " + lamblockname + " 1+1";
    }







    let colorCoverPrint = document.getElementById('color_obl');
    let colorBlockPrint = document.getElementById('color_bl');
    tzdetail = "<hr>На обложку: " + coverlists[0] + " листов, печать " + (costPaperCover + costCoverPrint + bigovkaCover).toFixed(2) + "(бумага: " + costPaperCover.toFixed(2) + ", печать: " + costCoverPrint.toFixed(2) + ", биговка/фальцовка: " + bigovkaCover.toFixed(2) + ")</br>" +
        "На блок: " + blocklists[0] + " листов, печать " + (costPaperBlock + costBlockPrint + bigovkaBlock).toFixed(2) + "(бумага: " + costPaperBlock.toFixed(2) + ", печать: " + costBlockPrint.toFixed(2) + ", биговка/фальцовка: " + bigovkaBlock.toFixed(2) + ")</br>" +
        "Скоба: " + skoba;




    let tzbook = document.getElementById('zadanie_03');
    tzbook.innerHTML = "Брошюра, " + polos + " полос + обложка, " + ((bwidth - bleedbook) / 2) + " x " + (bheigh - bleedbook) + " мм, в развороте " + (bwidth - bleedbook) + " x " + (bheigh - bleedbook) +
        " мм</br>Обложка: " + datapaper[cov[0]].name + ", печать " + colorCoverPrint.options[colorCoverPrint.selectedIndex].text + lamCovertz + ",</br>Блок: " + datapaper[blok[0]].name +
        ", печать " + colorBlockPrint.options[colorBlockPrint.selectedIndex].text + lamBlocktz + "</br>Тираж " + tir + ' экз. Стоимость - ' + Math.round((itogBroshureCost / 10) * 10) + " рублей" +
        tzdetail;



    // отладка
    // console.log("на обложку: " + coverlists[0] + " листов и  " + blocklists[0] + " листов на блок.");
    // console.log("Стоимость бумаги на обложку: " + costPaperCover + " Стоимость бумаги на блок: " + costPaperBlock);
    // console.log("Печать обложки: " + costCoverPrint + " Печать блока: " + costBlockPrint);
    // console.log("Фальцовка обложки:" + bigovkaCover + " фальцовка блока: " + bigovkaBlock);
    // console.log("Скоба: " + skoba)
}


function curPaper(papervalue) {
    let currpaper = [datapaper[papervalue].cost, datapaper[papervalue].currency];
    if (currpaper[1] == "USD") {
        currpaper[1] = USD;
    } else if (currpaper[1] == "EUR") {
        currpaper[1] = EUR;
    } else {
        currpaper[1] = 1;
    }
    let res = currpaper[0] * currpaper[1];
    return res;
}

function book7BCCost() {
    viewForzac();
}

function hiddenForzac() {
    let f1 = document.getElementById('forzblock');
    f1.setAttribute("style", "display:none;");
    let f2 = document.getElementById('rowforz');
    f2.setAttribute("style", "display:none;");
    let f3 = document.getElementById('forz');
    f3.setAttribute("style", "display:none;");
    let f4 = document.getElementById('forzlabel');
    f4.setAttribute("style", "display:none;");
    let f5 = document.getElementById('paper_for');
    f5.setAttribute("style", "display:none;");
    let f6 = document.getElementById('color_for');
    f6.setAttribute("style", "display:none;");
    let f7 = document.getElementById('lam_for');
    f7.setAttribute("style", "display:none;");
    let f8 = document.getElementById('lam_for_side');
    f8.setAttribute("style", "display:none;");
    let f9 = document.getElementById('paper-for-label');
    f9.setAttribute("style", "display:none;")


}

function viewForzac() {
    let f1 = document.getElementById('forzblock');
    f1.setAttribute("style", "display:block;");
    let f2 = document.getElementById('rowforz');
    f2.setAttribute("style", "display:block;");
    let f3 = document.getElementById('forz');
    f3.setAttribute("style", "display:block;");
    let f4 = document.getElementById('paper_for');
    f4.setAttribute("style", "display:block;");
    let f5 = document.getElementById('color_for');
    f5.setAttribute("style", "display:block;");
    let f6 = document.getElementById('lam_for');
    f6.setAttribute("style", "display:block;");
    let f7 = document.getElementById('lam_for_side');
    f7.setAttribute("style", "display:block;");
    let f8 = document.getElementById('forz');
    f8.setAttribute("style", "display:block;");
    let f9 = document.getElementById('forzlabel');
    f9.setAttribute("style", "display:block;");
    let f10 = document.getElementById('forzblockall');
    f10.setAttribute("style", "display:block;");
    let f11 = document.getElementById('paper-for-label');
    f11.setAttribute("style", "display:block;")

}

function bigovka(papervalue, lists) {
    let resum = pricing(lists, 'pr_book');
    let res;
    if (datapaper[papervalue].weight > 0.159) {
        res = (allCoasts[resum].Scoring * lists + allCoasts[0].Scoring) + (allCoasts[resum].Fold * lists + allCoasts[0].Fold);
    } else {
        res = allCoasts[resum].Fold * lists + allCoasts[0].Fold;
    }
    return res
}

function viewCoverBlock() {
    let coverRow = document.getElementById('bpc');
    coverRow.setAttribute("style", "display:block;");
    let coverRow1 = document.getElementById('pbc1');
    coverRow1.setAttribute("style", "display:block;");
    let coverRow2 = document.getElementById('pbc2');
    coverRow2.setAttribute("style", "display:block;");
    let blockRow = document.getElementById('pbb');
    blockRow.setAttribute("style", "display:block;");
    let blockRow1 = document.getElementById('pbb1');
    blockRow1.setAttribute("style", "display:block;");
    let blockRow2 = document.getElementById('pbb2');
    blockRow2.setAttribute("style", "display:block;");
    document.getElementById('pc').checked = true;
    document.getElementById('pb').checked = true;

};



function selectRecovery() {
    let colorPrintBlockvalues = document.getElementById('color_bl');
    let colorPrintBlockvalueslen = colorPrintBlockvalues.options.length;
    if (colorPrintBlockvalueslen == 2) {
        colorPrintBlockvalues.options[0] = new Option('4 + 0', 1, false, false);
        colorPrintBlockvalues.options[1] = new Option('4 + 4', 2, false, false);
        colorPrintBlockvalues.options[2] = new Option('1 + 0', 3, false, false);
        colorPrintBlockvalues.options[3] = new Option('1 + 1', 4, false, false);
    }
    let selectAdd = document.getElementById("color_for");
    let selectAddLen = selectAdd.options.length;
    if (pereplet.value == 1) {
        if (selectAddLen != 5) {
            selectAdd.options[4] = new Option('0 + 0', 5, false, false);
        }
    } else {
        if (selectAddLen == 5) {
            selectAdd.remove(4);
        }
    }
    return;
    ``
}

function paperCost(tir, lists, paperarr) {
    let paper = Math.ceil(tir / lists);
    let paperCost = paper * datapaper[paperarr].cost;
    if (datapaper[paperarr].currency == "EUR") {
        paperCost *= EUR;
    } else if (datapaper[paperarr].currency == "USD") {
        paperCost *= USD;
    } else {
        paperCost *= 1;
    }
    return paperCost
}





function showalert(text, id) {
    let alert = document.getElementById(id);
    alert.innerHTML = text;
    alert.setAttribute("style", "display:block;");
}

function hideAlert(id) {
    let alert = document.getElementById(id);
    alert.setAttribute("style", "display:none;");
}