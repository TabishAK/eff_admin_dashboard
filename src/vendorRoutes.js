import Products from "./views/vendorScreens/products";
import CreateProductByVendor from "views/examples/CreateProductByVendor";
var routes = [
  {
    path: "/products",
    name: "Products",
    icon: "ni ni-tv-2 text-primary",
    component: Products,
    layout: "/vendor",
  },

  {
    path: "/create-product",
    name: "Create Products",
    icon: "ni ni-bullet-list-67 text-red",
    component: CreateProductByVendor,
    layout: "/vendor",
  },
];

export default routes;
