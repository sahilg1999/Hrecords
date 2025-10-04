import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn:'root'})
export class DataService{
    public Flag= false;

    updateFlag(){
        return this.Flag;
    }
}