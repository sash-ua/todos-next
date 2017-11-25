import { Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'universal-cmpnnt',
    templateUrl: 'universal.component.html',
    styleUrls: ['universal.component.css'],
    providers: []
})

export class UniversalComponent {
    // Form config data.
    @Input() configData: any;
    // Returned back form data.
    @Output() formSubmitData = new EventEmitter<FormGroup>();
    // The minimal date which we can select on date-picker.
    minDate = new Date();
    constructor() {}
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
