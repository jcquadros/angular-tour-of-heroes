import { TestBed} from '@angular/core/testing';

import { HeroService } from './hero.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; 
import { Hero } from './heroes';
describe('HeroService', () => {
  let service: HeroService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService]
    });
    service = TestBed.inject(HeroService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get heroes', () => {
    service.getHeroes().subscribe(heroes => {
      expect(heroes).toBeTruthy();
      expect(heroes.length).toBe(1);
    });

    const req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).toEqual('GET');   
  });

  it('should update the hero', () => {
    const updatedHero: Hero = { id: 11, name: 'Updated Hero' };

    service.updateHero(updatedHero).subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.id).toEqual(updatedHero.id);
      expect(response.name).toEqual(updatedHero.name);
    });

    const req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).toEqual('PUT');

    req.flush(updatedHero);
  });

  it('should add a new hero', () => {
    const newHero: Hero = { id: 3, name: 'New Hero' };

    service.addHero(newHero).subscribe(response => {
      expect(response).toEqual(newHero);
    });

    const req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).toEqual('POST');

    req.flush(newHero);
  });

  it('should delete the hero', () => {
    const heroIdToDelete = 11;

    service.deleteHero(heroIdToDelete).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`api/heroes/${heroIdToDelete}`);
    expect(req.request.method).toEqual('DELETE');
  });


  it('should return an Observable<Hero[]>', () => {
    const term = 'Hero';

    service.searchHeroes(term).subscribe(heroes => {
      expect(heroes.length).toBe(1);
    });

    const req = httpTestingController.expectOne(`api/heroes/?name=${term}`);
    expect(req.request.method).toEqual('GET');
  });

  it('should return an empty Observable<Hero[]> when term is empty', () => {
    const term = '';

    service.searchHeroes(term).subscribe(heroes => {
      expect(heroes.length).toBe(0);
    });
  });
});
