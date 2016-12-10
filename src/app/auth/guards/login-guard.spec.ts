import { fakeAsync, tick } from "@angular/core/testing"

import { LoginGuard } from './login-guard'
import { FakeAuthService } from '../../test/fake-auth.service'

describe("LoginGuard", function () {
    let authMock = new FakeAuthService()

    it("should call loggin when user is not logged", fakeAsync(() => {
        authMock.authenticated = false
        let guard = new LoginGuard(<any>authMock)
        spyOn(authMock, 'login')
        guard.canActivate().then(function (r) {
            expect(r).toBeFalsy()
        })
        tick(1)
        expect(authMock.login).toHaveBeenCalled()
    }))

    it("should return promise true if user logged in", fakeAsync(() => {
        authMock.authenticated = true
        spyOn(authMock, 'login')
        let guard = new LoginGuard(<any>authMock)
        guard.canActivate().then(function (r) {
            expect(r).toBeTruthy()
        })
        tick(1)
        expect(authMock.login).not.toHaveBeenCalled()
    }))
})
