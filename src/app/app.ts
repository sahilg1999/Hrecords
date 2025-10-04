import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,HttpClientModule,FormsModule,ReactiveFormsModule,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('hrecords');
  
  

  constructor(private http:HttpClient, private router:Router){}


  ngOnInit(){
    this.getIssuesComponent();
  }

  // reloadPage() {
  //   window.location.reload();
   
  // }

  getIssuesComponent(){
    this.router.navigate(['Issues']);
  }
 
  
 
  

}
