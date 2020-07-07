import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { PixabayService } from '../../services/pixabay.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  //definicion de variables
  public categorias: Array<{}>;
  public formGroup: FormGroup;
  public flagB: boolean;
  @ViewChild("button", { static: true }) button: ElementRef;

  constructor(public pixabayS: PixabayService) {
    //seteamos las categorias del select para la busqueda
    this.categorias = [
      { "id": "1", "val": "Science" },
      { "id": "2", "val": "Education" },
      { "id": "3", "val": "People" },
      { "id": "4", "val": "Feelings" },
      { "id": "5", "val": "Computer" },
      { "id": "6", "val": "Buildings" }
    ];
    //creamos un grupo de formulario
    this.formGroup = new FormGroup({
      "category": new FormControl("-1"),
      "keywords": new FormControl("", [Validators.maxLength(100)])
    });
    this.escuchaForm();
    this.flagB = false;
  }

  //funcion que se suscribe a cambios de valores
  //en lso elementos dentro del formulario
  escuchaForm() {
    this.formGroup.statusChanges.subscribe((vals) => {
      if ((this.formGroup.get('keywords').value.trim() !== "") && this.formGroup.valid) {
        this.button.nativeElement.removeAttribute('disabled');
      } else {
        this.button.nativeElement.setAttribute('disabled', true);
      }
    });

    this.formGroup.get('category').valueChanges.subscribe(val => {
      if (val != -1) {
        this.buscar({ "cat": val, "key": undefined });
        this.formGroup.get('keywords').setValue("");
      }
    });
  }

  //funcion principal de bsuqueda que invoca el servicio
  //pixabay
  buscar(info: { "cat": string, "key": string }) {
    this.pixabayS.transact = true;
    if (info.cat !== undefined && info.key == undefined) {
      this.pixabayS.searchCatImg(info.cat);
      this.flagB = true;
    } else if (info.key !== undefined && info.cat == undefined) {
      this.pixabayS.searchKeyWImg(info.key);
      this.flagB = true;
    }
  }

  buscarKeyWords(val: string) {
    this.formGroup.get('category').setValue("-1");
    this.buscar({ "cat": undefined, "key": val });
  }

  ngOnInit(): void {
  }

}
