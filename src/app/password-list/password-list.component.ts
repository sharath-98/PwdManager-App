import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {collection} from '@angular/fire/firestore';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { IPwd } from './pwd.interface';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent implements OnInit {

  siteId !:string;
  siteName !: string;
  siteImgUrl !: string;
  siteUrl !:string;
  isEditEnabled: boolean = false;
  isSuccess: boolean  =false;
  successMsg!: string;

  pwdId!: string;
  email!:string;
  username!: string;
  password!: string;
  allPwds: IPwd[] = [];

  constructor(private route: ActivatedRoute, private pwdManager:PasswordManagerService) {
    
    this.route.queryParams.subscribe((data: any)=>{
      this.siteId = data.id;
      this.siteName = data.siteName;
      this.siteUrl = data.siteUrl;
      this.siteImgUrl = data.siteImgUrl;
    })
    this.loadPwds();
   }

  ngOnInit(): void {
    
  }

  addPwd(values: Object){
    if(this.isEditEnabled){
      this.pwdManager.editPwd( values,this.siteId, this.pwdId);
      this.resetPwdForm();
    } else{
      this.pwdManager.addPwd(values, this.siteId)
      .then(()=>{
        console.log('Password saved.')
      });
      this.resetPwdForm();
    }
  }

  deletePwd(pwd: IPwd){
    if(pwd.id != null)
      this.pwdManager.deletePwd(this.siteId, pwd.id);
  }

  editPwd(pwd: IPwd){
    if(pwd.id != null)
      this.pwdId = pwd.id;
    this.email = pwd.email;
    this.username = pwd.username;
    this.password = pwd.password;
    this.isEditEnabled = true;

  }

  loadPwds(){
    this.pwdManager.loadPwd(this.siteId).subscribe((data: object[])=>{
      this.allPwds = data as IPwd[]
    });
  }

  resetPwdForm(){
    this.pwdId = "";
    this.email = "";
    this.username = "";
    this.password = "";
    this.isEditEnabled = false;
  }

}
