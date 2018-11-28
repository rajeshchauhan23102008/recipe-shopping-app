import { Component, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    @Output() menuClicked = new EventEmitter<string>();

    displayFeature(event: any) {
        this.menuClicked.emit((<HTMLAnchorElement>event.target).name);
    }
}
