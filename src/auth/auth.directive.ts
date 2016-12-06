import { Directive, TemplateRef, ViewContainerRef } from '@angular/core'
import { AuthService } from './auth.service'

/**
 * This directive is like *ngIf. 
 * The DOM is rendered only if user is authenticated
 * For the oposite use **secIsNotAuthenticated**
 */
@Directive({selector: '[secIsAuthenticated]'})
export class SecIsAuthenticated {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.isUserLoggedIn().then(logged => {
      if(logged){
        this.viewContainer.createEmbeddedView(this.templateRef)
      }else {
        this.viewContainer.clear()
      }
    })
  }

}

/**
 * This directive is like *ngIf. 
 * The DOM is rendered only if user is NOT authenticated
 * For the oposite use **secIsAuthenticated**
 */
@Directive({selector: '[secIsNotAuthenticated]'})
export class SecIsNotAuthenticated {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.isUserLoggedIn().then(logged => {
      if(!logged){
        this.viewContainer.createEmbeddedView(this.templateRef)
      }else {
        this.viewContainer.clear()
      }
    })
  }

}
