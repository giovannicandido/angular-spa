export class User {
    private _firstName: string
    private _lastName: string
    email: string
    login: string
    authorities: string[]

    /**
     * Check if the authorities array has the role.
     * Search is not case sensitive
     * @param role The role matches ignoring if start with ROLE_.
     *        the param ROLE_ADMIN and ADMIN match
     */
    isUserInRole(role: string): boolean {
        let index = this.authorities.findIndex(v => {
            let value = v.toUpperCase().startsWith('ROLE_') ? v.slice(5, v.length) : v
            let roleS = role.toUpperCase().startsWith('ROLE_') ? role.slice(5, role.length) : role
            return value.toLowerCase() === roleS.toLowerCase()
        })
        return index > -1
    }

    /**
     * Check if user has the authority, the check is literal and case insensitive
     */
    hasAuthority(authority: string): boolean {
        let index = this.authorities.findIndex(v => {
            return v.toLowerCase() === authority.toLowerCase()
        })
        return index > -1
    }

    get firstName(): string {
        return this._firstName.trim()
    }

    set firstName(firstName: string) {
        this._firstName = firstName
    }

    get lastName(): string {
        return this._lastName.trim()
    }

    set lastName(lastName: string) {
        this._lastName = lastName
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`
    }
}
