import { NgModule } from "@angular/core"
import { HttpModule } from "@angular/http"
import { Interceptor, InterceptorModule } from "angular-http-interceptor"

import { HasAllRoles, HasAnyRoles, HasNotRoles, HasRole, SecIsAuthenticated, SecIsNotAuthenticated } from "./directives"
import { LoginGuard } from "./guards"
import { RefreshTokenHttpInterceptor } from "./interceptors"
import { AppSecurityListener } from "./listeners"
import { LoggerModule } from "../logger"
import { AuthService } from "./auth.service"
import { DomService, SecDirectiveConfig } from "./dom/dom.service"

const providers = [
  DomService,
  SecDirectiveConfig,
  LoginGuard,
  {
    provide: Interceptor,
    useClass: RefreshTokenHttpInterceptor,
    multi: true
  },
  AppSecurityListener,
  AuthService,
  SecDirectiveConfig
]
const declarations = [
  SecIsAuthenticated,
  SecIsNotAuthenticated,
  HasRole,
  HasAllRoles,
  HasAnyRoles,
  HasNotRoles
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
