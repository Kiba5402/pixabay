import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

//esta clase nos permite consultar el API de pixabay
//por medio del cliente HTTP
@Injectable({
  providedIn: 'root'
})
export class PixabayService {

  //definicion de variables
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

  //creamos un a funcion que retorna un observables
  //con esto las clases que inyecten el servicio
  //podran saber cuando el buscador invoco informacion y esta se debe mostrar
  public subscribeResp(): Subject<any> {
    return this.obsResp;
  }

  //crea url para la
  //busqueda de imagen por categorias
  searchCatImg(cat: string) {
    const url = `${this.urlBase}?key=${this.key}&category=${cat.toLowerCase()}`;
    this.getInfo(url);
  }

  //crea url para la
  //bsuqueda de imagenes por palabra clave
  searchKeyWImg(kw: string) {
    const url = `${this.urlBase}?key=${this.key}&q=${kw.toLowerCase()}`;
    this.getInfo(url);
  }

  //realizamos la bsuqueda conelmetodo http client y 
  //emitimos la informacion por medio del observable obsResp
  private getInfo(url: string) {
    this.httpC.get(url).subscribe({
      next: data => this.obsResp.next(data),
      error: e => this.obsResp.error(e)
    });
  }

}
