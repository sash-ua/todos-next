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
        { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }
    ],
    entryComponents: []
})
export class AppModule { }
