import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PixabayService } from '../../services/pixabay.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  public dataImg: any;
  public flagerr: boolean;
  public infoModal: {
    "url": string,
    "tags": string,
    "views": number,
    "likes": number
  };
  @ViewChild('modalinfo', { static: true }) modal: ElementRef;

  constructor(private pixabayS: PixabayService) {

    this.flagerr = false;
    this.dataImg = [];

    this.resetInfoModal();

    pixabayS.subscribeResp().subscribe({
      next: data => this.dataImg = data,
      error: e => {
        this.flagerr = true;
        console.log(e)
      }
    });
  }

  resetInfoModal() {
    this.infoModal = {
      "url": "",
      "tags": "",
      "views": 0,
      "likes": 0
    };
  }

  abrirmodal(url, tags, views, likes) {
    this.resetInfoModal();
    this.infoModal.url = url;
    this.infoModal.tags = tags;
    this.infoModal.views = views;
    this.infoModal.likes = likes;
    this.modal.nativeElement.click();
  }

  ngOnInit(): void {

  }

}
