import {ChangeDetectorRef, Injectable} from '@angular/core';

@Injectable()
export class ChangeDetectionService {
    constructor(
        public cdr: ChangeDetectorRef
    ) {}
    singleAppCD() {
        this.cdr.markForCheck();
    }
    singleCompCD() {
        this.cdr.detectChanges();
    }
    attachCD() {
        this.cdr.reattach();
    }
    detachCD() {
        this.cdr.detach();
    }
}


// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
