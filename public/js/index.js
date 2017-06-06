var form = document.querySelector("#myForm");
form.addEventListener("submit", function (e) {
    e.preventDefault();
}, false);
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function isURL(str) {
    var pattern = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!pattern.test(str)) {
        return false;
    }
    else {
        return true;
    }
}
// console.log(isURL('https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url'));
function fetchAPI() {
    var begin = 'https://swapi.co/api/';
    var checked = document.querySelector('input[name="kategoria"]:checked').value;
    switch (checked) {
        case "People":
            begin += "people/" + getRandomInt(1, 87);
            break;
        case "Films":
            begin += "films/" + getRandomInt(1, 7);
            break;
        case "Starships":
            begin += "starships/" + getRandomInt(1, 37);
            break;
        case "Vehicles":
            begin += "vehicles/" + getRandomInt(1, 39);
            break;
        case "Species":
            begin += "species/" + getRandomInt(1, 37);
            break;
        case "Planets":
            begin += "planets/" + getRandomInt(1, 61);
            break;
    }
    fetch(begin)
        .then(function (resp) { return resp.json(); })
        .then(function (data) {
        displayData(data);
    })
        .catch(function (error) {
        console.log(error);
    });
}
function displayData(data) {
    // console.log(data);
    var dc = document.createDocumentFragment();
    for (var key in data) {
        if (data[key].length !== 0) {
            if (isURL(data[key])) {
                console.log(data[key]);
            }
            else {
                var h = document.createElement("h3");
                var span = document.createElement("span");
                var klucz = key + ": ";
                var wartosc = data[key] + " </br>";
                h.innerHTML = klucz;
                span.innerHTML = wartosc;
                dc.appendChild(h);
                dc.appendChild(span);
            }
        }
    }
    var div = document.createElement("div");
    form.parentNode.appendChild(div);
    div.appendChild(dc);
}
function hideOldData() {
    var old = document.querySelectorAll("div");
    for (var i = 0; i < old.length; i++) {
        old[i].style.display = "none";
    }
}
var submit = document.querySelector("#submit");
submit.addEventListener("click", fetchAPI, false);
submit.addEventListener("click", hideOldData, false);
