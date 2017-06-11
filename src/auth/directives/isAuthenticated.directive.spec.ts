import { Component } from "@angular/core"
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing"
import { By } from "@angular/platform-browser"
import { AuthModule } from "../auth.module"
import { AuthService } from "../auth.service"
import { FakeAuthService } from "../../test/fake-auth.service"

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

  describe('secIsAuthenticated', () => {
    it('should remove first div if user is NOT authenticated', fakeAsync(() => {
      authService.authenticated = false
      fixture.detectChanges()
      tick(3)
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      expect(debugElement.length).toEqual(5)
      expect(debugElement[0].nativeElement.textContent).not.toEqual('Authenticated')
    }))

    it('should add first div if user is authenticated', fakeAsync(() => {
      authService.authenticated = true
      fixture.detectChanges()
      tick(3)
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      expect(debugElement.length).toEqual(5)
      expect(debugElement[0].nativeElement.textContent).toEqual('Authenticated')
    }))

    it('should add default class to element instead of remove', fakeAsync(() => {
      authService.authenticated = false
      fixture.detectChanges()
      tick(3)
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      expect(debugElement.length).toEqual(5)
      expect(debugElement[1].nativeElement.classList).toContain('disabled')
    }))

    it('should add class as parameter to element instead of remove', fakeAsync(() => {
      authService.authenticated = false
      fixture.detectChanges()
      tick(3)
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      expect(debugElement.length).toEqual(5)
      expect(debugElement[2].nativeElement.classList).toContain('myClass')
    }))

  })

  describe('secIsNotAuthenticated', () => {
    it('should remove last div if user is NOT authenticated', fakeAsync(() => {
      authService.authenticated = true
      fixture.detectChanges()
      tick(3)
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      expect(debugElement.length).toEqual(5)
      expect(debugElement[0].nativeElement.textContent).not.toEqual('Not Authenticated')
    }))

    it('should add last div if user is authenticated', fakeAsync(() => {
      authService.authenticated = false
      fixture.detectChanges()
      tick(3)
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      expect(debugElement.length).toEqual(5)
      expect(debugElement[0].nativeElement.textContent).toEqual('Not Authenticated')
    }))

    it('should add default class to element instead of remove', fakeAsync(() => {
      authService.authenticated = false
      fixture.detectChanges()
      tick(3)
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      expect(debugElement.length).toEqual(5)
      expect(debugElement[1].nativeElement.classList).toContain('disabled')
    }))

    it('should add class as parameter to element instead of remove', fakeAsync(() => {
      authService.authenticated = false
      fixture.detectChanges()
      tick(3)
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      expect(debugElement.length).toEqual(5)
      expect(debugElement[2].nativeElement.classList).toContain('myClass')
    }))

  })

})

@Component({
  selector: 'test-app-component',
  template: `
    <div *secIsAuthenticated>Authenticated</div>
    <div *secIsNotAuthenticated>Not Authenticated</div>
    <!-- Configurations -->
    <div *secIsAuthenticated="{action: 'addClass'}">Default class applied</div>
    <div *secIsAuthenticated="{action: 'addClass', cssClass: 'myClass'}">My class</div>
    <div *secIsNotAuthenticated="{action: 'addClass'}">Default class applied</div>
    <div *secIsNotAuthenticated="{action: 'addClass', cssClass: 'myClass'}">My class</div>
  `
})
class AppComponent {
}
