import { NgModule } from "@angular/core"
import { Logger } from "./logger.service"

@NgModule({
    providers: [
        Logger
    ]
})
export class LoggerModule {

}
