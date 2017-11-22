import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Injectable()
export class FormGroupService {
    constructor(
        private fb: FormBuilder
    ) {}
    /**
     * FormGroup init. with given config.
     * @param {Object} cnfg
     * @return {FormGroup}
     */
    initFG(cnfg: Object) {
        return this.fb.group(cnfg);
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
