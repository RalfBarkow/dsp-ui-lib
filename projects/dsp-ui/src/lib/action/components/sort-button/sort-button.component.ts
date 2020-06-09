import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface SortProp {
    key: string;
    label: string;
}

/**
 * A component with a list of properties to sort a list by one of them.
 * It can be used together with the DspSortBy pipe.
 */
@Component({
  selector: 'dsp-sort-button',
  templateUrl: './sort-button.component.html',
  styleUrls: ['./sort-button.component.scss']
})
export class SortButtonComponent implements OnInit {

    /**
     * @emits {string} sortKeyChange
     *
     * EventEmitter when a user selected a sort property;
     * This is the selected key
     */
    @Output() sortKeyChange: EventEmitter<string> = new EventEmitter<string>();

    menuXPos = 'after';

    activeKey: string;

    /**
     * @param sortProps[]
     * An array of SortProp objects for the selection menu:
     * SortProp: { key: string, label: string }
     */
    @Input() sortProps: SortProp[];

    /**
     * @param position string
     * Optional position of the sort menu: right or left
     * e.g. [position='left']
     */
    @Input() position = 'left';

    /**
     * @param icon
     * Default icon is "sort" from material design.
     * But you can replace it with another one
     * e.g. sort_by_alpha
     */
    @Input() icon = 'sort';

    constructor() {
    }

    ngOnInit() {
        if (this.position === 'right') {
            this.menuXPos = 'before';
        }

    }

    /**
     * @ignore
     *
     * @param key a string to sort by
     */
    sortBy(key: string) {
        this.sortKeyChange.emit(key);
    }

}