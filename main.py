import subprocess
import os

# Chemin d'accès au fichier Moss
chemin_fichier_perl = "moss.pl"

# Chemin d'accès aux dossiers de base et de copie
chemin_dossier_base = "repo_base"
chemin_dossier_copi = "repo_copi"

# Arguments de la commande Moss
arguments = ["perl", chemin_fichier_perl, "-l", "java", "-d"]

# Ajouter les modèles de correspondance pour les fichiers de base et de copie aux arguments
arguments.append(os.path.join(chemin_dossier_base, "set1", "*"))
arguments.append(os.path.join(chemin_dossier_copi, "set1", "*"))

# Exécutez la commande Moss
resultat = subprocess.run(arguments, stdout=subprocess.PIPE)

# Affichez la sortie
print(resultat.stdout.decode("utf-8"))
