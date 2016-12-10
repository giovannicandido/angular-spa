import { LoginGuard } from './login-guard'
import { AuthService } from '../auth.service'

describe("LoginGuard", function(){
    let authMock: any = {
            isUserLoggedIn: function(){

            },
            login: function(){

            }
        }
        
    it("should call loggin when user is not logged", (done) => {
        spyOn(authMock, 'isUserLoggedIn').and.callFake(function(){
            return {
                then: function(callback) {return callback(false)}
            }
        })
        spyOn(authMock, 'login')
        let guard = new LoginGuard(authMock)
        guard.canActivate().then(function(r){
            expect(r).toBeFalsy()
            expect(authMock.login).toHaveBeenCalled()
            done()
        })       
    })

    it("should return promise true if user logged in", (done) => {
        spyOn(authMock, 'login')
        spyOn(authMock, 'isUserLoggedIn').and.callFake(function(){
            return {
                then: function(callback) {return callback(true)}
            }
        })
        let guard = new LoginGuard(authMock)
        guard.canActivate().then(function(r){
            expect(r).toBeTruthy()
            expect(authMock.login).not.toHaveBeenCalled()
            done()
        })       
    })
})
