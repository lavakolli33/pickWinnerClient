import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule, CommonModule],
    providers:[HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pickWinnerClient';
  public numberValue = 0;
  public winners: any;

  public constructor(protected readonly http: HttpClient){}
  public onSubmit()
  {
    this.http.post<any>(encodeURI(`https://localhost:7140/userinfo/GetUsersByIds/${this.numberValue}`), null).subscribe(data => {
    this.winners = data;
   });
  }

}

