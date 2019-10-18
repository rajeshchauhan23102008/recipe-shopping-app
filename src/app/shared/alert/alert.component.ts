import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert',
  styleUrls: ['./alert.component.css'],
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  @Input('message') message: string;
  @Output('resetError') resetError: Subject<any> = new Subject();

  onClose() {
    this.resetError.next();
  }
}
