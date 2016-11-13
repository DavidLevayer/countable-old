import {AccountComponent} from './account.component';
import {AccountService} from "./account.service";
import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import {Account} from './account';
import {HttpModule} from '@angular/http';
import {MaterialModule, MdIconRegistry} from "@angular/material";
import {FormsModule} from "@angular/forms";

describe('component: AccountComponent', () => {

    let fixture: ComponentFixture<AccountComponent>;
    let accountService: Account;
    let comp: AccountComponent;
    let accountMocks = [new Account(626, 'mock')];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AccountComponent],
            imports: [HttpModule, FormsModule, MaterialModule],
            providers: [AccountService, MdIconRegistry],
        })
            .compileComponents(); // compile template and css
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountComponent);
        comp = fixture.componentInstance;

        accountService = fixture.debugElement.injector.get(AccountService);

        spyOn(accountService, 'getAccounts')
            .and.returnValue(Promise.resolve(accountMocks));

        spyOn(accountService, 'getAccount')
            .and.callFake(function (id: number) {

            let mockAccount: Account = accountMocks.find(function (ac: Account) {
                return ac.accountId === id;
            });

            if (mockAccount !== undefined) {
                return Promise.resolve([mockAccount]);
            }

            return Promise.resolve([]);
        });

        spyOn(accountService, 'createAccount')
            .and.callFake(function (name: string) {

            let mockAccount: Account = new Account(42, name);
            accountMocks.push(mockAccount);
            return Promise.resolve({insertId: 42});
        });

        spyOn(accountService, 'editAccount')
            .and.callFake(function (id: number, name: string) {

            accountMocks.find(function (ac: Account) {
                return ac.accountId === id;
            }).name = name;
            return Promise.resolve(0);
        });

        spyOn(accountService, 'deleteAccount')
            .and.callFake(function (id: number) {

            accountMocks = accountMocks.filter(function (ac: Account) {
                return ac.accountId !== id;
            });
            return Promise.resolve(0);
        });
    });

    it('should get accounts', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(comp.accounts).toEqual(accountMocks);
        });
    }));

    it('should get an account', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.getAccount(626);
            expect(comp.accounts).toEqual(accountMocks);
        });
    }));

    it('should create an account', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.createAccount('newAccount');
            expect(comp.accounts.length).toBe(2);
            expect(comp.accounts).toEqual(accountMocks);
        });
    }));

    it('should edit an account', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.editAccount(626, 'newAccountEdited');
            expect(comp.accounts).toEqual(accountMocks);
        });
    }));

    it('should delete an account', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.deleteAccount(626);
            // Wait for account to be deleted
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(comp.accounts).toEqual(accountMocks);
            });
        });
    }));
});