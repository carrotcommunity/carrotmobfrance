# carrotmobfrance
## Carrotmob

## Donner les droits utilisateurs à un admin

    mongo
    use carrotmob[dev|test]
    db.carrotmobber.update({email: '#admin_email#'}, {$set: {admin: true}});



## Configuration locale (config/local.js)
### development
    adapters: {
      mongo: {
        database: 'carrotmobdev'
      }
    },
    express: {
      fbConfig: {
        clientID: "668328976558876",
        clientSecret: "fa9ef89b37652c55d9c156040c336942",
        callbackURL: "http://dev.carrotmob.fr/auth/facebook/callback"
      }
    }
### test
    adapters: {
      mongo: {
        database: 'carrotmobtest'
      }
    },
    express: {
      fbConfig: {
        clientID: "1388878811336973",
        clientSecret: "fc570cad359c3d543b5d7b1cbb18cc13",
        callbackURL: "http://test.carrotmob.fr/auth/facebook/callback"
      }
    }
### production
    adapters: {
      mongo: {
        database: 'carrotmob'
      }
    },
    express: {
      fbConfig: {
        clientID: "289471504541619",
        clientSecret: "eb34c24658e64ca075438e1295d1acaf",
        callbackURL: "http://www.carrotmob.fr/auth/facebook/callback"
      }
    }
