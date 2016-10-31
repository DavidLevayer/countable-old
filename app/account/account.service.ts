import {Http, Response, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";

@Injectable()
export class AccountService {

    private static BASE_URL: string = "/api/account/";

    private static extractResult(res: Response) {
        return res.json();
    }

    /**
     * Extract error message from server response
     */
    private static handleError(error: any) {
        const errMsg: string = error._body;
        console.error(error); // log to console
        return Promise.reject(errMsg);
    }

    private static getHeaders(): Headers {
        const headers: Headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        return headers;
    }

    constructor(private http: Http) {
    }

    /**
     * Get list of accounts from server
     */
    public getAccounts() {
        return this.http.get(AccountService.BASE_URL)
            .toPromise()
            .then(AccountService.extractResult)
            .catch(AccountService.handleError);
    }

    /**
     * Get account with given id
     * @param id the account id
     */
    public getAccount(id: number) {

        return this.http.get(AccountService.BASE_URL + id)
            .toPromise()
            .then(AccountService.extractResult)
            .catch(AccountService.handleError);
    }

    /**
     * Create an account
     */
    public createAccount(name: string) {

        const data = "name=" + name;

        return this.http.post(AccountService.BASE_URL, data, {headers: AccountService.getHeaders()})
            .toPromise()
            .then(AccountService.extractResult)
            .catch(AccountService.handleError);
    }

    /**
     * Modify an account name using associated service
     * @param id the account id
     * @param name the account new name
     */
    public editAccount(id: number, name: string) {

        const data = "name=" + name;

        return this.http.put(AccountService.BASE_URL + id, data, {headers: AccountService.getHeaders()})
            .toPromise()
            .then(AccountService.extractResult)
            .catch(AccountService.handleError);
    }

    /**
     * Remove an account using associated service
     * @param id the account id
     */
    public deleteAccount(id: number) {

        return this.http.delete(AccountService.BASE_URL + id)
            .toPromise()
            .then(AccountService.extractResult)
            .catch(AccountService.handleError);
    }
}
