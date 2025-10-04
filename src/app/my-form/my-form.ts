import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-form',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './my-form.html',
  styleUrl: './my-form.css'
})
export class MyForm {

  public id: any;
  public title: any;
  public status: any;
  public assignee: any;
  public issue: any;
  public priority: any;
  APIURL = "http://localhost:8000/";

  constructor(private http: HttpClient, private router: Router) { }

  GoBack() {
    this.router.navigate(['/']);
  }


  CreateIssue() {
    let body = new FormData();
    if (this.id && this.status != '' && this.title != '' && this.assignee != '' && this.priority != '' && this.issue != '') {
      body.append('id', this.id);
      body.append('r_status', this.status);
      body.append('title', this.title);
      body.append('assignee', this.assignee);
      body.append('priority', this.priority);
      body.append('issues', this.issue);
      this.http.post(this.APIURL + "create_issue", body).subscribe((res) => {
        alert(res);
        this.id = null;
        this.status = '';
        this.assignee = '';
        this.priority = '';
        this.issue = '';
        this.title = '';
      });
    }
    alert("Please fill all the required inputs");
    return;
  }
}
