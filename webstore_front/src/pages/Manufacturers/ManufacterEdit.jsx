﻿import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

const ManufacterEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [manufacterData, setManufacterData] = useState(null);
    const {manufacturers} = useSelector(state => state.manufacturer);

    const [formData, setFormData] = useState({
        name: '',
    });

    useEffect(() => {
        const manufacter = manufacturers.find(c => c.id === id);
        
        if (manufacter) {
            setManufacterData(manufacter);
            setFormData({
                name: manufacter.name,
                description: manufacter.description
            });
        } else {
            navigate('/manufacturers');
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated category data:', formData);
        navigate('/manufacturers');
    };

    if (!manufacterData) {
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
                                Редагувати виробника
                            </h3>
                            <p className="text-white-50 text-center mb-0 mt-2">
                                ID: {manufacterData.id}
                            </p>
                        </div>

                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Назва виробника</label>
                                    <div className="input-group">
                                        <span className="input-group-text" style={{ backgroundColor: '#f8f9fa' }}>
                                            <i className="bi bi-tag"></i>
                                        </span>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>
                                </div>
                                

                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                            if (window.confirm('Ви впевнені, що хочете видалити цього виробника?')) {
                                                navigate('/manufacturers');
                                            }
                                        }}
                                    >
                                        <i className="bi bi-trash me-2"></i>
                                        Видалити виробника
                                    </button>

                                    <div className="d-flex gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary px-4"
                                            style={{ borderColor: '#6f42c1', color: '#6f42c1' }}
                                            onClick={() => navigate('/manufacturers')}
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

export default ManufacterEdit;