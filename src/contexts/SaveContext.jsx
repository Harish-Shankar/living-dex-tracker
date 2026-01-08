import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  doc, 
  collection, 
  setDoc, 
  getDoc, 
  getDocs, 
  deleteDoc,
  updateDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';
import { CATCH_STATUS, getPokemonNumbersForGame } from '../data/games';

const SaveContext = createContext({});

export function useSave() {
  return useContext(SaveContext);
}

export function SaveProvider({ children }) {
  const { user } = useAuth();
  const [saves, setSaves] = useState([]);
  const [currentSave, setCurrentSave] = useState(null);
  const [pokemonStatus, setPokemonStatus] = useState({});
  const [loading, setLoading] = useState(false);

  // Load all saves for user
  const loadSaves = useCallback(async () => {
    if (!user) {
      setSaves([]);
      return;
    }

    setLoading(true);
    try {
      const savesRef = collection(db, 'users', user.uid, 'saves');
      const q = query(savesRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      const loadedSaves = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      setSaves(loadedSaves);
    } catch (error) {
      console.error('Error loading saves:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Create new save
  const createSave = async (gameId, saveName) => {
    if (!user) return { success: false, error: 'Not authenticated' };

    try {
      const saveId = `${gameId}_${Date.now()}`;
      const saveRef = doc(db, 'users', user.uid, 'saves', saveId);
      
      const saveData = {
        gameId,
        name: saveName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await setDoc(saveRef, saveData);
      
      // Initialize empty Pokemon status
      const pokemonNumbers = getPokemonNumbersForGame(gameId);
      const statusRef = doc(db, 'users', user.uid, 'saves', saveId, 'status', 'pokemon');
      const initialStatus = {};
      pokemonNumbers.forEach(num => {
        initialStatus[num] = CATCH_STATUS.NOT_CAUGHT;
      });
      await setDoc(statusRef, initialStatus);

      await loadSaves();
      return { success: true, saveId };
    } catch (error) {
      console.error('Error creating save:', error);
      return { success: false, error: error.message };
    }
  };

  // Delete save
  const deleteSave = async (saveId) => {
    if (!user) return { success: false, error: 'Not authenticated' };

    try {
      // Delete status subcollection first
      const statusRef = doc(db, 'users', user.uid, 'saves', saveId, 'status', 'pokemon');
      await deleteDoc(statusRef);
      
      // Delete the save document
      const saveRef = doc(db, 'users', user.uid, 'saves', saveId);
      await deleteDoc(saveRef);
      
      if (currentSave?.id === saveId) {
        setCurrentSave(null);
        setPokemonStatus({});
      }
      
      await loadSaves();
      return { success: true };
    } catch (error) {
      console.error('Error deleting save:', error);
      return { success: false, error: error.message };
    }
  };

  // Load specific save
  const loadSave = async (saveId) => {
    if (!user) return { success: false, error: 'Not authenticated' };

    setLoading(true);
    try {
      const saveRef = doc(db, 'users', user.uid, 'saves', saveId);
      const saveSnap = await getDoc(saveRef);
      
      if (!saveSnap.exists()) {
        return { success: false, error: 'Save not found' };
      }

      const saveData = { id: saveId, ...saveSnap.data() };
      setCurrentSave(saveData);

      // Load Pokemon status
      const statusRef = doc(db, 'users', user.uid, 'saves', saveId, 'status', 'pokemon');
      const statusSnap = await getDoc(statusRef);
      
      if (statusSnap.exists()) {
        setPokemonStatus(statusSnap.data());
      } else {
        // Initialize if doesn't exist
        const pokemonNumbers = getPokemonNumbersForGame(saveData.gameId);
        const initialStatus = {};
        pokemonNumbers.forEach(num => {
          initialStatus[num] = CATCH_STATUS.NOT_CAUGHT;
        });
        setPokemonStatus(initialStatus);
      }

      return { success: true };
    } catch (error) {
      console.error('Error loading save:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Update Pokemon status
  const updatePokemonStatus = async (dexNumber, status) => {
    if (!user || !currentSave) return { success: false, error: 'No save loaded' };

    try {
      // Update local state immediately for responsiveness
      setPokemonStatus(prev => ({
        ...prev,
        [dexNumber]: status,
      }));

      // Update in Firestore
      const statusRef = doc(db, 'users', user.uid, 'saves', currentSave.id, 'status', 'pokemon');
      await updateDoc(statusRef, {
        [dexNumber]: status,
      });

      // Update save's updatedAt
      const saveRef = doc(db, 'users', user.uid, 'saves', currentSave.id);
      await updateDoc(saveRef, {
        updatedAt: new Date().toISOString(),
      });

      return { success: true };
    } catch (error) {
      console.error('Error updating Pokemon status:', error);
      // Revert local state on error
      await loadSave(currentSave.id);
      return { success: false, error: error.message };
    }
  };

  // Get status for a Pokemon
  const getStatus = (dexNumber) => {
    return pokemonStatus[dexNumber] || CATCH_STATUS.NOT_CAUGHT;
  };

  // Get completion stats
  const getCompletionStats = () => {
    if (!currentSave) return { total: 0, caught: 0, percentage: 0 };
    
    const pokemonNumbers = getPokemonNumbersForGame(currentSave.gameId);
    const total = pokemonNumbers.length;
    const caught = pokemonNumbers.filter(num => 
      pokemonStatus[num] === CATCH_STATUS.CAUGHT
    ).length;
    
    return {
      total,
      caught,
      percentage: total > 0 ? Math.round((caught / total) * 100) : 0,
    };
  };

  // Close current save
  const closeSave = () => {
    setCurrentSave(null);
    setPokemonStatus({});
  };

  // Load saves when user changes
  useEffect(() => {
    loadSaves();
  }, [loadSaves]);

  const value = {
    saves,
    currentSave,
    pokemonStatus,
    loading,
    createSave,
    deleteSave,
    loadSave,
    closeSave,
    updatePokemonStatus,
    getStatus,
    getCompletionStats,
    refreshSaves: loadSaves,
  };

  return (
    <SaveContext.Provider value={value}>
      {children}
    </SaveContext.Provider>
  );
}
