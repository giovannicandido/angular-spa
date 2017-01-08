import { Component } from '@angular/core'
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AuthModule } from '../auth.module'
import { AuthService } from '../auth.service'
import { FakeAuthService } from '../../test/fake-auth.service'

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
    it('should hide div if user is NOT authenticated', fakeAsync(() => {
      authService.authenticated = false
      fixture.detectChanges()
      let debugElement = fixture.debugElement.query(By.css("div:first-child"))
      let element = debugElement.nativeElement
      expect(element.style.display).toEqual('none')
    }))

    it('should display div if user is authenticated', fakeAsync(() => {
      authService.authenticated = true
      fixture.detectChanges()
      let debugElement = fixture.debugElement.query(By.css("div:first-child"))
      let element = debugElement.nativeElement
      tick(3)
      expect(element.style.display).not.toEqual('none')
    }))

  })

  describe('secIsNotAuthenticated', () => {
    it('should hide div if user is authenticated', fakeAsync(() => {
      authService.authenticated = true
      fixture.detectChanges()
      let debugElement = fixture.debugElement.query(By.css("div:last-child"))
      let element = debugElement.nativeElement
      tick(3)
      expect(element.style.display).toEqual('none')
    }))

    it('should display div if user is NOT authenticated', fakeAsync(() => {
      authService.authenticated = false
      fixture.detectChanges()
      let debugElement = fixture.debugElement.query(By.css("div:last-child"))
      let element = debugElement.nativeElement
      tick(3)
      expect(element.style.display).not.toEqual('none')
    }))

  })

})

@Component({
  selector: 'test-app-component',
  template: `
    <div secIsAuthenticated>Authenticated</div>
    <div secIsNotAuthenticated>Not Authenticated</div>
  `
})
class AppComponent {
}
