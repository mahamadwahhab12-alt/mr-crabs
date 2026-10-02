import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { type MenuData, loadMenuData } from '../data/menuData';

interface MenuContextType {
  menuData: MenuData | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMenuData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await loadMenuData();
      setMenuData(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load menu'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  return (
    <MenuContext.Provider value={{ menuData, loading, error, refresh: fetchMenuData }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}