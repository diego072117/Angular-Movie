import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperMoviesComponent } from './swiper-movies.component';

describe('SwiperMoviesComponent', () => {
  let component: SwiperMoviesComponent;
  let fixture: ComponentFixture<SwiperMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwiperMoviesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwiperMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
