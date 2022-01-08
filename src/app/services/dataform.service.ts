import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataformService {

  private urlapi = 'https://alp-cloud.com:8455/api/';

  constructor( private http: HttpClient ) { }

  saveData( model: any ) {
    return this.http.post( this.urlapi + 'stnotes/save_Notes', model )
  }

  getData(codec: string, properties: string , order: string) {
    return this.http.get( this.urlapi + 'stnotes/sel_Notes/' + codec + '/' + properties + '/' + order )
  }

  delData(ID: number) {
    return this.http.get( this.urlapi + 'stnotes/del_Notes/' + ID )
  }

  saveCodecShar( model: any ) {
    return this.http.post( this.urlapi + 'pshar/save_codec_shar', model )
  }

  gCshar() {
    return this.http.get( this.urlapi + 'pshar/getcodecSHA' )
  }

  updateNotes( id: number, model: any ) {
    return this.http.put( this.urlapi + 'stnotes/put_Notes/' + id, model );
  }

}
