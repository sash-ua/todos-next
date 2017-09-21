import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'page-404',
    styles: [
        '.page-404 {color: #b43232; font-size: 34px; text-align: center} ' +
        'button{margin: auto; padding: 0; display: block} ' +
        'a{display: block; text-decoration: none}'
    ],
    template:
    `<h1 class="page-404">404. Page not found!</h1>
     <button md-raised-button><a routerLink="/lists">Home</a></button>
    `
})

export class Page404Component {
    constructor() {}
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
