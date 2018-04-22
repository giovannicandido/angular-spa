import { Component } from '@angular/core'
import { RequestOptions, HttpModule, XHRBackend, Http, ResponseOptions, Headers, Response } from '@angular/http'
import { fakeAsync, TestBed, ComponentFixture, inject, tick } from "@angular/core/testing"
import { MockBackend, MockConnection } from "@angular/http/testing"

import { LoginService, AjaxTimeoutInterceptor } from './ajaxtimeout'
import { InterceptorModule, INTERCEPTORS } from 'angular-http-interceptor'

let requestOptions = new RequestOptions()

class LoginServiceMock implements LoginService {
    login() {
    }
    loginExpired() {

    }
}
describe('interceptors', function() {
    describe('ajaxtimeout-service', () => {
        let fixture: ComponentFixture<AppComponent>
        let comp: AppComponent

        beforeEach(() => {
            //   // refine the test module by declaring the test component
            TestBed.configureTestingModule({
                imports: [
                    HttpModule,
                    InterceptorModule.withInterceptors([
                        {
                            provide: INTERCEPTORS,
                            useClass: AjaxTimeoutInterceptor,
                            multi: true
                        }
                    ])
                ],
                declarations: [AppComponent],
                providers: [
                    MockBackend,
                    {
                        provide: XHRBackend,
                        useExisting: MockBackend
                    }, {
                        provide: RequestOptions,
                        useValue: requestOptions
                    }, {
                        provide: LoginService,
                        useClass: LoginServiceMock
                    }
                ]
            })

            //   // create component and test fixture
            fixture = TestBed.createComponent(AppComponent)

            //   // get test component from the fixture
            comp = fixture.componentInstance

        })

        it('should call the login method on 901', fakeAsync(
            inject([MockBackend, LoginService, Http], (backend, login, http) => {
                let body = "You must login again"
                backend.connections.subscribe((connection: MockConnection) => {
                    let options = new ResponseOptions({
                        status: 901,
                        body: body,
                        headers: new Headers({
                            'Content-Type': "text/html"
                        })
                    })
                    connection.mockRespond(new Response(options))
                })

                spyOn(login, 'loginExpired')
                http.get("fake").subscribe()
                tick(10)
                expect(login.loginExpired).toHaveBeenCalled()
            })
        ))

        it('should NOT call the login method on other status', fakeAsync(
            inject([MockBackend, LoginService, Http], (backend, login, http) => {
                let body = "You must login again"
                backend.connections.subscribe((connection: MockConnection) => {
                    let options = new ResponseOptions({
                        status: 200,
                        body: body,
                        headers: new Headers({
                            'Content-Type': "text/html"
                        })
                    })
                    connection.mockRespond(new Response(options))
                })

                spyOn(login, 'loginExpired')
                http.get("fake").subscribe()
                tick(10)
                expect(login.loginExpired).not.toHaveBeenCalled()
            })
        ))

        it('should implement toString', () => {
            let dialogInterceptor = new AjaxTimeoutInterceptor(null)
            expect(dialogInterceptor.toString()).toEqual("AjaxTimeoutInterceptor")
        })

    })
})


@Component({
    selector: 'test-app-component',
    template: '<h1>Hello</h1>'
})
class AppComponent {
}
