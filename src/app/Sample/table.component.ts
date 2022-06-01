import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {
  data: any[] = []

    constructor(
      private httpClient : HttpClient,
      private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
      this.getUser();
    }

    getUser() {
      this.httpClient.post("https://trial.innovix.ai/api/v1/user/get-users", null)
      .subscribe((res: any)=>{

        res.data.forEach((x:any)=>{
          this.data.push({
            ...x
          })
        })

        console.log(this.data)
      })
    }
}