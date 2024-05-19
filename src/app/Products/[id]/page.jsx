"use client";
import { useRouter } from "next/navigation";
import { useProductContext } from "@/Provider/Context/Product.context";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function SingleProduct({ params }) {
  const router = useRouter();
  const { id } = params;
  const { products, addTocartHandeler, cart } = useProductContext(); // Assuming you have access to the cart state from the context
  const [singleProduct, setSingleProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (products.length > 0) {
      const product = products.find((product) => product._id === id);
      setSingleProduct(product);
    }
  }, [products, id]);

  useEffect(() => {
    if (singleProduct) {
      const totalPrice = quantity * singleProduct.price;
      setTotal(totalPrice);
    }
  }, [quantity, singleProduct]);

  if (!singleProduct) {
    return <div>Loading...</div>;
  }

  const navigateToHomePage = () => {
    router.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTocart();
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setQuantity(Number(value));
    }
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const { description, picture, price, product_category, size } = singleProduct;
  const sizeArray = size.split(",").map((s) => s.trim());

  const addTocart = () => {
    const cartInformation = {
      id: crypto.randomUUID(),
      item: singleProduct,
      quantity: quantity,
      totalPrice: total, // Use the calculated total price
      selectedSize: selectedSize, // Include selected size
    };
    addTocartHandeler(cartInformation);
    navigateToHomePage();
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 5,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 5,
        mt: { xs: 2, md: 10 }, // Adding margin-top for md and above
      }}
    >
      <Button onClick={navigateToHomePage} variant="contained" sx={{ mb: 2 }}>
        Go Back
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Box sx={{ flexShrink: 0 }}>
          <Image
            src={picture}
            height={200}
            width={200}
            alt="Product Image"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <h1 className="text-xl font-bold text-gray-900">{description}</h1>
          <p className="mt-2 text-gray-600">{product_category}</p>
          <p className="mt-2 text-gray-600">Price: ${price}</p>
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Size</InputLabel>
            <Select
              value={selectedSize}
              onChange={handleSizeChange}
              label="Size"
            >
              {sizeArray.map((sizeOption) => (
                <MenuItem key={sizeOption} value={sizeOption}>
                  {sizeOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <form onSubmit={handleSubmit} className="mt-4">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={decrementQuantity}>
                <RemoveIcon />
              </IconButton>
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                InputProps={{ inputProps: { min: 1 } }}
                margin="normal"
                variant="outlined"
                sx={{ width: 70, textAlign: "center" }}
              />
              <IconButton onClick={incrementQuantity}>
                <AddIcon />
              </IconButton>
            </Box>
            <p className="text-xs mt-2">Total Price: TK{total}</p>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Add to Cart
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
