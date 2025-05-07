type JSONValue = string | number | boolean | { [key: string]: JSONValue } | JSONValue[];
 
 // Helper function to check if a value is JSON-parsable
 const isJSON = (str: string): boolean => {
   try {
     JSON.parse(str);
     return true;
   } catch {
     return false;
   }
 };
 
 const isBrowser = typeof window !== "undefined";
 
 export const localStorageUtil = {
   /**
    * Retrieves an item from localStorage.
    * @param key - The key of the item to retrieve.
    * @returns The parsed JSON value if it's JSON, or the raw string if not.
    */
   get<T = JSONValue>(key: string): T | string | null {
     if (!isBrowser) return null;
     try {
       const item = window.localStorage.getItem(key);
       if (!item) return null;
       return isJSON(item) ? (JSON.parse(item) as T) : item;
     } catch (error) {
       console.error(`Error parsing localStorage key "${key}":`, error);
       return null;
     }
   },
 
   /**
    * Sets an item in localStorage.
    * @param key - The key to associate with the item.
    * @param value - The value to store. If a string, it's stored directly; if JSON-serializable, it's stringified.
    */
   set<T = JSONValue>(key: string, value: T | string): void {
     if (!isBrowser) return;
     try {
       const item = typeof value === "string" ? value : JSON.stringify(value);
       window.localStorage.setItem(key, item);
     } catch (error) {
       console.error(`Error setting localStorage key "${key}":`, error);
     }
   },
 
   /**
    * Removes an item from localStorage.
    * @param key - The key of the item to remove.
    */
   remove(key: string): void {
     if (!isBrowser) return;
     try {
       window.localStorage.removeItem(key);
     } catch (error) {
       console.error(`Error removing localStorage key "${key}":`, error);
     }
   },
 
   /**
    * Clears all items from localStorage.
    */
   clear(): void {
     if (!isBrowser) return;
     try {
       window.localStorage.clear();
     } catch (error) {
       console.error("Error clearing localStorage:", error);
     }
   },
 
   /**
    * Updates an item in localStorage by merging new properties with the existing object.
    * @param key - The key of the item to update.
    * @param newValues - Partial object to merge with the current stored object.
    */
   update<T = JSONValue>(key: string, newValues: Partial<T>): void {
     if (!isBrowser) return;
     try {
       const current = this.get<T>(key);
       
       // If the current value is an object, merge with new values; otherwise, replace it.
       const updated = typeof current === "object" && current !== null
         ? { ...current, ...newValues }
         : newValues;
 
       this.set(key, updated);
     } catch (error) {
       console.error(`Error updating localStorage key "${key}":`, error);
     }
   }
 }