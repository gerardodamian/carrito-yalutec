import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoListaComponent } from './carrito-lista.component';

describe('CarritoListaComponent', () => {
  let component: CarritoListaComponent;
  let fixture: ComponentFixture<CarritoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarritoListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarritoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
