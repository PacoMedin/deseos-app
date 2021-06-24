import { ClassField } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';


@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];
  constructor() {

    // const lista1 = new Lista('Recolectar piedras del infinito');
    // const lista2 = new Lista('Heroes a desaparecer');

    // this.listas.push(lista1, lista2);

    this.cargarStorage();


  }

  crearLista(titulo: string) {

    const newList = new Lista(titulo);
    this.listas.push(newList);
    this.guardarStorage();

    return newList.id;

  }
  editarLista( id: string | number, titulo: string){

    let lista = this.obtenerLista(id);
    lista.titulo = titulo;
    this.guardarStorage();
    
  }

  borrarLista( lista: Lista ){

    this.listas = this.listas.filter( listaData => listaData.id !== lista.id);
    this.guardarStorage();

  } 

  obtenerLista( id: string | number){
    
    id = Number(id);
    return this.listas.find( listaData => listaData.id === id );

  }

  guardarStorage() {

    localStorage.setItem('data', JSON.stringify( this.listas) );

  }

  cargarStorage(){

    if( localStorage.getItem('data') ){

      this.listas = JSON.parse( localStorage.getItem('data') );

    }else{
      
      this.listas = [];

    }

  }


}
