import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, XCircle } from 'lucide-react';
import './style.css';
import { users } from '../../data/usersData';
import { useNavigate } from "react-router-dom";

const UsersList = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [userToDelete, setUserToDelete] = useState(null);
    const defaultImage = 'https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg?semt=ais_hybrid';

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id) => {
        console.log(`Користувач з id ${id} видалений`);
        setUserToDelete(null);
    };

    return (
        <div className="user-list-container">
            <div className="user-list-header">
                <h1 className="user-title">
                    Користувачі ({users.length})
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
                            onClick={() => navigate(`/userCreate`)}>
                        <Plus size={20} />
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table className="users-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>АВАТАР</th>
                        <th>ІМ’Я</th>
                        <th>EMAIL</th>
                        <th>РОЛЬ</th>
                        <th>Дії</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>
                                <div className="user-image">
                                    <img
                                        src={user.image ? user.image : defaultImage}
                                        alt={user.username}
                                    />
                                </div>
                            </td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                                <span className='category-tag category-shoes'>{user.role}</span>
                            </td>
                            <td>
                                <div className="action-buttons">
                                    <button className="edit-button"
                                            type="button"
                                            onClick={() => navigate(`/userEdit/${user.id}`)}>
                                        <Edit2 size={20} />
                                    </button>
                                    <button className="delete-button"
                                            type="button"
                                            onClick={() => setUserToDelete(user.id)}>
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
            {userToDelete && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close"
                                onClick={() => setUserToDelete(null)}>
                            <XCircle size={24} />
                        </button>
                        <h2>Видалити користувача?</h2>
                        <p>Ви впевнені, що хочете видалити користувача з id <strong>{userToDelete}</strong>?</p>
                        <div className="modal-actions">
                            <button className="confirm-button"
                                    onClick={() => handleDelete(userToDelete)}>
                                Так, видалити
                            </button>
                            <button className="cancel-button"
                                    onClick={() => setUserToDelete(null)}>
                                Скасувати
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersList;