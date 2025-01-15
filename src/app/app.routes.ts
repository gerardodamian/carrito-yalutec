import { Routes } from '@angular/router';
import { CatalogoInicioComponent } from './components/catalogo/catalogo-inicio/catalogo-inicio.component';
import { CarritoListaComponent } from './components/carrito/carrito-lista/carrito-lista.component';
import { DetailsProductComponent } from './components/catalogo/details-product/details-product.component';


export const routes: Routes = [
  { path: '', component: CatalogoInicioComponent },
  { path: 'carrito', component: CarritoListaComponent },
  { path: 'product/:id', component: DetailsProductComponent},
];
