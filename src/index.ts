import {rootReducer} from "./reducers";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {useLogMonitor, StoreLogMonitorModule} from "@ngrx/store-log-monitor";
import {ApplicationContainer} from "./containers/application.container";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {hotModuleReplacement, provideHotStore} from "./hot-store";
import {ContentComponent} from "./components/content.component";
import {SidebarComponent} from "./components/sidebar.component";
import {StarComponent} from "./components/star.component";
import {TopbarComponent} from "./components/topbar.component";

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, FormsModule, provideHotStore(rootReducer),
        StoreLogMonitorModule, StoreDevtoolsModule.instrumentStore({
        monitor: useLogMonitor({
            visible: false,
            position: "right"
        })
    })],
    declarations: [ApplicationContainer, ContentComponent, SidebarComponent, StarComponent, TopbarComponent],
    bootstrap: [ApplicationContainer]
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