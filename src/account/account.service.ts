import { Injectable } from '@angular/core'
import { Http, Response } from "@angular/http"

import { Observable } from "rxjs/Observable"
import "rxjs/add/operator/toPromise"

import { Account } from "./account"

@Injectable()
export class AccountService {
    constructor(private http: Http) {

    }

    getLoginAccount(): Observable<Account> {
        return this.http.get("/api/account").map(r => r.json())
    }

    logout(): Promise<Response> {
        return this.http.post("/api/logout", null).toPromise()
    }
}
