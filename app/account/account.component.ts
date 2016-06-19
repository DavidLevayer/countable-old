import {Component, OnInit} from '@angular/core';
import {Account} from "./account";
import {AccountService} from "./account.service";
import {HTTP_PROVIDERS} from "@angular/http";

@Component({
    selector: 'account',
    templateUrl: 'app/account/account.component.html',
    styleUrls: ['app/shared/css/common.css','app/account/account.component.css'],
    providers: [AccountService, HTTP_PROVIDERS]
})

export class AccountComponent implements OnInit {
    
    accounts: Account[];
    error: string;
    
    constructor(private accountService: AccountService) {}

    getAccounts(){
        this.accountService.getAccounts()
            .then(
                accounts => this.accounts = accounts,
                error => this.error = error
            );
    }

    editAccount(id: number){
        console.log('edit account '+id);
    }

    removeAccount(id: number){
        console.log('remove account '+id);
    }
    
    ngOnInit():any {
        this.getAccounts();
    }
}