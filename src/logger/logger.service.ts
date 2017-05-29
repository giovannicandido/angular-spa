import { Injectable } from "@angular/core"

/**
 * Simple logging service. Is intented to be overrided
 * Default implementation go to console, but you can use
 * https://www.npmjs.com/package/angular2-logger
 */
@Injectable()
export class Logger {
    error(message: any) {
        console.error(message)
    }
    warn(message: any) {
        console.warn(message)
    }
    info(message: any) {
        console.info(message)
    }
    debug(message: any) {
        console.debug(message)
    }
    log(message: any) {
        console.log(message)
    }
}
