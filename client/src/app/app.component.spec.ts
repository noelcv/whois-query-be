import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    fixture = await TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  test(`the title is 'whois-query-fe`, () => {
    expect(app.title).toEqual('whois-query-fe');
  });

  test(`should have as title 'whois-query-fe'`, () => {
    expect(app.title).toEqual('whois-query-fe');
  });

  // test('should render title', () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain(
  //     'whois-query-fe app is running!'
  //   );
  // });
});
