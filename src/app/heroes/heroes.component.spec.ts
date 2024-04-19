import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HeroesComponent } from './heroes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { HeroService } from '../hero.service';
import { Hero } from '../heroes';
describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroService: HeroService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      imports: [HttpClientTestingModule],
      providers: [HeroService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getHeroes on ngOnInit', () => {
    const heroes: Hero[] = [{ id: 1, name: 'Hero 1' }, { id: 2, name: 'Hero 2' }];
    spyOn(heroService, 'getHeroes').and.returnValue(of(heroes));

    component.ngOnInit();
    expect(component.heroes).toEqual(heroes);
  });

  it('should call addHero on add', () => {
    const hero: Hero = { id: 1, name: 'Hero 1' };
    spyOn(heroService, 'addHero').and.returnValue(of(hero));

    component.add('Hero 1');
    expect(component.heroes).toContain(hero);
  });

  it('should call deleteHero on delete', () => {
    const hero: Hero = { id: 1, name: 'Hero 1' };
    spyOn(heroService, 'deleteHero').and.returnValue(of(hero));

    component.delete(hero);
    expect(component.heroes).not.toContain(hero);
  });
});
