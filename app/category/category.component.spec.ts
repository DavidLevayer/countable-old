import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {MdlModule} from 'angular2-mdl';
import {CategoryComponent} from './category.component';
import {CategoryService} from './category.service';

describe('component: CategoryComponent', () => {

    let fixture: ComponentFixture<CategoryComponent>;
    let categoryService: CategoryService;
    let comp: CategoryComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CategoryComponent],
            imports: [HttpModule, FormsModule, MdlModule],
            providers: [CategoryService],
        })
            .compileComponents(); // compile template and css
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoryComponent);
        comp = fixture.componentInstance;

        categoryService = fixture.debugElement.injector.get(CategoryService);
    });
});
