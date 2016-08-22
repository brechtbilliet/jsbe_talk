import {rootReducer} from "./reducers";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {instrumentStore} from "@ngrx/store-devtools";
import {useLogMonitor} from "@ngrx/store-log-monitor";
import {ApplicationContainer} from "./containers/application.container";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {hotModuleReplacement, provideHotStore} from "./hot-store";

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, FormsModule, provideHotStore(rootReducer)],
    declarations: [ApplicationContainer],
    bootstrap: [ApplicationContainer],
    providers: [
        instrumentStore({
            monitor: useLogMonitor({
                visible: false,
                position: "right"
            })
        })
    ]
})
export class AppModule {
}

function main(): any {
    return platformBrowserDynamic().bootstrapModule(AppModule);
}

if ((<any>module).hot) {
    hotModuleReplacement(main, module);
} else {
    document.addEventListener("DOMContentLoaded", () => main);
}