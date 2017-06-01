import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core'
import { AuthService } from '../auth.service'
import { RoleDirective } from './interfaces'

@Directive({ selector: '[secHasAnyRoles]' })
export class HasAnyRoles extends RoleDirective {
    @Input('secHasAnyRoles') roles: string
    @Input('resource') resource: string

    constructor(
        protected element: ElementRef,
        protected auth: AuthService
    ) {
        super()
    }

    ngOnInit() {
        this.applyDirective()
    }

    roleFunction = (roles: string[], resource?: string): boolean => {
        for (let role of roles) {
            if (this.auth.hasRole(role, resource)) {
                return true
            }
        }
        return false
    }
}
