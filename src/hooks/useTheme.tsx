import { useEffect, useState } from 'react';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';

export function useTheme(name: ReactCodeMirrorProps['theme'] = 'light') {
  const dark = document.documentElement.getAttribute('data-color-mode');
  const [theme, setTheme] = useState<ReactCodeMirrorProps['theme']>(dark === 'dark' ? 'dark' : name);
  useEffect(() => {
    setTheme(document.documentElement.getAttribute('data-color-mode') === 'dark' ? 'dark' : 'light');
    document.addEventListener('colorschemechange', (e: any) => {
      setTheme(e.detail.colorScheme as ReactCodeMirrorProps['theme']);
    });
  }, []);
  return { theme, setTheme };
}