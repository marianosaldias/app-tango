import { ProductType } from '../models/product-type';

export const productTYPES: ProductType[] = [
  { value: '', label: 'All products' },
  { value: 'Beers', label: 'Beers' },
  { value: 'Burgers', label: 'Burgers' },
  { value: 'Coffe', label: 'Coffe' },
  { value: 'Desserts', label: 'Desserts' },
  { value: 'Dishes', label: 'Dishes' },
  { value: 'Drinks', label: 'Drinks' },
  { value: 'Fast', label: 'Fast-Food' },
  { value: 'Muffins', label: 'Muffins' },
  { value: 'Pizzas', label: 'Pizzas' },
  { value: 'Salads', label: 'Salads' },
  { value: 'Sodas', label: 'Sodas' },
  { value: 'Tea', label: 'Tea' },
  { value: 'Wines', label: 'Wines' }
];

export const dayNamesEN: Array<string> = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const dayNamesES: Array<string> = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
