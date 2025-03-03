import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../data/productsData';
import ConfirmationModal from '../../components/DeleteComponent/ConfirmationModal';

const ClothingEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productData, setProductData] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: '',
        image: null,
        desc: '',
        quantity: ''
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        const product = products.find(p => p.id === parseInt(id));
        if (product) {
            setProductData(product);
            setFormData({
                title: product.title,
                price: product.price,
                category: product.category,
                image: product.image,
                desc: product.desc,
                quantity: product.quantity
            });
            setImagePreview(product.image);
        } else {
            navigate('/clothing');
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
        console.log('Updated product data:', formData);
        navigate('/clothing');
    };

    const handleDelete = (id) => {
        console.log(`Товар з id ${id} видалено`);
        navigate('/clothing');
    };

    if (!productData) {
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
                                Редагувати продукт
                            </h3>
                            <p className="text-white-50 text-center mb-0 mt-2">
                                ID: {productData.id}
                            </p>
                        </div>

                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 pe-md-4">
                                        <div className="mb-4">
                                            <label className="form-label fw-bold">Назва продукту</label>
                                            <div className="input-group">
                                                <span className="input-group-text" style={{ backgroundColor: '#f8f9fa' }}>
                                                    <i className="bi bi-tag"></i>
                                                </span>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="row mb-4">
                                            <div className="col-6">
                                                <label className="form-label fw-bold">Ціна</label>
                                                <div className="input-group">
                                                    <span className="input-group-text" style={{ backgroundColor: '#f8f9fa' }}>₴</span>
                                                    <input
                                                        type="number"
                                                        name="price"
                                                        value={formData.price}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <label className="form-label fw-bold">Кількість</label>
                                                <div className="input-group">
                                                    <span className="input-group-text" style={{ backgroundColor: '#f8f9fa' }}>
                                                        <i className="bi bi-123"></i>
                                                    </span>
                                                    <input
                                                        type="number"
                                                        name="quantity"
                                                        value={formData.quantity}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label fw-bold">Категорія</label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                className="form-select"
                                                required
                                                style={{ borderColor: '#dee2e6' }}
                                            >
                                                <option value="">Виберіть категорію</option>
                                                <option value="Взуття">Взуття</option>
                                                <option value="Одяг">Одяг</option>
                                                <option value="Аксесуари">Аксесуари</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-4">
                                            <label className="form-label fw-bold">Фото продукту</label>
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

                                <div className="mb-4">
                                    <label className="form-label fw-bold">Опис</label>
                                    <textarea
                                        name="desc"
                                        value={formData.desc}
                                        onChange={handleChange}
                                        rows={4}
                                        className="form-control"
                                        required
                                        style={{ resize: 'none' }}
                                    />
                                </div>

                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => setShowDeleteModal(true)}
                                    >
                                        <i className="bi bi-trash me-2"></i>
                                        Видалити продукт
                                    </button>

                                    <div className="d-flex gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary px-4"
                                            style={{ borderColor: '#6f42c1', color: '#6f42c1' }}
                                            onClick={() => navigate('/clothing')}
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

            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Видалити продукт?"
                message="Ви впевнені, що хочете видалити продукт з id"
                confirmText="Так, видалити"
                cancelText="Скасувати"
                itemId={productData?.id}
            />
        </div>
    );
};

export default ClothingEdit;