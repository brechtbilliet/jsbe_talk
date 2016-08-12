import {provideStore} from "@ngrx/store";
import {rootReducer} from "./reducers";
import {bootstrap, platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {instrumentStore} from "@ngrx/store-devtools";
import {useLogMonitor} from "@ngrx/store-log-monitor";
import {ApplicationContainer} from "./containers/application.container";
import {ApplicationState} from "./applicationState";
import {hotModuleReplacement} from "./hmr";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule, FORM_PROVIDERS, REACTIVE_FORM_PROVIDERS} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, FormsModule],
    declarations: [ApplicationContainer],
    bootstrap: [ApplicationContainer],
    providers: [
        provideStore(rootReducer),
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

function main(hmrState?: ApplicationState): any {
    return bootstrap(ApplicationContainer, [
        provideStore(rootReducer, hmrState),
        FORM_PROVIDERS,
        REACTIVE_FORM_PROVIDERS,
        instrumentStore({
            monitor: useLogMonitor({
                visible: false,
                position: "right"
            })
        })
    ]);
}
if (process.env.ENV !== "production") {
    hotModuleReplacement(main, module);
} else {
    platformBrowserDynamic().bootstrapModule(AppModule);
}
