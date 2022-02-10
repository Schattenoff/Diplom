class localStorageService {
    constructor() {
    }
    
    set(key, value) {
        return localStorage.setItem(key, value);
    }
    get(key) {
        return localStorage.getItem(key);
    }
    parse(key) {
        return JSON.parse(this.get(key))
    }
    stringify(value) {
        return JSON.stringify(value);
    }
}