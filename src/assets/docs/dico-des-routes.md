# DICTIONNAIRE DES ROUTES

## FRONT

| Url | Méthode | Cible | Commentaire |
|--|--|--|--|
|/||Page d'accueil|Toutes les pages sont protégées et nécessitent une authentification|
|/utilisateur/mes-ordres-de-mission|||Le slug correspont à l'identifiant unimes de l'utilisateur (donc une string)|
|/utilisateur/mes-documents||| Page des pièces justificatives|
|/utilisateur/mes-états-de-frais|||Liste des États de frais et liquidatifs|
|/utilisateur/mes-documents/refus-de-mission|||Notification de refus définitif d'OM|
|/utilisateur/mes-documents/ajouter-un-véhicule|||Ajouter un véhicule aux informations personnelles|
|/utilisateur/mes-documents/modifier-un-véhicule/{id}|||Modifier un véhicule dans les informations personnelles|
|/utilisateur/mes-documents/état-liquidatif-à-signer|||Formulaire de signature de l'état liquidatif|
|/utilisateur/mes-documents/demander-un-déplacement/{id}|||Faire une demande de déplacement au service financier|
|/||||
|/||||
|/||||
|/documents/{slug}/nouveau?étape={numéro d'étape}|||Suivi des étapes directement dans l'url - slug = 'ordre-de-mission', 'état-de-frais', 'autorisation-de-véhicule' (pas besoin d'étape pour le véhicule)|
|/documents/{slug}/{id}/modifier?étape={numéro d'étape}|||Suivi des étapes directement dans l'url|
|/documents/{slug}/valider||| Au clic sur le bouton "Valider l'Om / l'Ef"|
|/documents/{slug}/nouveau-document-créé||| Page de succès lorsque le document est signé et enregistré en base de donnée|
|/||||
|/||||
|/||||
|/||||
|/gestionnaire/{role}/documents-à-signer||||
|/gestionnaire/{role}/valider-un-document/{slug}/{id}||||
|/gestionnaire/{role}/refuser-un-ordre-de-mission/{id}||||
|/gestionnaire/||||
|/gestionnaire/||||
|/||||
|/||||
|/dafc/états-de-frais||||
|/dafc/états-de-frais/contrôler/{id}||||
|/dafc/états-de-frais/valider/{id}||||
|/dafc/ordres-de-mission||||
|/dafc/ordres-de-mission/saisir-un-ordre/{id}||||

## BACK

## API
