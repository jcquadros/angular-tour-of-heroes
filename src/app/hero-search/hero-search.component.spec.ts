import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSearchComponent } from './hero-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { HeroService } from '../hero.service';	
import { Hero } from '../heroes';
import { of } from 'rxjs';
describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let heroService: HeroService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroSearchComponent],
      imports: [HttpClientTestingModule],
      providers: [HeroService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call search method with search term', () => {
    const searchTerm = 'test';
    spyOn(component, 'search');
  
    component.search(searchTerm);
  
    expect(component.search).toHaveBeenCalledWith(searchTerm);
  });
});
