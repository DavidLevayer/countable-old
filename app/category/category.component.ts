import {Component, OnInit} from '@angular/core';
import {Category} from './category';
import {CategoryService} from './category.service';
import {SubcategoryService} from './subcategory.service';
import {Subcategory} from './subcategory';

@Component({
    providers: [CategoryService, SubcategoryService],
    selector: 'app-category',
    styleUrls: ['app/shared/css/common.css', 'app/shared/css/mdl-card.css'],
    templateUrl: 'app/category/category.component.html',
})

export class CategoryComponent implements OnInit {

    /**
     * List of categories displayed
     */
    public categories: [Category, Subcategory[]][] = [];

    public mapping: number[] = [];

    /**
     * Error message
     */
    public error: string;

    constructor(private categoryService: CategoryService, private subcategoryService: SubcategoryService) {
        //this.categories[0] = [new Category(0, 'fake'), []];
    }

    public ngOnInit(): void {
        this.getCategories().then(() => {
            this.getSubcategories();
        });
    }

    /**
     * Get list of categories from server and initiate the list of categories
     */
    public getSubcategories(): Promise<Subcategory[]> {
        return this.subcategoryService.getSubcategories()
            .then(
                subcategories => this.createSubcategoryModel(subcategories),
                error => this.error = error
            );
    }

    /**
     * Get list of categories from server and initiate the list of categories
     */
    public getCategories(): Promise<Category[]> {
        return this.categoryService.getCategories()
            .then(
                categories => this.createCategoryModel(categories),
                error => this.error = error
            );
    }

    private createCategoryModel(categories: Category[]): void {

        for (let category of categories) {
            this.categories.push([category, []]);
            this.mapping[category.categoryId] = this.categories.length - 1;
        }
    }

    private createSubcategoryModel(subcategories: Subcategory[]): void {

        for (let subcategory of subcategories) {
            let categoryIndex = this.mapping[subcategory.refCategory];

            this.categories[categoryIndex][1].push(subcategory);
        }
    }
}
