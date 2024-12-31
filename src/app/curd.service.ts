import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  private items: Item[] = [];
  private nextId: number = 1;

  constructor() { }

  
  getItems(): Item[] {
    return [...this.items]; 
  }

  
  createItem(item: Item): void {
    item.id = this.nextId++;
    this.items.push(item);
  }

  
  updateItem(updatedItem: Item): boolean {
    const index = this.items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      this.items[index] = updatedItem;
      return true;
    }
    return false;
  }

  deleteItem(id: number): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
}
export interface Item {
  id: number;
  name: string;
  description: string;
}