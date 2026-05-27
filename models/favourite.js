/*const fs=require("fs");
const path=require("path");
const rootDir = require("../utils/pathutils");
const favouritesPath = path.join(__dirname, "..", "data", "favlist.json");
module.exports = class favdatapath{
   static addToFav(homeId,callback) {
     favdatapath.getFavList((favourites) => {;
          const homeDataPath = path.join(__dirname, "..", "data", "homes.json");
       if(!favourites.some(fav => fav.id === homeId)) {
        console.log("Home already in favorites");
       
         } else {   
        favourites.push(homeId);
         
           fs.writeFile(favouritesPath, JSON.stringify(favourites), callback);
           
         }
        });
        
}

    static getFavList(callback) {
        const favouritesPath = path.join(__dirname, "..", "data", "favlist.json");
            fs.readFile(favouritesPath, (err, data) => {
              callback(!err ? JSON.parse(data) : []);
            });
    }

}*/
const fs = require("fs");
const path = require("path");
const { deleteById } = require("./home");

const favouritesPath = path.join(__dirname, "..", "data", "favlist.json");

module.exports = class favdatapath {

    static addToFav(homeId, callback) {

        favdatapath.getFavList((favourites) => {

            // convert to same type for safety
            const exists = favourites.includes(String(homeId));

            if (exists) {
                console.log("Home already in favorites");
                return callback();
            }

            favourites.push(String(homeId));

            fs.writeFile(
                favouritesPath,
                JSON.stringify(favourites),
                callback
            );

        });

    }

    static getFavList(callback) {

        fs.readFile(favouritesPath, (err, data) => {
            callback(!err ? JSON.parse(data) : []);
        });

    }

    static deleteById(homeId, callback) {
        favdatapath.getFavList((favourites) => {
            const updatedFavs = favourites.filter(fav => fav.toString() !== String(homeId));
            fs.writeFile(favouritesPath, JSON.stringify(updatedFavs), callback);
        });
    }

};
