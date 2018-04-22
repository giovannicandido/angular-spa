import {Injectable} from '@angular/core'
import {Response} from '@angular/http'

import { Observable } from "rxjs/Observable"

import "rxjs/add/observable/of"

import {Interceptor} from "angular-http-interceptor"


declare var UIkit: any

/**
 * Default implementation use UIKit Notifications and Dialog
 * If you use the default you must add UIKit as dependency of your project,
 * and setup it
 */
@Injectable()
export class DialogService {
    showMessage(message: string, status: string) {
        UIkit.notify(message, status)
    }

    showError(message: string, status: string) {
        UIkit.modal.alert(`${status} - ${message}`)
    }

    confirm(message: string, func: () => void) {
        UIkit.confirm(message, func)
    }
}

@Injectable()
export class DialogInterceptor implements Interceptor {
    constructor(private dialog: DialogService) {
    }
    before(request: any): Observable<any> {
        return Observable.of(request)
    }
    after(response: any) {
        if (response.status >= 200 && response.status < 300
            && (response.text() != null && (this.isHeaderStartsWithValue(response, 'Content-Type', 'text/plain')
                || this.isHeaderStartsWithValue(response, 'Content-Type', 'text/html')))) {
            this.dialog.showMessage(response.text(), 'info')
        }

        if (response.status >= 500 && response.status < 600) {
            this.dialog.showError(response.text(), response.status)
        } else if (response.status >= 400 && response.status < 500) {
            this.dialog.showError(response.text(), response.status)

        }

    }
    error(err: any) {
        this.dialog.showError(err, 'error')
    }

    isHeaderStartsWithValue(response: Response, header: string, value: string): boolean {
        return response.headers.has(header) && response.headers.get(header).startsWith(value)
    }

    toString() {
        return "DialogInterceptor"
    }

}
