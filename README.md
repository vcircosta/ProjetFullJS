# ProjetFullJS

1. Création d'une Branche

------- Se déplacer vers la branche principale (main) :
git checkout main

------- S'assurer que la branche principale est à jour :
git pull origin main


------- Créer une nouvelle branche de fonctionnalité à partir de main :
git checkout -b feature/nom-fonctionnalité


2. Pousser une branche vers la branche dev

------- Récupérer les dernières modifications de la branche dev pour éviter les conflits :
git pull origin dev

------- Ajouter les modifications de la branche actuelle au commit :
git add .

------- Créer un commit clair et descriptif :
git commit -m "Ajout du message clair et précis"

------- Pousser la branche vers le dépôt distant :
git push origin feature/nom-fonctionnalité


3. Fusionner une branche locale dans dev ou main

------- Se déplacer vers la branche de destination (dev ou main) :
git checkout dev  # ou main

------- Mettre à jour la branche de destination avec les dernières modifications :
git pull origin dev  ou main

------- Fusionner la branche de fonctionnalité dans la branche de destination :
git merge feature/nom-fonctionnalité

------- Pousser la branche de destination mise à jour vers le dépôt distant :
git push origin dev  ou main

INSTALLATION DE DEPENDANCES :

express : 

npm init -y
npm install express


nodemon :

npm install -g nodemon

autres: 

npm install mongoose dotenv cors swagger-jsdoc swagger-ui-express
