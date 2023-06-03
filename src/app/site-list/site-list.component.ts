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
  isSuccess: boolean  =false;
  successMsg!: string;

  constructor(private pwdService: PasswordManagerService) { }

  ngOnInit(): void {
    this.loadSites();
  }

  deleteSite(id:string){
    this.pwdService.deleteSite(id).then(()=>{
      this.isSuccess = true
      this.successMsg = "Site deleted";
    }).catch((err)=>{
      console.log(err);
    });
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
        this.isSuccess = true
        this.successMsg = "Site updated";
      }).catch((err)=>{
        console.log(err);
      })
    } else{
      this.pwdService.addSite(values).then(()=>{
            this.isSuccess = true
            this.successMsg = "Site Added";
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
