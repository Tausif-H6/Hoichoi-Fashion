"use client";
import { useRouter } from "next/navigation";
import { useProductContext } from "@/Provider/Context/Product.context";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function SingleProduct({ params }) {
  const router = useRouter();
  const { id } = params;
  const { products, addTocartHandeler, cart } = useProductContext(); // Assuming you have access to the cart state from the context
  const [singleProduct, setSingleProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (products.length > 0) {
      const product = products.find((product) => product._id === id);
      setSingleProduct(product);
    }
  }, [products, id]);

  if (!singleProduct) {
    return <div>Loading...</div>;
  }

  const navigateToHomePage = () => {
    router.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., add to cart or place an order)
    console.log("Form submitted with quantity:", quantity);
    addTocart();
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setQuantity(Number(value));
    }
  };

  const { description, picture, price, product_category, size } = singleProduct;

  const addTocart = () => {
    const totalPrice = quantity * price; // Calculate the total price for the current product
    const cartInformation = {
      item: singleProduct,
      quantity: quantity,
      totalPrice: totalPrice, // Use the calculated total price
    };
    addTocartHandeler(cartInformation);
    navigateToHomePage();
  };

  return (
    <div className="p-8">
      <Button
        onClick={navigateToHomePage}
        variant="contained"
        sx={{ marginBottom: "2rem" }}
      >
        Go Back
      </Button>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:shrink-0">
            <Image
              src={picture}
              height={200}
              width={200}
              alt="Product Image"
              className="h-48 w-full object-cover md:h-full md:w-48"
            />
          </div>
          <div className="p-8">
            <h1 className="text-xl font-bold text-gray-900">{description}</h1>
            <p className="mt-2 text-gray-600">{product_category}</p>
            <p className="mt-2 text-gray-600">Size: {size}</p>
            <p className="mt-2 text-gray-600">Price: ${price}</p>
            <form onSubmit={handleSubmit} className="mt-4">
              <TextField
                label="Quantity"
                type="text"
                value={quantity}
                onChange={handleQuantityChange}
                InputProps={{ inputProps: { min: 1 } }}
                fullWidth
                margin="normal"
                variant="outlined"
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: "1rem" }}
              >
                Add to Cart
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
