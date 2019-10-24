document.addEventListener("DOMContentLoaded", function() {
    var bookpress = document.getElementById('collapse03');
    bookpress.addEventListener('change', book, false);
})

const bleedbook = 4;

function book() {
    let pereplet = document.getElementById('pereplet');
    let formatbook = autoformat('formatbook', 'book-width', 'xb', 'book-height');


    if (formatbook[0] == 0) {
        formatbook[0] = Number(document.getElementById('book-width').value);
        formatbook[1] = Number(document.getElementById('book-height').value);

        // document.getElementById('laminacia_block').style.display = 'block';
    }
    let polos = document.getElementById('count-list').value;
    let lists = document.getElementById('listofblock');
    hideAlert('alertpolos');
    document.getElementById('count-list').className = 'custom-select my-select';


    if (polos != 0 && pereplet.value == 1) {
        if (polos % 2 != 0) {
            showalert("Должно быть кратно 2!", 'alertpolos');
            document.getElementById('count-list').className = 'warn';
        }
        lists.setAttribute("style", "display:block;");
        lists.value = (polos / 2) + " листов";
    } else if (polos % 4 != 0 && pereplet.value == 0) {
        showalert("Должно быть кратно 4!", 'alertpolos');
        document.getElementById('count-list').className = 'warn';
    } else {
        hideAlert('alertpolos');
        lists.setAttribute("style", "display:none;");
    }
    let corexAdd = document.getElementById('laminacia_cover');
    let corexAdd1 = document.getElementById('lam_for');
    document.getElementById('pruz').setAttribute("style", "display:none;");
    if (pereplet.value == 1) {
        if (corexAdd.options.length == 9) {
            // TODO изменить текст на "Ламинация/Доп. обложка"
            corexAdd.options[9] = new Option('пластик прозрач. глянец, 150 мкм', 9, false, false);
            document.getElementById('lamb_cov').setAttribute("style", "display:none;");
            corexAdd1.options[9] = new Option('пластик прозрач. глянец, 150 мкм', 9, false, false);
            document.getElementById('lam_for_side').setAttribute("style", "display:none;");


        }
    } else if (corexAdd.options.length == 10) {
        corexAdd.remove(9);
        corexAdd1.remove(9);
    }


    let btiraz = document.getElementById('edition03').value;
    let cover = [],
        block = [];
    // [0 - бумага, 1 - цветность печати, 2 - ламинация, 3 - стороны ламинирования]
    cover[0] = document.getElementById('paper_cover').value;
    cover[1] = document.getElementById('color_obl').value;
    cover[2] = document.getElementById('laminacia_cover').value;
    cover[3] = document.getElementById('lamb_cov').value;
    block[0] = document.getElementById('paper_block').value;
    block[1] = document.getElementById('color_bl').value;
    block[2] = document.getElementById('laminacia_block').value;
    block[3] = 1;
    selectRecovery();
    let element = document.getElementById('forzlabel'),
        style = window.getComputedStyle(element);
    let display = style.getPropertyValue('display');
    if (display == "none") {
        viewForzac();
    }
    if (formatbook[0] != 0 && formatbook[1] != 0 && polos != 0 && btiraz != 0) {
        //paper_block
        if (pereplet.value == 0) {
            broshureCost(formatbook, polos, btiraz, cover, block);
        } else if (pereplet.value == 1) {
            prezentationCost(formatbook, polos, btiraz, cover, block);
        } else if (pereplet.value == 2) {
            kbsCost(formatbook, polos, btiraz, cover, block);
        } else if (pereplet.value == 3) {
            // book7BCCost();
        }
    }
}