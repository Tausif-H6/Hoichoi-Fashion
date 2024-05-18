import Header from "@/components/Header";
import Product from "./Products/Products";

export default function Home() {
  return (
    <body className="bg-gradient-to-r from-purple-200 via-pink-200 to-red-100">
      <Header />
      <Product />
    </body>
  );
}
