document.onload = load();
const out = document.querySelector('#out');
const out2 = document.querySelector('#out2');
const btnReels = document.querySelector('.btn-reels');
const btnBlock = document.querySelector('.btn-blocks');

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
btnReels.onclick = function() {
    output1();
}
btnBlock.onclick = function() {
    outputBlock();
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
    console.timeEnd('outputBlock');

}

document.addEventListener("DOMContentLoaded", function() {
    var bookpress = document.getElementById('collapse03');
    bookpress.addEventListener('change', book, false);
})