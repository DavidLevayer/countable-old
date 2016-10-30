import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccountService {

    private base_url:string = "/api/account/";

    constructor(private http:Http) {
    }

    /**
     * Get list of accounts from server
     */
    getAccounts() {
        return this.http.get(this.base_url)
            .toPromise()
            .then(AccountService.extractResult)
            .catch(AccountService.handleError);
    }

    /**
     * Get account with given id
     * @param id the account id
     */
    getAccount(id:number) {

        return this.http.get(this.base_url + id)
            .toPromise()
            .then(AccountService.extractResult)
            .catch(AccountService.handleError);
    }

    /**
     * Create an account
     */
    createAccount(name:string) {

        var data = "name=" + name;

        return this.http.post(this.base_url, data, {
            headers: AccountService.getHeaders()
        })
            .toPromise()
            .then(AccountService.extractResult)
            .catch(AccountService.handleError);
    }

    /**
     * Modify an account name using associated service
     * @param id the account id
     * @param name the account new name
     */
    editAccount(id:number, name:string) {

        var data = "name=" + name;

        return this.http.put(this.base_url + id, data, {
            headers: AccountService.getHeaders()
        })
            .toPromise()
            .then(AccountService.extractResult)
            .catch(AccountService.handleError);
    }

    /**
     * Remove an account using associated service
     * @param id the account id
     */
    deleteAccount(id:number) {

        return this.http.delete(this.base_url + id)
            .toPromise()
            .then(AccountService.extractResult)
            .catch(AccountService.handleError);
    }

    private static extractResult(res:Response) {
        return res.json();
    }

    /**
     * Extract error message from server response
     */
    private static handleError(error:any) {
        let errMsg:string = error._body;
        console.error(error); // log to console
        return Promise.reject(errMsg);
    }

    private static getHeaders():Headers {
        var headers:Headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return headers;
    }
}