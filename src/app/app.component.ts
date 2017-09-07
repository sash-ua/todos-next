import {Component, AfterViewInit, OnDestroy} from '@angular/core';
import 'hammerjs';
import '../sass/main.scss';
import {Store} from 'angust/src/store';
import {Subscription} from 'rxjs/Subscription';
import {EventHandlerService} from './services/event.handlers.service/event.handler.service';
import {ErrorHandlerService} from './services/error.handler.service/error.handler.service';
import {StateStore} from './configs/store/store.init';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [
        EventHandlerService,
        ErrorHandlerService
    ]
})
export class AppComponent  implements AfterViewInit, OnDestroy {
    protected evHanler$: Subscription;
    constructor(
        protected store: Store<StateStore>,
        protected eventH: EventHandlerService
    ) {}
    ngAfterViewInit() {
        this.evHanler$ = this.eventH.evHandler(document.body, 'keyup', this.keyUpHandler.bind(this));
    }
    ngOnDestroy() {
        this.evHanler$.unsubscribe();
    }
    keyUpHandler(arg: KeyboardEvent) {
        const getSt: StateStore = this.store.manager();
        switch (arg.key === 'Escape') {
            case getSt.mdlWindow:
                this.store.manager({mdlWindow: false});
                break;
            case  getSt.addAuth:
                this.store.manager({addAuth: false, isVisible: false, overlayOn: false});
                break;
            case getSt.addItem.listVisible || getSt.addItem.taskVisible || getSt.addItem.addListVisible:
                this.store.manager({overlayOn: false});
                this.store.manager().addItem.addListVisible = false;
                this.store.manager().addItem.listVisible = false;
                this.store.manager().addItem.taskVisible = false;
                break;
        }
    }
}
