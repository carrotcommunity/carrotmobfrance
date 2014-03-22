# carrotmobfrance
### Carrotmob

### Donner les droits utilisateurs à un admin

    mongo
    use carrotmob[dev|test]
    db.carrotmobber.update({email: 'admin_email'}, {$set: {admin: true}});