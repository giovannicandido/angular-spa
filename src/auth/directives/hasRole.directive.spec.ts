import { Component } from "@angular/core"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser"
import { AuthModule } from "../auth.module"
import { AuthService } from "../auth.service"
import { FakeAuthService } from "../../test/fake-auth.service"
import { HasRole } from "./hasRole.directive"

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
  })

  describe('secHasRole', () => {
    it('should display/remove div if user is/not on ROLE', () => {
      fixture.detectChanges()
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      expect(debugElement.length).toEqual(4)
      expect(debugElement[0].nativeElement.textContent).toContain('First Div')
      expect(debugElement[1].nativeElement.textContent).toContain('Second Div')
      expect(debugElement[2].nativeElement.textContent).toContain('Default class applied')
      expect(debugElement[3].nativeElement.textContent).toContain('My class')
    })
    it('should add default class to element instead of remove', () => {
      fixture.detectChanges()
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      expect(debugElement.length).toEqual(4)
      expect(debugElement[2].nativeElement.classList).toContain('disabled')
    })

    it('should add class as parameter to element instead of remove', () => {
      fixture.detectChanges()
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      expect(debugElement.length).toEqual(4)
      expect(debugElement[3].nativeElement.classList).toContain('myClass')
    })
    describe('unit', () => {
      let hasRole = new HasRole(null, null, authService, null)
      it('should return true to ROLE_ADMIN', () => {
        expect(hasRole.roleFunction(['ROLE_ADMIN'], undefined)).toBeTruthy()
      })
      it('should return true to ROLE_ADMIN and resource CLIENT-ID', () => {
        expect(hasRole.roleFunction(['ROLE_ADMIN'],  'client-id')).toBeTruthy()
      })
      it('should return false to ROLE_ADMIN and resource OTHER', () => {
        expect(hasRole.roleFunction(['ROLE_ADMIN'], 'other')).toBeFalsy()
      })
      it('should return false to ROLE_USER', () => {
        expect(hasRole.roleFunction(['ROLE_USER'],  'client-id')).toBeFalsy()
      })
    })

  })

})

@Component({
  selector: 'test-app-component',
  template: `
    <!-- this should display -->
    <div *secHasRole="'ROLE_ADMIN'">First Div</div>
    <!-- this should display -->
    <div *secHasRole="'ROLE_ADMIN'; resource 'client-id'">Second Div</div>
    <!-- this should NOT display -->
    <div *secHasRole="'ROLE_ADMIN'; resource 'other'">Third Div</div>
    <!-- this should NOT display -->
    <div *secHasRole="'ROLE_USER'">Fourth Div</div>
    <!-- Configurations -->
    <div *secHasRole="'ROLE_ANY'; action 'addClass'">Default class applied</div>
    <div *secHasRole="'ROLE_ANY'; action 'addClass'; cssClass 'myClass'">My class</div>

  `
})
class AppComponent {
}
