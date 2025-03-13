import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhraseFormComponent } from './phrase-form/phrase-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PhraseFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
}