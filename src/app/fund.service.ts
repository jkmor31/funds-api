import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fund } from './fund/fund.model';

@Injectable({
  providedIn: 'root'
})
export class FundService {
  url: string;

  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:8082/api/funds';
  }
  

  getFunds(): Observable<any> {
    return this.http.get(this.url);
  }
  getFund(id: number): Observable<any> {
    return this.http.get(this.url + '/' +id);
  }

  deleteFund(id: any): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id);
  }
  createFund(newFund: Object): Observable<any>{
    return this.http.post<any>(this.url, newFund);
  }

  updateFund(fund: Fund): Observable<any> {
    return this.http.patch<any>(this.url + '/' + fund.id, fund);
  }
}
