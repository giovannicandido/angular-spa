# Dialog Interceptor

This interceptor create a notification for any text or html loaded in a ajax call.

Is useful when you need to provide feedback of every actions, and your application is a full 
Single Page App. For instance the user could save, update, delete and create a new record, 
the server returns 200 Http Responses with simple texts like 'Record created', this triggers an
automatic dialog.

If the server return's JSON or any other format, it is ignored.

The default notification use [UIkit](http://getuikit.com) to show messages. You can override that

## Usage

**Default UIkit dialog implementation**

Import DialogInterceptor and DialogService and create a provider for it

```typescript
    import {InterceptorModule, Interceptor} from "angular-http-interceptor"
    import { DialogInterceptor, DialogService } from "angular-http-interceptor/interceptors/dialog"

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
                provide: Interceptor,
                useClass: MyInterceptor,
                multi: true
            },{
                provide: Interceptor,
                useClass: DialogInterceptor,
                multi: true
            }
        ]
        bootstrap: [AppComponent]
        })
        export class AppModule { }
```

Add UIkit to your project, if you use angular-cli you need to update **angular-cli.json** file

     npm install uikit jquery

     "styles": [
        "styles.css",
        "../node_modules/uikit/dist/css/uikit.min.css",
        "../node_modules/uikit/dist/css/uikit.almost-flat.min.css",
        "../node_modules/uikit/dist/css/components/notify.min.css"
      ],
      "scripts": [
        "../node_modules/jquery/dist/jquery.min.js",
        "../node_modules/uikit/dist/js/uikit.min.js",
        "../node_modules/uikit/dist/js/components/notify.min.js"
      ],

**Overrinding the dialog implementation**

Just provide a custom implementantion for DialogService

```typescript
    import {InterceptorModule, Interceptor} from "angular-http-interceptor"
    import { DialogInterceptor, DialogService } from "angular-http-interceptor/interceptors/dialog"

    class MyDialogService implements DialogService {
        showMessage(message: string, status: string): void {
            console.info(message);
        }
        showError(message: string, status: string): void {
            console.error(message);
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
                 provide: DialogService,
                 useClass: MyDialogService
             }, {
                 provide: Interceptor,
                 useClass: MyInterceptor,
                 multi: true
             }, {
                 provide: Interceptor,
                 useClass: DialogInterceptor,
                 multi: true
             }
         ],
         bootstrap: [AppComponent]
         })
         export class AppModule { }
```

I recomend that you see the [source code](./src/interceptor/dialog.ts) for DialogInterceptor to know where it is trigged

# AjaxTimeout Interceptor

This interceptor call a login service if the response is 901. This is a custom response status for timeout expiration.

## Usage
```typescript
    import {InterceptorModule, Interceptor} from "angular-http-interceptor"
    import { AjaxTimeoutInterceptor, LoginService } from "angular-http-interceptor/interceptors/ajaxtimeout";

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
