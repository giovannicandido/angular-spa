import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core'
import { AuthService } from '../auth.service'

function hideFromDom(element: ElementRef) {
  element.nativeElement.style.display = 'none'
}
function showHidden(element: ElementRef) {
  element.nativeElement.style.display = 'inherit'
}

/**
 * This directive is like *ngIf. 
 * The DOM is hidden only if user is authenticated
 * For the oposite use **secIsNotAuthenticated**
 */
@Directive({ selector: '[secIsAuthenticated]' })
export class SecIsAuthenticated {

  constructor(
    private element: ElementRef,
    private auth: AuthService
  ) {
    hideFromDom(element)
   }

  ngOnInit() {
    this.auth.isUserLoggedIn().then(logged => {
      if (logged) {
        showHidden(this.element)
      } else {
        hideFromDom(this.element)
      }
    })
  }

}

/**
 * This directive is like *ngIf. 
 * The DOM is rendered only if user is NOT authenticated
 * For the oposite use **secIsAuthenticated**
 */
@Directive({ selector: '[secIsNotAuthenticated]' })
export class SecIsNotAuthenticated {

  constructor(
    private element: ElementRef,
    private auth: AuthService
  ) { 
    hideFromDom(element)
  }

  ngOnInit() {
    this.auth.isUserLoggedIn().then(logged => {
      if (!logged) {
        showHidden(this.element)
      } else {
        hideFromDom(this.element)
      }
    })
  }

}