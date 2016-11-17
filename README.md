# angular-http-interceptor

![Build Status](https://travis-ci.org/atende/angular-http-interceptor.svg?branch=master)

A Single point of extension for Http Interceptors in angular 2 projects

The big advantage is that you can provide your Interceptors very easilly,
and create standard interceptors for other projects.

I plan to add a LoadingBarInterceptor, a DialogInterceptor, and a SessionExpirationInterceptor.
All of then optional, you can write your own.

# How to use

    import { NgModule } from "@angular/core"
    import { HttpModule } from "@angular/http"
    import { InterceptorModule, Interceptor } from "angular-http-interceptor" 
    
    class MyInterceptor implements Interceptor {
        requestCreated(request: any) {
            console.info("ExampleInterceptor - RequestCreated: " + request)
        }

        requestEnded(res: any) {
            console.info("ExampleInterceptor - RequestEnded: " + res)
        }

        requestError(err: any) {
            console.error("ExampleInterceptor - RequestError: " + err)
        }
    }

    /**
     * Important: HttpModule must be declared before InterceptorModule.
     * Because Interceptor module overrides things in HttpModule, and not doing
     * so, result in the contrary, i.e, HttpModule overriding InterceptorModule.
     */
    @NgModule({
        imports: [ 
            HttpModule,
            InterceptorModule,
         ]
        providers: [
            {
                provide: Interceptor,
                useClass: MyInterceptor,
                multi: true
            }
        ]
    })
    export class AppModule {

    }

    import { Component, OnInit, OnDestroy} from '@angular/core';
    import { Http } from "@angular/http"
    import { InterceptorHandler } from "angular-http-interceptor"


    @Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
    export class AppComponent implements OnInit, OnDestroy {
        title = 'app works!';

        constructor(private http: Http, private interceptorHandler: InterceptorHandler) {

        }
        ngOnInit() {
            // this will be intercepted
            this.http.get("interceptor").subscribe(r => {
            console.log("Result")
            });
        }
        // Clean Interceptors Subscriptions
        ngOnDestroy(){
            this.interceptorHandler.dispose();
        }
    }


Now every request made with the official @angular/http Http class is intercepted

## Background

I create a subclass of Http client and override it with a custom provider.

The CustomHttp class, create 3 EventEmitter's and emit events for **requestStarted**,
**requestEnded** and **requestError**. 

All interceptors methods are called asynchronously, there is NO guarentee of order of course.

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

    import { DialogInterceptor, DialogService } from "angular-http-interceptor/interceptor/dialog"

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
            }, 
            DialogService, 
            {
                provide: Interceptor,
                useClass: DialogInterceptor,
                multi: true
            }
        ],
        bootstrap: [AppComponent]
        })
        export class AppModule { }

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

    import { DialogInterceptor, DialogService } from "angular-http-interceptor/interceptor/dialog"

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
                 provide: Interceptor,
                 useClass: MyInterceptor,
                 multi: true
             }, 
             {
                 provide: DialogService,
                 useClass: MyDialogService
             }, {
                 provide: Interceptor,
                 useClass: DialogInterceptor,
                 multi: true
             }
         ],
         bootstrap: [AppComponent]
         })
         export class AppModule { }

I recomend that you see the [source code](./src/interceptor/dialog.ts) for DialogInterceptor to know where it is trigged

# AjaxTimeout Interceptor

This interceptor cal a login service if the response is 901. This is a custom response status for timeout expiration.

## Usage

    import { AjaxTimeoutInterceptor, LoginService } from "angular-http-interceptor/interceptor/ajaxtimeout";

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
                 provide: Interceptor,
                 useClass: AjaxTimeoutInterceptor,
                 multi: true
             }, {
                 provide: LoginService,
                 useClass: MyLoginService
             }
         ],
         bootstrap: [AppComponent]
         })
         export class AppModule { }

