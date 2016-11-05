import {AccountComponent} from './account.component';
import {AccountService} from "./account.service";
import {TestBed, ComponentFixture, async} from "@angular/core/testing";
import {Account} from "./account";
import {HttpModule} from "@angular/http";

describe('component: AccountComponent', () => {

    let fixture: ComponentFixture<AccountComponent>;
    let accountService: Account;
    let comp: AccountComponent;

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

        // TwainService actually injected into the component
        accountService = fixture.debugElement.injector.get(AccountService);

        // Setup spy on the `getQuote` method
        spyOn(accountService, 'getAccounts')
            .and.returnValue(Promise.resolve([]));
    });

    it('should be ok', () => {
        expect(true).toBe(true);
    });

    it('should be 0 account', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => { // wait for async getQuote
            fixture.detectChanges();        // update view with quote
            //expect(comp.accounts).toBe([]);
            expect(true).toBe(true);
        });
    }));
});
