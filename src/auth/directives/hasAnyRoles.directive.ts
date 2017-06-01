import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core'
import { AuthService } from '../auth.service'
import { hideFromDom, showHidden } from '../../dom/dom.service'
import { splitRoles } from './functions'

@Directive({ selector: '[secHasAnyRoles]' })
export class HasAnyRoles {
    @Input('secHasAnyRoles') roles: string
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
        let show = this.hasAnyRoles(rolesParameter, this.resource)
        if (show) {
            showHidden(this.element)
        } else {
            hideFromDom(this.element)
        }
    }

    hasAnyRoles(roles: string[], resource?: string) {
        for (let role of roles) {
            if (this.auth.hasRole(role, resource)) {
                return true
            }
        }
        return false
    }
}
