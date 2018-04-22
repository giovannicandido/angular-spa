+++
date = "2017-06-11T13:05:10-03:00"
title = "Directives"
weight = 55

+++


This directives **remove** or **add** the element from the DOM based on security credentials.

* __*secIsAutheticated__ 
* __*secIsNotAuthenticated__ 
* __*secHasRole__
* __*secHasAllRoles__
* __*secHasAnyRole__
* __*secHasNotRoles__

{{% notice info %}}
**Note:** In all directives, you can also opt-in to add a class in the element, instead of removing it. Useful if you want
to keep the element in DOM. For example to just disable a button using css class _disabled_
{{% /notice %}}


To opt-in for this behavior check [Configuration]({{< relref "#configuration" >}})

{{% notice info %}}
**Second Note:** Works only if a login is associated with the page, if not the expression will always return false. 
In other words pages Not protected by a LoginGuard will always evaluate to false and will *NOT* display the element.
That is true for all directives
{{% /notice %}}

## secIsAuthenticated

Display the DOM element if user is authenticated, remove if not

### Examples

```html

<div *secIsAuthenticated>This will show if user is autheticated</div>

```
    

## secIsNotAuthenticated

Display the DOM element if _NOT_ authenticated (anonymous users), remove otherwise.

### Examples

```html

<div *secIsNotAuthenticated>This will show if user is NOT autheticated</div>

```

## secHasRole

Check if user has role, if not hide element from DOM. 

Parameters: 

* _role_ - The role of the user. Need to be a string
* _resource_ - The resource to check the role. Defaults to the clientId.


### Examples

Suppose a user in role *ROLE_ADMIN* on *client-id* resource (default, in keycloak means the current application)

```html
    <div *secHasRole="'ROLE_ADMIN'">this should display</div>
    <div *secHasRole="'ROLE_ADMIN'; resource 'client-id'">this should display</div>
    <div *secHasRole="'ROLE_ADMIN'; resource 'other'">this should NOT display</div>
    <div *secHasRole="'ROLE_USER'; resource 'client-id'">this should NOT display</div>
```
## secHasAnyRoles

Check if user is on **Any** of the roles. Roles are a string separated by **,** or a array of strings

Examples
```html
    <div *secHasAnyRoles="'ROLE_ADMIN, ACTION_EDIT'">this should display</div>
    <div *secHasAnyRoles="rolesArray">this should display</div>
```
```typescript
 export class PageComponent {
      rolesArray = ['ROLE_ADMIN', 'ACTION_EDIT']
 }
```
   

## secHasAllRoles

Check if user in on **All** roles. Roles is a string separated by **,** or a array of strings

Examples
```html
    <div *secHasAllRoles="'ACTION_UPDATE, ACTION_EDIT'">this should display</div>
```

## secHasNotRoles

Check if user in **NOT** on **Any** roles. Roles is a string separated by **,** or  a array of strings

Examples
```html
    <div *secHasNotRoles="'ROLE_USER, ROLE_LIGHT_USER'">this should display</div>
```

# Configuration

Any directive can be configured with the follow properties:

* __action__ Action to be performed. Acepted values are: __remove__, __addClass__. Defaults to __remove__
* __resource__ Resource to check the element. Keycloak JS default is __client-id__
* __cssClass__ CSS class to be added in the element, instead of remove it from DOM. Defaults to __disabled__


Examples

```html
<div *secHasRole="'ROLE_ADMIN'; action 'remove'">this should be removed</div>
<div *secHasAnyRoles="'ROLE_ADMIN'; action 'addClass'; cssClass 'invisible' ">this should has class <b>invisible</b></div>
<div *secHasRole="'ROLE_ADMIN' action 'addClass'">this should has class <b>disabled</b></div>
```

You can also configure the global behaviour. Overriding the provider for **SecDirectiveConfig**

```typescript

    import { NgModule } from '@angular/core';
    
    import { AppComponent } from './app.component';
    
    import {AuthModule, SecDirectiveConfig, SecAction, InitOptions} from "angular-spa/auth"
    
    export class CustomSecDirectiveConfig extends SecDirectiveConfig {
        action: SecAction = 'addClass'
        defaultClass = 'myClass'
    }
    
    @NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
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
       }, {
         provide: SecDirectiveConfig,
         useClass: CustomSecDirectiveConfig
       }
      ],
    bootstrap: [AppComponent]
    })
    export class AppModule { }

```
    
    
    

