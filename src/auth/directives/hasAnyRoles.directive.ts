import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core"
import { AuthService } from "../auth.service"
import { RoleContext, RoleDirective } from "./interfaces"
import { DomService } from "../dom/dom.service"

@Directive({ selector: '[secHasAnyRoles]' })
export class HasAnyRoles extends RoleDirective {

    @Input('secHasAnyRoles')
    set hasAllRoles(roles: string) {
        this._context.$roles = roles
        this.applyDirective()
    }
    @Input('secHasAnyRolesResource')
    set resource(resource: string) {
        this._context.$resource = resource
        this.applyDirective()
    }

    @Input('secHasAnyRolesAction')
    set action(action: string) {
        this._context.$action = action
        this.applyDirective()
    }

    @Input('secHasAnyRolesCssClass')
    set cssClass(cssClass: string) {
        this._context.$cssClass = cssClass
        this.applyDirective()
    }

    constructor(
        protected element: ViewContainerRef,
        protected domService: DomService,
        protected auth: AuthService,
        templateRef: TemplateRef<RoleContext>

    ) {
        super(element, domService, templateRef)
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
