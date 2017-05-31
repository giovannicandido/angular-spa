# Security Directives

* __secIsAutheticated__ Display the DOM element if user is authenticated, hide if not
* __secIsNotAuthenticated__ Display the DOM element if _NOT_ authenticated, hide otherwise.
* __hasRole__ Check if user has role, if not hide element from DOM. Parameters: *role* the role of the user *resource* the resource to checke the role. Defaults to the clientId.

The _hide_ and _show_ of elements are implemented with the **display** style attribute, 
the DOM is still on page. In future releases this behaviour will be pluggable to remove 
the element of the DOM (like ngIf.) 

## Examples

    <div secIsAuthenticated>This will show if user is autheticated</div>
    <div secIsNotAuthenticated>This will show if user is NOT autheticated anonymous users</div>
    
Suppose a user in role *ROLE_ADMIN* on *client-id* resource (default, in keycloak means the current application)
    
    <div hasRole="ROLE_ADMIN">this should display</div>
    <div hasRole="ROLE_ADMIN" resource="client-id">this should display</div>
    <div hasRole="ROLE_ADMIN" resource="other">this should NOT display</div>
    <div hasRole="ROLE_USER" resource="client-id">this should NOT display</div>