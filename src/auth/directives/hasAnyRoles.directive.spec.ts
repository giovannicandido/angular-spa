import { Component } from "@angular/core"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser"
import { AuthModule } from "../auth.module"
import { AuthService } from "../auth.service"
import { FakeAuthService } from "../../test/fake-auth.service"
import { HasAnyRoles } from "./hasAnyRoles.directive"

let fixture: ComponentFixture<TestComponent>
let comp: TestComponent

describe("directives", () => {
  let authService = new FakeAuthService()
  beforeEach(() => {
    //   // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      imports: [
        AuthModule,
      ],
      declarations: [TestComponent],
      providers: [
        {
          provide: AuthService,
          useValue: authService
        }
      ]
    })
    // Reset ROLES
    authService.roles = ["ROLE_ADMIN", "ROLE_PUBLIC"]
    authService.resource = "client-id"
  })

  describe('secHasAnyRoles', () => {
    it('should display div if user is on all ROLE', () => {
      createDefaultTestComponent()
      fixture.detectChanges()
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      expect(debugElement.length).toEqual(5)
      expect(debugElement[0].nativeElement.textContent).toContain('First Div')
      expect(debugElement[1].nativeElement.textContent).toContain('Second Div')
      expect(debugElement[2].nativeElement.textContent).toContain('Third Div')
    })
    it('should add default cssClass to element instead of remove', () => {
      createDefaultTestComponent()
      fixture.detectChanges()
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      expect(debugElement[3].nativeElement.classList).toContain('disabled')
    })

    it('should add cssClass as parameter to element instead of remove', () => {
      createDefaultTestComponent()
      fixture.detectChanges()
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      expect(debugElement[4].nativeElement.classList).toContain('myClass')
    })

    it('should accept array of strings', () => {
      fixture = createTestComponent("<div *secHasAnyRoles=\"roles\">This should display</div>")
      fixture.detectChanges()
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      expect(debugElement.length).toEqual(1)
      expect(debugElement[0].nativeElement.textContent).toEqual('This should display')
    })

    describe("unit tests", () => {

      it('should verify any roles', () => {
        let directive = new HasAnyRoles(null, null, authService, null)
        expect(directive.roleFunction(['ROLE_ADMIN', 'ROLE_ANY'])).toBeTruthy()
      })

    })

  })

})

@Component({
  selector: 'test-app-component',
  template: `
    <!-- this should display -->
    <div *secHasAnyRoles="'ROLE_ADMIN, ROLE_PUBLIC'">First Div</div>
    <!-- this should display -->
    <div *secHasAnyRoles="'ROLE_ADMIN'">Second Div</div>
    <!-- This should Display -->
    <div *secHasAnyRoles="'ROLE_ADMIN, ROLE_NONE'">Third Div</div>
    <!-- This should Not Display -->
    <div *secHasAnyRoles="'ROLE_ADMIN, ROLE_PUBLIC'; resource 'other'">Authenticated</div>
    <!-- this should not display -->
    <div *secHasAnyRoles="'ROLE_FOO, ROLE_BAR'">Authenticated</div>
    <!-- Configurations -->
    <div *secHasAnyRoles="'ROLE_FOO'; action 'addClass'">Default class applied</div>
    <div *secHasAnyRoles="'ROLE_FOO'; action 'addClass'; cssClass 'myClass'">My class</div>

  `
})
class TestComponent {
  roles = ['ROLE_ADMIN', 'ROLE_PUBLIC']
}

function createDefaultTestComponent() {
  //   // create component and test fixture
  fixture = TestBed.createComponent(TestComponent)

  //   // get test component from the fixture
  comp = fixture.componentInstance

}

function createTestComponent(template: string): ComponentFixture<TestComponent> {
  return TestBed.overrideComponent(TestComponent, {set: {template: template}})
      .createComponent(TestComponent)
}
