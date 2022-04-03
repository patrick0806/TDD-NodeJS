const {readFile} = require('fs/promises');

class BaseRepository{
    constructor({file}){
        this.file = file;
    }

    async find(itemId){
        const data = JSON.parse(await readFile(this.file));
        if(!itemId) return data;

        return data.find(item => item.id === itemId);
    }
}

module.exports = BaseRepository;