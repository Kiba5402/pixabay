import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PixabayService } from '../../services/pixabay.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  public dataImg: any;
  public flagInfo : boolean;
  public flagerr: boolean;
  public infoModal: {
    "url": string,
    "tags": string,
    "views": number,
    "likes": number,
    "height": number
  };
  @ViewChild('modalinfo', { static: true }) modal: ElementRef;

  constructor(private pixabayS: PixabayService) {

    this.flagerr = false;
    this.dataImg = [];
    this.flagInfo = false;

    this.resetInfoModal();

    pixabayS.subscribeResp().subscribe({
      next: data => {
        this.dataImg = data;
        this.flagInfo = true;
        this.pixabayS.transact = false;
      },
      error: e => {
        this.flagerr = true;
        this.pixabayS.transact = false;
        console.log(e);
      }
    });
  }

  resetInfoModal() {
    this.infoModal = {
      "url": "",
      "tags": "",
      "views": 0,
      "likes": 0,
      "height": 0
    };
  }

  abrirmodal(url, tags, views, likes, height) {
    this.resetInfoModal();
    this.infoModal.url = url;
    this.infoModal.tags = tags;
    this.infoModal.views = views;
    this.infoModal.likes = likes;
    this.infoModal.likes = likes;
    this.infoModal.height = height - (height * 0.10);
    this.modal.nativeElement.click();
  }

  ngOnInit(): void {

  }

}
