import styles from "./ProductList.module.css";

const ProductList = () => {
  const products = [
    {
      id: 1,
      name: "Smartphone XYZ",
      description: "Latest smartphone with advanced features.",
      price: "$699",
      detailUrl: "./ProductDetail", // Fixed typo here
      img: "./images/z900.jpg",
    },
    {
      id: 2,
      name: "Laptop ABC",
      description: "High-performance laptop for professionals.",
      price: "$999",
      img: "./images/z9002.jpg",
    },
    {
      id: 3,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: "$199",
      img: "./images/z9003.jpg",
    },
    {
      id: 4,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: "$199",
      img: "https://i.pinimg.com/474x/21/7b/be/217bbe8121fe653ec9ab50eaec4d2f5a.jpg",
    },
    {
      id: 5,
      img: "",
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: "$199",
      img: "https://i.pinimg.com/474x/8c/86/bc/8c86bc973584beebc03fa421270d9062.jpg",
    },
    {
      id: 6,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: "$199",
      img: "https://i.pinimg.com/474x/95/72/6d/95726dbf71539de4c65b61cdfed5e7c7.jpg",
    },
    {
      id: 7,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: "$199",
      img: "https://i.pinimg.com/474x/bb/f3/55/bbf3558cd63361de2714ae7049d24da9.jpg",
    },
    {
      id: 8,
      name: "Wireless Headphones",
      description: "Noise-cancelling wireless headphones.",
      price: "$199",
      img: "https://i.pinimg.com/474x/ae/43/7c/ae437ce161489caee7014d3afba3d418.jpg",
    },
  
  ];

  return (
    <div className={styles.top}>
      <div className={styles.container}>
        <div className={styles.productList}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <a href="./ProductDetails">
                <img
                  src={product.img}
                  alt={product.name}
                  className={styles.productImage}
                />
              </a>
              <h4 className={styles.productName}>{product.name}</h4>
              <p className={styles.productDescription}>{product.description}</p>
              <p className={styles.productPrice}>{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
