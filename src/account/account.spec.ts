import { Account } from './account'

describe("account", function(){
    it("should verify accountInRole", () => {
        let account = new Account()
        account.authorities = ['ROLE_ADMIN', 'ROLE_USER']
        expect(account.isAccountInRole('admin')).toBeTruthy()
        expect(account.isAccountInRole('role_admin')).toBeTruthy()
        expect(account.isAccountInRole('ROLE_ADMIN')).toBeTruthy()
        expect(account.isAccountInRole('sasquash')).toBeFalsy()
    })
    it('should verify accountHasAuthority', () => {
        let account = new Account()
        account.authorities = ['sendEmail', 'checkEmail']
        expect(account.hasAuthority('sendEmail')).toBeTruthy()
        expect(account.hasAuthority('checkEmail')).toBeTruthy()
        expect(account.hasAuthority('CheckEmail')).toBeTruthy()
        expect(account.hasAuthority('ROLE_CheckEmail')).toBeFalsy()
    })
    it('should return fullName', function(){
        let account = new Account()
        account.fullName = 'First Last'
        expect(account.fullName).toEqual('First Last')
        account.fullName = '  First Last  '
        expect(account.fullName).toEqual('First Last')
    })
})
