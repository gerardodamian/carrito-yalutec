import { Injectable } from '@angular/core';
import { Carrito } from '../modelo/carrito';
import { Producto } from '../modelo/producto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private listCarrito: Carrito[] = [];
  private apiUrl = 'https://tuapi.com/checkout'; // Reemplaza con tu endpoint real

  constructor(private http: HttpClient) {
    this.obtenerSesion(); // Cargar datos al iniciar el servicio
  }

  getCarrito(): Carrito[] {
    this.obtenerSesion();
    return this.listCarrito;
  }

  agregar(producto: Producto, cantidad: number = 1) {
    this.obtenerSesion();
    const index = this.listCarrito.findIndex(
      (item) => item.producto.id == producto.id
    );

    if (index == -1) {
      const item = new Carrito(producto, cantidad);
      this.listCarrito.push(item);
    } else {
      this.actualizar(index, this.listCarrito[index].cantidad + cantidad);
    }
    this.guardarSesion();
  }

  actualizar(index: number, cantidad: number) {
    if (index >= 0 && index < this.listCarrito.length) {
      this.listCarrito[index].cantidad = cantidad;
      this.guardarSesion();
    }
  }

  cantidad(): number {
    this.obtenerSesion();
    return this.listCarrito.length;
  }

  total(): number {
    return this.listCarrito.reduce(
      (sum, item) => sum + (item.producto.price ?? 0) * item.cantidad,
      0
    );
  }

  eliminar(index: number) {
    if (index >= 0 && index < this.listCarrito.length) {
      this.listCarrito.splice(index, 1);
      this.guardarSesion();
    }
  }

  limpiarCarrito() {
    this.listCarrito = [];
    this.guardarSesion();
  }

  private guardarSesion() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('carrito', JSON.stringify(this.listCarrito));
    }
  }

  private obtenerSesion() {
    if (typeof localStorage !== 'undefined') {
      const carrito = localStorage.getItem('carrito');
      this.listCarrito = carrito ? JSON.parse(carrito) : [];
    }
  }
  private carrito: Carrito[] = [];

  guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  vaciarCarrito() {
    this.carrito = [];
    this.guardarCarrito();
  }
}
