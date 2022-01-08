import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataformService } from '../services/dataform.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-dash-boards',
  templateUrl: './dash-boards.component.html',
  styleUrls: ['./dash-boards.component.scss']
})
export class DashBoardsComponent implements OnInit {

  public _DATA: string = '>>';
  public _des: boolean = false;
  public msjDel: any = '';
  public _SHA: boolean = false;
  public xfunc: string = 'POST[]';
  constructor( private notes: DataformService, private us: LoginService, private host: ElementRef, public router: Router ) { }
  public xuser: any = sessionStorage.getItem('TOKEN');

  ngOnInit(): void {

    this.getNotesGeneral(this.xuser, 'fecha_notes', 'desc')
    setInterval(()=>{
      this.getUsers('cod_session', '2', 'asc');
    },500)
    this.getCodecShar();
    localStorage.setItem('FUNCTION', 'POST[]');
    this.msjDel = localStorage.getItem('FUNCTION');
    this.verification();

  }

  ngAfterViewInit() {
    this.host.nativeElement.focus();
  }

  public arrNotes: any = [];
  public codecNotes: string = '';
  detectSave( a: string ) {
    
    if( a != '>>' ) {
      if( a.indexOf(':>') < 0 ) {      
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
    }
    else {
      this.msjDel = 'NOT SAVE';
    }

  }

  public arrNotesGet: any = [];
  getNotesGeneral(codec: string, fecha_notes: string, order: string) {
    this.notes.getData(codec, fecha_notes, order).subscribe( not => {
      this.arrNotesGet = not;
      //console.log(this.arrNotesGet);
    })
  }

  
  delNotes(codec: number) {

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


  public userMatch: any = [];
  getUsers(prop: string, filter: string, order: string) {
    this.us.gUsers( prop, filter, order ).subscribe( LOG => {
      this.userMatch = LOG;
    })
  }

  public xSHA: string = '';
  validate(a: string) {

    let x = a;
    
    if(a.indexOf('help:>') > 0) {
      
      this._DATA = '>>\n' + 'help:> Muestra la lista de línea de comandos a utilizar en pscript.\nfunc:> Establece la accion de tu consola.\nfunc:>[SETPOST[]] Guarda la nota a escribir, func:>[SETUPDATE[]] Actualiza la nota a escribir\nmatch:> Muestra registro de usuarios en la aplicación.\nclear:> Limpia la consola y cierra ventanas emergentes.\ncodecsha:> Genera código SHA para compartir nota con otros usuarios.\ngetsha:> Muestra lista de mis códigos SHA registrados con los usuarios emisores.\n';

    }
    else if(a.indexOf('match:>') > 0 ) {
      this._des = true;
      this._DATA = '>>';
    }

    else if( a.indexOf('clear:>') > 0 )
    {
      this._des = false;
      this._SHA = false;
      this._DATA = '>>';
    }
    else if(a.indexOf('codecsha:>') > 0) {
      this.xSHA = 'SHA_'+this.tGenerate(50)+'-'+new Date().getFullYear()
      // const xSNm: any = this.xSHA.length();
      this._DATA = 'codec SHA generate successfully!: # \n' + this.xSHA + '\n';
      this.saveCodecSHAR(this.xSHA);
    }
    else if(a.indexOf('getsha:>') > 0 ) {
      this._SHA = true;
    }
    else if(a.indexOf('func:>') > 0 ) {
      if( a.indexOf('func:>[SETPOST[]]') > 0 ) {
        localStorage.setItem('FUNCTION', 'POST[]');
        this.msjDel = 'Change to POST[]';
        setTimeout(() => {
          this.msjDel = 'POST[]';
          this._DATA = '>>'
        }, 1500);
      }
      else if(a.indexOf('func:>[SETUPDATE[]]') > 0) {
        localStorage.setItem('FUNCTION', 'UPDATE[]');
        this.msjDel = 'Change to UPDATE[]';
        setTimeout(() => {
          this.msjDel = 'UPDATE[]';
          this._DATA = '>>'
        }, 1500);
      }
    }
    else if ( a.indexOf('session[off]:>') > 0 ) {
      sessionStorage.removeItem('TOKEN');
      sessionStorage.removeItem('USER');
      sessionStorage.removeItem('TOKEN-SESSION');
      this._DATA = '>>Close session acepted... wait two seconds';
      //UID
      const xxx: any = sessionStorage.getItem('UID')
      setTimeout(() => {
        this.verification();
        this.upState( xxx, 'offline')
      }, 2000);
    }

    else if(a.indexOf('')) {
      
    }
  
  }

  verification() {
    if( sessionStorage.getItem('TOKEN') == undefined || sessionStorage.getItem('TOKEN') == '' ) {
      this.router.navigate(['/Login'])
    }
    else if(sessionStorage.getItem('USER') == undefined || sessionStorage.getItem('USER') == '') {
      this.router.navigate(['/Login'])
    }
    else if(sessionStorage.getItem('TOKEN-SESSION') == undefined || sessionStorage.getItem('TOKEN-SESSION') == '') {
      this.router.navigate(['/Login'])
    }
  }

  upState( id: number, state: string) {
    this.us.updatEstate( id, state ).subscribe( u => {
      console.log('CONECTADO')
    })
  }


  public arrSHAR: any = [];

  saveCodecSHAR(xSHAR: string) {

    this.arrSHAR = {
      codec_shared  : xSHAR,
      codec_user    : this.xuser,
      descrip_shared: '',
    }

    console.log(this.arrSHAR)

    this.notes.saveCodecShar(this.arrSHAR).subscribe( sShar=> {
      this.msjDel = 'CODEC SHA SAVE SUCCESFULLY!'
    }, () => {
      this.msjDel = 'ERROR SHA SAVE!'
    })

  }

  public gShar:any = [];
  getCodecShar() {
    this.notes.gCshar().subscribe( s=> {
      this.gShar = s;
      // console.log(this.gShar)
    })
  }  

  triggerFunction(event: any) {
    console.log(event);
    if (event.ctrlKey && event.key === 'Enter' || event.shiftKey && event.key === 'Enter') {
    
       /*
         cannot make textarea produce a next line.
       */
       var text = <HTMLInputElement> document.getElementById("textarea1");
       text.value += '\n';
       console.log(text);
       //  text = text.
       this.validate(text.value);
       //console.log("next line!");

    } 
    
    else if (event.key === 'Enter' ) {
       event.preventDefault();
       let x: any = localStorage.getItem('FUNCTION');

       if( x == 'POST[]' ) {
         this.detectSave(this._DATA)
       }
       else if ( x == 'UPDATE[]' ) {
        //  this.detectSave(this._DATA)
        let xx: any = localStorage.getItem('CODNOT');
        this.updateNotes(this._DATA, Number(localStorage.getItem('IDNOT')), xx, '')
       }

       //console.log("submit!"); 
    
    }
  }

  match(cod: string) {
     console.log(cod);
  }


  changeNotesFunc(xdata: string,ids: number, CODS: string) {
    this.xfunc = 'UPDATE[]';
    localStorage.setItem('FUNCTION', this.xfunc);
    this._DATA = xdata;
    localStorage.setItem('IDNOT', ids.toString())
    localStorage.setItem('CODNOT', CODS)
    this.msjDel = localStorage.getItem('FUNCTION');
  }


  updateNotes(a: string, ids: number, codec_notes: string, cod_type_notes: string) {

    //let x: any = localStorage.getItem('FUNCTION');
    //a.slice(2,)
    //if( a != '>>' ) {
      if( a.indexOf(':>') < 0 ) {
      this.arrNotes = {
        id: ids,
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
        cod_type_notes: cod_type_notes,
        code_notes: codec_notes
      }

      console.log(this.arrNotes);

      this.notes.updateNotes(ids, this.arrNotes).subscribe( UPNOT => {
        this.msjDel = 'UPDATE SUCCESSFULLY!'
        this.getNotesGeneral(this.xuser, 'fecha_notes', 'desc')
        setTimeout(() => {
          this.msjDel = 'UPDATE[]'
        }, 1500)
      }, () => {
        this.msjDel = 'ERROR UPDATE!'
      })
    }
  //}
  }

}
