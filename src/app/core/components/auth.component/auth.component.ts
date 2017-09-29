import {Component, HostBinding, AnimationEntryMetadata} from '@angular/core';
import {animatonThreeStates} from '../../../services/functions/animations.service';
import {Store} from 'angust/src/store';
import {StateStore, AuthConfig} from '../../../configs/store/store.init';
import {ErrorHandlerService} from '../../../services/error.handler.service/error.handler.service';
import {MonadService} from '../../../services/monad.service/monad.service';
import {AuthService} from '../../../embedded.modules/firebase.e.module/auth.em/auth.service/auth.service';

@Component({
    selector: 'auth-cmpnnt',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.css'],
    animations: [
        animatonThreeStates(
            'routeAnimationUpDown',
            {opacity: 1, transform: 'translateY(50px)'},
            [{opacity: 0, transform: 'translateY(0)'}, {opacity: 0, transform: 'translateY(0)'}],
            ['0.3s ease-in', '0.3s ease-out']
        )
    ]
})

export class AuthComponent {
    // Flag to save pressed button name.
    private f: string;
    // It's to highlight active button.
    private active: string;
    public logInCnfg: AuthConfig;
    public signInCnfg: AuthConfig;
    public resetCnfg: AuthConfig;
    @HostBinding('@routeAnimationUpDown') routeAnimationUpDown: AnimationEntryMetadata = true;
    @HostBinding('style.display') display = 'inline-table';

    constructor(
        private store: Store<StateStore>,
        private hS: MonadService,
        public err: ErrorHandlerService,
        private fb: AuthService
    ) {
        // Configs of component.
        this.logInCnfg  = this.store.manager().LOG_IN_AUTH_CNFG;
        this.signInCnfg = this.store.manager().SIGN_IN_AUTH_CNFG;
        this.resetCnfg  = this.store.manager().RESET_AUTH_CNFG;
    }
    // Either monad #example
    /**
     * Configurate auth form.
     * @param {AuthConfig} obj
     */
    configAuthForm(obj: AuthConfig) {
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
        // If press the same button as previous it produces `true`.
        const cond = (d: any) => d.args.btnName === this.f;
        this.hS.trnsfrmr1(`auth.component.ts.configAuthForm`, data, cond);
    }
    /**
     * LogOut.
     */
    logOut() {
        this.fb.logOut();
        this.store.manager({addAuth: false, isVisible: false, overlayOn: false, userName: 'guest', connected: undefined}).data = [];
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
