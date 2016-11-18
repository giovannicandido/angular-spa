import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { AccountService } from './account/account.service'

@NgModule({
    imports: [
        HttpModule
    ],
    providers: [
        AccountService
    ]
})
export class AngularSpaModule {

}