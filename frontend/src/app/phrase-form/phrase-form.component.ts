import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Pour ngModel
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Pour HTTP

@Component({
  selector: 'app-phrase-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './phrase-form.component.html',
  styleUrls: ['./phrase-form.component.scss']
})
export class PhraseFormComponent implements OnInit {
  phrase: string = '';
  sentiment: string = '';
  phrases: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPhrases();
  }

  submitPhrase() {
    this.http.post('http://localhost:8001/api/phrases', { content: this.phrase })
      .subscribe((response: any) => {
        this.sentiment = response.sentiment;
        this.phrase = '';
        this.loadPhrases();
      });
  }

  loadPhrases() {
    this.http.get('http://localhost:8001/api/phrases')
      .subscribe((data: any) => {
        this.phrases = data;
      });
  }
}