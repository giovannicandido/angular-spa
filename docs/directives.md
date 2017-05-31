Security Directives
=============================

This directives **hide** or **show** the element from the DOM based on security credentials.

* __secIsAutheticated__ 
* __secIsNotAuthenticated__ 
* __secHasRole__ 

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

## secHasAnyRole

## secClass



    
    
    

