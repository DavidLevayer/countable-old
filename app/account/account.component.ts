import {Component, OnInit} from '@angular/core';
import {Account} from './account';
import {AccountService} from './account.service';

@Component({
    providers: [AccountService],
    selector: 'app-account',
    styleUrls: ['app/shared/css/common.css', 'app/account/account.component.css'],
    templateUrl: 'app/account/account.component.html',
})

export class AccountComponent implements OnInit {

    /**
     * List of accounts displayed
     */
    public accounts: Account[];

    /**
     * Error message
     */
    public error: string;

    private creationName: string;

    private editionId: number;

    private editionName: string;

    private deletionId: number;

    constructor(private accountService: AccountService) {
    }

    public ngOnInit(): any {
        this.getAccounts();
    }

    /**
     * Get list of accounts from server and initiate the list of accounts
     */
    public getAccounts() {
        this.accountService.getAccounts()
            .then(
                accounts => this.accounts = accounts,
                error => this.error = error
            );
    }

    /**
     * Get account with given id and add it to the list of accounts
     * @param id the account id
     */
    public getAccount(id: number) {
        this.accountService.getAccount(id)
            .then(
                account => this.accounts.push(account[0]),
                error => this.error = error
            );
    }

    /**
     * Create an account. If the creation process is successful, the new account is added
     * to the list of accounts
     * @param name the name of the account to create
     */
    public createAccount(name: string) {

        this.accountService.createAccount(name.trim())
            .then(
                res => {
                    this.getAccount(res.insertId);
                    this.creationName = '';
                },
                error => this.error = error
            );
    }

    /**
     * Modify an account name in both the list and the database
     * @param id the account id
     * @param name the name to set
     */
    public editAccount(id: number, name: string) {

        this.accountService.editAccount(id, name.trim()).catch(error => this.error = error);
        // Reset the modal field
        this.toggleEdit(null, '');
        // Refresh value displayed
        this.accounts.find(function (ac: Account) {
            return ac.accountId === id;
        }).name = name;
    }

    /**
     * Remove an account from both the list and the database
     * @param id the account id
     */
    public deleteAccount(id: number) {

        this.accountService.deleteAccount(id).catch(error => this.error = error);
        // Reset the modal field
        this.toggleDelete(null);
        // Refresh value displayed
        this.accounts = this.accounts.filter(function(ac: Account){
            return ac.accountId !== id;
        });
    }

    public toggleEdit(id: number, name: string) {
        this.editionId = id;
        this.editionName = name;
    }

    public toggleDelete(id: number){
        this.deletionId = id;
    }
}
