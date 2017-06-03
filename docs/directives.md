Security Directives
=============================

This directives **hide** or **show** the element from the DOM based on security credentials.

* __secIsAutheticated__ 
* __secIsNotAuthenticated__ 
* __secHasRole__
* __secHasAllRoles__
* __secHasAnyRole__
* __secHasNotRoles__

**Note:** The _hide_ and _show_ of elements are implemented with the **display** style attribute, 
the DOM is still on page. In future releases this behaviour will be pluggable to remove 
the element of the DOM (like ngIf.) 


## secIsAuthenticated

Display the DOM element if user is authenticated, hide if not

### Examples

    <div secIsAuthenticated>This will show if user is autheticated</div>

## secIsNotAuthenticated

Display the DOM element if _NOT_ authenticated, hide otherwise.

### Examples

    <div secIsNotAuthenticated>This will show if user is NOT autheticated anonymous users</div>

## secHasRole

Check if user has role, if not hide element from DOM. 

Parameters: 

* _role_ - The role of the user. Passes as **secHasRole="ROLE"**
* _resource_ - The resource to checke the role. Defaults to the clientId.

**Note:** Works only if a login is associated with the page, if not the expression will always return false. In other words pages not protected by a LoginGuard will always evaluate to false and will *NOT* display the element.


### Examples

Suppose a user in role *ROLE_ADMIN* on *client-id* resource (default, in keycloak means the current application)
    
    <div secHasRole="ROLE_ADMIN">this should display</div>
    <div secHasRole="ROLE_ADMIN" resource="client-id">this should display</div>
    <div secHasRole="ROLE_ADMIN" resource="other">this should NOT display</div>
    <div secHasRole="ROLE_USER" resource="client-id">this should NOT display</div>

## secHasAnyRoles

Check if user is on **Any** of the roles. Roles are separated by **,**

Examples

    <div secHasAnyRoles="ROLE_ADMIN, ACTION_EDIT">this should display</div>

## secHasAllRoles

Check if user in on **All** roles. Roles are separated by **,**

Examples

    <div secHasAllRoles="ACTION_UPDATE, ACTION_EDIT">this should display</div>

## secHasNotRoles

Check if user in **NOT** on **Any** roles. Roles are separated by **,**

Examples

    <div secHasNotRoles="ROLE_USER, ROLE_LIGHT_USER">this should display</div>

# Configuration

Any directive can be configured with the follow properties:

* __action__ Action to be performed. Acepted values are: __hide__, __remove__, __addClass__
* __hideStrategy__ How to hide elements. Accepted values are: __visibility__, __display__
* __secClass__ CSS class to be added in the element.

**Note**: _secClass_ has precedence above all, is you add this configuration at the same time using _action_, the _action_ will be ignored and assumed _addClass_.

Examples

    
    <div secHasRole="ROLE_ADMIN" action="remove">this should be removed</div>
    <div secHasRole="ROLE_ADMIN" action="hide" hideStrategy="visibility">this should not be visible</div>
    <div secHasRole="ROLE_ADMIN" secClass="disabled">this should has class 'disabled'</div>



    
    
    

