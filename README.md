# PhishingAwareness

Atelier interactif en français pour apprendre à reconnaître les faux messages, même quand ils semblent venir d’une entreprise connue ou d’un proche.

## Lancer en local

Dans ce dossier, lancez un serveur statique :

```powershell
py -3 -m http.server 8765 --bind 127.0.0.1
```

Ouvrez ensuite <http://127.0.0.1:8765> dans votre navigateur.

Le site utilise uniquement `index.html`, `styles.css` et `script.js`. Les cinq messages sont inventés, même quand ils portent le nom d’une entreprise connue. Les liens et le faux fichier ouvrent une leçon dans la page et ne téléchargent rien.

Le premier message Amazon lance une démonstration agrandie en cinq étapes : l’adresse de l’expéditeur, l’adresse derrière le bouton, la demande urgente de carte, la commande inattendue et la vérification par son chemin habituel. Les quatre autres messages laissent le visiteur décider. Après chaque réponse, de grandes cartes rouges et vertes expliquent les signes. Si la première réponse est fausse, la démonstration recommence.

Les exemples comprennent des noms familiers à Montréal et au Québec : Amazon, Hydro-Québec, Bell et la STM, ainsi qu’un message imitant une amie. Il y a quatre pièges différents et un message normal : faux site, faux numéro de téléphone, fichier inattendu, usurpation d’une amie et avis normal de la STM. Les adresses se terminant par `.example` sont réservées à cet exercice.

Quand on place la souris sur un lien, son adresse apparaît au-dessus de l’aperçu du navigateur, dans un encadré neutre qui ne révèle pas la réponse par sa couleur. Le guide du premier message garde le lien visible et agrandit sa comparaison avec cette adresse. Dans un message ouvert, la petite adresse de l’expéditeur s’agrandit au survol ou quand on la sélectionne au clavier.

Les réponses, la progression et l’état lu/non lu sont conservés dans ce navigateur. Tous les courriels commencent non lus et passent à « lus » seulement quand on les ouvre ; le nombre de messages non lus est affiché dans la barre de gauche. Les courriels terminés deviennent verts ou rouges dans la liste. Après avoir lu l’explication, « Terminé — retour à la boîte » ramène à la liste. Une courte pluie de confettis marque la fin des cinq exemples. « Recommencer l’exercice » remet tout à zéro.

Les adresses d’envoi montrées dans les messages sont illustratives. Les noms des sites connus servent de point de comparaison ; une adresse d’envoi visible ne prouve pas à elle seule qu’un message est authentique.

La page « Conseils » présente quinze réflexes simples, dont les gestes à faire après un clic ou le partage de renseignements. Références : [Centre canadien pour la cybersécurité](https://www.cyber.gc.ca/fr/orientation/ne-mordez-pas-lhamecon-reconnaitre-et-prevenir-les-attaques-par-hameconnage), [Centre antifraude du Canada](https://centreantifraude.ca/scams-fraudes/phishing-hameconnage-fra.htm) et [signaler une fraude](https://centreantifraude.ca/report-signalez-fra.htm).
