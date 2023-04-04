const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const cheminFichierPerl = "moss.pl";
const cheminDossierBase = "repo_base";
const cheminDossierCopi = "repo_copi";


function listerFichiers(cheminDossier) {
    return fs
        .readdirSync(cheminDossier)
        .filter((fichier) => fs.statSync(path.join(cheminDossier, fichier)).isFile())
        .map((fichier) => path.join(cheminDossier, fichier));
}



const fichiersBase = listerFichiers(cheminDossierBase);
const fichiersCopi = listerFichiers(cheminDossierCopi);

if (fichiersBase.length == 0 || fichiersCopi.length == 0) {
    console.error("Aucun fichier trouvé dans le répertoire");
    return;
}

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
