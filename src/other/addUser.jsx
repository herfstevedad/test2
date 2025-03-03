import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './Firebase'; // Импортируйте конфигурацию Firebase

/**
 * Проверяет существование пользователя и добавляет его, если он не существует.
 * @param {string} userId - Уникальный ID пользователя.
 * @param {object} userData - Объект данных пользователя.
 */
export async function addUserIfNotExists(userId, userData) {
  try {
    // Создаем ссылку на документ пользователя
    const userRef = doc(db, 'users', userId.toString());

    // Проверяем, существует ли пользователь
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      // Если пользователь не существует, создаем новый документ
      await setDoc(userRef, userData);
      console.log('New user added:', userData);
    } else {
      console.log('User already exists:', userSnapshot.data());
    }
  } catch (error) {
    console.error('Error adding user:', error);
  }
}