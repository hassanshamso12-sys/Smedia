import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

export function useContent() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 5000);

    const unsub = onSnapshot(doc(db, 'site_content', 'config'), (doc) => {
      if (doc.exists()) {
        setContent(doc.data());
      }
      setLoading(false);
      clearTimeout(timeoutId);
    });

    return () => {
      unsub();
      clearTimeout(timeoutId);
    };
  }, []);

  return { content, loading };
}
