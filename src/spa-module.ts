import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { AuthService } from './auth/auth.service'

@NgModule({
    imports: [
        HttpModule
    ],
    providers: [
        AuthService
    ]
})
export class AngularSpaModule {

}