import { Component, inject, OnInit } from '@angular/core';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/modelo/producto';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../../core/services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo-inicio.component.html',
  styleUrl: './catalogo-inicio.component.css',
})
export class CatalogoInicioComponent implements OnInit {
  private productoService = inject(ProductoService);
  private carritoService = inject(CarritoService);
  productos: Producto[] = [];

  constructor(
      private router: Router,

    ) {}


  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
  agregarProducto(item: Producto) {
    this.carritoService.agregar(item);
  }

  navigateToDetail(item: Producto){
    this.router.navigate(["/product", item.id])

  }
}
