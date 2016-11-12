import {AccountComponent} from './account.component';
import {AccountService} from "./account.service";
import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import {Account} from './account';
import {HttpModule} from '@angular/http';

describe('component: AccountComponent', () => {

    let fixture: ComponentFixture<AccountComponent>;
    let accountService: Account;
    let comp: AccountComponent;
    let testAccount: Account = new Account();
    testAccount.name = 'testAccount';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AccountComponent],
            imports: [HttpModule],
            providers: [AccountService],
        })
            .compileComponents(); // compile template and css
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountComponent);
        comp = fixture.componentInstance;

        accountService = fixture.debugElement.injector.get(AccountService);

        spyOn(accountService, 'getAccounts')
            .and.returnValue(Promise.resolve([testAccount]));
    });

    it('should be 1 account', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(comp.accounts).toEqual([testAccount]);
        });
    }));
});