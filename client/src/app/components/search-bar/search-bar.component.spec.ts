import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarComponent } from './search-bar.component';

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
