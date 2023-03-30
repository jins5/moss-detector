const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const cheminFichierPerl = "moss.pl";
const cheminDossierBase = "repo_base";
const cheminDossierCopi = "repo_copi";

// Lister les fichiers dans un répertoire
function listerFichiers(cheminDossier) {
    return fs
        .readdirSync(cheminDossier)
        .filter((fichier) => fs.statSync(path.join(cheminDossier, fichier)).isFile())
        .map((fichier) => path.join(cheminDossier, fichier));
}
// perl moss.pl -l java repo_base\Produit2.java repo_copi\Produit.java commande qui marche
const fichiersBase = listerFichiers(cheminDossierBase);
const fichiersCopi = listerFichiers(cheminDossierCopi);
// perl moss.pl -l java repo_base\Compte.java repo_base\IBaille.java repo_base\OffreEnchere.java repo_base\Produit2.java repo_copi\Compte.java repo_copi\IBaille.java repo_copi\OffreEnchere.java repo_copi\Produit.java
const args = ["perl", cheminFichierPerl, "-l", "java", ...fichiersBase, ...fichiersCopi];

const command = args.join(" ");
console.log(command);
exec(command, (error, stdout, stderr) => {
    console.log(command)
    if (error) {
        console.error(`Erreur d'exécution : ${error}`);
        return;
    }
    if (stderr) {
        console.error(`Erreur standard : ${stderr}`);
        return;
    }

    console.log(`Sortie standard : ${stdout}`);
});