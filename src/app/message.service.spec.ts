import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be add message', ()=>{
    service.add('message');
    expect(service.messages.length).toBe(1);
  });

  it('should be clear message', ()=>{
    service.add('message');
    service.clear();
    expect(service.messages.length).toBe(0);
  });
  
});
