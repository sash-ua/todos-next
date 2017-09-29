import {AnimationEntryMetadata} from '@angular/core';
import {trigger, state, transition, style, animate} from '@angular/animations';

export type AnimationT = '*' | { [key: string]: string | number; } | ('*' | { [key: string]: string | number; })[];
export type AnimationStylesT = '*' | { [key: string]: string | number; } | ('*' | { [key: string]: string | number; })[];

/**
 * Two states animation.
 * @param {string} name
 * @param {Array<any>} states
 * @param {AnimationT[]} stylesAnim
 * @param {Array<any>} trs
 * @return {AnimationEntryMetadata}
 */
export function  animatonTwoStates(
    name: string,
    [...states]: Array<any>,
    [...stylesAnim]: AnimationT[],
    [...trs]: Array<any>
): AnimationEntryMetadata {
    let [a, b] = states.map(function(v, i, arr){
        return [
            state(v, style(stylesAnim[i])),
            transition((i === 0)
                ? `${arr[i]} => ${arr[i + 1]}`
                : `${arr[i - 1]} => ${arr[i]}`, animate(trs[i]))];
    });
    return trigger(name, [...a, ...b]);
}
/**
 * Three states animation.
 * @param {string} name
 * @param {AnimationStylesT} stateStyles
 * @param {[AnimationStylesT]} trsStyles
 * @param {Array<any>} trsAnimate
 * @return {AnimationEntryMetadata}
 */
export function animatonThreeStates(
    name: string,
    stateStyles: AnimationStylesT,
    [...trsStyles]: [AnimationStylesT],
    [...trsAnimate]: Array<any>
): AnimationEntryMetadata {
    return trigger(
        name,
        [
            state('*', style(stateStyles)),
            ...trsStyles.map(function(v, i){
                return (i === 0)
                    ? transition('void => *', [style(trsStyles[i]), animate(trsAnimate[i])])
                    : transition('* => void', [animate(trsAnimate[i], style(trsStyles[i]))]);
            })
        ]);
}
// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
