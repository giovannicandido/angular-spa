import { AuthService } from '../auth/auth.service'
import { Observable } from 'rxjs/Observable'
import { Account } from '../auth/account/account'

import 'rxjs/add/observable/of'

export class FakeAuthService {
    authenticated: boolean = false
    account: Account = new Account()
    initCallBack: Promise<boolean>
    keycloak: any

    init(config: any): Promise<boolean> {
        return Promise.resolve(true)
    }

    isUserLoggedIn(): Promise<boolean> {
        return Promise.resolve(this.authenticated)
    }

    login() {
        this.authenticated = true
    }

    logout() {
        this.authenticated = false
    }

    getLoginAccount(): Observable<Account> {
        return Observable.of(this.account)
    }
}