import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { products } from '../../data/productsData';
import { categories } from '../../data/categoriesData';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';
import { useShopping } from '../../context/ShoppingContext';
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions.js";

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart, isInCart,isInFavorites,removeFromFavorites } = useShopping();
  const {manufacturers} = useSelector(state => state.manufacturer);
  const {loadManufacturers} = useActions();

  const [isAnimating, setIsAnimating] = useState(false);
  
  const getInitialFilters = () => {
    const queryParams = new URLSearchParams(location.search);
    return {
      category: queryParams.get('category') || 'Всі категорії',
      search: queryParams.get('search') || '',
      minPrice: queryParams.get('minPrice') || '',
      maxPrice: queryParams.get('maxPrice') || '',
      sort: queryParams.get('sort') || '',
      manufacturers: queryParams.get('manufacturers') ? queryParams.get('manufacturers').split(',') : []
    };
  };

  const initialFilters = getInitialFilters();
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category);
  const [searchQuery, setSearchQuery] = useState(initialFilters.search);
  const [priceRange, setPriceRange] = useState({
    min: initialFilters.minPrice,
    max: initialFilters.maxPrice
  });
  const [sortOption, setSortOption] = useState(initialFilters.sort);
  const [selectedManufacturers, setSelectedManufacturers] = useState(initialFilters.manufacturers);
  
  
  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (selectedCategory !== 'Всі категорії') {
      queryParams.set('category', selectedCategory);
    }
    

    if (priceRange.min) {
      queryParams.set('minPrice', priceRange.min);
    }

    if (priceRange.max) {
      queryParams.set('maxPrice', priceRange.max);
    }

    if (sortOption) {
      queryParams.set('sort', sortOption);
    }

    if (selectedManufacturers.length > 0) {
      queryParams.set('manufacturers', selectedManufacturers.join(','));
    }

    const newSearch = queryParams.toString();
    const searchString = newSearch ? `?${newSearch}` : '';

    navigate(`/products${searchString}`, { replace: true });
  }, [selectedCategory, searchQuery, priceRange, sortOption, selectedManufacturers, navigate]);

  useEffect(() => {
    loadManufacturers();
  }, []);


  useEffect(() => {
    const newFilters = getInitialFilters();
    setSelectedCategory(newFilters.category);
    setSearchQuery(newFilters.search);
    setPriceRange({ min: newFilters.minPrice, max: newFilters.maxPrice });
    setSortOption(newFilters.sort);
    setSelectedManufacturers(newFilters.manufacturers);
  }, [location.search]);

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

  const toggleManufacturer = (manufacturer) => {
    setSelectedManufacturers(prev =>
        prev.includes(manufacturer)
            ? prev.filter(m => m !== manufacturer)
            : [...prev, manufacturer]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('Всі категорії');
    setSearchQuery('');
    setSortOption('');
    setPriceRange({ min: '', max: '' });
    setSelectedManufacturers([]);
  };

  const filteredProducts = products
      .filter((product) => {
        const matchesCategory = selectedCategory === 'Всі категорії' || product.category === selectedCategory;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice =
            (priceRange.min === '' || product.price >= parseInt(priceRange.min)) &&
            (priceRange.max === '' || product.price <= parseInt(priceRange.max));
        const matchesManufacturer =
            selectedManufacturers.length === 0 ||
            selectedManufacturers.includes(product.manufacturer);

        return matchesCategory && matchesSearch && matchesPrice && matchesManufacturer;
      })
      .sort((a, b) => {
        if (sortOption === 'price-desc') {
          return b.price - a.price;
        } else if (sortOption === 'price-asc') {
          return a.price - b.price;
        } else if (sortOption === 'name-asc') {
          return a.title.localeCompare(b.title);
        } else if (sortOption === 'name-desc') {
          return b.title.localeCompare(a.title);
        }
        return 0;
      });

  return (
      <div className="container py-4">
        <div className="row">
          <div className="col-12 col-md-3 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="h5 mb-4">Фільтри</h2>
                <div className="mb-4">
                  <h3 className="h6 mb-2">Пошук за назвою</h3>
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Введіть назву"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <h3 className="h6 mb-2">Категорія</h3>
                  <select
                      className="form-select"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option>Всі категорії</option>
                    {categories.map((category) => (
                        <option key={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <h3 className="h6 mb-2">Виробники</h3>
                  <div className="manufacturer-filter">
                    {manufacturers.map((manufacturer) => (
                        <div
                            key={manufacturer.id}
                            className={`manufacturer-item ${
                                selectedManufacturers.includes(manufacturer.name) ? 'selected' : ''
                            }`}
                            onClick={() => toggleManufacturer(manufacturer.name)}
                        >
                        <span className="manufacturer-checkbox">
                          {selectedManufacturers.includes(manufacturer.name) && '✓'}
                        </span>
                          <span className="manufacturer-name">{manufacturer.name}</span>
                        </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="h6 mb-2">Сортування</h3>
                  <select
                      className="form-select"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="">Без сортування</option>
                    <option value="price-asc">Ціна: за зростанням</option>
                    <option value="price-desc">Ціна: за спаданням</option>
                    <option value="name-asc">Назва: від А до Я</option>
                    <option value="name-desc">Назва: від Я до А</option>
                  </select>
                </div>

                <div className="mb-4">
                  <h3 className="h6 mb-2">Ціна (грн)</h3>
                  <input
                      type="number"
                      className="form-control mb-2"
                      placeholder="Мін."
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  />
                  <input
                      type="number"
                      className="form-control"
                      placeholder="Макс."
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  />
                </div>

                <button
                    className="btn btn-primary w-100 mb-2"
                    onClick={resetFilters}
                >
                  Скинути фільтри
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-9">
            <div className="row g-4">
              {filteredProducts.map((product) => (
                  <div key={product.id} className="col-12 col-md-6 col-lg-4">
                    <div className="card h-100 product-card">
                      <div className="card-img-wrapper">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="card-img-top"
                        />
                      </div>
                      <div className="card-body">
                        <h3 className="h5 mb-2">{product.title}</h3>
                        <p className="h4 mb-3">{product.price.toFixed(2)} грн</p>
                        <div className="d-flex gap-2">
                          <button
                              type="button"
                              className="Button"
                              onClick={() => navigate(`/product/${product.id}`)}
                          >
                            <span data-text="Купити">Купити</span>
                          </button>
                          <button
                              className={`cart-button ${isInCart(product.id) ? 'in-cart' : ''} ${
                                  isAnimating ? 'animating' : ''
                              }`}
                              onClick={() => toggleCart(product.id)}
                          >
                            <ShoppingCart className="cart-icon" size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
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

export default Products;