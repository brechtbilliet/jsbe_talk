import { provideStore} from "@ngrx/store";
import {rootReducer} from "./reducers";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {instrumentStore} from "@ngrx/store-devtools";
import { useLogMonitor } from "@ngrx/store-log-monitor";
import {ApplicationContainer} from "./containers/application.container";

bootstrap(ApplicationContainer, [
    provideStore(rootReducer),
    instrumentStore({
        monitor: useLogMonitor({
            visible: false,
            position: "right"
        })
    }),
]);