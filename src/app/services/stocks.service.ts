import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StocksService {
  apiURL = "https://jsonmock.hackerrank.com/api/stocks?date=";

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private http: HttpClient) {}

  getStocks(date:string){
    
    return this.http.get<any>(this.apiURL+date)
  }
}
