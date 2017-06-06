let form = document.querySelector("#myForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();
}, false);

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isURL(str: string) {
    var pattern = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!pattern.test(str)) {
        return false;
    } else {
        return true;
    }
}

// console.log(isURL('https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url'));

function fetchAPI() {
    let begin = 'https://swapi.co/api/';
    let checked = (<HTMLInputElement>document.querySelector('input[name="kategoria"]:checked')).value;
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
        .then((resp) => resp.json())
        .then(function (data) {
            displayData(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function displayData(data: any) {
    // console.log(data);
    let dc = document.createDocumentFragment();
    for (let key in data) {
        if (data[key].length !== 0) {
            if (isURL(data[key])) {
                console.log(data[key]);
            } else {
                let h = document.createElement("h3");
                let span = document.createElement("span");
                let klucz = `${key}: `;
                let wartosc = `${data[key]} </br>`;
                h.innerHTML = klucz;
                span.innerHTML = wartosc;
                dc.appendChild(h);
                dc.appendChild(span);
            }
        }
    }
    let div = document.createElement("div");
    form.parentNode.appendChild(div);
    div.appendChild(dc);
}

function hideOldData() {
    let old = document.querySelectorAll("div");
    for (let i = 0; i < old.length; i++) {
        old[i].style.display = "none";
    }
}

let submit = document.querySelector("#submit");

submit.addEventListener("click", fetchAPI, false);
submit.addEventListener("click", hideOldData, false);


