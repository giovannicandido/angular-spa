import { Component } from '@angular/core'
import { TestBed, ComponentFixture, fakeAsync, tick, inject } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AuthModule } from '../auth.module'
import { AuthService } from '../auth.service'
import { FakeAuthService } from '../../test/fake-auth.service'
import { HasNotRoles } from './hasNotRoles.directive'

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

  describe('secHasNotRoles', () => {
    it('should create/remove divs based on auth user ROLES', () => {
      fixture.detectChanges()
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      expect(debugElement.length).toEqual(2)
      expect(debugElement[0].nativeElement.textContent).toContain('First Div')
      expect(debugElement[1].nativeElement.textContent).toContain('Second Div')
    })

    describe("unit tests", () => {
      let directive = new HasNotRoles(null, null, authService, null)
      it('should verify any roles', () => {
        expect(directive.roleFunction(['ROLE_ADMIN', 'ROLE_ANY'])).toBeFalsy()
        expect(directive.roleFunction(['ROLE_FOO', 'ROLE_BAR'])).toBeTruthy()
      })
      it('should verify roles with resource', () => {
        expect(directive.roleFunction(['ROLE_ADMIN', 'ROLE_ANY'], 'client-id')).toBeFalsy()
        expect(directive.roleFunction(['ROLE_ADMIN', 'ROLE_ANY'], 'other')).toBeTruthy()
        expect(directive.roleFunction(['ROLE_FOO', 'ROLE_BAR'], 'other')).toBeTruthy()
      })

    })

  })

})

@Component({
  selector: 'test-app-component',
  template: `
    <!-- this should display -->
    <div *secHasNotRoles="'ROLE_FOO'">First Div</div>
    <!-- this should display -->
    <div *secHasNotRoles="'ROLE_FOO, ROLE_BAR'">Second Div</div>
    <!-- This should Not Display -->
    <div *secHasNotRoles="'ROLE_ADMIN, ROLE_ANY'">Third</div>
    <!-- This should Not Display -->
    <div *secHasNotRoles="'ROLE_ADMIN'">Fourty</div>

  `
})
class AppComponent {
}
