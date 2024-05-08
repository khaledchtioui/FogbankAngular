import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddArticleComponent } from './user-add-article.component';

describe('UserAddArticleComponent', () => {
  let component: UserAddArticleComponent;
  let fixture: ComponentFixture<UserAddArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAddArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
