import { User } from './user'

describe("user", function(){
    it("should verify userInRole", () => {
        let user = new User()
        user.authorities = ['ROLE_ADMIN', 'ROLE_USER']
        expect(user.isUserInRole('admin')).toBeTruthy()
        expect(user.isUserInRole('role_admin')).toBeTruthy()
        expect(user.isUserInRole('ROLE_ADMIN')).toBeTruthy()
        expect(user.isUserInRole('sasquash')).toBeFalsy()
    })
    it('should verify userHasAuthority', () => {
        let user = new User()
        user.authorities = ['sendEmail', 'checkEmail']
        expect(user.hasAuthority('sendEmail')).toBeTruthy()
        expect(user.hasAuthority('checkEmail')).toBeTruthy()
        expect(user.hasAuthority('CheckEmail')).toBeTruthy()
        expect(user.hasAuthority('ROLE_CheckEmail')).toBeFalsy()
    })
})
