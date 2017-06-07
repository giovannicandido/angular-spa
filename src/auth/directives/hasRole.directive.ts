import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core'
import { AuthService } from '../auth.service'
import { RoleDirective, RoleFunction } from './interfaces'

@Directive({ selector: '[secHasRole]' })
export class HasRole extends RoleDirective  {

  @Input('secHasRole') protected roles: string
  @Input() protected resource: string

  constructor(
    protected element: ElementRef,
    private auth: AuthService,
  ) {
    super()
  }

  roleFunction: RoleFunction = (role, resource) => {
    if (this.resource) {
      return this.auth.hasRole(role[0], resource)
    } else {
      return this.auth.hasRole(role[0])
    }
  }

  ngOnInit() {
    this.applyDirective()
  }
}
