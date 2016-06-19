import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AccountService {

    private url_list: string = "/api/account/";

    constructor(private http: Http) { }

    getAccounts() {
        return this.http.get(this.url_list)
            .toPromise()
            .then(this.extractResult)
            .catch(this.handleError);
    }

    private extractResult(res: Response) {
        return res.json();
    }

    /**
     * Extract error message from server response
     */
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    }
}