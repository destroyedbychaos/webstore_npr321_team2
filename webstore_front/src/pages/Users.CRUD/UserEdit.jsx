import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {users} from "../../data/usersData";

const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: '',
        image: null,
        firstName: '',
        lastName: ''
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        const user = users.find(u => u.id === parseInt(id));
        if (user) {
            setUserData(user);
            setFormData({
                username: user.username,
                email: user.email,
                role: user.role,
                image: user.image,
                firstName: user.firstName,
                lastName: user.lastName
            });
            setImagePreview(user.image);
        } else {
            navigate('/userList'); // Redirect if user not found
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userIndex = users.findIndex(u => u.id === parseInt(id));
        if (userIndex !== -1) {
            users[userIndex] = {
                ...users[userIndex],
                username: formData.username,
                email: formData.email,
                role: formData.role,
                firstName: formData.firstName,
                lastName: formData.lastName,
                image: typeof formData.image === 'object' ? imagePreview : formData.image
            };
            console.log('Updated user data:', users[userIndex]);
        }
        navigate('/usersList');
    };

    if (!userData) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg border-0">
                        <div className="card-header text-white p-4"
                             style={{
                                 background: 'linear-gradient(135deg, #6f42c1 0%, #8a5cd0 100%)',
                                 borderRadius: '0.5rem 0.5rem 0 0'
                             }}>
                            <h3 className="mb-0 text-center">
                                <i className="bi bi-pencil-square me-2"></i>
                                Редагувати користувача
                            </h3>
                            <p className="text-white-50 text-center mb-0 mt-2">
                                ID: {userData.id}
                            </p>
                        </div>

                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 pe-md-4">
                                        <div className="mb-4">
                                            <label className="form-label fw-bold">Ім'я користувача</label>
                                            <div className="input-group">
                                                <span className="input-group-text" style={{ backgroundColor: '#f8f9fa' }}>
                                                    <i className="bi bi-person"></i>
                                                </span>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label fw-bold">Електронна пошта</label>
                                            <div className="input-group">
                                                <span className="input-group-text" style={{ backgroundColor: '#f8f9fa' }}>
                                                    <i className="bi bi-envelope"></i>
                                                </span>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="row mb-4">
                                            <div className="col-6">
                                                <label className="form-label fw-bold">Ім'я</label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                            <div className="col-6">
                                                <label className="form-label fw-bold">Прізвище</label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label fw-bold">Роль</label>
                                            <select
                                                name="role"
                                                value={formData.role}
                                                onChange={handleChange}
                                                className="form-select"
                                                required
                                                style={{ borderColor: '#dee2e6' }}
                                            >
                                                <option value="user">Користувач</option>
                                                <option value="admin">Адміністратор</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-4">
                                            <label className="form-label fw-bold">Фото користувача</label>
                                            <div
                                                className={`drag-drop-zone p-4 text-center border rounded-3 ${dragActive ? 'border-primary' : ''}`}
                                                style={{
                                                    minHeight: '200px',
                                                    backgroundColor: '#f8f9fa',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onDragEnter={handleDrag}
                                                onDragLeave={handleDrag}
                                                onDragOver={handleDrag}
                                                onDrop={handleDrop}
                                                onClick={() => document.getElementById('imageInput').click()}
                                            >
                                                {imagePreview ? (
                                                    <div className="position-relative">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="img-fluid rounded-3"
                                                            style={{ maxHeight: '200px' }}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setImagePreview(null);
                                                                setFormData(prev => ({ ...prev, image: null }));
                                                            }}
                                                        >
                                                            <i className="bi bi-x"></i>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="py-4">
                                                        <i className="bi bi-cloud-upload display-4 text-muted"></i>
                                                        <p className="mt-2 text-muted">
                                                            Перетягніть фото сюди або клікніть для вибору
                                                        </p>
                                                    </div>
                                                )}
                                                <input
                                                    id="imageInput"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="d-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                            if (window.confirm('Ви впевнені, що хочете видалити цього користувача?')) {
                                                // Remove user from array
                                                const userIndex = users.findIndex(u => u.id === parseInt(id));
                                                if (userIndex !== -1) {
                                                    users.splice(userIndex, 1);
                                                }
                                                navigate('/usersList');
                                            }
                                        }}
                                    >
                                        <i className="bi bi-trash me-2"></i>
                                        Видалити користувача
                                    </button>

                                    <div className="d-flex gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary px-4"
                                            style={{ borderColor: '#6f42c1', color: '#6f42c1' }}
                                            onClick={() => navigate('/usersList')}
                                        >
                                            <i className="bi bi-x-circle me-2"></i>
                                            Скасувати
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn text-white px-4"
                                            style={{
                                                backgroundColor: '#6f42c1',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <i className="bi bi-check-circle me-2"></i>
                                            Зберегти зміни
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserEdit;