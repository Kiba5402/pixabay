import { Component, OnInit } from '@angular/core';
import { PixabayService } from '../../services/pixabay.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  public dataImg : Array<{}>;
  public flagerr : boolean;

  constructor(private pixabayS: PixabayService) {

    this.flagerr = false;

    pixabayS.subscribeResp().subscribe({
      next: data  => this.dataImg = data,
      error: e => {
        this.flagerr = true;
        console.log(e)
      }            
    });
  }

  ngOnInit(): void {
  }

}
