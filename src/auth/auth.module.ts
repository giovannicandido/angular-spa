import { NgModule } from "@angular/core"
import { HttpModule } from "@angular/http"
import { InterceptorModule, Interceptor } from "angular-http-interceptor"

import { SecIsAuthenticated, SecIsNotAuthenticated } from "./directives/index"
import { LoginGuard } from './guards/index'
import { RefreshTokenHttpInterceptor } from './interceptors/index'
import { AppSecurityListener } from './listeners/index'
import { LoggerModule } from '../logger/index'
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
