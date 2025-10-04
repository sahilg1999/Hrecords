import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-example-component',
  standalone: true,
  imports: [],
  templateUrl: './dialog-example-component.html',
  styleUrl: './dialog-example-component.css'
})
export class DialogExampleComponent {
  constructor (private dialog:MatDialogRef<DialogExampleComponent>) {}
  oncloseclick(){
    this.dialog.close();

  }
}
