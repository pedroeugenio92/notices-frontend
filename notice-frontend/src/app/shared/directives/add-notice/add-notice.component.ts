import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { LoadService } from '../../services/load.service';
import { NoticeService } from '../../services/notice.service';
import { Notice } from '../../models/Notice.model';

@Component({
  selector: 'app-add-notice',
  templateUrl: './add-notice.component.html',
  styleUrls: ['./add-notice.component.css']
})
export class AddNoticeComponent implements OnInit {

  formNotice: FormGroup;
  actionEdit: boolean = false;
  submitted = false;
  noticeSelected: string;
  noticeObject: Notice = new Notice();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private MessageService: MessageService,
    private LoadService: LoadService,
    private routerActive: ActivatedRoute,
    private noticeService : NoticeService
  ) { }

  ngOnInit() {

    this.formNotice = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(250)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      date_publish: ['', [Validators.required]],
      date_viewed: ['', [Validators.required]],
    });
  
    if(this.routerActive.snapshot.paramMap.get('id')){
      this.actionEdit = true;
      this.noticeSelected = this.routerActive.snapshot.paramMap.get('id');
      this.noticeService.getNoticeFilter(Number(this.noticeSelected));

      this.noticeService.getNotices().subscribe((data)=>{
        
        if(this.noticeService.getSearch()){
          this.noticeObject = data;
          debugger;  
          this.formNotice.setValue({
            title: this.noticeObject.title,
            description: this.noticeObject.description,
            date_publish: this.noticeObject.date_publish,
            date_viewed: this.noticeObject.date_viewed
          });
        }
      });
    }
  }

  onSubmit() {

    this.submitted = true;
    this.LoadService.show();
    if(this.formNotice.invalid){
      this.LoadService.hide();
      this.diplayErros();
      this.MessageService.errorMsg("Preencher os dados corretamente")
      return;
    }
    if(this.actionEdit){
      this.noticeService.edit(Number(this.noticeObject.id),this.formNotice);
    }else{
      this.noticeService.save(this.formNotice);
    }
    
  }

  back(){
    this.router.navigate(["/list"]);
  }

  diplayErros(){
    let controls = this.formNotice.controls;
    for(let control in controls){
      if(controls[control].invalid){
        controls[control].markAsTouched();
      }
    }
  }

}
