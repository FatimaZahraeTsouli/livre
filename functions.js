export function validertitre(titre, titreerror) {
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


export function validerdate(date, dateerror) {
    const date1 = date.value;
    if (date1.length != 4 && date1.length != 0) {
        dateerror.textContent = "veuillez entrée une date valable!";
        return false
    }
    dateerror.textContent = "";
    return true;
}


export function validerstatut(statut, statuterror) {
    const statutvaleur = statut.value;
    if (statutvaleur !== "A-lire" && statutvaleur !== "En-lisant" && statutvaleur !== "Lu") {
        statuterror.textContent = "Veuillez entrée un choix valable!";
        return false;
    }
    statuterror.textContent = "";
    return true;
}


export function validerauteur(auteur, auteurerror) {
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


export function rechercherlivre(rechercher, livres,ajouterlivre){
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


export function trierlivre(trier, titre, auteur, date, ajouterlivre, livres){
    
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


export function afficherlivres() {
    
}