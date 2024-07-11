import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule, CommonModule],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pickWinnerClient';
  public numberValue = 0;
  public winners: number[] = [];
  public lotteryList: Lottery = {item:[]};
  public bonusBall: number = 0;

  public constructor(protected readonly http: HttpClient) { }

  public onInit() {
    this.numberValue = 0;
    this.bonusBall = 0;
  }

  public onSubmit() {
    this.bonusBall = 0;
    this.numberValue = 6;
    this.getLotteryNumbers();
  }

  public onBonusSubmit() {
    if(this.winners.length > 0)
    this.getBonusBall();
  }

  private getLotteryNumbers() {
    this.http.post<any>(encodeURI(`https://localhost:7140/userinfo/GetLotteryNumbers/${this.numberValue}`), null).subscribe(data => {
      this.winners = data;
    });
  }

  private getBonusBall() {
    this.lotteryList.item=this.winners;
    console.log(this.lotteryList);
    this.http.post<number>(encodeURI(`https://localhost:7140/userinfo/GetBonusBall/${this.lotteryList}`), this.lotteryList).subscribe(data => {
      this.bonusBall = data;
    });
  }
  
}
interface Lottery {
  item: number[];    
}

