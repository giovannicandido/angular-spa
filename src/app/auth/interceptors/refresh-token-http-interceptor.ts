import { Injectable } from "@angular/core"
import { Request, Response } from "@angular/http"
import { Observable } from "rxjs/Observable"

import { Interceptor } from "angular-http-interceptor"

import { AuthService } from "../auth.service"
import { Logger } from "../../logger/logger.service"

import 'rxjs/add/observable/fromPromise'

@Injectable()
export class RefreshTokenHttpInterceptor implements Interceptor {

  before(request: string | Request): Observable<any> {
    let promise = new Promise((resolve, reject) => {
      this.auth.keycloak.updateToken(30).success(fn => {
        this.logger.info("updated token")
        resolve(request)
      }).error(error => {
        reject(error)
      })
    })

    return Observable.fromPromise(promise)
  }

  after(response: Response): void {
  }

  error(err: any): void {
  }
  constructor(private auth: AuthService, private logger: Logger) {

  }

}