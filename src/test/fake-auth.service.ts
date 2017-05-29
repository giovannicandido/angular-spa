import { KeycloakType, AuthService, KeycloakPromise } from '../auth/auth.service'
import "rxjs/add/operator/mergeMap"
import { Account } from '../auth/account/account'

import 'rxjs/add/observable/of'

export class FakeKeycloak {

  token: "fake"

  /**
   * Called if there was an error during authentication.
   */
  // tslint:disable-next-line:member-ordering
  onAuthError: () => void
  /**
   * Called when the token is refreshed.
   */
  // tslint:disable-next-line:member-ordering
  onAuthRefreshSuccess: () => void

  /**
   * Called if there was an error while trying to refresh the token.
   */
  onAuthRefreshError: () => void

  /**
   * Called if the user is logged out (will only be called if the session status iframe is enabled, or in Cordova mode).
   */
  onAuthLogout: () => void

  /**
   * Called when the access token is expired. If a refresh token is available the token can be refreshed with
   * updateToken, or in cases where it’s not (ie. with implicit flow) you can redirect to login screen to obtain a
   * new access token.
   */
  onTokenExpired: () => void

  constructor(public account: Account) {}

  init() {

  }

  updateToken(delay?: number) {
  }

  /**
   * to spyOn
   */
  loadUserProfile(): KeycloakPromise {
      return null
  }

}

export class FakeAuthService extends AuthService {
    authenticated = false
    account: Account = new Account()
    initCallBack: Promise<boolean>
    keycloak: KeycloakType = <any>new FakeKeycloak(this.account)
    roles = ['ROLE_ADMIN']
    resource = 'client-id'
    constructor() {
        super(null)
    }

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

    hasRole(role: string, resource?: string) {
        let isRole = this.roles.indexOf(role) !== -1
        if (!resource) {
            return isRole
        }else {
            return (isRole && this.resource === resource)
        }
    }

}
