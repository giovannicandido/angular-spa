import { Component } from '@angular/core'
import { RequestOptions, HttpModule, XHRBackend, Http, ResponseOptions, Headers, Response } from '@angular/http'
import { fakeAsync, TestBed, ComponentFixture, inject, tick } from "@angular/core/testing"
import { MockBackend, MockConnection } from "@angular/http/testing"

import { DialogInterceptor, DialogService } from './dialog'
import { InterceptorModule, INTERCEPTORS } from "angular-http-interceptor"

import { Observable } from "rxjs/Observable"

import "rxjs/add/operator/catch"
import "rxjs/add/observable/of"

let requestOptions = new RequestOptions()
describe('interceptors', function() {
    describe('dialog-service', () => {
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
                            useClass: DialogInterceptor,
                            multi: true
                        }
                    ])
                ],
                declarations: [AppComponent],
                providers: [
                    MockBackend,
                    DialogService,
                    {
                        provide: RequestOptions,
                        useValue: requestOptions
                    }, {
                        provide: XHRBackend,
                        useExisting: MockBackend
                    }
                ]
            })

            //   // create component and test fixture
            fixture = TestBed.createComponent(AppComponent)

            //   // get test component from the fixture
            comp = fixture.componentInstance

        })


        it('should call a dialog in ok response with responseText', fakeAsync(
            inject([MockBackend, DialogService, Http], (backend, dialog, http) => {
                let body = "Message"
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

                spyOn(dialog, 'showMessage')
                http.get("fake").subscribe()
                tick(10)
                expect(dialog.showMessage).toHaveBeenCalledWith(body, 'info')
            })
        ))

        it('should call a dialog in created response with responseText', fakeAsync(
            inject([MockBackend, DialogService, Http], (backend, dialog, http) => {
                let body = "Message"
                backend.connections.subscribe((connection: MockConnection) => {
                    let options = new ResponseOptions({
                        status: 201,
                        body: body,
                        headers: new Headers({
                            'Content-Type': "text/html"
                        })
                    })
                    connection.mockRespond(new Response(options))
                })

                spyOn(dialog, 'showMessage')
                http.get("fake").subscribe()
                tick(10)
                expect(dialog.showMessage).toHaveBeenCalledWith(body, 'info')
            })
        ))

        it('should NOT call dialog in ok response with JSON body', fakeAsync(
            inject([MockBackend, DialogService, Http], (backend: MockBackend, dialog: DialogService, http: Http) => {
                let body = JSON.stringify({ success: true })
                backend.connections.subscribe((connection: MockConnection) => {
                    let options = new ResponseOptions({
                        status: 200,
                        body: body,
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    })
                    connection.mockRespond(new Response(options))
                })

                spyOn(dialog, 'showMessage')
                http.get("fake").subscribe()
                tick(10)
                expect(dialog.showMessage).not.toHaveBeenCalled()
            })
        ))

        it('should call dialog in ok response with text/plain', fakeAsync(
            inject([MockBackend, DialogService, Http], (backend: MockBackend, dialog: DialogService, http: Http) => {
                let body = JSON.stringify({ success: true })
                backend.connections.subscribe((connection: MockConnection) => {
                    let options = new ResponseOptions({
                        status: 200,
                        body: body,
                        headers: new Headers({
                            'Content-Type': 'text/plain'
                        })
                    })
                    connection.mockRespond(new Response(options))
                })

                spyOn(dialog, 'showMessage')
                http.get("fake").subscribe()
                tick(10)
                expect(dialog.showMessage).toHaveBeenCalled()
            })
        ))

        it('should call error on 500', fakeAsync(
            inject([MockBackend, DialogService, Http], (backend: MockBackend, dialog: DialogService, http: Http) => {
                let body = "Server error"
                backend.connections.subscribe((connection: MockConnection) => {
                    let options = new ResponseOptions({
                        status: 500,
                        body: body,
                        headers: new Headers({
                            'Content-Type': 'text/plain'
                        })
                    })
                    connection.mockRespond(new Response(options))
                })

                spyOn(dialog, 'showMessage')
                spyOn(dialog, 'showError')
                http.get("fake").subscribe()
                tick(10)
                expect(dialog.showMessage).not.toHaveBeenCalled()
                expect(dialog.showError).toHaveBeenCalledWith(body, 500)
            })
        ))

        it('should call error on 404', fakeAsync(
            inject([MockBackend, DialogService, Http], (backend: MockBackend, dialog: DialogService, http: Http) => {
                let body = "Not Found"
                backend.connections.subscribe((connection: MockConnection) => {
                    let options = new ResponseOptions({
                        status: 404,
                        body: body,
                        headers: new Headers({
                            'Content-Type': 'text/plain'
                        })
                    })
                    connection.mockRespond(new Response(options))
                })

                spyOn(dialog, 'showMessage')
                spyOn(dialog, 'showError')
                http.get("fake").subscribe()
                tick(10)
                expect(dialog.showMessage).not.toHaveBeenCalled()
                expect(dialog.showError).toHaveBeenCalledWith(body, 404)
            })
        ))

        it('should call error on exception', fakeAsync(
            inject([MockBackend, DialogService, Http], (backend: MockBackend, dialog: DialogService, http: Http) => {
                let exception = new Error('Exception throw')

                backend.connections.subscribe((connection: MockConnection) => {
                    connection.mockError(exception)
                })

                spyOn(dialog, 'showMessage')
                spyOn(dialog, 'showError')
                http.get("fake").catch(e => Observable.of(e)).subscribe()
                tick(10)
                expect(dialog.showMessage).not.toHaveBeenCalled()
                expect(dialog.showError).toHaveBeenCalledWith(exception, 'error')
            })
        ))

        it('should work with contet-type header in lower case', fakeAsync(
            inject([MockBackend, DialogService, Http], (backend: MockBackend, dialog: DialogService, http: Http) => {
                let body = "Not Found"

                backend.connections.subscribe((connection: MockConnection) => {
                    let options = new ResponseOptions({
                        status: 404,
                        body: body,
                        headers: new Headers({
                            'content-type': 'text/plain'
                        })
                    })
                    connection.mockRespond(new Response(options))
                })

                spyOn(dialog, 'showMessage')
                spyOn(dialog, 'showError')
                http.get("fake").catch(e => Observable.of(e)).subscribe()
                tick(10)
                expect(dialog.showMessage).not.toHaveBeenCalled()
                expect(dialog.showError).toHaveBeenCalledWith(body, 404)
            })
        ))

        it('should work with contet-type header value with UTF-8', fakeAsync(
            inject([MockBackend, DialogService, Http], (backend: MockBackend, dialog: DialogService, http: Http) => {
                let body = "Not Found"

                backend.connections.subscribe((connection: MockConnection) => {
                    let options = new ResponseOptions({
                        status: 404,
                        body: body,
                        headers: new Headers({
                            'content-type': 'text/html;charset=UTF-8'
                        })
                    })
                    connection.mockRespond(new Response(options))
                })

                spyOn(dialog, 'showMessage')
                spyOn(dialog, 'showError')
                http.get("fake").catch(e => Observable.of(e)).subscribe()
                tick(10)
                expect(dialog.showMessage).not.toHaveBeenCalled()
                expect(dialog.showError).toHaveBeenCalledWith(body, 404)
            })
        ))

        it('should implement toString', () => {
            let dialogInterceptor = new DialogInterceptor(null)
            expect(dialogInterceptor.toString()).toEqual("DialogInterceptor")
        })

    })
})


@Component({
    selector: 'test-app-component',
    template: '<h1>Hello</h1>'
})
class AppComponent {
}
