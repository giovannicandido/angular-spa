import { splitRoles } from './interfaces'

describe('interfaces', () => {
    it('should split roles by \',\'', () => {
        let result = splitRoles("a, b")
        expect(result).toContain('a')
        expect(result).toContain('b')
        expect(result.length).toEqual(2)
    })

})