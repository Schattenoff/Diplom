class Database {
    constructor() {
        this.Database = this.onGetDatabase();
    }
    local() {
        return new localStorageService();
    }
    onGetDatabase() {
        this.Database = this.local().parse('users') 
        if(this.Database == null) this.Database = [];
        return this.Database;
    }
    onSaveDatabase() {
        if (this.Database == null) return;
        this.local().set('users', this.local().stringify(this.Database));
    }   
    onSaveUser(user,id = this.onGetUserID()){
        this.Database[id] = user;
        this.onSaveDatabase();
    }
    onInsertIntoDatabase(newDataBase) {
        this.Database.push(newDataBase);
        this.onSaveDatabase();
    }
    onSetUserID(id) {
        return this.local().set('id', id);
    }
    onGetUserID() {
        return this.local().get('id');
    }
    onAddEventUser(event, id = this.onGetUserID()){
        let user = this.onGetInfoUser();
        if(user.events != null){
            user.events.push(event);
        } else {
            user.events = [];
            user.events.push(event);
        }
        this.onSaveUser(user);
    }
    onGetEvents(id = this.onGetUserID()) {
        return this.Database[id].events;
    }
    onDeleteEventUser(idEvent) {
        let user = this.onGetInfoUser();
        user.events.splice(idEvent, 1);
        this.onSaveUser(user);
    }
    onSetUserName(userName) {
        this.Database[this.onGetUserID()].userName = userName;
        this.onSaveDatabase();
    }
    onGetUserName(id = this.onGetUserID()) {
        return this.Database[id].userName;
    }
    onGetLogin(id = this.onGetUserID()) {
        return this.Database[id].regLogin;
    }
    onGetPassword(id = this.onGetUserID()) {
        return this.Database[id].regPass;
    }
    onGetLength() {
        return this.Database.length;
    }
    onGetInfoUser(id = this.onGetUserID()){
        return this.Database[id];
    }
    // onGetAuth(id = this.onGetUserID()) {
    //     return this.Database[id].auth;
    // }
    onSetAuth(auth) {
        this.Database[this.onGetUserID()].auth = auth;
        this.onSaveDatabase();
    }
}

