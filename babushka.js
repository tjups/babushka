document.addEventListener("DOMContentLoaded", hentJson)

let menu;

let aktuelKategori = "Menu";

async function hentJson() {
    console.log("hent json")

    let jsonData = await fetch("menu.json");
    menu = await jsonData.json();

    menu.sort((a, b) => a.navn.localeCompare(b.navn));

    visMenu(menu, "Menu");

    document.querySelector("nav").addEventListener("click", () => {

        let kategori = event.target.textContent.toLowerCase();

        if (kategori != "alle") {
            let kat = menu.filter(ret => ret.kategori == kategori);
            aktuelKategori = kategori;
            document.querySelector(".sortering").style.visibility = "hidden";

            visMenu(kat, kategori);

        } else {
            visMenu(menu, "Menu");
            document.querySelector(".sortering").style.visibility = "visible";
        }

    });
}

function visMenu(menu, overskrift) {

    console.log("vis menu");

    let temp = document.querySelector("[data-template]");
    let dest = document.querySelector("[data-container]");

    document.querySelector("[data-overskrift]").textContent = overskrift;

    dest.innerHTML = "";

    menu.forEach(ret => {

        let klon = temp.cloneNode(true).content;

        klon.querySelector("[data-navn]").textContent = ret.navn;

        klon.querySelector("[data-kortbeskrivelse]").textContent = ret.kortbeskrivelse;

        klon.querySelector("[data-billede]").src = "imgs/small/" + ret.billede + "-sm.jpg";
        klon.querySelector("[data-billede]").alt = "billede af " + ret.navn;

        klon.querySelector("[data-pris]").textContent = "kr. " + ret.pris;

        klon.querySelector(".ret").addEventListener("click", () => {
            openPopup(ret)
        });

        dest.appendChild(klon);

    });

    document.querySelectorAll("article").forEach(a => {
        a.getBoundingClientRect();
        a.style.transition = "all 1s";
        a.style.opacity = "1";
    });

}

function openPopup(ret) {
    document.querySelector("#popup").style.opacity = "1";

    document.querySelector("[data-navn]").textContent = ret.navn;
    document.querySelector("[data-billede]").src = "imgs/medium/" + ret.billede + "-md.jpg";
    document.querySelector("[data-langbeskrivelse]").textContent = ret.langbeskrivelse;
    document.querySelector("[data-pris]").textContent = "kr. " + ret.pris;
    document.querySelector("#popup").style.pointerEvents = "auto";
    document.querySelector("#popupLuk").addEventListener("click", lukPopup);

}

function lukPopup() {
    document.querySelector("#popup").style.opacity = "0";

    document.querySelector("#popup").style.pointerEvents = "none";
}

document.querySelector(".sortering").addEventListener("change", sortering);

function sortering() {
    if (this.value == "alfa") {
        menu.sort((a, b) => a.navn.localeCompare(b.navn));
    } else if (this.value == "prisop") {
        menu.sort((a, b) => a.pris - b.pris);
    } else if (this.value == "prisned") {
        menu.sort((a, b) => b.pris - a.pris);
    };
    visMenu(menu, aktuelKategori);
}
