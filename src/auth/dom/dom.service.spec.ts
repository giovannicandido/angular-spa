import { Component, ElementRef, Renderer2 } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TestBed, ComponentFixture, fakeAsync, tick, inject, async} from '@angular/core/testing'
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

  // it('should remove element from DOM', inject([DomService], (domService: DomService) => {
  //   fixture.detectChanges()
  //   let debugElement = fixture.debugElement.queryAll(By.css("h2"))
  //   let elementRef = new ElementRef(debugElement[0].nativeElement)
  //   let element = document.querySelector("h2")
  //   expect(element).not.toBeNull()
  //   domService.removeFromDom(elementRef)
  //   let element2 = document.querySelector("h2")
  //   expect(element2).toBeNull()
  // }))

  it('should hide element by visibility', inject([DomService], (domService: DomService) => {
    fixture.detectChanges()
    let debugElement = fixture.debugElement.queryAll(By.css("h2"))
    let elementRef = new ElementRef(debugElement[0].nativeElement)
    domService.hideFromDom(elementRef, "visibility")
    expect(elementRef.nativeElement.style.visibility).toEqual('hidden')
  }))

  it('should hide element by display', inject([DomService], (domService: DomService) => {
    fixture.detectChanges()
    let debugElement = fixture.debugElement.queryAll(By.css("h2"))
    let elementRef = new ElementRef(debugElement[0].nativeElement)
    domService.hideFromDom(elementRef, "display")
    expect(elementRef.nativeElement.style.display).toEqual('none')
  }))

  it('should display element by display', inject([DomService], (domService: DomService) => {
    fixture.detectChanges()
    let debugElement = fixture.debugElement.queryAll(By.css("h2"))
    let elementRef = new ElementRef(debugElement[0].nativeElement)
    domService.hideFromDom(elementRef, "display")
    expect(elementRef.nativeElement.style.display).toEqual('none')
    domService.showFromDom(elementRef)
    expect(elementRef.nativeElement.style.display).toEqual('inherit')
  }))

  it('should add css class to a element', inject([DomService], (domService: DomService) => {
    fixture.detectChanges()
    let debugElement = fixture.debugElement.queryAll(By.css("h2"))
    let elementRef = new ElementRef(debugElement[0].nativeElement)
    domService.addClass(elementRef, "myClass")
    expect(elementRef.nativeElement.classList).toContain('myClass')
  }))

  it('should use remove action configured in SecDirectiveConfig', async(() => {
    fixture.detectChanges()
    let debugElement = fixture.debugElement.queryAll(By.css("div"))

    debugElement.forEach(e => {
      console.info(e.nativeElement)
    })
    fixture.detectChanges()
    expect(debugElement.length).toEqual(2)
  }))

})


@Component({
  selector: 'test-app-component',
  template: `
    <!-- this should display -->
    <div *secHasRole="ROLE_ADMIN">Authenticated</div>
    <!-- this should display -->
    <div *secHasRole="ROLE_ADMIN" resource="client-id">Authenticated</div>
    <!-- this should NOT display -->
    <div *secHasRole="ROLE_ADMIN" resource="other">Authenticated</div>
    <!-- this should NOT display -->
    <div *secHasRole="ROLE_USER" resource="client-id">Authenticated</div>
    <h2>Remove me please</h2>
  `
})
class AppComponent {
}
