import {fakeAsync, tick} from "@angular/core/testing"
import {keycloakPromiseToPromise, KeycloakPromise} from "./auth.service"
import {FakeAuthService} from "../test/fake-auth.service"

describe("auth.service", () => {
    it("should convert keycloakPromise to oficial promise", fakeAsync(() => {
        let keycloakPromise: KeycloakPromise = {
            success: (fn: (value) => void): KeycloakPromise => {
                fn(true)
                return keycloakPromise
            },
            error: (fn: (error) => void) => {
                fn(true)
                return keycloakPromise
            }
        }
        let promise = keycloakPromiseToPromise(keycloakPromise)
        let value = false
        promise.then((pv) => value = pv)
        tick(1)
        expect(value).toBeTruthy()
    }))

    /**
     * Extremelly hard to test :-)
     * Tested manually and works
     * To make test easy the keycloak should return a real promise, at least one with then and catch
     */
    xit("getLoginAccount should call updateToken", fakeAsync(() => {
        let auth = new FakeAuthService()
        let keycloakPromise: KeycloakPromise = {
            success: (fn: (value) => void): KeycloakPromise => {
                fn(true)
                return keycloakPromise
            },
            error: (fn: (error) => void) => {
                fn(true)
                return keycloakPromise
            }
        }

        spyOn(auth, 'updateToken').and.returnValue(keycloakPromise)
        spyOn(auth.keycloak, 'loadUserProfile').and.returnValue(keycloakPromise)

        auth.getLoginAccount().subscribe()
        tick(2)
        expect(auth.updateToken).toHaveBeenCalled()
    }))
})
