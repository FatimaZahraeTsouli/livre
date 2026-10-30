const titre = document.getElementById("title");
const date = document.getElementById("date");
const genre = document.getElementById("genre");
const auteur = document.getElementById("author");
const description = document.getElementById("description");
const ajouter = document.getElementById("Ajouter");
const statut = document.getElementById("statut");
const statuterror = document.getElementById("statuterror");
const rechercher = document.getElementById("Rechercher");
const trier = document.getElementById("trier");
const titreerror = document.getElementById("titreerror");
const dateerror = document.getElementById("dateerror");
const genreerror = document.getElementById("genreerror");
const auteurerror = document.getElementById("auteurerror");
const form = document.getElementById("form");
const listeslivres = document.getElementById("listeslivres");
const buttonrechercher = document.getElementById("buttonrechercher");
const formmodification = document.getElementById("formmodification");
const modalmodification = document.getElementById("modalmodification");
const newtitle = document.getElementById("title-edit");
const newdate = document.getElementById("date-edit");
const newgenre = document.getElementById("genre-edit");
const newauteur = document.getElementById("author-edit");
const newstatut = document.getElementById("statut-edit");
const newdescription = document.getElementById("description-edit");
const enregistrer = document.getElementById("modifier-edit");
const btnsupprimer = document.getElementById("btnsupprimer");
const btnannuler = document.getElementById("btnannuler");
const Supprimer = document.getElementById("supprimer");


function validertitre() {
    const valeur = titre.value.trim().toLowerCase();

    if (valeur.length < 2) {
        titreerror.textContent = "le titre est très court!";
        return false;
    } else if (valeur.length > 40) {
        titreerror.textContent = "le titre est très long!";
        return false;
    }
    titreerror.textContent = "";
    return true;

}
titre.addEventListener("input", function () {
    validertitre()
})

function validerdate() {
    const date1 = date.value;
    if (date1.length != 4 && date1.length != 0) {
        dateerror.textContent = "veuillez entrée une date valable!";
        return false
    }
    dateerror.textContent = "";
    return true;
}
date.addEventListener("input", function () {
    validerdate()
})

function validerstatut() {
    const statutvaleur = statut.value;
    if (statutvaleur !== "A-lire" && statutvaleur !== "En-lisant" && statutvaleur !== "Lu") {
        statuterror.textContent = "Veuillez entrée un choix valable!";
        return false;
    }
    statuterror.textContent = "";
    return true;
}
statut.addEventListener("input", function () {
    validerstatut();
})

function validerauteur() {
    const auteurvaleur = auteur.value.trim().toLowerCase();
    if (auteurvaleur.length < 2) {
        auteurerror.textContent = "le nom est très court!";
        return false;
    }
    else if (auteurvaleur.length > 20) {
        auteurerror.textContent = "le nom est très long!";
        return false;
    }
    auteurerror.textContent = "";
    return true;
}
auteur.addEventListener("input", function () {
    validerauteur();
})

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validertitre()) {
        titre.focus();
        return;
    }
    if (!validerdate()) {
        date.focus();
        return;
    }
    if (!validerstatut()) {
        statut.focus();
        return;
    }
    if (!validerauteur()) {
        auteur.focus();
        return;
    }


    const livre = {
        titre: titre.value.trim(),
        auteur: auteur.value.trim(),
        date: date.value,
        genre: genre.value.trim(),
        statut: statut.value,
        description: description.value
    };
    livres.push(livre);
    localStorage.setItem("livres", JSON.stringify(livres));

    ajouterlivre(livre);
    form.reset();
})

let indexlivremodifier = null;
let livres = JSON.parse(localStorage.getItem("livres")) || [];
function ajouterlivre(livre) {
    const section = document.createElement("section");
    section.className = "border bg-slate-50 h-100 w-100 rounded mx-8 flex flex-col gap-5 justify-start py-8 px-8";
    const titrelivre = document.createElement("h2");
    titrelivre.className = "text-3xl font-semibold"
    titrelivre.textContent = livre.titre;
    const infoslivre = document.createElement("div");
    infoslivre.className = "flex flex-col gap-0";
    const auteurlivre = document.createElement("p");
    auteurlivre.textContent = "Auteur: " + livre.auteur;
    const datelivre = document.createElement("p");
    datelivre.textContent = " Année : " + livre.date;
    const genrelivre = document.createElement("p");
    genrelivre.textContent = "Genre : " + livre.genre;
    const statutlivre = document.createElement("p");
    statutlivre.className = "border rounded-full w-40 px-3 bg-slate-500 text-white"
    statutlivre.textContent = livre.statut;
    const descriptionlivre = document.createElement("p");
    descriptionlivre.textContent = livre.description;
    const boutons = document.createElement("div");
    boutons.className = "flex gap-3";
    const modifierlivre = document.createElement("button");
    modifierlivre.className = "border bg-blue-200 rounded w-25 h-10 text-blue-800 font-bold"
    modifierlivre.textContent = "Modifier";
    const supprimerlivre = document.createElement("button");
    supprimerlivre.className = "border bg-red-200 rounded w-25 h-10 text-red-800 font-bold"
    supprimerlivre.textContent = "Supprimer";

    section.appendChild(titrelivre);
    infoslivre.appendChild(auteurlivre);
    infoslivre.appendChild(datelivre);
    infoslivre.appendChild(genrelivre);
    section.appendChild(infoslivre);
    section.appendChild(statutlivre);
    section.appendChild(descriptionlivre);
    boutons.appendChild(modifierlivre);
    boutons.appendChild(supprimerlivre);
    section.appendChild(boutons);
    listeslivres.appendChild(section);


    modifierlivre.addEventListener("click", function(){
        indexlivremodifier = livres.indexOf(livre);

        formmodification.reset();
        modalmodification.classList.remove("hidden");
        modalmodification.classList.add("flex");

})


    supprimerlivre.addEventListener("click", function(){
        indexlivresupprimer = livres.indexOf(livre);

        Supprimer.classList.remove("hidden");       

})
    
}

livres.forEach(function(livre) {
    ajouterlivre(livre);

});


// function rechercher livre 

buttonrechercher.addEventListener("click", function(){
    rechercherlivre()
})

function rechercherlivre(){
    const recherche = rechercher.value.trim().toLowerCase()

    const livresfiltre = livres.filter(function(livre){
    return livre.titre.toLowerCase().includes(recherche) || 
        livre.auteur.toLowerCase().includes(recherche)
    })

    listeslivres.replaceChildren();

    livresfiltre.forEach(function(livre){
        ajouterlivre(livre)
    })
}


// function trier livre 

trier.addEventListener("input", function(){
    trierlivre()
})

function trierlivre(){
    
    const triervaleur = trier.value.trim().toLowerCase();
    const livrestries = [...livres];

    if (triervaleur === "titre"){
        livrestries.sort((a,b) => 
        a.titre.localeCompare(b.titre)
    );
    }

    if (triervaleur == "auteur"){
        livrestries.sort((a,b) => 
            a.auteur.localeCompare(b.auteur)
    );
    }

    if (triervaleur == "annee"){
        livrestries.sort((a, b) =>
        Number(a.date || 0) - Number(b.date || 0)
        );
    }
    listeslivres.replaceChildren();
    livrestries.forEach(function(livre){
    ajouterlivre(livre)  
    })

}

formmodification.addEventListener("submit", function(event){
    event.preventDefault();

    const titremodifier = newtitle.value;
    const datemodifier = newdate.value;
    const auteurmodifier = newauteur.value;
    const genremodifier = newgenre.value;
    const statutmodifier = newstatut.value;
    const descriptionmodifier = newdescription.value;

    livres[indexlivremodifier].titre = titremodifier;
    livres[indexlivremodifier].date = datemodifier;
    livres[indexlivremodifier].auteur = auteurmodifier;
    livres[indexlivremodifier].genre = genremodifier;
    livres[indexlivremodifier].statut = statutmodifier;
    livres[indexlivremodifier].description = descriptionmodifier;

localStorage.setItem("livres", JSON.stringify(livres));

listeslivres.replaceChildren();
livres.forEach(function(livre) {
    ajouterlivre(livre);
});

modalmodification.classList.add("hidden");
modalmodification.classList.remove("flex");
formmodification.reset();
  


})

let indexlivresupprimer = null;
btnsupprimer.addEventListener("click", function(){

    if (indexlivresupprimer === null) return;

    livres.splice(indexlivresupprimer, 1);

    localStorage.setItem("livres", JSON.stringify(livres));

    listeslivres.replaceChildren();

    livres.forEach(function(livre) {
        ajouterlivre(livre);

    });

    Supprimer.classList.add("hidden");
    indexlivresupprimer = null;

})

btnannuler.addEventListener("click", function(){
    Supprimer.classList.add("hidden");
})





        