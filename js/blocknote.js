document.onload = load();


let data = ""
let name = [],
    kru = [],
    color = [],
    cost = [],
    pru = [],
    blocksPolimat = [],
    think = [];
blocks = {}


function load() {
    var app = "https://script.google.com/macros/s/AKfycbzNXO3MfcBUwDc78BB_HN4Xc92HXIPfdgVBhS0kqA/exec",
        output = '',
        xhr = new XMLHttpRequest();
    xhr.open('GET', app);
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        if (xhr.status == 200) {
            try {
                data = JSON.parse(xhr.responseText);
                out.innerHTML = true;
                output1();
                outputBlock();

            } catch (e) {}
        } else {
            out.innerHTML = "Ошибка сервера при загрузке данных ";
        }

    }
    xhr.send();
}


function output1() {
    for (let i = 0; i < data.length; i++) {
        if (data[i][0] == '') {
            blocksPolimat.push(data[i][1]);
        } else {
            name[i] = data[i][0].slice(data[i][0].indexOf('Print'), data[i][0].indexOf('(') - 1);
            think[i] = data[i][0].slice(data[i][0].indexOf('(') + 1, data[i][0].indexOf(')') - 2);
            kru[i] = data[i][0].slice(data[i][0].indexOf('мм)') + 4, data[i][0].indexOf('кр') - 5) * 1000;
            color[i] = data[i][0].slice(data[i][0].indexOf('кр,') + 3, data[i][0].indexOf('К-во'));
            cost[i] = data[i][0].slice(data[i][0].indexOf('А.В.Свободно:') + 13, data[i][0].indexOf('(с НДС)в'));
            cost[i] = cost[i].slice(cost[i].indexOf('С)') + 2);
            cost[i] = cost[i].replace(/\s/g, '');
            pru[i] = {
                'think': think[i]
            }
            if (pru[i].think == '6,4') {
                pru[i] = {
                    'name': name[i],
                    'kru': kru[i],
                    'maxBlock': 3.9,
                    'color': color[i],
                    'cost': cost[i]
                }
            } else if (pru[i].think == '7,9') {
                pru[i] = {
                    'name': name[i],
                    'kru': kru[i],
                    'maxBlock': 5.3,
                    'color': color[i],
                    'cost': cost[i]
                }
            } else if (pru[i].think == '9,5') {
                pru[i] = {
                    'name': name[i],
                    'kru': kru[i],
                    'maxBlock': 6.8,
                    'color': color[i],
                    'cost': cost[i]
                }
            } else if (pru[i].think == '11,1') {
                pru[i] = {
                    'name': name[i],
                    'kru': kru[i],
                    'maxBlock': 8.3,
                    'color': color[i],
                    'cost': cost[i]
                }
            } else if (pru[i].think == '12,7') {
                pru[i] = {
                    'name': name[i],
                    'kru': kru[i],
                    'maxBlock': 9.8,
                    'color': color[i],
                    'cost': cost[i]
                }
            } else if (pru[i].think == '14,3') {
                pru[i] = {
                    'name': name[i],
                    'kru': kru[i],
                    'maxBlock': 11.8,
                    'color': color[i],
                    'cost': cost[i]
                }
            }


            // out.innerHTML += pru[i].name + " : " + pru[i].cost + " : " + pru[i].maxBlock + " мм ; <br>";

        }

    }
    out.innerHTML += '<br>Создано ' + pru.length + ' объектов пружины';
}

function outputBlock() {
    console.time('outputBlock')
    let name = [],
        color = [],
        balance = [],
        cost = [],
        warn = [],
        post = [],
        size = [],
        cod;

    for (let i = 0; i < blocksPolimat.length; i++) {
        name[i] = blocksPolimat[i].slice(0, blocksPolimat[i].indexOf(')') + 1);
        color[i] = blocksPolimat[i].slice(blocksPolimat[i].indexOf(')') + 2, blocksPolimat[i].indexOf('К-во') - 1);
        balance[i] = blocksPolimat[i].slice(blocksPolimat[i].indexOf('Свободно:') + 9);
        balance[i] = balance[i].slice(0, balance[i].indexOf('резе') - 1);
        balance[i] = balance[i].slice(0, balance[i].indexOf('Ан'));
        balance[i] = balance[i].slice(0, balance[i].indexOf('Еще пос'));
        if (balance[i].indexOf('$("a.bu') != -1) {
            cod = balance[i].slice(balance[i].indexOf('$(\"a.bu'), balance[i].indexOf('p();') + 4);
            balance[i] = balance[i].replace(cod, "");
            warn[i] = true;
        } else {
            warn[i] = false;
        }
        if (blocksPolimat[i].indexOf('пит:') != -1) {
            post[i] = blocksPolimat[i].slice(blocksPolimat[i].indexOf('пит:') + 4, blocksPolimat[i].indexOf('пит:') + 15);
        } else {
            post[i] = false;
        }
        cost[i] = +blocksPolimat[i].slice(blocksPolimat[i].indexOf('А.В.') + 16, blocksPolimat[i].indexOf('ВДК') - 23);
        // cost[i] *= 1.2;
        if (name[i].indexOf('мини') != -1) {
            size[i] = 'МИНИ';
        } else if (name[i].indexOf('миди') != -1) {
            size[i] = 'МИДИ';
        } else if (name[i].indexOf('макси') != -1) {
            size[i] = 'МАКСИ';
        } else {
            size[i] = 'other';
        }

        blocks[i] = {
            "name": name[i],
            "color": color[i],
            "balance": balance[i],
            "post": post[i],
            "warn": warn[i],
            "cost": cost[i],
            "size": size[i]

        }
        if (size[i] == "other") {
            out2.innerHTML += i + 1 + ' ) ' + name[i] + " / " + color[i] + " / " + balance[i] + " / " + post[i] + " / " + warn[i] + " / " + cost[i] + " / " + size[i] + '<br>' // " : " + balance[i] + '<br>';

        }


    }

}

document.addEventListener("DOMContentLoaded", function() {
    let blocknotepress = document.getElementById('collapse04');
    blocknotepress.addEventListener('change', blocknote, false);
})

blocknote = function() {
    const arrformat = autoformat('formatblock', 'block-width', 'block-height', 'xb2');
    const formatblock = document.querySelector('#formatblock');
    const blocknoteWidth = document.querySelector('#block-width');
    const blocknoteHeight = document.querySelector('#block-height');
    if (formatblock.value != 1) {
        blocknoteWidth.value = arrformat[0];
        blocknoteHeight.value = arrformat[1]
    }
    const listsOfBlocknote = document.querySelector('#count-list-block');
    const tirazOfBlocnote = document.querySelector('#edition04');
    if (blocknoteWidth.value != 0 && blocknoteHeight.value != 0 && listsOfBlocknote.value != '' && tirazOfBlocnote.value != '') {
        viewBlocknoteParms();
        const coverPaper = document.querySelector('#paper_cover_block');
        let coverCost, blockCost, podlozhCost;
        let coverImpose = imposing(datapaper[coverPaper.value].W, datapaper[coverPaper.value].H, arrformat[0], arrformat[1]);
        if (document.querySelector('#pc-block').checked) {
            const coverPrint = document.querySelector('#color_obl_block');
            const coverLam = document.querySelector('#laminacia_cover_block');
            const coverLamSide = document.querySelector('#lamb_cov-block');

            coverCost = partsPrintCost(
                Math.ceil(tirazOfBlocnote.value / coverImpose[0]),
                coverPrint.value,
                coverPaper.value,
                coverLam.value,
                coverLamSide.value
            );
        } else {
            coverCost = 0
        }

        const blockPaper = document.querySelector('#paper_block-block');
        const blockPrint = document.querySelector('#color_bl-block');
        let blockImpose = imposing(datapaper[blockPaper.value].W, datapaper[blockPaper.value].H, arrformat[0], arrformat[1]);
        blockCost = partsPrintCost(
            Math.ceil(tirazOfBlocnote.value * listsOfBlocknote.value / blockImpose[0]),
            blockPrint.value,
            blockPaper.value,
            0, 0
        );
        const podlozhPaper = document.querySelector('#paper_for_bl');
        const podlozhPrint = document.querySelector('#color_for_blocknote');
        const podlozhLam = document.querySelector('#laminacia_cover_block');
        const podlozhLamSide = document.querySelector('#lamb_cov-block');
        let podlozhImpose = coverImpose;



    }

    partsPrintCost = function(list, colorIndex, paperIndex, lamIndex, lamSide) {
        let result = [];
        let ottisk = (colorIndex % 2 == 0) ? 2 : 1;
        ottisk *= list;
        let costPaper = datapaper[paperIndex].cost * list;
        if (datapaper[paperIndex].currency == 'EUR') {
            costPaper *= EUR;
        } else if (datapaper[paperIndex].currency == 'USD') {
            costPaper *= USD;
        }
        let costPrint = 0;
        let indexPress = pricing(ottisk, 'pr_blocknote');
        if (colorIndex == 5) {
            costPrint = 0;
        } else {
            if (colorIndex > 2) {
                costPrint = ottisk * allCoasts[indexPress].PrintClickB + allCoasts[0].PrintClickB;
            } else {
                costPrint = ottisk * allCoasts[indexPress].PrintClickColor + allCoasts[0].PrintClickColor;
            }
        }
        let costLam = 0;
        if (lamIndex != 0) {
            let lamIndProgon = pricing(list * lamSide, 'pr_blocknote');
            costLam = (allCoasts[lamIndProgon].RollLam * list * lamSide) + allCoasts[0].RollLam + (lam[lamIndex] * list * lamSide);
        }
        result[0] = costPaper;
        result[1] = costPrint;
        result[2] = costLam
        return result;
    }




}
viewBlocknoteParms = function() {
    const coverBlocnote = document.querySelector('#pc-block');
    if (coverBlocnote.checked) {
        document.querySelector('#bpc-block').setAttribute("style", "display:block;");
        document.querySelector('#pbc1_block').setAttribute("style", "display:block;");
        document.querySelector('#pbc2_block').setAttribute("style", "display:block;");
        const lamCoverVar = document.querySelector('#laminacia_cover_block');
        if (lamCoverVar.value != 0) {
            document.querySelector('#lamb_cov-block').setAttribute("style", "display:block;");
            document.querySelector('.lam_cover_block').setAttribute("style", "display:block;");
        } else {
            document.querySelector('#lamb_cov-block').setAttribute("style", "display:none;");
        }
    } else {
        document.querySelector('#bpc-block').setAttribute("style", "display:none;");
        document.querySelector('#pbc1_block').setAttribute("style", "display:none;");
        document.querySelector('#pbc2_block').setAttribute("style", "display:none;");
        document.querySelector('#lamb_cov-block').setAttribute("style", "display:none;");
        document.querySelector('.lam_cover_block').setAttribute("style", "display:none;");
    }
    const blockBlocnote = document.querySelector('#pb-block');
    if (blockBlocnote.checked) {
        document.querySelector('#pbb-block').setAttribute("style", "display:block;");
        document.querySelector('#pbb1-block').setAttribute("style", "display:block;");
        const lamBlockVar = document.querySelector('#laminacia_block-block');

    } else {
        document.querySelector('#pbb-block').setAttribute("style", "display:none;");
        document.querySelector('#pbb1-block').setAttribute("style", "display:none;");
    }
    const blockPodl = document.querySelector('#forz-blocknote');
    if (blockPodl.checked) {
        document.querySelector('#forzblockallblocknote').setAttribute("style", "display:block;");
        document.querySelector('#forz2blocknote').setAttribute("style", "display:block;");
        document.querySelector('#forz3blocknote').setAttribute("style", "display:block;");
        // const lamPodlVar =
    } else {
        document.querySelector('#forzblockallblocknote').setAttribute("style", "display:none;");
        document.querySelector('#forz2blocknote').setAttribute("style", "display:none;");
        document.querySelector('#forz3blocknote').setAttribute("style", "display:none;");
    }
}
blocknoteCost = function() {
    let blocknote = {
        'coverPaper': 0,
        'coverPrint': 0,
        'coverLam': 0,
        'coverLamSide': 0,
        'blockPaper': 0,
        'blockPrint': 0,
        'podlPaper': 0,
        'podlPrint': 0,
        'podlLam': 0,
        'podlLamSide': 0,
    }

    // 
    // const coverLam = document.querySelector('#laminacia_cover_block');
    // const coverLamSide = document.querySelector('#lamb_cov-block');


    //  imposing(PaperWidth, PaperHeigh, ProductWidth, ProductHeigh)
}