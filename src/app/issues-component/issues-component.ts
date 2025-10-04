import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { DialogExampleComponent } from '../dialog-example-component/dialog-example-component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

interface Status {
  value: string;
  viewValue: string;
}

interface Priority {
  value: string;
  viewValue: string;
}

interface Assignee{
  value: string,
  viewValue: string;
}

@Component({
  selector: 'app-issues-component',
  standalone: true,
  imports: [MatTableModule, MatDialogModule, FormsModule, HttpClientModule, CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatPaginatorModule, MatSortModule, MatAutocompleteModule],
  templateUrl: './issues-component.html',
  styleUrl: './issues-component.css'
})
export class IssuesComponent implements OnInit, AfterViewInit {

  HRecords$ !: Observable<any[]>;
  pagelength: any;
  data: any[] = [];
  selectedStatus = '';
  selectedPriority = '';
  selectedAssignee='';
  public displayedColumns: string[] = ['id', 'title', 'status', 'priority', 'assignee', 'Issues', 'UpdatedAt']
  public updateissue: any;
  public id: any;
  public Title: any;
  public r_status: any;
  public priority: any;
  public assignee: any;
  public issues: any;
  public filterFlag: any = false;
  DataSource = new MatTableDataSource<any>([]);
  private _liveAnnouncer = inject(LiveAnnouncer);
  searchText = '';
  filteredSuggestions: string[] = [];

  @ViewChild(MatSort) sort!: MatSort;

  status: Status[] = [
    { value: 'ok', viewValue: 'Ok' },
    { value: 'stable', viewValue: 'Stable' },
    { value: 'notstable', viewValue: 'Not Stable' },
  ];

  _priority: Priority[] = [
    { value: 'yes', viewValue: 'Yes' },
    { value: 'no', viewValue: 'No' }
  ];

  _assignee: Assignee[] = [
    { value:'Meghna', viewValue: 'meghna'},
    {value:'Jyoti', viewValue:'jyoti'},
    {value:'Diksha', viewValue:'diksha'},
    {value:'Abhilasha', viewValue:'abhilasha'}
  ];

  private dataSubject = new BehaviorSubject<any[]>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  APIURL = "http://localhost:8000/";

  constructor(private http: HttpClient, private dialog: MatDialog, private router: Router, private cdr: ChangeDetectorRef) {
    this.HRecords$ = this.dataSubject.asObservable();
  }



  ngOnInit() {

    this.get_issues();
  }

  ngAfterViewInit(): void {

    this.DataSource.paginator = this.paginator;
    this.DataSource.sort = this.sort;
    this.DataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'UpdatedAt':
          return new Date(item.updatedAt);
        case 'Issues':
          return (item.issues);
        default:
          return item[property];

      }
      // if (property === 'UpdatedAt') return new Date(item.updatedAt);
      // return item[property];
      // if(property === 'Issues') return new String(item.issues);
      // return item[property];

    };

  }





  CreateIssue() {
    this.router.navigateByUrl('CreateIssue');

  }

  update_issues() {
    let body = new FormData();
    if (!this.updateissue || !this.id) {
      alert("please fill all the required fields");
    }
    body.append('issues', this.updateissue);
    body.append("id", String(this.id));
    this.http.put(this.APIURL + "update_issue", body).subscribe((res) => {
      alert(res);
      this.get_issues()
    })
  }

  openDialog() {
    this.dialog.open(DialogExampleComponent);
  }

  get_status() {
    this.HRecords$ = this.http.get<any[]>(this.APIURL + "health")
  }
  get_issues() {
    this.http.get<any[]>(this.APIURL + "issues").subscribe((res) => {
      this.pagelength = res.length;
      this.DataSource.data = res;
      this.data = this.DataSource.data;
      // this.dataSubject.next.(this.data);
      // this.cdr.detectChanges();
      // console.log(this.HRecords$);
      // console.log(this.data);
    });


  }

  filterTable(event: any) {
    event.stopPropagation();
    this.filterFlag = !this.filterFlag;
    // alert("you clicked on filter");
  }

  applyFilter() {

    const filtered = this.DataSource.data.filter((dt: { r_status: string; priority: string; assignee: string }) => {
      return (
        (this.selectedStatus === '' || dt.r_status === this.selectedStatus) &&
        (this.selectedPriority == '' || dt.priority === this.selectedPriority) &&
        (this.selectedAssignee == '' || dt.assignee === this.selectedAssignee) 
      );
    });
    this.DataSource.data = filtered;
    this.filterFlag = false;
  }

  clearFilter() {
    this.selectedStatus = '';
    this.selectedPriority = '';
    //  this.dataSubject.next(this.data);
    this.DataSource.data = this.data;
    this.filterFlag = false;
  }

  announceSortChange(sortState: Sort) {
    
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onSearchInput() {
    const value = this.searchText.trim().toLowerCase();
    if (!value) {
      this.filteredSuggestions = [];
      return;
    }
   const match= new Set<string>();
   this.data.forEach(item => {
    Object.values(item).forEach(val =>{
      if(val && val.toString().toLowerCase().includes(value)){
        match.add(val.toString());
      }
    });
   });
    this.filteredSuggestions = Array.from(match);
    // console.log(this.filteredSuggestions);
    // .map(i => i.issues)
    // .filter(issue => issue.includes(value))
    // .slice(0, 5); // show top 5 suggestions
  }

  applySearch() {
    const filterValue = this.searchText.trim().toLowerCase();
    if (!filterValue) {
      this.DataSource.data = this.data; // reset
      return;
    }
    this.DataSource.data = this.data.filter(item => {
      return Object.keys(item).some(key => {
        const value = item[key];
        return value && value.toString().toLowerCase().includes(filterValue);

      });
    });
    this.filteredSuggestions = [];
  }

  clearSearch(){
    this.DataSource.data=this.data;
    this.searchText='';
  }


}
