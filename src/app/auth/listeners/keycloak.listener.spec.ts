import { Component } from '@angular/core'
import { HttpModule } from '@angular/http'
import { Router } from '@angular/router'
import { TestBed, ComponentFixture, inject } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AuthModule } from '../auth.module'
import { AuthService } from '../auth.service'
import { AppSecurityListener } from './keycloak.listener'
import { FakeAuthService } from '../../test/fake-auth.service'

let fixture: ComponentFixture<AppComponent>
let comp: AppComponent

describe("app-security-listener", () => {
  let fakeRouter: Router = <any> {
    navigateByUrl: function(url: any, extras?: any): any {}
  }
  let fakeAuthService = new FakeAuthService()
  beforeEach(() => {
    //   // refine the test module by declaring the test component
    spyOn(fakeRouter, 'navigateByUrl')
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
        }
      ]
    })


    //   // create component and test fixture
    fixture = TestBed.createComponent(AppComponent);

    //   // get test component from the fixture
    comp = fixture.componentInstance;
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
  }))
})

@Component({
  selector: 'test-app-component',
  template: '<h1>Hello</h1>'
})
class AppComponent {
  constructor(public listener: AppSecurityListener) { }
}
