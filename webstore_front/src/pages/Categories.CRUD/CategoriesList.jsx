import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, XCircle } from 'lucide-react';
import './style.css';
import {categories} from '../../data/categoriesData';
import { useNavigate } from "react-router-dom";

const CategoriesList = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [categoriesToDelete, setCategoriesToDelete] = useState(null);

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id) => {
        console.log(`Категорію з id ${id} видалено`);
        setCategoriesToDelete(null);
    };

    return (
        <div className="category-list-container">
            <div className="product-list-header">
                <h1 className="product-title">
                    Категорії ({categories.length})
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
                            onClick={() => navigate(`/categoryCreate`)}>
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table className="products-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>КАТЕГОРІЯ</th>
                        <th>ОПИС</th>
                        <th>ОСТАННЄ ОНОВЛЕНО</th>
                        <th>Дії</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredCategories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>
                                <div className="category-tag category-shoes">
                                    <span>{category.name}</span>
                                </div>
                            </td>
                            <td>{category.description}</td>
                            <td>{new Date().toLocaleDateString('uk-UA')}</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="edit-button"
                                            type="button"
                                            onClick={() => navigate(`/categoryEdit/${category.id}`)}>
                                        <Edit2 size={20} />
                                    </button>
                                    <button className="delete-button"
                                            type="button"
                                            onClick={() => setCategoriesToDelete(category.id)}>
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Модальне вікно підтвердження видалення */}
            {categoriesToDelete && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close"
                                onClick={() => setCategoriesToDelete(null)}>
                            <XCircle size={24} />
                        </button>
                        <h2>Видалити категорію?</h2>
                        <p>Ви впевнені, що хочете видалити категорію з id <strong>{categoriesToDelete}</strong>?</p>
                        <div className="modal-actions">
                            <button className="confirm-button"
                                    onClick={() => handleDelete(categoriesToDelete)}>
                                Так, видалити
                            </button>
                            <button className="cancel-button"
                                    onClick={() => setCategoriesToDelete(null)}>
                                Скасувати
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoriesList;
