import React, { useEffect, useState } from 'react';
import { Search, Plus, Edit2, Trash2, XCircle } from 'lucide-react';
import './style.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';

const ManufacturersList = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [manufacturersToDelete, setManufacturersToDelete] = useState(null);
    const {manufacturers} = useSelector(state => state.manufacturer);
    const {loadManufacturers} = useActions();

    const filteredManufacturers = manufacturers.filter(manufacter =>
        manufacter.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id) => {
        console.log(`Виробника з id ${id} видалено`);
        setManufacturersToDelete(null);
    };

    useEffect(() => {
        loadManufacturers();
    }, []);

    return (
        <div className="  manufacter-list-container">
            <div className="product-list-header">
                <h1 className="product-title">
                    Виробники ({manufacturers.length})
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
                        <th>ВИРОБНИК</th>
                        <th>ОСТАННЄ ОНОВЛЕНО</th>
                        <th>Дії</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredManufacturers.map((manufacter) => (
                        <tr key={manufacter.id}>
                            <td>{manufacter.id}</td>
                            <td>
                                <div className="category-tag category-shoes">
                                    <span>{manufacter.name}</span>
                                </div>
                            </td>
                            <td>{new Date().toLocaleDateString('uk-UA')}</td>
                            <td>
                                <div className="action-buttons">
                                    <button className="edit-button"
                                            type="button"
                                            onClick={() => navigate(`edit/${manufacter.id}`)}>
                                        <Edit2 size={20} />
                                    </button>
                                    <button className="delete-button"
                                            type="button"
                                            onClick={() => setManufacturersToDelete(manufacter.id)}>
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            
            {manufacturersToDelete && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close"
                                onClick={() => setManufacturersToDelete(null)}>
                            <XCircle size={24} />
                        </button>
                        <h2>Видалити виробника?</h2>
                        <p>Ви впевнені, що хочете видалити виробника з id <strong>{manufacturersToDelete}</strong>?</p>
                        <div className="modal-actions">
                            <button className="confirm-button"
                                    onClick={() => handleDelete(manufacturersToDelete)}>
                                Так, видалити
                            </button>
                            <button className="cancel-button"
                                    onClick={() => setManufacturersToDelete(null)}>
                                Скасувати
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManufacturersList;
