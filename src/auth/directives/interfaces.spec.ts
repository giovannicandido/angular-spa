import { RoleDirective, RoleFunction, splitRoles } from "./interfaces"

class RoleDirectiveTest extends RoleDirective {
    roleFunction: RoleFunction = (roles, resource) => {
        return true
    }
}

describe('interfaces', () => {
    it('should split roles by \',\'', () => {
        let result = splitRoles("a, b")
        expect(result).toContain('a')
        expect(result).toContain('b')
        expect(result.length).toEqual(2)
    })

})

describe('RoleDirective', () => {
    it('should split roles', () => {
        let directive = new RoleDirectiveTest(null, null, null)
        let result = directive.splitRoles("a, b")
        expect(result).toContain('a')
        expect(result).toContain('b')
        expect(result.length).toEqual(2)
    })
})
