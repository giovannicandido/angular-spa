+++
date = "2017-06-11T13:20:30-03:00"
title = "Protecting Angular Routes"
toc = true
weight = 52

+++

To protect Angular Routes, use the **LoginGuard** service

For example, in **app.routes.ts**

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

