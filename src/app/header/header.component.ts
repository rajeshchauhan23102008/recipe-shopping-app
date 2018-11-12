import { Component, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    @Output() headerClick = new EventEmitter<string>();

    onHeaderClick(menuSelected: string) { this.headerClick.emit(menuSelected); }


}
