+++
date = "2017-06-11T13:45:20-03:00"
title = "User Profile"
toc = true
weight = 5

+++

You can get the username, fullName and other informations from keycloak

Just inject **AuthService** and use **getLoginAccout()** method with return a **Observable<Account>**
    
    import { AuthService } from 'angular-spa/auth'
    
    export class AppComponent {
      constructor(authService: AuthService) {
  
      }
      
      loadProfile() {
        this.authService.getLoginAccount().subscribe(account => {
          this.account = account
        })
      }
    }

**AuthService** has methods to *login*, *logout*, *isUserLoggedIn*, *getLoginAccount* and others.
It also provide access to the underline keycloak object that has all KeycloakJS API.

See [https://keycloak.gitbooks.io/securing-client-applications-guide/content/v/2.4/topics/oidc/javascript-adapter.html](https://keycloak.gitbooks.io/securing-client-applications-guide/content/v/2.4/topics/oidc/javascript-adapter.html)
