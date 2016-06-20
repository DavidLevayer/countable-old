import {Component, OnInit} from '@angular/core';
import {Account} from "./account";
import {AccountService} from "./account.service";
import {HTTP_PROVIDERS} from "@angular/http";

@Component({
    selector: 'account',
    templateUrl: 'app/account/account.component.html',
    styleUrls: ['app/shared/css/common.css', 'app/account/account.component.css'],
    providers: [AccountService, HTTP_PROVIDERS]
})

export class AccountComponent implements OnInit {

    accounts:Account[];
    error:string;

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
     * Toggle edit mode: add input for account name edition
     * @param id
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
     * Modify an account name using associated service
     * @param id
     */
    editAccount(id:number) {
        let name = $('#account_' + id).find('input').val();
        this.accountService.editAccount(id, name);
        this.toogleEditMode(id);
    }

    /**
     * Cancel account name modification
     * @param id
     */
    cancelModification(id:number) {
        let input = $('#account_' + id).find('input');
        let oldText = input.attr('data-old');
        input.val(oldText);

        this.toogleEditMode(id);
    }

    /**
     * Remove an account using associated service
     * @param id
     */
    removeAccount(id:number) {
        console.log('remove account ' + id);
    }

    ngOnInit():any {
        this.getAccounts();
    }
}