export const addToStorage = (key, value) =>{
    try{
        localStorage.setItem(key,JSON.stringify(value));
    }
    catch(error){
        console.error(error);
    }
};


export const getFromStorage = key =>{
    try{
        const item = localStorage.getItem(key);
        if(!item) return null;

        if (item.startsWith('{') || item.startsWith('[')){
            return JSON.parse(item);
        }else {
            return item;
        }
    }catch(error){
        console.error('Eroare la parsarea datelor din localStorage:',error);
        return null;
    }
};

export const removeFromStorage = key =>{
    try{
        localStorage.removeItem(key);
        console.log(`'Elementul cu cheia "${key}" a fost sters din localStorage.'`);
    }catch(error){
        console.error(error);
    }
};