import { NgModule } from "@angular/core"
import { HttpModule } from "@angular/http"
import { InterceptorModule, Interceptor } from "angular-http-interceptor"

import { SecIsAuthenticated, SecIsNotAuthenticated, HasRole, HasAllRoles } from "./directives"
import { LoginGuard } from './guards'
import { RefreshTokenHttpInterceptor } from './interceptors'
import { AppSecurityListener } from './listeners'
import { LoggerModule } from '../logger'
import {AuthService} from "./auth.service"

const providers = [
  LoginGuard,
  {
    provide: Interceptor,
    useClass: RefreshTokenHttpInterceptor,
    multi: true
  },
  AppSecurityListener,
  AuthService
]
const declarations = [
  SecIsAuthenticated,
  SecIsNotAuthenticated,
  HasRole,
  HasAllRoles
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
