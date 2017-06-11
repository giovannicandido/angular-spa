import { Component } from "@angular/core"
import { HttpModule, Request, RequestOptions } from "@angular/http"
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from "@angular/core/testing"
import { By } from "@angular/platform-browser"
import { AuthModule } from "../auth.module"
import { AuthService } from "../auth.service"
import { RefreshTokenHttpInterceptor } from "./refresh-token-http-interceptor"
import { FakeAuthService } from "../../test/fake-auth.service"

let fixture: ComponentFixture<AppComponent>
let comp: AppComponent

describe("refresh-token-http-interceptor", () => {
  beforeEach(() => {
    //   // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        AuthModule,
      ],
      declarations: [AppComponent],
      providers: [
        {
          provide: AuthService,
          useClass: FakeAuthService
        }, RefreshTokenHttpInterceptor
      ]
    })


    //   // create component and test fixture
    fixture = TestBed.createComponent(AppComponent)

    //   // get test component from the fixture
    comp = fixture.componentInstance
  })

  it('should inject', () => {
    fixture.detectChanges()
    let debugElement = fixture.debugElement.query(By.css("h1"))
    let element = debugElement.nativeElement
    expect(element.textContent).toContain('Hello')
    expect(comp.interceptor).not.toBeNull()
  })

  it('should resolve even if cant refresh token', fakeAsync(
    inject([RefreshTokenHttpInterceptor, AuthService], (refreshToken: RefreshTokenHttpInterceptor, auth: AuthService) => {
      let request = new Request(new RequestOptions())
      let requestReturned
      let fakePromise = (fn: () => any) => {
        // fn()
        return {error: (err) => {
          err()
        }}
      }
      spyOn(auth.keycloak, 'updateToken').and.returnValue({success: fakePromise})
      let promise = refreshToken.before(request)
      promise.subscribe(e => requestReturned = e)
      tick(10)
      expect(requestReturned).toEqual(request)
    })))

})

@Component({
  selector: 'test-app-component',
  template: '<h1>Hello</h1>'
})
class AppComponent {
  constructor(public interceptor: RefreshTokenHttpInterceptor) { }
}
