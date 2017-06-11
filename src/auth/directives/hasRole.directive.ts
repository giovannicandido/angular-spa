import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core"
import { AuthService } from "../auth.service"
import { RoleContext, RoleDirective, RoleFunction } from "./interfaces"
import { DomService } from "../dom/dom.service"

@Directive({ selector: '[secHasRole]' })
export class HasRole extends RoleDirective {

  constructor(
    protected element: ViewContainerRef,
    protected domService: DomService,
    private auth: AuthService,
    templateRef: TemplateRef<RoleContext>
  ) {
    super(element, domService, templateRef)
  }

  @Input()
  set secHasRole(roles: any) {
    this._context.$roles = roles
    this.applyDirective()
  }

  @Input('secHasRoleResource')
  set resource(resource: string) {
    this._context.$resource = resource
    this.applyDirective()
  }

  @Input('secHasRoleAction')
  set action(action: string) {
    this._context.$action = action
    this.applyDirective()
  }

  @Input('secHasRoleCssClass')
  set cssClass(cssClass: string) {
    this._context.$cssClass = cssClass
    this.applyDirective()
  }



  roleFunction: RoleFunction = (role, resource) => {
    if (resource) {
      return this.auth.hasRole(role[0], resource)
    } else {
      return this.auth.hasRole(role[0])
    }
  }
}
