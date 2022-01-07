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

  delData(codec: string) {
    return this.http.get( this.urlapi + 'stnotes/del_Notes/' + codec )
  }

}
