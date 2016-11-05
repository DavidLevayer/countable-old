import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Account} from './account';

@Injectable()
export class AccountService {

    private static BASE_URL: string = '/api/account/';

    constructor(private http: Http) {
    }

    /**
     * Get list of accounts from server
     */
    public getAccounts(): Promise<Account[]> {
        return this.http.get(AccountService.BASE_URL)
            .toPromise()
            .then(response => response.json() as Account[])
            .catch(this.handleError);
    }

    /**
     * Get account with given id
     * @param id the account id
     */
    public getAccount(id: number): Promise<Account> {

        return this.http.get(AccountService.BASE_URL + id)
            .toPromise()
            .then(response => response.json() as Account)
            .catch(this.handleError);
    }

    /**
     * Create an account
     */
    public createAccount(name: string): Promise<any> {

        const data = 'name=' + name;

        return this.http.post(AccountService.BASE_URL, data, {headers: this.getHeaders()})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    /**
     * Modify an account name using associated service
     * @param id the account id
     * @param name the account new name
     */
    public editAccount(id: number, name: string): Promise<any> {

        const data = 'name=' + name;

        return this.http.put(AccountService.BASE_URL + id, data, {headers: this.getHeaders()})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    /**
     * Remove an account using associated service
     * @param id the account id
     */
    public deleteAccount(id: number): Promise<any> {

        return this.http.delete(AccountService.BASE_URL + id)
            .toPromise()
            .then(response => response.json())
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
