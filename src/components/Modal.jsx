import React from "react";
import { useModal } from "../context/ModalContext";
import { useTranslation } from "react-i18next";

export default function Modal(){

    const {modal, closeModal} = useModal();

    const {t} = useTranslation();

    if(!modal.isOpen) return null;

    return(
        <div
            className="modal-overlay"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
            onClick={closeModal}
        >
            <div
                className="modal-content"
                style={{
                    background: 'white',
                    borderRadius: '8px',
                    padding: '24px',
                    maxWidth: '500px',
                    width: '90%',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    position: 'relative',
                }}

                onClick={(e)=>e.stopPropagation()}
            >
                <button
                    onClick={closeModal}
                    style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#666'
                    }}
                >
                    X
                </button>

                {modal.title && (
                    <h2 style={{ marginBottom: '20px', color: '#333' }}>
                        {modal.title}
                    </h2>
                )}

                {modal.content}
            </div>
        </div>
    );
}