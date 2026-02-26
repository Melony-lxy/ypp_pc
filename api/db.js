import { openDB } from "idb";

const dbPromise = openDB('searchDB',1,{
	upgrade(db){
		if (!db.objectStoreNames.contains('item')) {
		      db.createObjectStore('item', { keyPath: 'id' });
		    }
	}
})

export default dbPromise