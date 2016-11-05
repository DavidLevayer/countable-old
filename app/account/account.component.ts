import {Component, OnInit} from '@angular/core';
import {Account} from './account';
import {AccountService} from './account.service';

@Component({
    providers: [AccountService],
    selector: 'app-account',
    styleUrls: ['app/shared/css/common.css'],
    templateUrl: 'app/account/account.component.html',
})

export class AccountComponent implements OnInit {

    /**
     * List of accounts displayed
     */
    private accounts: Account[];

    /**
     * Error message
     */
    private error: string;

    /**
     * True if editing an account ; false otherwise
     * @type {boolean}
     */
    private editMode: boolean = false;

    constructor(private accountService: AccountService) {
    }

    public ngOnInit(): any {
        this.getAccounts();
    }

    /**
     * Get list of accounts from server
     */
    public getAccounts() {
        this.accountService.getAccounts()
            .then(
                accounts => this.accounts = accounts,
                error => this.error = error
            );
    }

    /**
     * Get account with given id
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
     * Create an account
     */
    public createAccount() {

        const name: string = $('#modal-account-create-account-name').val();

        this.accountService.createAccount(name.trim())
            .then(
                res => this.getAccount(res.insertId),
                error => this.error = error
            );
    }

    /**
     * Modify an account name using associated service
     * @param id the account id
     * @param name the account new name
     */
    public editAccount(id: number) {
        let name = $('#account_' + id).find('input').val();
        this.accountService.editAccount(id, name.trim()).catch(error => this.error = error);
        this.toogleEditMode(id);
    }

    /**
     * Remove an account using associated service
     * @param id the account id
     */
    public deleteAccount(id: number) {

        this.accountService.deleteAccount(id)
            .then(
                res => $('#account_' + id).parent().remove(),
                error => this.error = error
            );
    }

    /**
     * Toggle edit mode: add input for account name edition
     * @param id the account id
     */
    public toogleEditMode(id: number) {
        let cell = $('#account_' + id);

        if (this.editMode) {
            let text = cell.find('input').val();

            cell
                .empty()
                .append('<span>' + text + '</span>');

        } else {

            let text = cell.text();
            let input = $('<input>')
                .attr('id', 'input_account_' + id)
                .attr('data-old', text)
                .val(text);

            cell
                .empty()
                .append(input);
        }

        this.editMode = !this.editMode;
    }

    /**
     * Cancel account name modification
     * @param id the account id
     */
    public cancelModification(id: number) {
        let input = $('#account_' + id).find('input');
        let oldText = input.attr('data-old');
        input.val(oldText);

        this.toogleEditMode(id);
    }
}
