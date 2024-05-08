import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateArticleComponent } from './user-update-article.component';

describe('UserUpdateArticleComponent', () => {
  let component: UserUpdateArticleComponent;
  let fixture: ComponentFixture<UserUpdateArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserUpdateArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUpdateArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
