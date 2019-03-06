import { AsyncStorage } from 'react-native';

export default class DB {
    constructor(){
        this.st = AsyncStorage;
    }
    getMap = id => {
        return new Promise(async (resolve, reject) => {
            try {
                let map = await this.st.getItem(id);
                resolve(JSON.parse(map));
            } catch (error) {
                reject(error);
            }
        });
    }
    saveMap = map => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.st.setItem(map.id, JSON.stringify(map));
                resolve(map);
            } catch (error) {
                reject(error);
            }
        });
    }
    getMaps = () => {
        return new Promise(async (resolve,reject) => {
            try {
                let mapsIDs = await this.st.getAllKeys();
                let maps = await this.st.multiGet(mapsIDs);
                resolve(maps.map(map => { JSON.parse(map[1]) }));
            } catch (error) {
                reject(error);
            }
        });
    }
    deleteMap = id => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.st.removeItem(id);
                resolve('deleted');
            } catch (error) {
                reject(error);
            }
        });
    }
}