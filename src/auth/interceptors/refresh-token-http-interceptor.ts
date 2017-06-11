import { Injectable } from "@angular/core"
import { Request, Response } from "@angular/http"
import { Observable } from "rxjs/Observable"

import { Interceptor } from "angular-http-interceptor"

import { AuthService } from "../auth.service"
import { Logger } from "../../logger/logger.service"

import "rxjs/add/observable/fromPromise"

@Injectable()
export class RefreshTokenHttpInterceptor implements Interceptor {

  before(request: Request): Observable<any> {
    this.logger.log("RefreshTokenHttpInterceptor before interceptor")
    let promise = new Promise((resolve, reject) => {
      this.auth.keycloak.updateToken(30).success(result => {
        let token = this.auth.keycloak.token
        request.headers.set("Authorization", `Bearer ${token}`)
        resolve(request)
      }).error(error => {
        this.logger.info("Can't refresh token: " + error)
        resolve(request)
      })
    })

    return Observable.fromPromise(promise)
  }

  after(response: Response): void {
  }

  error(err: any): void {
  }
  constructor(private auth: AuthService, private logger: Logger) {
    logger.log("RefreshTokenHttpInterceptor activated")
  }
}
