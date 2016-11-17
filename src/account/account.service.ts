import { Http } from "@angular/http"

import { Observable } from "rxjs/Observable"

import { User } from "./user"


export class UserService {
    constructor(private http: Http) {

    }

    getCurrentUser(): Observable<User> {
        return this.http.get("/api/account").map(r => r.json())
    }
}
