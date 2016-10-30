import {Component, OnInit} from '@angular/core';
import {Account} from "./account";
import {AccountService} from "./account.service";

@Component({
    selector: 'account',
    templateUrl: 'app/account/account.component.html',
    styleUrls: ['app/shared/css/common.css'],
    providers: [AccountService]
})

export class AccountComponent implements OnInit {

    /**
     * List of accounts displayed
     */
    accounts:Account[];

    /**
     * Error message
     */
    error:string;

    /**
     * True if editing an account ; false otherwise
     * @type {boolean}
     */
    editMode:boolean = false;

    constructor(private accountService:AccountService) {
    }

    /**
     * Get list of accounts from server
     */
    getAccounts() {
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
    getAccount(id:number) {
        this.accountService.getAccount(id)
            .then(
                account => this.accounts.push(account[0]),
                error => this.error = error
            );
    }

    /**
     * Create an account
     */
    createAccount() {

        var name:string = $('#modal-account-create-account-name').val();

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
    editAccount(id:number) {
        let name = $('#account_' + id).find('input').val();
        this.accountService.editAccount(id, name.trim()).catch(error => this.error = error);
        this.toogleEditMode(id);
    }

    /**
     * Cancel account name modification
     * @param id the account id
     */
    cancelModification(id:number) {
        let input = $('#account_' + id).find('input');
        let oldText = input.attr('data-old');
        input.val(oldText);

        this.toogleEditMode(id);
    }

    /**
     * Toggle edit mode: add input for account name edition
     * @param id the account id
     */
    toogleEditMode(id:number) {
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
     * Remove an account using associated service
     * @param id the account id
     */
    deleteAccount(id:number) {

        this.accountService.deleteAccount(id)
            .then(
                res => $('#account_' + id).parent().remove(),
                error => this.error = error
            );
    }

    ngOnInit():any {
        this.getAccounts();
    }
}