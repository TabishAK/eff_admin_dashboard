import Index from "views/Index.js";
import Login from "views/examples/Login.js";
import subCategories from "views/examples/Subcategories/Subcategories";
import CreateCategory from "views/examples/CreateCategory";
import CategoryDetail from "views/examples/CategoryDetails";
import MainCategories from "views/examples/MainCategory/MainCategories";
import CreateMainCategory from "views/examples/MainCategory/CreateMainCategory";
import UpdateCategory from "../src/views/examples/MainCategory/updateMainCategory";
import UpdateSubcategories from "../src/views/examples/Subcategories/updateSubcategory";
import CreateSubCategories from "../src/views/examples/Subcategories/createSubCategory";
import Products from "../src/views/examples/Products/products";
import CreateProduct from "../src/views/examples/Products/createProducts";
import UpdateProducts from "../src/views/examples/Products/updateProduct";
import Swatches from "../src/views/examples/swatches/swatches";
import CreateSwatches from "../src/views/examples/swatches/createSwatch";
import UpdateSwatches from "../src/views/examples/swatches/updateSwatch";
import Banners from "../src/views/examples/Banners/banner";
import Services from "../src/views/examples/Services/services";
import About from "../src/views/examples/About/about";
import Careers from "views/examples/Careers/careers";

var routes = [
  // {
  //   path: "/index",
  //   name: "Dashboard",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: Index,
  //   layout: "/admin",
  // },
  {
    path: "/main_categories",
    name: "Main-Categories",
    icon: "ni ni-planet text-blue",
    component: MainCategories,
    layout: "/admin",
  },
  {
    path: "/update-main-category",
    name: "Update-Categories",
    icon: "ni ni-planet text-blue",
    component: UpdateCategory,
    layout: "/admin",
  },

  {
    path: "/sub_categories",
    name: "Sub-Categories",
    icon: "ni ni-planet text-blue",
    component: subCategories,
    layout: "/admin",
  },

  {
    path: "/create-sub-category",
    name: "Sub-Categories",
    icon: "ni ni-planet text-blue",
    component: CreateSubCategories,
    layout: "/admin",
  },

  {
    path: "/update-sub-category",
    name: "Sub-Categories",
    icon: "ni ni-planet text-blue",
    component: UpdateSubcategories,
    layout: "/admin",
  },

  {
    path: "/create-main-category",
    name: "Create Category",
    icon: "ni ni-bullet-list-67 text-red",
    component: CreateMainCategory,
    layout: "/admin",
  },
  {
    path: "/create-product",
    name: "Create Product",
    icon: "ni ni-bullet-list-67 text-red",
    component: CreateProduct,
    layout: "/admin",
  },
  {
    path: "/update-products",
    name: "Update Product",
    icon: "ni ni-bullet-list-67 text-red",
    component: UpdateProducts,
    layout: "/admin",
  },
  {
    path: "/create-swatches",
    name: "Create Swatches",
    icon: "ni ni-bullet-list-67 text-red",
    component: CreateSwatches,
    layout: "/admin",
  },

  {
    path: "/update-swatch",
    name: "Update Swatches",
    icon: "ni ni-bullet-list-67 text-red",
    component: UpdateSwatches,
    layout: "/admin",
  },

  {
    path: "/crete-category",
    name: "Create Category",
    icon: "ni ni-bullet-list-67 text-red",
    component: CreateCategory,
    layout: "/admin",
  },

  {
    path: "/category-detail",
    name: "Create Detail",
    icon: "ni ni-bullet-list-67 text-red",
    component: CategoryDetail,
    layout: "/admin",
  },

  {
    path: "/products",
    name: "Products",
    icon: "ni ni-planet text-blue",
    component: Products,
    layout: "/admin",
  },
  {
    path: "/swatches",
    name: "Swatches",
    icon: "ni ni-planet text-blue",
    component: Swatches,
    layout: "/admin",
  },

  {
    path: "/banners",
    name: "Banners",
    icon: "ni ni-planet text-blue",
    component: Banners,
    layout: "/admin",
  },

  {
    path: "/services",
    name: "Services",
    icon: "ni ni-planet text-blue",
    component: Services,
    layout: "/admin",
  },

  {
    path: "/careers",
    name: "Careers",
    icon: "ni ni-planet text-blue",
    component: Careers,
    layout: "/admin",
  },
  {
    path: "/about",
    name: "About",
    icon: "ni ni-planet text-blue",
    component: About,
    layout: "/admin",
  },

  {
    path: "/crete-product",
    name: "Create Products",
    icon: "ni ni-bullet-list-67 text-red",
    component: CreateProduct,
    layout: "/admin",
  },

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },

  /*** CATEGORY*****************************************************/
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/index",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Categories,
  //   layout: "/admin"
  // },

  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth"
  // },

  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth"
  // }
];
export default routes;
