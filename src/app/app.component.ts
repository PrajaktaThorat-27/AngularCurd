import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import{CrudService,Item} from './curd.service';
import{FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ang-curd-app1';
  items: Item[] = [];
  newItem: Item = { id: 0, name: '', description: '' };
  editItem: Item = { id: 0, name: '', description: '' };
  editing: boolean = false;
  constructor(private crudService: CrudService) {}

  ngOnInit() {
    this.loadItems();
  }
  loadItems() {
    this.items = this.crudService.getItems();
  }

  addItem() {
    if (this.newItem.name && this.newItem.description) {
      this.crudService.createItem(this.newItem);
      this.loadItems();
      this.newItem = { id: 0, name: '', description: '' }; // Clear form
    }
  }

  edit(item: Item) {
    this.editing = true;
    this.editItem = { ...item }; // Create a copy of the item for editing
  }

  updateItem() {
    if (this.editItem.name && this.editItem.description) {
      if (this.crudService.updateItem(this.editItem)) {
        this.loadItems();
        this.editItem = { id: 0, name: '', description: '' };
        this.editing = false;
      }
    }
  }

  deleteItem(id: number) {
    if (this.crudService.deleteItem(id)) {
      this.loadItems();
    }
  }
}

