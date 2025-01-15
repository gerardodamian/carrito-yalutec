import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../../core/modelo/producto';
import { CarritoService } from '../../../core/services/carrito.service';
import { ProductoService } from '../../../core/services/producto.service';

@Component({
  selector: 'app-details-product',
  imports: [],
  templateUrl: './details-product.component.html',
  styleUrl: './details-product.component.css',
})
export class DetailsProductComponent implements OnInit {
  producto!: Producto | undefined;
  id!: string | null;

  constructor(
    private route: ActivatedRoute,
    private carritoService: CarritoService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.getProduct(this.id);
      }
    });
  }

  getProduct(id: string): void {
    this.productoService.getProductById(id).subscribe({
      next: (res) => {
        this.producto = res;
      },
    });
  }

  agregarProducto() {
    this.carritoService.agregar(this.producto as Producto, 1);
  }
}
