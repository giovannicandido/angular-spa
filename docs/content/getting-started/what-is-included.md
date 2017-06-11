+++
date = "2017-06-11T12:15:26-03:00"
title = "What is included"
toc = true
weight = 8

+++

This project includes a few utilities, provided by the different modules

## Auth Module

[Docs]({{< ref "auth/auth-module.md" >}})

* User account service. This user service loads information about the current login in user. Intentionally
you don't have things for user management like: create, update, password reset, because my projects use
a separate Single Sign On server [Keycloak](https://keycloak.org) that ships with all and way more.
* Directives for security template display. This let you conditionally display user UI elements
based on user roles.

## UI Module

* UI elements - LoadingBar, Menus, and other little things. This are more specific for the
projects I create. Do not interpret me wrong here, I'm not trying to compete with huge UI frameworks,
but somethings are just too repetitive. We will not put unnecessary dependencies 
to make this project very slim for everyone.

Other useful project is [angular-http-interceptor](https://github.com/atende/angular-http-interceptor), that is a 
dependency of this project.
