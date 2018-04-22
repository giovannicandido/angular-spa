import { Injectable } from "@angular/core"
import { Request, Response } from "@angular/http"
import { Observable } from "rxjs/Observable"

import "rxjs/add/observable/of"

import { Interceptor } from "angular-http-interceptor"

@Injectable()
export abstract class LoginService {
    abstract login()
    abstract loginExpired()
}

@Injectable()
export class AjaxTimeoutInterceptor implements Interceptor {
    STATUS_CODE = 901
    constructor(private loginService: LoginService) {
    }

    before(request: Request): Observable<any> {
        return Observable.of(request)
    }

    after(response: Response) {
        if (response.status === this.STATUS_CODE) {
            this.loginService.loginExpired()
        }
    }

    error(err: Response) {
    }

    toString() {
        return "AjaxTimeoutInterceptor"
    }
}
