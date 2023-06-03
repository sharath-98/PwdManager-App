import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((data: any)=>{
      this.siteId = data.id;
      this.siteName = data.siteName;
      this.siteUrl = data.siteUrl;
      this.siteImgUrl = data.siteImgUrl;
    })
  }

}
