import { Component } from '@angular/core'
import { HttpModule } from '@angular/http'
import { Router } from '@angular/router'
import { TestBed, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { AuthModule } from '../auth.module'
import { AuthService } from '../auth.service'
import { RefreshTokenHttpInterceptor } from './refresh-token-http-interceptor'
import { FakeAuthService } from '../../test/fake-auth.service'

let fixture: ComponentFixture<AppComponent>
let comp: AppComponent

describe("refresh-token-http-interceptor", () => {
  beforeEach(() => {
    //   // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
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
    fixture = TestBed.createComponent(AppComponent);

    //   // get test component from the fixture
    comp = fixture.componentInstance;
  })

  it('should inject', () => {
    fixture.detectChanges()
    let debugElement = fixture.debugElement.query(By.css("h1"))
    let element = debugElement.nativeElement
    expect(element.textContent).toContain('Hello')
    expect(comp.interceptor).not.toBeNull()
  })
})

@Component({
  selector: 'test-app-component',
  template: '<h1>Hello</h1>'
})
class AppComponent {
  constructor(public interceptor: RefreshTokenHttpInterceptor) { }
}
