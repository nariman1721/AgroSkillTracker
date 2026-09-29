// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyDk69lGAD7EqDlV1Yxnuy0Iaz-mR9wOX6w",
//   authDomain: "agro-ai-kz.firebaseapp.com",
//   projectId: "agro-ai-kz",
//   storageBucket: "agro-ai-kz.firebasestorage.app",
//   messagingSenderId: "80445798640",
//   appId: "1:80445798640:web:b50ecbbb1561facabfaa35",
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

// export default app;


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  DocumentData,
  QueryDocumentSnapshot
} from "firebase/firestore";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDk69lGAD7EqDlV1Yxnuy0Iaz-mR9wOX6w",
  authDomain: "agro-ai-kz.firebaseapp.com",
  projectId: "agro-ai-kz",
  storageBucket: "agro-ai-kz.firebasestorage.app",
  messagingSenderId: "80445798640",
  appId: "1:80445798640:web:b50ecbbb1561facabfaa35",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Коллекции
export const polygonsCollection = collection(db, 'user_polygons');
export const wmsRequestsCollection = collection(db, 'wms_requests');

// Типы для данных
export interface SavedPolygon {
  id?: string;
  name: string;
  coordinates: number[][][];
  date: string;
  ndviValue?: number;
  ndviData?: any;
  userId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WMSRequest {
  id?: string;
  polygonId: string;
  date: string;
  ndviValue: number;
  status: 'success' | 'failed';
  errorMessage?: string;
  createdAt: string;
}

// Функция для сохранения полигона
export async function savePolygon(data: {
  name: string;
  coordinates: number[][][];
  date: string;
  userId?: string;
  ndviData?: any;
  ndviValue?: number;
}): Promise<string> {
  try {
    const docRef = await addDoc(polygonsCollection, {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving polygon:', error);
    throw error;
  }
}

// Функция для получения всех полигонов
export async function getPolygons(): Promise<SavedPolygon[]> {
  try {
    const q = query(polygonsCollection, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
      id: doc.id,
      ...doc.data()
    } as SavedPolygon));
  } catch (error) {
    console.error('Error getting polygons:', error);
    return [];
  }
}

// Функция для удаления полигона
export async function deletePolygon(id: string): Promise<void> {
  try {
    const polygonRef = doc(db, 'user_polygons', id);
    await deleteDoc(polygonRef);
  } catch (error) {
    console.error('Error deleting polygon:', error);
    throw error;
  }
}

// Функция для сохранения WMS запроса
export async function saveWMSRequest(data: {
  polygonId: string;
  date: string;
  ndviValue: number;
  status: 'success' | 'failed';
  errorMessage?: string;
}): Promise<string> {
  try {
    const docRef = await addDoc(wmsRequestsCollection, {
      ...data,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving WMS request:', error);
    throw error;
  }
}

// Функция для получения WMS запросов по полигону
export async function getWMSRequestsByPolygon(polygonId: string): Promise<WMSRequest[]> {
  try {
    const q = query(
      collection(db, 'wms_requests'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs
      .map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data()
      } as WMSRequest))
      .filter(req => req.polygonId === polygonId);
  } catch (error) {
    console.error('Error getting WMS requests:', error);
    return [];
  }
}

// Функция для обновления полигона с NDVI данными
export async function updatePolygonWithNDVI(
  polygonId: string, 
  ndviValue: number, 
  ndviData: any
): Promise<void> {
  try {
    const polygonRef = doc(db, 'user_polygons', polygonId);
    await updateDoc(polygonRef, {
      ndviValue: ndviValue,
      ndviData: ndviData,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating polygon with NDVI:', error);
    throw error;
  }
}

// Импортируем updateDoc
import { updateDoc } from "firebase/firestore";

export default app;