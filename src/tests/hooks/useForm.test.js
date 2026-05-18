import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useForm } from '../../hooks/useForm';

describe('useForm', () => {
  const initialValues = { name: '', price: 0 };
  
  it('initializes with given values', () => {
    const { result } = renderHook(() => useForm(initialValues));
    expect(result.current.values).toEqual(initialValues);
  });

  it('handles input changes', () => {
    const { result } = renderHook(() => useForm(initialValues));
    
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'New Product', type: 'text' }
      });
    });
    
    expect(result.current.values.name).toBe('New Product');
  });

  it('validates form', () => {
    const validate = (values) => {
      const errors = {};
      if (!values.name) errors.name = 'Name required';
      return errors;
    };
    
    const { result } = renderHook(() => useForm(initialValues, validate));
    
    act(() => {
      result.current.handleBlur({ target: { name: 'name' } });
    });
    
    expect(result.current.errors.name).toBe('Name required');
  });

  it('resets form', () => {
    const { result } = renderHook(() => useForm(initialValues));
    
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Changed', type: 'text' }
      });
      result.current.resetForm();
    });
    
    expect(result.current.values).toEqual(initialValues);
  });
});