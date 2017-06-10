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
    it('should display/remove div if user is/not on ALL ROLE', () => {
      fixture.detectChanges()
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      expect(debugElement.length).toEqual(2)
      expect(debugElement[0].nativeElement.textContent).toContain('First Div')
      expect(debugElement[1].nativeElement.textContent).toContain('Second Div')
    })
    describe("unit tests", () => {
      let directive = new HasAllRoles(null, null, authService, null)
      it('should verify all roles', () => {
        expect(directive.roleFunction(authService.roles)).toBeTruthy()
      })
      it('should return false if not all roles ', () => {
        expect(directive.roleFunction(['ROLE_ADMIN', 'ROLE_ANY'])).toBeFalsy()
      })

    })

  })

})

@Component({
  selector: 'test-app-component',
  template: `
    <!-- this should display -->
    <div *secHasAllRoles="'ROLE_ADMIN, ROLE_PUBLIC'">First Div</div>
    <!-- this should display -->
    <div *secHasAllRoles="'ROLE_ADMIN'">Second Div</div>
    <!-- This should Not Display -->
    <div *secHasAllRoles="'ROLE_ADMIN, ROLE_NONE'">Authenticated</div>
    <!-- This should Not Display -->
    <div *secHasAllRoles="'ROLE_ADMIN, ROLE_PUBLIC'; resource 'other'">Authenticated</div>

  `
})
class AppComponent {
}
