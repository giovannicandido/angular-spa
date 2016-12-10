# User Account

Provide security authentication based on [Keycloak](http://keycloak.org) protected apps

Show me the code:

app.module.ts

    import { BrowserModule } from "@angular/platform-browser"
    import { NgModule } from "@angular/core"
    import { FormsModule } from "@angular/forms"
    import { HttpModule } from "@angular/http"
    import { RouterModule } from "@angular/router"
    import { AppComponent } from "./app.component"
    import { routes, routeDeclarations } from "./app.routes"
    import { AngularSpaModule, AuthService, LoginGuard } from "angular-spa"

    @NgModule({
    declarations: [
        AppComponent,
        routeDeclarations
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule,
        AngularSpaModule,
        routes
    ],
    providers: [
        {
        provide: AuthService,
        useValue: new AuthService({
            url: 'http://localhost:9080/auth',
            realm: 'master',
            clientId: 'con-client'
        })
        },
        LoginGuard
    ],
    bootstrap: [AppComponent]
    })
    export class AppModule {
    }

First we import **AngularSpaModule, AuthService and LoginGuard** then we provide
**AuthService** with the url, realm and clientId for the keycloak auth server

AuthService will check if person is on Single Single on

To protect the resources use the LoginGuard:

app.routes.ts

    import { Routes, RouterModule } from "@angular/router"
    import { HomeComponent } from "./home/home.component"
    import { RegistrationsComponent } from "./registrations/registrations.component"
    import { ConferencesComponent } from "./conferences/conferences.component"
    import { DocumentationComponent } from "./documentation/documentation.component"
    import { ProfileComponent } from "./profile/profile.component"
    import { LoginGuard } from "angular-spa/auth";


    export const appRoutes: Routes = [
    {path: '', component: HomeComponent, data: {title: 'Home'}},
    {path: 'registrations',
        component: RegistrationsComponent,
        data: {title: 'Registrations'},
        canActivate: [LoginGuard]
    },
    {path: 'conferences',
        component: ConferencesComponent,
        data: {title: 'Conferences'},
        canActivate: [LoginGuard]
    },
    {path: 'documentation',
        component: DocumentationComponent,
        data: {title: 'Documentation'},
        canActivate: [LoginGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        data: {title: 'Profile'},
        canActivate: [LoginGuard]
    }
    ]

    export const routeDeclarations = appRoutes.map(r => r.component)
    export const routes = RouterModule.forRoot(appRoutes)

## Getting User Profile

You can get the username, fullName and other informations from keycloak

**AuthService** as methods to login, logout, isUserLoggedIn, getLoginAccount.
It also provide access to the underline keycloak object that has all KeycloakJS API.

See [https://keycloak.gitbooks.io/securing-client-applications-guide/content/v/2.4/topics/oidc/javascript-adapter.html](https://keycloak.gitbooks.io/securing-client-applications-guide/content/v/2.4/topics/oidc/javascript-adapter.html)

## Authentication Directives:

See [directives](./directives.md)