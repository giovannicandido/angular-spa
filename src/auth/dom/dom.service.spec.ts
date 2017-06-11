import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ComponentFixture, inject, TestBed } from "@angular/core/testing"
import { By } from "@angular/platform-browser"
import { AuthModule } from "../auth.module"
import { AuthService } from "../auth.service"
import { FakeAuthService } from "../../test/fake-auth.service"
import { DomService, SecDirectiveConfig } from "./dom.service"

let fixture: ComponentFixture<AppComponent>
let comp: AppComponent

describe("dom.service", () => {
  const secConfig = new SecDirectiveConfig()
  let authService = new FakeAuthService()
  secConfig.action = 'addClass'

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
    let elementRef = debugElement[0].nativeElement

    expect(elementRef.classList).not.toContain('myClass')
    domService.addClass(elementRef, "myClass")
    expect(elementRef.classList).toContain('myClass')
  }))

  it('should remove the class of a element', inject([DomService], (domService: DomService) => {
    fixture.detectChanges()
    let debugElement = fixture.debugElement.queryAll(By.css("h2"))
    let elementRef = debugElement[0].nativeElement

    expect(elementRef.classList).toContain('removeClass')
    domService.removeClass(elementRef, "removeClass")
    expect(elementRef.classList).not.toContain('removeClass')
  }))

  it('should apply css class to DOM instead of remove', () => {
    fixture.detectChanges()
    let debugElement = fixture.debugElement.queryAll(By.css("div"))
    expect(debugElement.length).toEqual(1)
    expect(debugElement[0].nativeElement.classList).toContain(secConfig.defaultClass)
  })
})


@Component({
  selector: 'test-app-component',
  template: `
    <!-- this should display -->
    <h2 class='removeClass'>Element</h2>
    <div *secHasRole="'ROLE_NONE'"></div>
  `
})
class AppComponent {
}
