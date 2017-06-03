import { hideFromDom, showHidden } from '../../dom/dom.service'
import { ElementRef, Injectable } from '@angular/core'

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
    protected abstract roles: string
    protected abstract resource: string
    protected abstract element: ElementRef

    applyDirective() {
        let rolesParameter = this.splitRoles(this.roles)
        if (this.roleFunction(rolesParameter, this.resource)) {
            showHidden(this.element)
        } else {
            hideFromDom(this.element)
        }
    }

    splitRoles(roles: string): string[] {
        return splitRoles(roles)
    }
}

@Injectable()
export class SecDirectiveConfig {
    action = 'hide'
    hideStrategy = 'display'
    defaultClass = 'disabled'
}
