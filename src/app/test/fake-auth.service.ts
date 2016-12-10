import { AuthService } from '../auth/auth.service'
import { Observable } from 'rxjs/Observable'
import { Account } from '../auth/account/account'

import 'rxjs/add/observable/of'

export class FakeAuthService {
    
    initCallBack: Promise<boolean>
    keycloak: any

    init(config: any): Promise<boolean> {
        return Promise.resolve(true)
    }

    isUserLoggedIn(): Promise<boolean> {
        return Promise.resolve(true)
    }

    login() {

    }

    logout() {

    }

    getLoginAccount(): Observable<Account> {
        return Observable.of(new Account())
    }
}