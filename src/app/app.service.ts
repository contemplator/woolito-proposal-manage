import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProposalLabel, ProposalTrello } from './proposal';

@Injectable({ providedIn: 'root' })
export class AppService {
  host = 'http://66.42.58.237/proposal/';

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.host = 'proposal';
    }
  }

  get(url: string): Observable<any> {
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(error => {
        throw (error);
      })
    );
  }

  post(url: string, body: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=utf8'
      })
    };
    return this.http.post(url, body, options)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError(error => {
          throw (error);
        })
      );
  }

  /**
   * 取得所有提案企劃
   */
  query(): Observable<any> {
    const url = this.host + '/query'
    return this.get(url);
  }

  /**
   * 取得所有標籤
   */
  fetchLabelList(): Observable<ProposalLabel[]>{
    const url = this.host + '/fetchLabelList';
    return this.get(url);
  }

  /**
   * 新增提案企劃
   */
  addProposal(data: ProposalTrello): Observable<boolean>{
    const url = this.host + '/add';
    return this.post(url, data);
  }

  /**
   * 發布新版本
   */
  release(id: string): Observable<string>{
    const url = this.host + '/release/' + id;
    return this.get(url);
  }

  /**
   * 查詢歷史發布
   */
  queryHistory(id: string): Observable<any>{
    const url = this.host + '/queryHistory/' + id;
    return this.get(url);
  }

  /**
   * 修改提案企劃
   */
  updateProposal(data: ProposalTrello): Observable<boolean>{
    const url = this.host + '/update';
    return this.post(url, data);
  }

}