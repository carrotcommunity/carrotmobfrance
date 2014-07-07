# Carrotmob

Co-créer en tant que communauté l'application web internationale libre et ouverte qui permet d'organiser des Carrotmob de façon ludique, mobiliser nos amis, soutenir et participer aux campagnes de façon interconnectée aux principaux réseaux sociaux

Profils recherchés :
- Développeurs back-end Node.js, Sails.js, MongoDB.
- Développeurs front-end HTML5, CSS3, Bootstrap, AngularJS.
- Testeurs.

Licence : MIT

# Documentation

## Donner les droits utilisateurs à un admin
    mongo
    use carrotmob[dev|test|prod]
    db.carrotmobber.update({email: '#admin_email#'}, {$set: {admin: true}});
