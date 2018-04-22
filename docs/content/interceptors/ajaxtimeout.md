+++
title = "Ajaxtimeout"
date =  2018-04-22T16:47:17-03:00
weight = 100
+++

# AjaxTimeout Interceptor

This interceptor call a login service if the response is 901. This is a custom response status for timeout expiration.

## Usage
```typescript
    import {InterceptorModule, Interceptor} from "angular-http-interceptor"
    import { AjaxTimeoutInterceptor, LoginService } from "angular-spa/interceptors/ajaxtimeout";

    class MyLoginService implements LoginService {
        login() {
            window.location = "/sso/login";
        }
        // This method will be called on AjaxTimeout
        loginExpired() {
            UIkit.confirm("Your session has expired, do you want login?", () => {
                this.login();
            })
            
        }
    }

    @NgModule({
         declarations: [
             AppComponent
         ],
         imports: [
             BrowserModule,
             FormsModule,
             HttpModule,
             InterceptorModule
         ],
         providers: [
            {
                 provide: LoginService,
                 useClass: MyLoginService
            }, {
                provide: Interceptor,
                useClass: AjaxTimeoutInterceptor,
                multi: true
            }
         ],
         bootstrap: [AppComponent]
         })
         export class AppModule { }
```
