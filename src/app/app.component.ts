import {Component, AfterViewInit, OnDestroy, Renderer2} from '@angular/core';
// import 'hammerjs';
import '../sass/main.scss';
import {Store} from 'angust/src/store';
import {Subscription} from 'rxjs/Subscription';
import {EventHandlerService} from './services/event.handlers.service/event.handler.service';
import {ErrorHandlerService} from './services/error.handler.service/error.handler.service';
import {StateStore} from './configs/store/store.init';
import {DragNDropService} from './services/drag-n-drop.service/drag-n-drop.service';
import  * as firebase from 'firebase/app';
import {AuthService} from './embedded.modules/firebase.e.module/auth.em/auth.service/auth.service';
import Error = firebase.auth.Error;
import {DBService} from './embedded.modules/firebase.e.module/db.em/db.service/db.service';
import {LocDBService} from './services/DB.service/DB.service';
import {FB} from './configs/firebase/firebase.cnfg';
import {MonadService} from './services/monad.service/monad.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [
        EventHandlerService,
        ErrorHandlerService,
        DragNDropService
    ]
})
export class AppComponent implements AfterViewInit, OnDestroy {
    private keyUp$: Subscription;
    private dragstart$: Subscription;
    private dragover$: Subscription;
    private drop$: Subscription;
    constructor(
        private store: Store<StateStore>,
        private eventH: EventHandlerService,
        private rnr2: Renderer2,
        private dndS: DragNDropService,
        private fb: AuthService,
        private db: DBService,
        private err: ErrorHandlerService,
        private ldb: LocDBService,
        private hS: MonadService,
    ) {}
    ngAfterViewInit() {
        this.initApp();
    }
    ngOnDestroy() {
        // Unsubscribe subscriptions onDestroy the component.
        this.eventH.unsubsFactory(this.keyUp$, this.dragstart$, this.dragover$, this.drop$);
    }
    /**
     * Init user, set event listeners and add the observer on the user auth state changing.
     */
    initApp () {
        // Monad transformer to authorize user if session started.
        this.hS.initTrnsfrmr(`firebase:authUser:${FB.apiKey}:[DEFAULT]`, `app.component.ts.constructor`, this.initUser.bind(this));
        this.setEventsListeners();
        // Adding the observer on the user auth state changing.
        this.fb.auth.onAuthStateChanged((resp:  firebase.User) => {
                if (resp) {
                    this.initUser(resp);
                }
            },
            (err: Error) => this.err.handleError(err));
    }
    /**
     * Get user data and update corresponding app state.
     * @param user
     */
    initUser(user: any): void {
        const userId = user.uid;
        this.ldb.getAllData(userId)
            .then((r: any) => {
                const v = r.val();
                this.store.manager({userName: user.email, connected: userId});
                if (v === null) {this.ldb.updateDB(this.store.manager().theme, 'theme')}
                if (v) {
                    this.store.manager({theme: v.theme}).data = v.data ? v.data : this.store.manager().data;
                }
            })
            .catch((e: any) => this.err.handleError(`app.component.ts.initUser ${e}`));
    }
    /**
     * Set event listners.
     */
    setEventsListeners() {
        [this.keyUp$, this.dragstart$, this.dragover$, this.drop$]
            = this.eventH.evFactory(
            this.rnr2.selectRootElement(document).body,
            ['keyup', 'dragstart', 'dragover', 'drop'],
            [
                this.keyUpHandler.bind(this),
                this.dndS.dragStartHandler.bind(this),
                this.dndS.dragOverHandlerDebounced.bind(this),
                this.dndS.dragDropHandler.bind(this),
            ]
        )
    }
    /**
     * Handle keyup.escape events.
     * @param {KeyboardEvent} ev
     */
    keyUpHandler(ev: KeyboardEvent) {
        const getSt: StateStore = this.store.manager();
        switch (ev.key === 'Escape') {
            case getSt.mdlWindow:
                this.store.manager({mdlWindow: false});
                break;
            case getSt.addAuth:
                this.store.manager({addAuth: false, isVisible: false, overlayOn: false});
                break;
            case getSt.addItem.listVisible || getSt.addItem.taskVisible || getSt.addItem.addListVisible:
                this.store.manager({
                    addItem: {addListVisible: false, listVisible: false, taskVisible: false, listID: undefined, taskID: undefined},
                    overlayOn: false,
                    sideNav: false
                });
                break;
            case getSt.sideNav:
                this.store.manager({sideNav: false});
                break;
        }
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
