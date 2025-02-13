import React from 'react';
import './style.css';
import { products } from '../../data/productsData';
import { categories } from '../../data/categoriesData';

const heroImages = [
  'https://ager.ua/image/cachewebp/catalog/Banners/1ban/145%20(1)-2560x1107.webp',
  'https://ager.ua/image/cachewebp/catalog/Banners/1ban/24-min-2560x1107.webp',
  'https://ager.ua/image/cachewebp/catalog/Banners/1ban/777%20(5)-2560x1107.webp'
];



const HomePage = () => {
  
  const limitedProducts = products.slice(0, 4);

  return (
    <div className="container-fluid p-0">
      <div className="hero-section position-relative mb-5">
        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {heroImages.map((image, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <div className="hero-image-container">
                  <img 
                    src={image} 
                    className="d-block w-100" 
                    alt={`Спортивний одяг ${index + 1}`} 
                  />
                </div>
                <div className="carousel-caption text-start">
                  <h1 className="display-4 fw-bold">Спортивний одяг</h1>
                  <p className="lead">Комфорт та стиль для активного життя</p>
                  <a href="/products" className="btn btn-primary btn-lg">Перейти до каталогу</a>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Попередній</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Наступний</span>
          </button>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Нові надходження</h2>
              <a href="/products" className="text-decoration-none">Дивитись всі</a>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {limitedProducts.map(product => (
            <div className="col-12 col-md-6 col-lg-3" key={product.id}>
              <div className="card product-card h-100 border-0 position-relative">
                {product.discount && (
                  <div className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 m-2 rounded">
                    -{product.discount}%
                  </div>
                )}
                <div className="product-image-container">
                  <img src={product.image} className="card-img-top" alt={product.title} />
                </div>
                <div className="card-body px-0">
                  <h5 className="card-title">{product.title}</h5>
                  <div className="d-flex gap-2 align-items-center">
                    <span className="fw-bold">{product.price} грн</span>
                    {product.oldPrice && <span className="text-muted text-decoration-line-through">{product.oldPrice} ₴</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <h2 className="mb-4">Категорії</h2>
          </div>
        </div>

        <div className="row g-4">
          {categories.map(category => (
            <div className="col-12 col-md-4" key={category.id}>
              <div className="category-card p-4 rounded-3 h-100 d-flex flex-column justify-content-between bg-light category-hover">
                <div>
                  <h3 className="h4 mb-3">{category.name}</h3>
                  <p className="text-muted mb-0">{category.description}</p>
                </div>
                <div className="mt-3">
                  <a href={`/products?category=${category.id}`} className="text-decoration-none d-flex align-items-center gap-2">
                    Переглянути
                    <i className="bi bi-arrow-right"></i>
                    
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div class="container mt-10 mt-5">
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <div class="col">
                    <div class="text-center">
                        <i class="bi bi-truck fs-1 mb-3"></i>
                        <h4>Безкоштовна доставка</h4>
                        <p class="text-muted">При замовленні від 1000 ₴</p>
                    </div>
                </div>
                <div class="col">
                    <div class="text-center">
                        <i class="bi bi-arrow-repeat fs-1 mb-3"></i>
                        <h4>Повернення</h4>
                        <p class="text-muted">14 днів на повернення</p>
                    </div>
                </div>
                <div class="col">
                    <div class="text-center">
                        <i class="bi bi-shield-check fs-1 mb-3"></i>
                        <h4>Безпечна оплата</h4>
                        <p class="text-muted">100% безпечні платежі</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;