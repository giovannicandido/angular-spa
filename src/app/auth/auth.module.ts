import { NgModule } from "@angular/core"
import { HttpModule } from "@angular/http"
import { InterceptorModule, Interceptor } from "angular-http-interceptor"

import { SecIsAuthenticated, SecIsNotAuthenticated } from "./directives/"
import { LoginGuard } from './guards/'
import { RefreshTokenHttpInterceptor } from './interceptors/'
import { AppSecurityListener } from './listeners/'
import { LoggerModule } from '../logger'

const providers = [
  LoginGuard,
  {
    provide: Interceptor,
    useClass: RefreshTokenHttpInterceptor,
    multi: true
  },
  AppSecurityListener
]
const declarations = [
  SecIsAuthenticated,
  SecIsNotAuthenticated
]

@NgModule({
  imports: [
    HttpModule,
    LoggerModule,
    InterceptorModule
  ],
  providers: providers,
  declarations: declarations,
  exports: [
    ...declarations
  ]
})
export class AuthModule {

}
