import {Component, OnInit, HostBinding} from '@angular/core';
import {AnimationsServices} from '../../../services/animation.service/animations.service';
import {Store} from 'angust/src/store';
import {StateStore, AuthConfig} from '../../../configs/store/store.init';
import {ErrorHandlerService} from '../../../services/error.handler.service/error.handler.service';
import {MainHelperService} from '../../../services/main.helper.service/main.helper.service';
import {AuthService} from '../../../embedded.modules/firebase.e.module/auth.em/auth.service/auth.service';

@Component({
    selector: 'auth-cmpnnt',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.css'],
    animations: [
        AnimationsServices.animatonThreeStates(
            'routeAnimationUpDown',
            {opacity: 1, transform: 'translateY(50px)'},
            [{opacity: 0, transform: 'translateY(0)'}, {opacity: 0, transform: 'translateY(0)'}],
            ['0.3s ease-in', '0.3s ease-out']
        )
    ]
})

export class AuthComponent implements OnInit {
    // Flag to save pressed button name.
    private f: string;
    // It's to highlight active button.
    private active: string;
    public logInCnfg: AuthConfig;
    public signInCnfg: AuthConfig;
    public resetCnfg: AuthConfig;
    @HostBinding('@routeAnimationUpDown') routeAnimationUpDown: AnimationsServices = true;
    @HostBinding('style.display') display = 'inline-table';

    constructor(
        protected store: Store<StateStore>,
        private hS: MainHelperService,
        public err: ErrorHandlerService,
        protected fb: AuthService
    ) {
        this.logInCnfg  = this.store.manager().LOG_IN_AUTH_CNFG;
        this.signInCnfg = this.store.manager().SIGN_IN_AUTH_CNFG;
        this.resetCnfg  = this.store.manager().RESET_AUTH_CNFG;
    }

    ngOnInit() { }
    // Either monad example
    protected configAuthForm(obj: AuthConfig) {
        // If press the same button as previous it produces `true`.
        const cond = (d: any) => d.args.btnName === this.f;
        const constPart: any = {
            isVisible: this.store.manager().isVisible,
            toStoreData: {
                addItem: {taskVisible: false, listVisible: false},
            }
        };
        const data: any = {
            args: obj,
            rSide: {
                ...constPart,
                fn: (d: any): void => {
                    let s: boolean;
                    s = !d.isVisible;
                    this.active = s ?  d.args.active : '';
                    this.store.manager({isVisible: s, overlayOn: s, formInitData: obj});
                }
            },
            lSide: {
                ...constPart,
                fn: (d: any): void => {
                    this.f = d.args.btnName;
                    this.active = d.args.active;
                    this.store.manager({isVisible: true, overlayOn: true, formInitData: obj});
                }
            }
        };
        const e = this.hS.trnsfrmr1(data, cond);
        if (e instanceof Error) {this.err.handleError((e))}
    }
    logOut() {
        this.fb.logOut();
        this.store.manager({addAuth: false, isVisible: false, overlayOn: false, userName: 'guest', connected: undefined});
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
