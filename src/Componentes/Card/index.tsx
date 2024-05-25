import React from 'react';
import { productodto } from '../../../src/app/api/producto/producto.dto';
import styles from './styles.module.css';

interface ProductoCardProps {
  producto: productodto;
  onEdit: (producto: productodto) => void;
  onDelete: (id: number) => void;
}

const ProductoCard: React.FC<ProductoCardProps> = ({ producto, onEdit, onDelete }) => {
  const handleDeleteClick = async () => {
    const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar ${producto.Nombre}?`);
    if (confirmDelete) {
      onDelete(producto.Id);
    }
  };

  return (
    <div className="card">
      <h3>{producto.Nombre}</h3>
      <p>{producto.Descripcion}</p>
      <p>Costo: ${producto.Costo}</p>
      <button onClick={() => onEdit(producto)}>Editar</button>
      <button onClick={handleDeleteClick}>Eliminar</button>
    </div>
  );
};

export default ProductoCard;
