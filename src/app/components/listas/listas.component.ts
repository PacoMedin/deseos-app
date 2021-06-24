import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild ( IonList ) lista: IonList;
  @Input() terminada = true;

  constructor( public deseosService :DeseosService,
               private router: Router,
               private alertController: AlertController) { }

  ngOnInit() {}

  listaSeleccionada ( lista: Lista){

    if( this.terminada ){
      this.router.navigateByUrl(`tabs/tab2/agregar/${ lista.id }`);
    }else{
      this.router.navigateByUrl(`tabs/tab1/agregar/${ lista.id }`);
    }

  }

  borrarLista( lista: Lista){
    this.deseosService.borrarLista( lista );
  }

  async editarLista( lista: Lista ){

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class2',
      header: 'Editar titulo',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nuevo nombre'

        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
           // console.log('Cancelar');
           this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Editar',
          handler: ( data ) =>{

            
            if( data.titulo.length === 0){
            //   console.log('No data');
              return;
            }
            
            // lista.titulo = data.titulo;
            // this.deseosService.guardarStorage();

            this.deseosService.editarLista(lista.id, data.titulo);
            this.lista.closeSlidingItems();
            


          }
        }
      ]
    });

    alert.present();

    

  }

}
