import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core"
import { AuthService } from "../auth.service"
import { DomService } from "../dom/dom.service"
import { RoleContext } from "./interfaces"

/**
 * This directive is like *ngIf.
 * The DOM is renderer only if user is authenticated
 * For the oposite use **secIsNotAuthenticated**
 */
@Directive({ selector: '[secIsAuthenticated]' })
export class SecIsAuthenticated {

  private _context = new RoleContext()

  constructor(
    protected element: ViewContainerRef,
    protected domService: DomService,
    private auth: AuthService,
    private templateRef: TemplateRef<RoleContext>
  ) {
  }

  @Input('secIsAuthenticated')
  set action(config: any) {
    if (config && config.action) {
      this._context.$action = config.action

    }
    if (config && config.cssClass) {
      this._context.$cssClass = config.cssClass
    }
    this.applyDirective()
  }

  applyDirective() {
    this.element.clear()
    this.auth.isUserLoggedIn().then(logged => {
       this.domService.performAction(this.element, this.templateRef, this._context, logged)
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

  private _context = new RoleContext()

  constructor(
    protected element: ViewContainerRef,
    protected domService: DomService,
    private auth: AuthService,
    private templateRef: TemplateRef<RoleContext>
  ) {
  }

  @Input('secIsNotAuthenticated')
  set action(config: any) {
    if (config && config.action) {
        this._context.$action = config.action
    }
    if (config && config.cssClass) {
        this._context.$cssClass = config.cssClass
    }

    this.applyDirective()
  }
  applyDirective() {
    this.element.clear()
    this.auth.isUserLoggedIn().then(logged => {
      this.domService.performAction(this.element, this.templateRef, this._context, !logged)
    })
  }
}
