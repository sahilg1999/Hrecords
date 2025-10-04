import { Routes } from '@angular/router';
import { MyForm } from "./my-form/my-form";
import { App } from './app';
import { IssuesComponent } from './issues-component/issues-component';

export const routes: Routes = [
      {path:'CreateIssue' , 
       component : MyForm 
      },
      {path:'',
        component: App
      },
      {
        path:'Issues',
        component: IssuesComponent
      }
];
