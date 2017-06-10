import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core'
import { AuthService } from '../auth.service'
import { RoleDirective, RoleFunction, RoleContext } from './interfaces'
import { DomService } from '../dom/dom.service'

@Directive({ selector: '[secHasRole]' })
export class HasRole extends RoleDirective {

  @Input('secHasRole')
  set roles(roles: string) {
    this._context.$roles = roles
    this.applyDirective()
  }

  @Input()
  set resource(resource: string) {
    this._context.$resource = resource
    this.applyDirective()
  }

  constructor(
    protected element: ViewContainerRef,
    protected domService: DomService,
    private auth: AuthService,
    templateRef: TemplateRef<RoleContext>
  ) {
    super(element, domService, templateRef)
  }

  roleFunction: RoleFunction = (role, resource) => {
    if (this._context.$resource) {
      return this.auth.hasRole(role[0], resource)
    } else {
      return this.auth.hasRole(role[0])
    }
  }

  ngOnInit() {
    this.applyDirective()
  }
}
