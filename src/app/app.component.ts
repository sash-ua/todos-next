import {Component, AfterViewInit, OnDestroy, Renderer2} from '@angular/core';
import 'hammerjs';
import '../sass/main.scss';
import {Store} from 'angust/src/store';
import {Subscription} from 'rxjs/Subscription';
import {EventHandlerService} from './services/event.handlers.service/event.handler.service';
import {ErrorHandlerService} from './services/error.handler.service/error.handler.service';
import {StateStore} from './configs/store/store.init';
import {DragNDropService} from './services/drag-n-drop.service/drag-n-drop.service';

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
export class AppComponent  implements AfterViewInit, OnDestroy {
    protected evHanler$: Subscription;
    protected dragstart$: Subscription;
    protected dragover$: Subscription;
    protected drop$: Subscription;
    constructor(
        protected store: Store<StateStore>,
        protected eventH: EventHandlerService,
        protected rnr2: Renderer2,
        protected dndS: DragNDropService
    ) {}
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
                this.store.manager({overlayOn: false});
                getSt.addItem.addListVisible = false;
                getSt.addItem.listVisible = false;
                getSt.addItem.taskVisible = false;
                break;
        }
    }
}
