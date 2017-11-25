import { Component, Input, Renderer2} from '@angular/core';
import {Store} from 'angust/src/store';
import {Task} from '../../../configs/store/store.init';

type LocalDataList = {tasks: Task, idx: number};

@Component({
    selector: 'folding-list-cmpnnt',
    templateUrl: 'folding.list.component.html',
    styleUrls: ['folding.list.component.css'],
    providers: []
})

export class FoldingListComponent<T> {
    @Input() data: LocalDataList;
    constructor(
        private store: Store<T>,
        private r2: Renderer2,
    ) { }
    /**
    * Dispatch and toggle `expand_less`/`expand_more` template el-s.
    * @param {number} id
    * @param {string} clss
    */
    toggleClass (id: number, clss: string): void {
      const el = document.getElementById(`list${id}`);
      el.classList.contains(clss)
          ? this.r2.removeClass(el, clss)
          : this.r2.addClass(el, clss);
  }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
