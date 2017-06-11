import { DomService } from "../dom/dom.service"
import { TemplateRef, ViewContainerRef } from "@angular/core"

export type RoleFunction = (roles: string[], resource: string) => boolean


// Export function to make test easier for RoleFunctionAbstract
export function splitRoles(roles: string): string[] {
    if (roles === null || roles === undefined) {
        return []
    } else {
        return roles.split(",").map(_ => _.trim())
    }
}

export abstract class RoleDirective {
    abstract roleFunction: RoleFunction
    protected _context: RoleContext = new RoleContext()

    constructor(protected element: ViewContainerRef, protected domService: DomService, protected _templateRef: TemplateRef<RoleContext>) { }

    applyDirective() {
        this.element.clear()
        let rolesParameter = this.splitRoles(this._context.$roles)
        let result = this.roleFunction(rolesParameter, this._context.$resource)
        this.domService.performAction(this.element, this._templateRef, this._context, result)
    }

    splitRoles(roles: string | string[]): string[] {
        if (roles instanceof Array) {
            return roles
        }
        return splitRoles(roles)
    }
}

export class RoleContext {
    public $roles
    public $resource
    public $action
    public $cssClass
}

