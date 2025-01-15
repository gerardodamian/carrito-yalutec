import { Component, inject, NgModule, OnInit } from '@angular/core';
import { CarritoService } from '../../../core/services/carrito.service';
import { Carrito } from '../../../core/modelo/carrito';
import { NgIf, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule],
})
export class AppModule {}

@Component({
  selector: 'app-carrito-lista',
  standalone: true,
  imports: [CommonModule, NgIf, FormsModule, RouterModule],
  templateUrl: './carrito-lista.component.html',
  styleUrl: './carrito-lista.component.css',
})
export class CarritoListaComponent implements OnInit {
  public carritoService = inject(CarritoService);
  listCarrito: Carrito[] = [];

  ngOnInit(): void {
    this.getListCarrito();
  }

  getListCarrito() {
    this.listCarrito = this.carritoService.getCarrito();
  }

  eliminarItem(index: number) {
    this.carritoService.eliminar(index);
    this.getListCarrito();
  }

  actualizar(item: Carrito, index: number) {
    this.carritoService.actualizar(index, item.cantidad);
  }

  onKeyDown(event: any) {
    event.preventDefault();
  }

  mensajeCompra: string = '';

  procesarCompra() {
    this.mensajeCompra = 'Gracias por su compra, compra procesada!!';
    this.carritoService.vaciarCarrito();
    this.listCarrito = [];

  }
}
