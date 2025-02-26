import {makeAutoObservable} from 'mobx';

class User{
id = null;

    constructor(){
        makeAutoObservable(this);
        this.id = Math.random();
    }
}

export default User;