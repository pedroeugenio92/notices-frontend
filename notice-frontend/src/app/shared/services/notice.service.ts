import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';
import { LoadService } from './load.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  private noticeSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public searchNotice: boolean = false;

  constructor(private http: HttpClient,
    private MessageService: MessageService,
    private LoadService: LoadService
  ) { }

  getNoticeFilter(id: number = null){
    let url = `${environment.URL_API}/notices`;
    if(id){
      this.LoadService.show();
      url += `/${id}`;
    }
    //this.noticeSubject.next([]);
    this.http.get<any>(url)
      .subscribe(data => {
        this.searchNotice = true;
        this.noticeSubject.next(data);
        if(id){
          this.LoadService.hide();
        }
      });
  }

  save(form: FormGroup){

    this.http.post(`${environment.URL_API}/notices`,{form:form.value})
    .subscribe(
      data => {
        this.MessageService.succMsg("Aviso inserido com sucesso!");
        this.LoadService.hide();
      }
    );
  }

  edit(id: number,form: FormGroup){

    this.http.put(`${environment.URL_API}/notices/${id}`,{form:form.value})
    .subscribe(
      data => {
        this.MessageService.succMsg("Aviso editado com sucesso");
        this.LoadService.hide();
      }
    );
  }

  delete(id: number){
    this.LoadService.show();
    this.http.delete(`${environment.URL_API}/notices/${id}`)
    .subscribe(
      data => {
        this.getNoticeFilter();
        this.MessageService.succMsg("Aviso Removido com sucesso!");
        this.LoadService.hide();
      }
    );
  }

  getNotices(){
    return this.noticeSubject;
  }

  getSearch(){
    return this.searchNotice;
  }
}
