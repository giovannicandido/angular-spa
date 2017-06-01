import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core'
import { AuthService } from '../auth.service'
import { RoleDirective } from './interfaces'

@Directive({ selector: '[secHasAllRoles]' })
export class HasAllRoles extends RoleDirective {
    @Input('secHasAllRoles') roles: string
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

    roleFunction = (roles: string[], resource?: string) => {
        for (let role of roles) {
            if (!this.auth.hasRole(role, resource)) {
                return false
            }
        }
        return true
    }
}
