import Banner from "./components/banner/Banner";
import NewArrivals from "./components/newArrivals/NewArrivals";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import CartProvider from "./Provider/CartProvider";
import ProductProvider from "./Provider/ProductProvider";

export default function Page() {
  return (
    <ProductProvider>
      <div>
        <Header />
        <Banner />
        <CartProvider>
          <NewArrivals />
        </CartProvider>
        <Footer />
      </div>
    </ProductProvider>
  );
}
