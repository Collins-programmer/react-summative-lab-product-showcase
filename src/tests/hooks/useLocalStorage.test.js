import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useLocalStorage } from '../../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns initial value when no stored value exists', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('stores and retrieves values', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    act(() => {
      result.current[1]('new value');
    });
    
    expect(result.current[0]).toBe('new value');
    expect(window.localStorage.getItem('test-key')).toBe(JSON.stringify('new value'));
  });

  it('works with objects', () => {
    const initialObj = { name: 'test', value: 123 };
    const { result } = renderHook(() => useLocalStorage('obj-key', initialObj));
    
    act(() => {
      result.current[1]({ name: 'updated', value: 456 });
    });
    
    expect(result.current[0]).toEqual({ name: 'updated', value: 456 });
  });
});