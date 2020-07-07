import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PixabayService {

  private obsResp: Subject<any>;
  private urlBase: string;
  private key: string;
  public transact: boolean;

  constructor(private httpC: HttpClient) {
    this.transact = false;
    this.obsResp = new Subject();
    this.urlBase = 'https://pixabay.com/api/';
    this.key = '13119377-fc7e10c6305a7de49da6ecb25';
  }

  public subscribeResp(): Subject<any> {
    return this.obsResp;
  }

  searchCatImg(cat: string) {
    const url = `${this.urlBase}?key=${this.key}&category=${cat.toLowerCase()}`;
    this.getInfo(url);
  }

  searchKeyWImg(kw: string) {
    const url = `${this.urlBase}?key=${this.key}&q=${kw.toLowerCase()}`;
    console.log(url);
    this.getInfo(url);
  }

  private getInfo(url: string) {
    console.log(url);
    this.httpC.get(url).subscribe({
      next: data => this.obsResp.next(data),
      error: e => this.obsResp.error(e)
    });
  }

}
