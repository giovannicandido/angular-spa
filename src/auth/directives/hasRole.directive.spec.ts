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

  describe('hasRole', () => {
    it('should display div if user is on ROLE', () => {
      fixture.detectChanges()
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      let element = debugElement[0].nativeElement
      expect(element.style.display).not.toEqual('none')
    })

    it('should display div if user is on ROLE in RESOURCE', () => {
      fixture.detectChanges()
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      let element = debugElement[1].nativeElement
      expect(element.style.display).not.toEqual('none')
    })

    it('should hide div if user RESOURCE has not the ROLE', () => {
      fixture.detectChanges()
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      let element = debugElement[2].nativeElement
      expect(element.style.display).toEqual('none')
    })

    it('should hide div if user is NOT on ROLE', () => {
      fixture.detectChanges()
      let debugElement = fixture.debugElement.queryAll(By.css("div"))
      let element = debugElement[3].nativeElement
      expect(element.style.display).toEqual('none')
    })

  })

})

@Component({
  selector: 'test-app-component',
  template: `
    <!-- this should display -->
    <div hasRole="ROLE_ADMIN">Authenticated</div>
    <!-- this should display -->
    <div hasRole="ROLE_ADMIN" resource="client-id">Authenticated</div>
    <!-- this should NOT display -->
    <div hasRole="ROLE_ADMIN" resource="other">Authenticated</div>
    <!-- this should NOT display -->
    <div hasRole="ROLE_USER" resource="client-id">Authenticated</div>

  `
})
class AppComponent {
}
