import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { AuthService, LoginGuard } from './auth/'

@NgModule({
    imports: [
        HttpModule
    ],
    providers: [
    ]
})
export class AngularSpaModule {

}