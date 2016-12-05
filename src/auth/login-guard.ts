import { Injectable } from "@angular/core"
import { AuthService } from "./auth.service"

/**
 * A angular router guard that permit only logged in users to procced
 */
@Injectable()
export class LoginGuard {

  constructor(private auth: AuthService) {

  }

  canActivate(): Promise<boolean> {
    this.auth.isUserLoggedIn().then(v => {
      if (!v) {
        this.auth.login();
      }
    })
    return this.auth.isUserLoggedIn();

  }
}