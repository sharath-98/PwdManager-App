import { Component, OnInit } from '@angular/core';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {

  allSites! :Observable<Array<any>>;

  constructor(private pwdService: PasswordManagerService) { }

  ngOnInit(): void {
    this.loadSites();
  }

  onSubmit(values: object){
    console.log(values);
    this.pwdService.addSite(values).then(()=>{
      console.log("New Site Added.")
    }).catch((err)=>{
      console.log(err);
    });
  }

  loadSites(){
    this.allSites = this.pwdService.loadSites();
  }

}
