import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public dates: any = '';
  public _Username: any = '';

  constructor() { }

  ngOnInit() {    
    this.datetimess();
    this._Username = sessionStorage.getItem('USER');
  }

  datetimess () {
    setInterval( ()=> {
      this.dates = new Date();
      //return this.dates
    },1000 )
  }


}
