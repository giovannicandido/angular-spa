import { NgModule } from "@angular/core"
import { HttpModule } from "@angular/http"
import { InterceptorModule } from "angular-http-interceptor"

import { SecIsAuthenticated, SecIsNotAuthenticated } from "./directives/"
import { LoginGuard } from './guards/'
import { RefreshTokenHttpInterceptor } from './interceptors/'
import { AppSecurityListener } from './listeners/'
import { LoggerModule } from '../logger'

const providers = [
  LoginGuard,
  RefreshTokenHttpInterceptor,
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
    InterceptorModule.withInterceptors([RefreshTokenHttpInterceptor])
  ],
  providers: providers,
  declarations: declarations,
  exports: [
    ...declarations
  ]
})
export class AuthModule {

}
