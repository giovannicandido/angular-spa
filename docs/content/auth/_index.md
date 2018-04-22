+++
date = "2017-06-11T12:01:10-03:00"
icon = "<b>2. </b>"
title = "Auth Features"
chapter = true
weight = 50

+++

# Authentication And Authorization

Authentication of users and authorization of roles for enterprise applications.

{{% notice tip %}}
This module is integrated with [Keycloak](http://www.keycloak.org) which provides awesome features for user management
and makes write Angular applications a breeze.
{{% /notice %}}


This module includes:

* User account service. This user service loads information about the current login in user. Intentionally
you don't have things for user management like: create, update, password reset, because my projects use
a separate Single Sign On server [Keycloak](https://keycloak.org) that ships with all and way more.
* Directives for security template display. This let you conditionally display user UI elements
based on user roles.
