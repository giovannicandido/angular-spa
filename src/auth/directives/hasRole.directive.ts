import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core'
import { AuthService } from '../auth.service'
import { RoleDirective, RoleFunction, RoleContext } from './interfaces'
import { DomService } from '../dom/dom.service'

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



  roleFunction: RoleFunction = (role, resource) => {
    if (resource) {
      return this.auth.hasRole(role[0], resource)
    } else {
      return this.auth.hasRole(role[0])
    }
  }
}
