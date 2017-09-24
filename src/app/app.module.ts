import { NgModule } from '@angular/core';
import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HammerConfig} from './configs/hammerjs/hammerjs.cnfg';
import {ENV} from './configs/environments/environment.cnfg';
import {CoreModule} from './core/core.module';
import {StoreModule} from 'angust/src/store.module';
import {AppRoutingModule} from './app.routing.module';

import { AppComponent } from './app.component';
import {FireBaseEModule} from './embedded.modules/firebase.e.module/firebase.em';
import {LocDBService} from './services/DB.service/DB.service';
import {ErrorHandlerService} from './services/error.handler.service/error.handler.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        CoreModule,
        FireBaseEModule.initAngularFB(ENV.firebase),
        BrowserAnimationsModule,
        StoreModule.forRoot(ENV.store)
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        LocDBService,
        ErrorHandlerService,
        { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }
    ],
    entryComponents: []
})
export class AppModule { }
