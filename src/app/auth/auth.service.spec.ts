import {fakeAsync, tick} from "@angular/core/testing"
import {keycloakPromiseToPromise, KeycloakPromise} from "./auth.service"

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
})
