import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Subcategory} from './subcategory';

@Injectable()
export class SubcategoryService {

    private static BASE_URL: string = '/api/subcategory/';

    constructor(private http: Http) {
    }

    /**
     * Get list of categories from server
     */
    public getSubcategories(): Promise<Subcategory[]> {
        return this.http.get(SubcategoryService.BASE_URL)
            .toPromise()
            .then(response => response.json() as Subcategory[])
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
