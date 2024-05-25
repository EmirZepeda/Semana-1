'use client';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import ProductoCard from '../../Componentes/Card/'; // Asegúrate de importar el componente ProductoCard
import ModalEditarProducto from '../../Componentes/Card/index';
import Styles from './styles.module.css';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Page = () => {
  const [productos, setProductos] = useState<producto[]>([]);
  const [editingProducto, setEditingProducto] = useState<producto | null>(null);

  const { data: productosData, error, isLoading, mutate } = useSWR('/api/producto', fetcher);

  useEffect(() => {
    if (productosData) {
      setProductos(productosData);
    }
  }, [productosData]);

  const handleEdit = (producto: producto) => {
    setEditingProducto(producto);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/producto?id=${id}`, { method: 'DELETE' });
      mutate(); // Refresca los datos después de eliminar
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      // Manejo de errores (mostrar mensaje al usuario, etc.)
    }
  };


  

  const handleProductoActualizado = (updatedProducto: producto) => {
    setProductos(productos.map((p) => (p.Id === updatedProducto.Id ? updatedProducto : p)));
    setEditingProducto(null);
  };

  if (error) return <div>Error al cargar productos</div>;
  if (isLoading) return <div>Cargando productos...</div>;

  return (
    <>
      <div>
        {productos.map((item, index) => (
          <ProductoCard key={index} producto={item} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>

      {editingProducto && (
        <ModalEditarProducto
          producto={editingProducto}
          onClose={() => setEditingProducto(null)}
          onProductoActualizado={handleProductoActualizado}
        />
      )}
    </>
  );
};

export default Page;

interface producto {
  Nombre: string;
  Descripcion: string;
  Costo: number;
  Id: number; // Asegúrate de que la interfaz producto tenga el campo Id
}
