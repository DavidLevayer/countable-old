import {Component, OnInit} from '@angular/core';
import {Category} from './category';
import {CategoryService} from './category.service';

@Component({
    providers: [CategoryService],
    selector: 'app-category',
    styleUrls: ['app/shared/css/common.css'],
    templateUrl: 'app/category/category.component.html',
})

export class CategoryComponent implements OnInit {

    /**
     * List of accounts displayed
     */
    public categories: Category[];

    /**
     * Error message
     */
    public error: string;

    constructor(private categoryService: CategoryService) {
    }

    public ngOnInit(): any {
        // TODO
    }
}
