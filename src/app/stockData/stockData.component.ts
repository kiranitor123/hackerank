import {Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { StocksService } from '../services/stocks.service';
import { map } from "rxjs/operators"; 
@Component({
  selector: 'stock-data',
  templateUrl: './stockData.component.html',
  styleUrls: ['./stockData.component.scss']
})
export class StockData implements OnInit {

  date:string;
  dates:Observable<Data>;
  exist: boolean;
  constructor(private stocks: StocksService) {
  }

  ngOnInit() {
    this.exist = false;
  }

  getDate(){
    this.exist = false;
    this.dates = this.stocks.getStocks(this.date).pipe(
      map(data =>{
        if(data){
          this.exist = data.data.length>0;
          return data.data;
        }
      })
    )
  }
}

interface Data {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Data[];
}
