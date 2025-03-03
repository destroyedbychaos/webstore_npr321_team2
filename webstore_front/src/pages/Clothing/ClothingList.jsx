import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import './style.css';
import { products } from '../../data/productsData';
import { useNavigate } from "react-router-dom";
import ConfirmationModal from '../../components/DeleteComponent/ConfirmationModal';

const ClothingList = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [productToDelete, setProductToDelete] = useState(null);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id) => {
        console.log(`Товар з id ${id} видалено`);
        setProductToDelete(null);
    };

    return (
        <div className="product-list-container">
            <div className="product-list-header">
                <h1 className="product-title">
                    Одяг ({products.length})
                </h1>
                <div className="header-controls">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Пошук"
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="search-icon" size={18} />
                    </div>
                    <button className="add-button"
                            type="button"
                            onClick={() => navigate(`create`)}>
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table className="products-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>ТОВАР</th>
                        <th>ЦІНА</th>
                        <th>КАТЕГОРІЯ</th>
                        <th>ОСТАННЄ ОНОВЛЕНО</th>
                        <th>КІЛЬКІСТЬ</th>
                        <th>Дії</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>
                                <div className="product-info">
                                    <div className="product-image">
                                        <img src={product.image} alt={product.title} />
                                    </div>
                                    <span>{product.title}</span>
                                </div>
                            </td>
                            <td>{product.price} грн</td>
                            <td>
                              <span className='category-tag category-shoes'>
                                {product.category}
                              </span>
                            </td>
                            <td>{new Date().toLocaleDateString('uk-UA')}</td>
                            <td>
                              <span className='category-tag category-clothes'>
                                {product.quantity}
                              </span>
                            </td>
                            <td>
                                <div className="action-buttons">
                                    <button className="edit-button"
                                            type="button"
                                            onClick={() => navigate(`edit/${product.id}`)}>
                                        <Edit2 size={20} />
                                    </button>
                                    <button className="delete-button"
                                            type="button"
                                            onClick={() => setProductToDelete(product.id)}>
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <ConfirmationModal
                isOpen={productToDelete !== null}
                onClose={() => setProductToDelete(null)}
                onConfirm={handleDelete}
                title="Видалити товар?"
                message="Ви впевнені, що хочете видалити товар з id"
                confirmText="Так, видалити"
                cancelText="Скасувати"
                itemId={productToDelete}
            />
        </div>
    );
};

export default ClothingList;