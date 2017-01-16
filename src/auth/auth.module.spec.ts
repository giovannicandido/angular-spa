import { Component } from '@angular/core'
import { TestBed, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AuthModule } from './auth.module'
import { AuthService } from './auth.service'
import { FakeAuthService } from '../test/fake-auth.service'

let fixture: ComponentFixture<AppComponent>
let comp: AppComponent

describe("auth-module", () => {
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
          useClass: FakeAuthService
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
    expect(comp.auth).not.toBeNull()
  })
})

@Component({
  selector: 'test-app-component',
  template: '<h1>Hello</h1>'
})
class AppComponent {
  constructor(public auth: AuthService) { }
}
