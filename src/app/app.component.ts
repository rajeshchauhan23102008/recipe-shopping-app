import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  displayFeatureName: string = 'recipes';

  displayFeature(event: string) {
    this.displayFeatureName = event;
  }
}
