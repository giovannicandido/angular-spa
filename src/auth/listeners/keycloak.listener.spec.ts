import { Component } from "@angular/core"
import { HttpModule } from "@angular/http"
import { Router } from "@angular/router"
import { ComponentFixture, inject, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser"
import { AuthModule } from "../auth.module"
import { AuthService } from "../auth.service"
import { AppSecurityListener } from "./keycloak.listener"
import { FakeAuthService } from "../../test/fake-auth.service"
import { Logger } from "../../logger/logger.service"

let fixture: ComponentFixture<AppComponent>
let comp: AppComponent

describe("app-security-listener", () => {
  let fakeRouter: Router = <any> {
    navigateByUrl: function(url: any, extras?: any): any {}
  }
  let fakeAuthService = new FakeAuthService()
  let fakeLogger: Logger = new Logger()
  beforeEach(() => {
    //   // refine the test module by declaring the test component
    spyOn(fakeRouter, 'navigateByUrl')
    spyOn(fakeAuthService, 'logout')
    spyOn(fakeLogger, 'info')
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        AuthModule,
      ],
      declarations: [AppComponent],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService
        }, {
          provide: Router,
          useValue: fakeRouter
        }, {
          provide: Logger,
          useValue: fakeLogger
        }
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
    expect(comp.listener).not.toBeNull()
  })

  it('should navigate to / url when logout', inject([AppSecurityListener], (security) => {
    expect(fakeAuthService.keycloak.onAuthLogout).not.toBeNull()
    fakeAuthService.keycloak.onAuthLogout()
    expect(fakeRouter.navigateByUrl).toHaveBeenCalled()
    expect(fakeAuthService.logout).toHaveBeenCalled()
  }))

  it('should logger a info when authRefresh', inject([AppSecurityListener], (security) => {
     fakeAuthService.keycloak.onAuthRefreshSuccess()
     expect(fakeLogger.info).toHaveBeenCalled()
  }))

  it('should logger a info when tokenExpired', inject([AppSecurityListener], (security) => {
     fakeAuthService.keycloak.onTokenExpired()
     expect(fakeLogger.info).toHaveBeenCalled()
  }))

  it('should logger a info when authSuccess', inject([AppSecurityListener], (security) => {
     fakeAuthService.keycloak.onAuthSuccess()
     expect(fakeLogger.info).toHaveBeenCalled()
  }))
})

@Component({
  selector: 'test-app-component',
  template: '<h1>Hello</h1>'
})
class AppComponent {
  constructor(public listener: AppSecurityListener) { }
}
