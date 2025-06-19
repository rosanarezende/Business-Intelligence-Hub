import { useState } from 'react';
import { discoveryApi } from '../services/api';

export function useDiscovery() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateDiscovery = async (config) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await discoveryApi.create(config);
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao gerar discovery';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getDiscoveries = async (filters = {}, pagination = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await discoveryApi.list(filters, pagination);
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao buscar discoveries';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getDiscoveryById = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await discoveryApi.getById(id);
      return result;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao buscar discovery';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    generateDiscovery,
    getDiscoveries,
    getDiscoveryById
  };
}

