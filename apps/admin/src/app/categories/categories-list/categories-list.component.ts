import { Category } from '@hozefam/products';
import { CategoriesService } from '@hozefam/products';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoriesServices: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this._getCategories();
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //Actual logic to perform a confirmation
        this.categoriesServices.deleteCategory(categoryId).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is deleted' });
            this._getCategories();
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not deleted' });
          },
        );
      },
      reject: () => {
        return;
      },
    });
  }

  updateCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }

  private _getCategories() {
    this.categoriesServices.getCategories().subscribe(cats => {
      this.categories = cats;
    });
  }
}
