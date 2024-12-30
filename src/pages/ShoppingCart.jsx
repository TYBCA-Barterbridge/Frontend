import React, { useState } from 'react';
import styles from './ShoppingCart.module.css';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

const ShoppingCart = () => {
  const [quantities, setQuantities] = useState({ product1: 1, product2: 1 });

  const handleIncrement = (product) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product]: prevQuantities[product] + 1,
    }));
  };

  return (
    <>
      <Navigation />
      <div className={styles.shoppingCartPage}></div>
      <div className={styles.cartContainer}>
        <div className={styles.cart}>
          {/* Product Section */}
          <div className={styles.products}>
            <h2 className={styles.sectionTitle}>Shopping Cart</h2>
            <table className={styles.productTable}>
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                {/* Product 1 */}
                <tr>
                  <td>
                    <div className={styles.productInfo}>
                      <img
                        src="https://clicon-html.netlify.app/image/product/mac.png"
                        alt="Product 1"
                        className={styles.productImage}
                      />
                      <span>PlayStation 5 Gaming console with controller</span>
                    </div>
                  </td>
                  <td>
                    <span className={styles.discountedPrice}>$99</span> $70
                  </td>
                  <td>
                    <div className={styles.quantityControl}>
                      <button className='btn'>-</button>
                      <input className={styles.input} type="number" value={quantities.product1} readOnly />
                      <button onClick={() => handleIncrement('product1')} className='btn'>+</button>
                    </div>
                  </td>
                  <td>${70 * quantities.product1}</td>
                </tr>
                {/* Product 2 */}
                <tr>
                  <td>
                    <div className={styles.productInfo}>
                      <img
                        src="data:image/jpeg;base64,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"
                        alt="Product 2"
                        className={styles.productImage}
                      />
                      <span>X box 360 gaming console</span>
                    </div>
                  </td>
                  <td>$250</td>
                  <td>
                    <div className={styles.quantityControl}>
                      <button className='btn'>-</button>
                      <input className={styles.input} type="number" value={quantities.product2} readOnly />
                      <button  onClick={() => handleIncrement('product2')} className='btn'>+</button>
                    </div>
                  </td>
                  <td>${250 * quantities.product2}</td>
                </tr>
              </tbody>
            </table>
            <div className={styles.actionButtons}>
              <button className={styles.returnButton}>RETURN TO SHOP</button>
              <button className={styles.updateButton}>UPDATE CART</button>
            </div>
          </div>

          {/* Summary Section */}
          <div className={styles.summary}>
            <div className={styles.cardTotals}>
              <h2 className={styles.sectionTitle}>Cart Totals</h2>
              <p>
                Subtotal: <span>$320</span>
              </p>
              <p>
                Shipping: <span>Free</span>
              </p>
              <p>
                Discount: <span>-$24</span>
              </p>
              <p>
                Tax: <span>$61.99</span>
              </p>
              <p className={styles.total}>
                Total: <span>$357.99 USD</span>
              </p>
              <button className={styles.checkoutButton}>PROCEED TO CHECKOUT</button>
            </div>
            <div className={styles.coupon}>
              <h2 className={styles.sectionTitle}>Coupon Code</h2>
              <input
                type="text"
                placeholder="Enter coupon code"
                className={styles.couponInput}
              />
              <button className={styles.couponButton}>APPLY COUPON</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShoppingCart;
