export function splitRoles(roles): string[] {
        if (roles === null || roles === undefined) {
            return []
        } else {
            return roles.split(",").map(_ => _.trim())
        }
    }