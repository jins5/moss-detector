const express = require("express");
const app = express();

const port = 3000;
const { exec } = require("child_process");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/interface/interface.html");
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});

app.post("/compare", async (req, res) => {
    let combinedValue = req.body.code1;
    let code2Value = req.body.code2;

    const languageRegex = /@LANGUAGE:(.*?)@/;
    const languageMatch = combinedValue.match(languageRegex);
    if (!languageMatch) {
        res.send("Erreur lors de l'extraction de la valeur du langage");
        return;
    }
    const languageValue = languageMatch[1];

    // Retirer la valeur du langage du code1
    const code1Value = combinedValue.replace(languageRegex, "");

    const cheminFichierPerl = "moss.pl";
    const cheminDossierBase = "repo_base";
    const cheminDossierCopi = "repo_copi";

    // Écrire les fichiers avec les codes
    try {
        await fsPromises.writeFile(path.join(cheminDossierBase, "file_base.java"), code1Value);
        await fsPromises.writeFile(path.join(cheminDossierCopi, "file_copi.java"), code2Value);
    } catch (err) {
        res.send("Erreur lors de l'écriture des fichiers:", err);
        return;
    }

    function listerFichiers(cheminDossier) {
        return fs
            .readdirSync(cheminDossier)
            .filter((fichier) => fs.statSync(path.join(cheminDossier, fichier)).isFile())
            .map((fichier) => path.join(cheminDossier, fichier));
    }

    const fichiersBase = listerFichiers(cheminDossierBase);
    const fichiersCopi = listerFichiers(cheminDossierCopi);

    if (fichiersBase.length == 0 || fichiersCopi.length == 0) {
        res.send("Aucun fichier trouvé dans le répertoire");
        return;
    }





    const args = ["perl", cheminFichierPerl, "-l", languageValue, ...fichiersBase, ...fichiersCopi];
    const command = args.join(" ");


    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.send(`Erreur d'exécution : ${error}`);
            return;
        }
        if (stderr) {
            res.send(`Erreur standard : ${stderr}`);
            return;
        }


        res.set("Content-Type", "text/plain");
        res.send(stdout);
    });
});
