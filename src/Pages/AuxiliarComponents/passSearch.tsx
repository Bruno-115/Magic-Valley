import { useEffect, useState } from "react";

interface Product {
    ID_Usuario: number;
    ID_Produto: number;
    Nome: string;
    Disponivel: number;
    Valor: number;
    Foto: string;
    Estrelas: number;
    Categoria: string;
  }

function usePassSearch() {
  const [searchValue, setSearchValue] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const storedValues = JSON.parse(localStorage.getItem('Search') || '[]');
      setSearchValue(storedValues);
    } catch (error) {
      console.error("Erro ao passar:", error);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('Search', JSON.stringify(searchValue));
  }, [searchValue]);

  return {
    searchValue,
    setSearchValue,
  };
}

export default usePassSearch;
