import {Component, HostBinding} from '@angular/core';
import {AnimationsServices} from '../../../services/animation.service/animations.service';
import {Store} from 'angust/src/store';
import {StateStore} from '../../../configs/store/store.init';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {MainHelperService} from '../../../services/main.helper.service/main.helper.service';
import {ErrorHandlerService} from '../../../services/error.handler.service/error.handler.service';

export type FN = {[a: string]: string};

@Component({
    selector: 'auth-form-cmpnnt',
    templateUrl: 'auth.form.validation.component.html',
    animations: [
        AnimationsServices.animatonThreeStates(
            'routeAnimationLeft',
            {opacity: 1, transform: 'translateX(0%)'},
            [{opacity: 0, transform: 'translateY(50%)'}, {opacity: 0, transform: 'translateY(50%)'}],
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
    @HostBinding('@routeAnimationLeft') routeAnimationLeft: AnimationsServices = false;
    @HostBinding('style.display') display = 'block';
    constructor(
        private store: Store<StateStore>,
        private fb: FormBuilder,
        private hS: MainHelperService,
        public err: ErrorHandlerService
    ) {
        // Init FormGroup.
        this.f2fForm = this.hS.initFG(this.VALID_CNFG_1);
    }
    // Get credentials validate it and save to Store.
    checkCredentials(f2fForm: FormGroup, store: Store<any>, fn: FN) {
        const data = {
            rSide: {
                toStoreData: {addAuth: false, isVisible: false, overlayOn: false, authInfo: f2fForm.value}
            },
            lSide: {
                toStoreData: {
                    mdlWindow: true,
                    mdlWindowConfig: {
                        header: 'Authentication error!',
                        msg: 'Check Email or Password.',
                        timeOut: 2500
                    }
                }
            }
        };
        // if cond === true -> data, data.rSide else data, data.lSide.
        const e = this.hS.trnsfrmr1(data, cond);
        if (e instanceof Error) {this.err.handleError(e); }
        function cond() {
            return store.manager().formInitData.active === 'reset' && f2fForm.controls[fn.f1].status === 'VALID'
                || f2fForm.status === 'VALID';
        }
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
