import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, ShoppingCart, ChevronRight } from 'lucide-react';
import { products } from '../../data/productsData';
import { useShopping } from '../../context/ShoppingContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const {
    cartItems,
    toggleFavorite,
    addToCart,
    removeFromCart,
    isInCart,
    isInFavorites,
    removeFromFavorites
  } = useShopping();

  useEffect(() => {
    setIsLoading(true);
    const productData = products.find(p => p.id === parseInt(id));
    setTimeout(() => {
      setProduct(productData);
      setIsLoading(false);
    }, 500);
  }, [id]);

  const toggleCart = (productId) => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (isInCart(productId)) {
      removeFromCart(productId);
    } else {
      if (isInFavorites(productId)) {
        removeFromFavorites(productId);
      }
      addToCart(productId);
    }
  };
  

  if (isLoading) {
    return (
        <div className="min-h-screen d-flex justify-content-center align-items-center">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
    );
  }

  if (!product) {
    return (
        <div className="container py-5">
          <h2>Товар не знайдено</h2>
          <button
              className="btn btn-dark mt-3"
              onClick={() => navigate('/products')}
          >
            Повернутися до списку товарів
          </button>
        </div>
    );
  }

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
      <div className="container py-4">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item d-flex align-items-center">
              <Link to="/" className="text-dark text-decoration-none">Головна</Link>
              <ChevronRight size={14} className="ms-1" />
            </li>
            <li className="breadcrumb-item d-flex align-items-center">
              <Link to="/products" className="text-dark text-decoration-none">Одяг</Link>
              <ChevronRight size={14} className="ms-1" />
            </li>
            <li className="breadcrumb-item d-flex align-items-center">
              <Link to={`/products?category=${product.category}`} className="text-dark text-decoration-none">
                {product.category}
              </Link>
              <ChevronRight size={14} className="ms-1" />
            </li>
            {product.manufacturer && (
                <li className="breadcrumb-item d-flex align-items-center">
                  <Link to={`/products?manufacturers=${product.manufacturer}`} className="text-dark text-decoration-none">
                    {product.manufacturer}
                  </Link>
                  <ChevronRight size={14} className="ms-1" />
                </li>
            )}
            <li className="breadcrumb-item active" aria-current="page">
              {product.title}
            </li>
          </ol>
        </nav>

        <div className="row justify-content-center">
          <div className="col-md-6 mb-4">
            <div className="position-relative">
              <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid"
                  style={{ width: '100%', maxHeight: '80vh', objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="px-md-4">
              <h1 className="h4 mb-2">{product.title}</h1>
              <p className="h5 mb-4">{product.price} UAH</p>

              <div className="mb-4 text-center">
                <p className="mb-2">- Оберіть розмір -</p>
                <div className="d-flex justify-content-center gap-2 mb-2">
                  {sizes.map((size) => (
                      <button
                          key={size}
                          className={`btn ${selectedSize === size ? 'btn-dark' : 'btn-outline-dark'}`}
                          style={{ width: '55px', height: '55px' }}
                          onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                  ))}
                </div>
                <button className="btn btn-link text-dark">
                  Перевір свій розмір
                </button>
              </div>

              <div className="d-flex gap-2 mb-4">
                <button
                    className={`btn ${isInCart(product.id) ? 'btn-success' : 'btn-dark'} flex-grow-1 py-2 d-flex align-items-center justify-content-center gap-2 ${
                        isAnimating ? 'animating' : ''
                    }`}
                    onClick={() => toggleCart(product.id)}
                >
                  <ShoppingCart size={20} />
                  {isInCart(product.id) ? 'ДОДАНО В КОШИК' : 'ДОДАТИ У КОШИК'}
                </button>
                <button
                    className="btn btn-outline-danger py-2 px-3"
                    onClick={() => toggleFavorite(product.id)}
                >
                  <Heart
                      size={20}
                      fill={isInFavorites(product.id) ? "currentColor" : "none"}
                  />
                </button>
              </div>

              <div className="border-top pt-3 mb-4">
                <button className="btn btn-link text-dark ps-0 d-flex align-items-center justify-content-between w-100">
                  <span>Вартість та час доставки</span>
                  <span>→</span>
                </button>
                <p className="small text-muted ms-0">При покупках понад 1200 UAH</p>
              </div>

              <div className="border-top pt-3">
                <button className="btn btn-link text-dark ps-0 d-flex align-items-center justify-content-between w-100">
                  <span>Термін повернення 365 днів</span>
                  <span>→</span>
                </button>
              </div>
              <div className="border-top pt-3 mt-4">
                <div className="accordion" id="productAccordion">
                  <div className="accordion-item border-0">
                    <h2 className="accordion-header">
                      <button
                          className="accordion-button ps-0 bg-transparent shadow-none"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#description"
                      >
                        ОПИС
                      </button>
                    </h2>
                    <div
                        id="description"
                        className="accordion-collapse collapse show"
                    >
                      <div className="accordion-body ps-0">
                        <ul>
                          <p>
                            ID товару: {product.id}
                          </p>
                          <p>
                            Категорія: {product.category}
                          </p>
                          {product.manufacturer && (
                              <p>
                                Виробник: {product.manufacturer}
                              </p>
                          )}
                          <p>
                            {product.desc}
                          </p>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {cartItems.length > 0 && (
            <div className="position-fixed bottom-0 end-0 m-4 p-3 cart-indicator">
              <div className="d-flex align-items-center gap-2">
                <ShoppingCart className="cart-icon" size={24} />
                <span className="fw-medium">Корзина: {cartItems.length} товарів</span>
              </div>
            </div>
        )}
      </div>
  );
};

export default ProductDetails;