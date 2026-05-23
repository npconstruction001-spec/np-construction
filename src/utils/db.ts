const NP_DB_NAME = "NP_Conduction_Videos_DB_v1";
const NP_STORE_NAME = "local_videos";

export function openNPDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(NP_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(NP_STORE_NAME)) {
        db.createObjectStore(NP_STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveVideoToIndexedDB(key: string, file: Blob): Promise<void> {
  try {
    const db = await openNPDatabase();
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(NP_STORE_NAME, "readwrite");
      const store = transaction.objectStore(NP_STORE_NAME);
      const request = store.put(file, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to save to IndexedDB", error);
  }
}

export async function getVideoFromIndexedDB(key: string): Promise<Blob | null> {
  try {
    const db = await openNPDatabase();
    return new Promise<Blob | null>((resolve, reject) => {
      const transaction = db.transaction(NP_STORE_NAME, "readonly");
      const store = transaction.objectStore(NP_STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to get from IndexedDB", error);
    return null;
  }
}

export async function removeVideoFromIndexedDB(key: string): Promise<void> {
  try {
    const db = await openNPDatabase();
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(NP_STORE_NAME, "readwrite");
      const store = transaction.objectStore(NP_STORE_NAME);
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to delete from IndexedDB", error);
  }
}
