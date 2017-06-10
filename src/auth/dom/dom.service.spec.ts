import { Component, ElementRef, Renderer2 } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TestBed, ComponentFixture, inject} from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AuthModule } from '../auth.module'
import { AuthService } from '../auth.service'
import { FakeAuthService } from '../../test/fake-auth.service'
import { SecDirectiveConfig, DomService } from './dom.service'

let fixture: ComponentFixture<AppComponent>
let comp: AppComponent

describe("dom.service", () => {
  const secConfig = new SecDirectiveConfig()
  let authService = new FakeAuthService()
  secConfig.action = 'remove'

  afterEach(() => { fixture = null ! })

  beforeEach(() => {
    //   // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        AuthModule,
        CommonModule
      ],
      providers: [
        {
          provide: SecDirectiveConfig,
          useValue: secConfig
        },
         {
          provide: AuthService,
          useValue: authService
        }
      ]
    }).compileComponents()


    //   // create component and test fixture
    fixture = TestBed.createComponent(AppComponent)

    //   // get test component from the fixture
    comp = fixture.componentInstance
  })


  it('should add css class to a element', inject([DomService], (domService: DomService) => {
    fixture.detectChanges()
    let debugElement = fixture.debugElement.queryAll(By.css("h2"))
    let elementRef = new ElementRef(debugElement[0].nativeElement)
    domService.addClass(elementRef, "myClass")
    expect(elementRef.nativeElement.classList).toContain('myClass')
  }))

  it('should remove the class of a element', inject([DomService], (domService: DomService) => {
    fixture.detectChanges()
    let debugElement = fixture.debugElement.queryAll(By.css("h2"))
    let elementRef = new ElementRef(debugElement[0].nativeElement)
    expect(elementRef.nativeElement.classList).toContain('removeClass')
    domService.removeClass(elementRef, "removeClass")
    expect(elementRef.nativeElement.classList).not.toContain('removeClass')
  }))
})


@Component({
  selector: 'test-app-component',
  template: `
    <!-- this should display -->
    <h2 class='removeClass'>Element</h2>
  `
})
class AppComponent {
}
