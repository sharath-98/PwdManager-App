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

  siteName !: string;
  siteImgUrl !: string;
  siteUrl !:string;
  siteId !:string;
  isEditEnabled: boolean = false;

  constructor(private pwdService: PasswordManagerService) { }

  ngOnInit(): void {
    this.loadSites();
  }

  editSite(site: any){
    this.siteName = site.siteName;
    this.siteImgUrl = site.siteImgUrl;
    this.siteId = site.id;
    this.siteUrl = site.siteUrl;
    this.isEditEnabled = true;

  }

  onSubmit(values: object){
    console.log(values);
    if(this.isEditEnabled){
      this.pwdService.updateSite(this.siteId, values).then(()=>{
        console.log('Data Updated.');
      }).catch((err)=>{
        console.log(err);
      })
    } else{
      this.pwdService.addSite(values).then(()=>{
            console.log("New Site Added.")
          }).catch((err)=>{
            console.log(err);
          });
    }
    this.formReset();
  }

  loadSites(){
    this.allSites = this.pwdService.loadSites();
  }

  formReset(){
    this.siteName = "";
    this.siteImgUrl = "";
    this.siteId = "";
    this.siteUrl = "";
    this.isEditEnabled = false;
  }

}
