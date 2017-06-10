import { Component } from '@angular/core'
import { TestBed, ComponentFixture, fakeAsync, tick, inject } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AuthModule } from '../auth.module'
import { AuthService } from '../auth.service'
import { FakeAuthService } from '../../test/fake-auth.service'
import { HasAllRoles } from './hasAllRoles.directive'

let fixture: ComponentFixture<AppComponent>
let comp: AppComponent

describe("directives", () => {
  let authService = new FakeAuthService()
  beforeEach(() => {
    //   // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      imports: [
        AuthModule,
      ],
      declarations: [AppComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authService
        }
      ]
    })


    //   // create component and test fixture
    fixture = TestBed.createComponent(AppComponent)

    //   // get test component from the fixture
    comp = fixture.componentInstance

    // Reset ROLES
    authService.roles = ["ROLE_ADMIN", "ROLE_PUBLIC"]
    authService.resource = "client-id"
  })

  describe('secHasAllRoles', () => {
    it('should display div if user is on ALL ROLE', () => {
      fixture.detectChanges()
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      let element = debugElement[0].nativeElement
      expect(element.style.display).not.toEqual('none')
    })

    it('should display div if user is on ONE in RESOURCE', () => {
      fixture.detectChanges()
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      let element = debugElement[1].nativeElement
      expect(element.style.display).not.toEqual('none')
    })



    it('should hide div if user id not on ALL ROLE', () => {
      fixture.detectChanges()
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      let element = debugElement[2].nativeElement
      expect(element.style.display).toEqual('none')
    })

    it('should hide div if resource not match', () => {
      fixture.detectChanges()
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      let element = debugElement[3].nativeElement
      expect(element.style.display).toEqual('none')
    })

    describe("unit tests", () => {

      it('should verify all roles', () => {
        let directive = new HasAllRoles(null, null, authService, null)
        expect(directive.roleFunction(authService.roles)).toBeTruthy()
      })

    })

  })

})

@Component({
  selector: 'test-app-component',
  template: `
    <!-- this should display -->
    <div secHasAllRoles="ROLE_ADMIN, ROLE_PUBLIC">Authenticated</div>
    <!-- this should display -->
    <div secHasAllRoles="ROLE_ADMIN">Authenticated</div>
    <!-- This should Not Display -->
    <div secHasAllRoles="ROLE_ADMIN, ROLE_NONE">Authenticated</div>
    <!-- This should Not Display -->
    <div secHasAllRoles="ROLE_ADMIN, ROLE_PUBLIC" resource="other">Authenticated</div>

  `
})
class AppComponent {
}
