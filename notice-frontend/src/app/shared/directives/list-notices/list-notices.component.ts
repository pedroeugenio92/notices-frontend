import { Component, OnInit } from '@angular/core';
import { NoticeService } from '../../services/notice.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-notices',
  templateUrl: './list-notices.component.html',
  styleUrls: ['./list-notices.component.css']
})
export class ListNoticesComponent implements OnInit {

  dataSource = new MatTableDataSource([]); 
  dataSourceList = [];
  listNotices : Array<any> = [];
  columnsShow = ["title","action"];

  constructor(private noticeService : NoticeService,
    public dialog: MatDialog,private router:Router) { }

  ngOnInit() {

    this.noticeService.getNoticeFilter();
    this.noticeService.getNotices().subscribe((data)=>{
      this.listNotices = data;
      this.dataSource = new MatTableDataSource(this.listNotices);
      
    });
  }

  openDialogDelete(element): void {
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteNotice(element);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNotice(){
    this.router.navigate(['/add']);
  }
  
  editNotice(element){
    this.router.navigate([`/add/${element.id}`]);
  }

  deleteNotice(element){
    this.noticeService.delete(element.id);
  }

}
