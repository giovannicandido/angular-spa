# Security Directives

__secIsAutheticated__ Display the DOM element if user is authenticated, hide if not
__secIsNotAuthenticated__ Display the DOM element if _NOT_ authenticated, hide otherwise.

The _hide_ and _show_ of elements are implemented with the **display** style attribute, 
the DOM is still on page. In future releases this behaviour will be pluggable to remove 
the element of the DOM (like ngIf.) 

## Examples

    <div secIsAuthenticated>This will show if user is autheticated</div>
    <div secIsNotAuthenticated>This will show if user is NOT autheticated anonymous users</div>