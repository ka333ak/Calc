var res;

function readJson(filename) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', filename);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            // обработать ошибку
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            // вывести результат
            res = JSON.parse(xhr.responseText);
        }

    }
}

function consol() {
    readJson("https://script.google.com/macros/s/AKfycbzqzryd7U9oLhR8ndb2MguhvL1P6Yv16_sFpNDc4_KQg2Ee1WM/exec");
    setTimeout(console.log(res), 5000);
    console.log(res);
}



//funstion imposing(){
//}