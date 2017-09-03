import {HammerGestureConfig} from '@angular/platform-browser';
import {HammerInstance} from '@angular/platform-browser/src/dom/events/hammer_gestures';

export class HammerConfig extends HammerGestureConfig {
    // overrides default settings
    buildHammer(element: HTMLElement): HammerInstance {
        delete Hammer.defaults.cssProps.userSelect;
        return new Hammer.Manager(element, {
            recognizers: [
                [Hammer.Swipe, {direction: Hammer.DIRECTION_RIGHT, velocity: 0.30, threshold: 70 }],
            ]
        });
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
