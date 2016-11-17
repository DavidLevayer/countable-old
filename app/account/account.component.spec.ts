import {AccountComponent} from './account.component';
import {AccountService} from './account.service';
import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import {Account} from './account';
import {HttpModule} from '@angular/http';
import {MaterialModule, MdIconRegistry} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {MdlModule} from 'angular2-mdl';

describe('component: AccountComponent', () => {

    let fixture: ComponentFixture<AccountComponent>;
    let accountService: Account;
    let comp: AccountComponent;
    let accountMocks = [new Account(626, 'mock')];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AccountComponent],
            imports: [HttpModule, FormsModule, MaterialModule, MdlModule],
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
            .and.callFake(function (id: number): Promise<any> {

            let mockAccount: Account = accountMocks.find(function (ac: Account) {
                return ac.accountId === id;
            });

            if (mockAccount !== undefined) {
                return Promise.resolve([mockAccount]);
            }

            return Promise.reject('no account');
        });

        spyOn(accountService, 'createAccount')
            .and.callFake(function (name: string): Promise<any> {

            let mockAccount: Account = accountMocks.find(function (ac: Account) {
                return ac.name === name;
            });

            if (mockAccount !== undefined) {
                return Promise.reject('name already used');
            }

            mockAccount = new Account(42, name);
            accountMocks.push(mockAccount);
            return Promise.resolve({insertId: 42});
        });

        spyOn(accountService, 'editAccount')
            .and.callFake(function (id: number, name: string): Promise<any> {

            let mockAccount: Account = accountMocks.find(function (ac: Account) {
                return ac.accountId === id;
            });

            if (mockAccount === undefined) {
                return Promise.reject('no account');
            }

            let existingMockAccount: Account = accountMocks.find(function (ac: Account) {
                return ac.name === name && ac.accountId !== id;
            });

            if (existingMockAccount !== undefined) {
                return Promise.reject('name already used');
            }

            mockAccount.name = name;
            return Promise.resolve(0);
        });

        spyOn(accountService, 'deleteAccount')
            .and.callFake(function (id: number): Promise<any> {

            let mockAccount: Account = accountMocks.find(function (ac: Account) {
                return ac.accountId === id;
            });

            if (mockAccount === undefined) {
                return Promise.reject('no account');
            }

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

    it('should get an account that does exist', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.getAccount(626);
            // Wait for changes to be effective
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(comp.accounts).toEqual(accountMocks);
            });
        });
    }));

    it('should not get an account that does not exist', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.getAccount(999);
            // Wait for changes to be effective
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(comp.accounts).toEqual(accountMocks);
                expect(comp.error).toBe('no account');
            });
        });
    }));

    it('should create an account', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.createAccount('newAccount');
            // Wait for changes to be effective
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(comp.accounts).toEqual(accountMocks);
            });
        });
    }));

    it('should not create an account with existing name', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.createAccount('newAccount');
            // Wait for changes to be effective
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(comp.accounts).toEqual(accountMocks);
                expect(comp.error).toBe('name already used');
            });
        });
    }));

    it('should edit an account', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.editAccount(42, 'newAccountEdited');
            // Wait for changes to be effective
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(comp.accounts).toEqual(accountMocks);
            });
        });
    }));

    it('should not edit an account that does not exist', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.editAccount(999, 'newAccountEdited');
            // Wait for changes to be effective
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(comp.accounts).toEqual(accountMocks);
                expect(comp.error).toBe('no account');
            });
        });
    }));

    it('should not edit an account with an existing name', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.editAccount(42, 'mock');
            // Wait for changes to be effective
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(comp.accounts).toEqual(accountMocks);
                expect(comp.error).toBe('name already used');
            });
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

    it('should not delete an account that does not exist', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.deleteAccount(999);
            // Wait for account to be deleted
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(comp.accounts).toEqual(accountMocks);
                expect(comp.error).toBe('no account');
            });
        });
    }));
});
