import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core"
import { AuthService } from "../auth.service"
import { RoleContext, RoleDirective } from "./interfaces"
import { DomService } from "../dom/dom.service"

@Directive({ selector: '[secHasAllRoles]' })
export class HasAllRoles extends RoleDirective {

    @Input('secHasAllRoles')
    set hasAllRoles(roles: string) {
        this._context.$roles = roles
        this.applyDirective()
    }
    @Input('secHasAllRolesResource')
    set resource(resource: string) {
        this._context.$resource = resource
        this.applyDirective()
    }

    @Input('secHasAllRolesAction')
    set action(action: string) {
        this._context.$action = action
        this.applyDirective()
    }

    @Input('secHasAllRolesCssClass')
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

    roleFunction = (roles: string[], resource?: string) => {
        for (let role of roles) {
            if (!this.auth.hasRole(role, resource)) {
                return false
            }
        }
        return true
    }
}
