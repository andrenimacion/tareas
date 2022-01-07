import { Component, OnInit } from '@angular/core';
import { DataformService } from '../services/dataform.service';

@Component({
  selector: 'app-dash-boards',
  templateUrl: './dash-boards.component.html',
  styleUrls: ['./dash-boards.component.scss']
})
export class DashBoardsComponent implements OnInit {

  public _DATA: string = '>>';

  constructor( private notes: DataformService ) { }
  public xuser: any = sessionStorage.getItem('TOKEN');

  ngOnInit(): void {

    this.getNotesGeneral(this.xuser, 'fecha_notes', 'desc')

  }

  public arrNotes: any = [];
  public codecNotes: string = '';
  detectSave( a: string ) {
    
    this.arrNotes = {
      title_notas: a.slice(2,50)+'...', 
      descrip_notes: a,
      fecha_notes: new Date(),
      img_notes: '',
      color_bg: '',
      color_fg: '', 
      estados: 1, 
      tiempo_init: 0, 
      tiempo_fin: 0,
      tiempo_real: 0,
      cod_user: this.xuser,
      cod_type_notes: '',
      code_notes: 'NOT-#'+this.tGenerate(30)+'-'+a.slice(0,8)
    }

    //console.log(this.arrNotes);

    this.notes.saveData(this.arrNotes).subscribe( notesSave => {
      this._DATA = '>>SAVE SUCCESSFULLY!'
      this.getNotesGeneral(this.xuser, 'fecha_notes', 'desc');
      setTimeout(() => {
        this._DATA = '>>'
      }, 2000);
    }, () => {
      this._DATA = '>>ERROR!'
      setTimeout(() => {
        this._DATA = '>>'
      }, 2000);
    })

  }

  public arrNotesGet: any = [];
  getNotesGeneral(codec: string, fecha_notes: string, order: string) {
    this.notes.getData(codec, fecha_notes, order).subscribe( not => {
      this.arrNotesGet = not;
      console.log(this.arrNotesGet);
    })
  }

  public msjDel: string = '';
  delNotes(codec: string) {

    console.log(codec)

    this.notes.delData(codec).subscribe( del => {
      this.msjDel = 'Elminado con éxito';
      this.getNotesGeneral(this.xuser, 'fecha_notes', 'desc')
    })
  }
  
   //Generador de token
   tGenerate(cant: number) {
    let caracteres = "abcdefghijkmnpqrtuvwxyz_ABCDEFGHJKMNPQRTUVWXYZ123467890-";
    let token = "";
    for (let i=0; i<cant; i++) {
      token += caracteres.charAt(Math.floor(Math.random()*caracteres.length));  
    }
    return token; 

  }



}
