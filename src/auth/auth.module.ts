import { NgModule } from "@angular/core"
import { HttpModule } from "@angular/http"
import { InterceptorModule } from "angular-http-interceptor"

import { AuthService } from './auth.service'
import { SecIsAuthenticated, SecIsNotAuthenticated } from "./directives/"
import { LoginGuard } from './guards/'
import { RefreshTokenHttpInterceptor } from './interceptors/'
import { AppSecurityListener } from './listeners/'

const providers = [
  AuthService,
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
    InterceptorModule.withInterceptors([RefreshTokenHttpInterceptor])
  ],
  providers: providers,
  declarations: declarations,
  exports: [
    ...declarations,
    ...providers
  ]
})
export class AuthModule {

}
