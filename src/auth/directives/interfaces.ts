import { hideFromDom, showHidden, DomService } from '../dom/dom.service'
import { ViewContainerRef, Injectable, TemplateRef } from '@angular/core'

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

    constructor(protected element: ViewContainerRef, protected domService: DomService, protected _templateRef: TemplateRef<RoleContext>) {}

    applyDirective() {
        let rolesParameter = this.splitRoles(this._context.$roles)
        if (this.roleFunction(rolesParameter, this._context.$resource)) {
            this.domService.performAction(this.element, this._templateRef, this._context, true)
        } else {
            this.domService.performAction(this.element, this._templateRef, this._context, false)
        }
    }

    splitRoles(roles: string): string[] {
        return splitRoles(roles)
    }
}

export class RoleContext {
    public $roles
    public $resource
}

