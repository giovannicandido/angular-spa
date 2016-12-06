import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { 
    AuthService, 
    LoginGuard, 
    SecIsAuthenticated, 
    SecIsNotAuthenticated 
} from './auth/'

const declarations = [
        SecIsAuthenticated,
        SecIsNotAuthenticated
    ]
const providers = [

]

@NgModule({
    imports: [
        HttpModule
    ],
    providers: providers,
    declarations: declarations,
    exports: [...declarations, ...providers]
})
export class AngularSpaModule {

}