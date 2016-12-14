# Auth Module

This module provides security tools for applications.

It is coupled with [Keycloak] server for the authentication of any application.

## Usage

Get keycloak.js and put on your project (see [Angular CLI](#angular-cli) if you are using angular cli )

Import the module

    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { FormsModule } from '@angular/forms';
    import { HttpModule, Request, Response } from '@angular/http';

    import { AppComponent } from './app.component';

    import {AuthModule, AuthService} from "angular-spa/auth"

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
        provide: AuthService,
        useValue: new AuthService(
            {
            url: "http://localhost:9080/auth",
            realm: "master",
            clientId: "teste"
            })
        }
    ],
    bootstrap: [AppComponent]
    })
    export class AppModule { }

You can inject AuthModule in your project, and use it to authenticate the user. But of course I create a more deep integration with angular. Let's continue:

## Protecting Angular Routes



## <a name="angular-cli"></a> Angular CLI

Using angular cli put the lines bellow on **angular-cli.json**
file:

    "scripts": [
        "../node_modules/keycloak-js/dist/keycloak.min.js"
      ],