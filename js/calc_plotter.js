document.addEventListener("DOMContentLoaded", function() {
    var plottpress = document.getElementById('collapse02');
    plottpress.addEventListener('change', plotterC, false);
})

function plotterC() {
    let paper = document.getElementById('matherial');
    let stickerW = document.getElementById('item-width').value;
    let stickerH = document.getElementById('item-height').value;
    let tir = document.getElementById('edition02').value;
    let stickerpak = document.getElementById('stickerpac').checked
    let dopbleed = document.getElementById('rezka-format').checked ? 1 : 0;
    let bleedS = 3 + dopbleed;
    bleedS = stickerpak ? 0 : bleedS;
    if (stickerH != 0 && stickerW != 0 && tir != 0) {
        if (paper.value < 3) {
            impS = imposing(447, 305, Number(stickerW) + Number(bleedS), Number(stickerH) + Number(bleedS));
        } else {
            impS = imposing(428, 305, Number(stickerW) + Number(bleedS), Number(stickerH) + Number(bleedS));
        }
        let paperForPlot = Math.ceil(Number(tir) / impS[0]);
        let sticker = datapaper.filter(datapaper => datapaper.sticker == true);
        let paperCost = sticker[paper.value].cost;
        paperCost *= paperForPlot;
        let ott = pricing(paperForPlot, "purchase");
        let otCost = allCoasts[ott].PrintClickColor * paperForPlot + allCoasts[0].PrintClickColor;
        let rezCost = allCoasts[ott].Plotter * paperForPlot + allCoasts[0].Plotter;
        let itogrez = document.getElementById('CostFinal');
        let tzsticker = stickerpak ? ["Стикерпаки ", 150] : ["Наклейки ", 0];
        let doprez = document.getElementById('rezka-format').checked ? ["плоттерная резка, резка в формат,", 150] : ["плоттерная резка,", 0];
        let lamin = document.getElementById('laminacia').checked ? (5.95 * paperForPlot) + (allCoasts[ott].RollLam * paperForPlot + allCoasts[0].RollLam) : 0;
        let lamintz = document.getElementById('laminacia').checked ? "ламинация 1+0, " : "";
        let tz = document.getElementById('zadanie_02');
        let detail = "На листе " + impS[0] + "шт., всего " + paperForPlot + " листов."
        itogrez.innerHTML = rezCost + otCost + lamin + paperCost + doprez[1] + tzsticker[1] + RUB;
        tz.innerHTML = tzsticker[0] + stickerW + " x " + stickerH + " мм, </br> Материал: " + paper.options[paper.selectedIndex].text + ', </br> ' + lamintz + doprez[0] + "</br> Тираж: " + tir + "шт. - " + (rezCost + otCost + lamin + paperCost) + " рублей." +
            "<hr>" + detail;
        let itog10 = document.getElementById('m10S');
        itog10.innerHTML = Math.round(((rezCost + otCost + lamin + paperCost + doprez[1] + tzsticker[1]) * 1.1) / 10) * 10 + RUB;
        let itog20 = document.getElementById('m20S');
        itog20.innerHTML = Math.round(((rezCost + otCost + lamin + paperCost + doprez[1] + tzsticker[1]) * 1.2) / 10) * 10 + RUB;
        let itog30 = document.getElementById('m30S');
        itog30.innerHTML = Math.round(((rezCost + otCost + lamin + paperCost + doprez[1] + tzsticker[1]) * 1.3) / 10) * 10 + RUB;

    }

}