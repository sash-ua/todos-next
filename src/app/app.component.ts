import {Component, AfterViewInit, OnDestroy, Renderer2, OnInit} from '@angular/core';
import 'hammerjs';
import '../sass/main.scss';
import {Store} from 'angust/src/store';
import {Subscription} from 'rxjs/Subscription';
import {EventHandlerService} from './services/event.handlers.service/event.handler.service';
import {ErrorHandlerService} from './services/error.handler.service/error.handler.service';
import {StateStore} from './configs/store/store.init';
import {DragNDropService} from './services/drag-n-drop.service/drag-n-drop.service';
import  * as firebase from 'firebase/app';
// import 'firebase/auth';
import {AuthService} from './embedded.modules/firebase.e.module/auth.em/auth.service/auth.service';
import Error = firebase.auth.Error;
import {DBService} from './embedded.modules/firebase.e.module/db.em/db.service/db.service';

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
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    protected evHanler$: Subscription;
    protected dragstart$: Subscription;
    protected dragover$: Subscription;
    protected drop$: Subscription;
    constructor(
        protected store: Store<StateStore>,
        protected eventH: EventHandlerService,
        protected rnr2: Renderer2,
        protected dndS: DragNDropService,
        protected fb: AuthService,
        protected db: DBService,
        protected err: ErrorHandlerService
    ) {
        this.fb.auth.onAuthStateChanged((user:  firebase.User) => {
            console.log(user);
            if (user) {
                const userId = user.uid;
                this.db.dbDispatcher('ref', '/' + userId, 'once', 'value')
                    .then((r: any) => {
                        console.log(r);
                        console.dir(JSON.parse(r.val()));
                        const v = r.val();
                        this.store.manager({userName: user.email, connected: userId}).data =  v ? JSON.parse(v) : this.store.manager().data;
                    })
                    .catch((e: Error) => this.err.handleError(e));
            }
        },
            (e: Error) => this.err.handleError(e));
    }
    ngOnInit() {}
    ngAfterViewInit() {
        [this.evHanler$, this.dragstart$, this.dragover$, this.drop$]
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
    ngOnDestroy() {
        this.eventH.unsubsFactory(this.evHanler$, this.dragstart$, this.dragover$, this.drop$);
    }
    keyUpHandler(ev: KeyboardEvent) {
        const getSt: StateStore = this.store.manager();
        switch (ev.key === 'Escape') {
            case getSt.mdlWindow:
                this.store.manager({mdlWindow: false});
                break;
            case  getSt.addAuth:
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
