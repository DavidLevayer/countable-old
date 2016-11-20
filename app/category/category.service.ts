import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Category} from './category';

@Injectable()
export class CategoryService {

    private static BASE_URL: string = '/api/category/';

    constructor(private http: Http) {
    }

    /**
     * Get list of categories from server
     */
    public getCategories(): Promise<Category[]> {
        return this.http.get(CategoryService.BASE_URL)
            .toPromise()
            .then(response => response.json() as Category[])
            .catch(this.handleError);
    }

    /**
     * Extract error message from server response
     */
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    private getHeaders(): Headers {
        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return headers;
    }
}
