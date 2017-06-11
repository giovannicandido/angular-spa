+++
date = "2017-06-11T12:50:10-03:00"
title = "Auth Module"
weight = 4

+++

Authentication and authorisation of any application using [Keycloak](http://www.keycloak.org) project.


## Usage

This module depends on **keycloak.js** 
[javascript adapter](https://keycloak.gitbooks.io/documentation/securing_apps/topics/oidc/javascript-adapter.html), 
which is not included as a dependency, because you have many options in how to add it.

But you probably is using Angular CLI to generate your _client_ projects. See [Angular CLI Setup]({{< relref "#angular-cli-setup" >}})

### Import the module

Import the **AuthModule** and create a provider for **InitOptions** with the configuration of 
[Keycloak client](https://keycloak.gitbooks.io/documentation/server_admin/topics/clients.html). 

You should create a **openid-connect** client type with access type **public**. 
If you are using angular-cli, the app Root URL is http://localhost:4200

In the example below, the module is configured with a keycloak server running on **http://localhost:9080/auth** URL
 with a client-id of **con-client** in the realm **master**.


    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { FormsModule } from '@angular/forms';
    import { HttpModule, Request, Response } from '@angular/http';

    import { AppComponent } from './app.component';

    import {AuthModule, InitOptions} from "angular-spa/auth"

    @NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AuthModule
    ],
    providers: [
       {
         provide: InitOptions,
         useValue: {
             url: 'http://localhost:9080/auth',
             realm: 'master',
             clientId: 'con-client'
         }
       }
      ],
    bootstrap: [AppComponent]
    })
    export class AppModule { }

You can now inject **AuthService** in your components or services, and use it to authenticate the user. 
But of course, is better to use the [Directives]({{< ref "auth/directives.md" >}}) 
and [Router Guards]({{< ref "auth/protecting-angular-routes.md" >}}) of the module.


## Angular CLI Setup

Install __keycloak-js__ npm package

    npm install --save keycloak-js

Put the lines bellow on **.angular-cli.json**
file:

    "scripts": [
        "../node_modules/keycloak-js/dist/keycloak.min.js"
      ],