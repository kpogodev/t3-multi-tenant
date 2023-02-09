import {createContext, useState, useCallback} from 'react';

type UseAdminStateManagerResult = ReturnType<typeof useAdminStateManager>;

export const AdminContext = createContext<UseAdminStateManagerResult>({} as UseAdminStateManagerResult);

const useAdminStateManager = () => {
  const [currentView, setCurrentView] = useState<string>('default');

  const changeView = useCallback((view: string) => {
    setCurrentView(view);
  }, []);

  return {
    currentView,
    changeView,
  }
}

export default function AdminContextProvider({children}: {children: React.ReactNode}) {
  return <AdminContext.Provider value={useAdminStateManager()}>{children}</AdminContext.Provider>
}
