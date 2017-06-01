import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core'
import { AuthService } from '../auth.service'
import { hideFromDom, showHidden } from '../../dom/dom.service'
import { splitRoles } from './functions'

@Directive({ selector: '[secHasAllRoles]' })
export class HasAllRoles {
    @Input('secHasAllRoles') roles: string
    @Input('resource') resource: string

    constructor(
        private element: ElementRef,
        private auth: AuthService
    ) {
    }

    ngOnInit() {
        this.applyDirective()
    }

    applyDirective() {
        let rolesParameter = splitRoles(this.roles)
        let show = this.hasAllRoles(rolesParameter, this.resource)
        if (show) {
            showHidden(this.element)
        } else {
            hideFromDom(this.element)
        }
    }

    hasAllRoles(roles: string[], resource?: string) {
        for (let role of roles) {
            if (!this.auth.hasRole(role, resource)) {
                return false
            }
        }
        return true
    }
}
