

const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

function recupererlestexte() {

  let code1Value = document.getElementById("code1").value;
  let code2Value = document.getElementById("code2").value;

  fs.writeFileSync("repo_base/fichier1.txt", code1Value);
  fs.writeFileSync("repo_copi/fichier2.txt", code2Value);

  const args = ["perl", cheminFichierPerl, "-l", "java", ...fichiersBase, ...fichiersCopi];
  const command = args.join(" ");

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
}
