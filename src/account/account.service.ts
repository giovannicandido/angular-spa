import { Injectable } from '@angular/core'
import { Http } from "@angular/http"

import { Observable } from "rxjs/Observable"

import { Account } from "./account"

@Injectable()
export class AccountService {
    constructor(private http: Http) {

    }

    getLoginAccount(): Observable<Account> {
        return this.http.get("/api/account").map(r => r.json())
    }

    logout() {
        this.http.post("/api/logout", null).subscribe()
    }
}
