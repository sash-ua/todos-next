import {Component, HostBinding} from '@angular/core';
import {AnimationsServices} from '../../../services/animation.service/animations.service';
import {Store} from 'angust/src/store';
import {StateStore} from '../../../configs/store/store.init';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {MainHelperService} from '../../../services/main.helper.service/main.helper.service';
import {ErrorHandlerService} from '../../../services/error.handler.service/error.handler.service';
import {hash} from 'monad-ts/src/services/hash';
import {AuthService} from '../../../embedded.modules/firebase.e.module/auth.em/auth.service/auth.service';
import * as firebase from 'firebase/app';
import Error = firebase.auth.Error;

export type FN = {[a: string]: string};

@Component({
    selector: 'auth-form-cmpnnt',
    templateUrl: 'auth.form.validation.component.html',
    animations: [
        AnimationsServices.animatonThreeStates(
            'routeAnimationUpDown',
            {opacity: 1, transform: 'translateY(0%)'},
            [{opacity: 0, transform: 'translateY(100%)'}, {opacity: 0, transform: 'translateY(100%)'}],
            ['0.4s ease-in', '0.4s ease-out']
        )]
})

export class AuthFormValidationComponent {
    private f2fForm: FormGroup;
    public fieldsName: FN = {f1: 'email', f2: 'password'};
    // FormGroup config.
    public VALID_CNFG_1 = {
        [this.fieldsName.f1]: ['', [Validators.required, Validators.email]],
        [this.fieldsName.f2]: ['', [Validators.required, Validators.minLength(6)]]
    };
    @HostBinding('@routeAnimationUpDown') routeAnimationUpDown: AnimationsServices = false;
    @HostBinding('style.display') display = 'block';
    constructor(
        private store: Store<StateStore>,
        private fb: FormBuilder,
        private hS: MainHelperService,
        public err: ErrorHandlerService,
        protected authFb: AuthService,
    ) {
        // Init FormGroup.
        this.f2fForm = this.hS.initFG(this.VALID_CNFG_1);
    }
    /**
     * Get credentials, validate and save it to Store.
     * @param {FormGroup} f2fForm
     * @param {Store<any>} store
     * @param {FN} fName
     */
    checkCredentials(f2fForm: FormGroup, store: Store<any>, fName: FN) {
        // Name of function to handle auth action.
        const active = this.store.manager().formInitData.active;
        const data = {
            rSide: {
                toStoreData: {
                    authInfo: {hash: hash(f2fForm.value), active: active}
                },
                fn: () => {
                    let {email, password} = f2fForm.value;
                    this.authFb[active](email, password)
                        .then((r: any) => {
                            store.manager({
                                addAuth: false,
                                isVisible: false,
                                overlayOn: false,
                            })
                        })
                        .catch((err: Error) => {
                            store.manager({
                                mdlWindow: true,
                                mdlWindowConfig: {
                                    header: 'Authentication error!',
                                    msg: err.message,
                                    timeOut: err.message.length * 40
                                }
                            })
                        });
                }
            },
            lSide: {
                toStoreData: {
                    mdlWindow: true,
                    mdlWindowConfig: {
                        header: 'Validation error!',
                        msg: 'Check the data.',
                        timeOut: 1000
                    }
                }
            }
        };
        // if cond === true -> data, data.rSide else data, data.lSide.
        const e = this.hS.trnsfrmr1(`auth.form.validation.component.ts.checkCredentials`, data, cond);
        function cond() {
            if (store.manager().formInitData.active === 'reset') {
                // Disable form control.
                f2fForm.controls[fName.f2].disable();
            }
            const b = f2fForm.status === 'VALID';
            // Enable form control.
            f2fForm.controls[fName.f2].enable();
            return b;
        }
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
