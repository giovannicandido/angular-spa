import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Logger } from "../../logger/logger.service"
import { AuthService } from "../auth.service"

/**
 * This class listen for security events in Keycloak and do what it should
 * @author Giovanni Silva.
 */
@Injectable()
export class AppSecurityListener {
  
  public static TOKEN_STORAGE_KEY = 'KEYCLOAK_TOKEN'

  constructor(private auth: AuthService,
              private router: Router,
              private logger: Logger) {
    this.startListening()
  }

  startListening() {
    this.auth.keycloak.onAuthSuccess = () => {
      this.logger.info("User is logged in. Token will be saved")
      this.saveToken()
    }
    this.auth.keycloak.onAuthRefreshSuccess = () => {
      this.logger.info("Token refreshed. Will be saved")
      this.saveToken()
    }
    this.auth.keycloak.onAuthLogout = () => {
      this.logger.info("*** Logged out in another page")
      this.router.navigateByUrl('/')
      this.auth.logout()
    }
    this.auth.keycloak.onTokenExpired = () => {
      this.logger.info("Token expired")
    }
  }

  private saveToken() {
    sessionStorage.setItem(AppSecurityListener.TOKEN_STORAGE_KEY, this.auth.keycloak.token )
  }

}
