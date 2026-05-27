


const fs = require("fs");
const path = require("path");
const homeDataPath = path.join(__dirname, "..", "data", "homes.json");
const { getDb } = require("../utils/mongo");
module.exports = class Home {

  constructor(name, description, price, photoUrl, id) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.photoUrl = photoUrl;

    // If ID is passed (edit case), use it; otherwise create new
    this.id = id ? id : Date.now().toString();
  }

  // ======================
  // SAVE (CREATE + UPDATE)
  // ======================
  Save() {
   

     Home.fetchAll((ragisterhome) => {
      if (this.id) {
        // UPDATE existing
        const index = ragisterhome.findIndex(
          (h) => String(h.id) === String(this.id)
        );
        if (index !== -1) {
          ragisterhome[index] = {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            photourl: this.photourl
          };
        }
      } else {
        // ADD new
        this.id = Math.random().toString();
        ragisterhome.push(this);
      }

    fs.writeFile(
      homeDataPath,
      JSON.stringify(ragisterhome, null, 2),
      (err) => {
        if (err) {
          console.log("Error while saving home:", err);
        } else {
          console.log("Home saved successfully");
        }
      }
    );

  });


  }

  // ======================
  // FETCH ALL HOMES (SAFE)
  // ======================
  static fetchAll(callback) {

    fs.readFile(homeDataPath, "utf-8", (err, data) => {

      if (err || !data || data.trim() === "") {
        return callback([]);
      }

      try {
        const homes = JSON.parse(data);
        callback(homes);
      } catch (error) {
        console.error("JSON Parse Error:", error);
        callback([]);
      }
    });
  }

  // ======================
  // FIND BY ID
  // ======================
  static findById(id, callback) {

    Home.fetchAll((homes) => {
      const home = homes.find(
        h => String(h.id) === String(id)
      );

      callback(home);
    });
  }

  // ======================
  // DELETE BY ID (OPTIONAL)
  // ======================
  static deleteById(id, callback) {

    Home.fetchAll((homes) => {

      const updatedHomes = homes.filter(
        h => String(h.id) !== String(id)
      );

      fs.writeFile(
        homeDataPath,
        JSON.stringify(updatedHomes, null, 2),
        (err) => {
         
          if (err) {
            console.error("Error writing file:", err);
          }
          callback();
        }
      );
    });
  }
};


/*

const fs = require("fs");
const path = require("path");

const homeDataPath = path.join(
  __dirname,
  "..",
  "data",
  "homes.json"
);

module.exports = class Home {

  constructor(name, description, price, photoUrl, id) {

    this.name = name;
    this.description = description;
    this.price = price;
    this.photoUrl = photoUrl;

    this.id = id ? id : Date.now().toString();
  }

  // SAVE HOME
 Save() {

  return new Promise((resolve, reject) => {

    Home.fetchAll((homes) => {

      const existingHomeIndex = homes.findIndex(
        h => String(h.id) === String(this.id)
      );

      if (existingHomeIndex >= 0) {

        homes[existingHomeIndex] = this;

      } else {

        homes.push(this);

      }

      fs.writeFile(
        homeDataPath,
        JSON.stringify(homes, null, 2),
        (err) => {

          if (err) {
            reject(err);
          } else {
            console.log("Home saved successfully");
            resolve();
          }

        }
      );

    });

  });

}

  // FETCH ALL
  static fetchAll(callback) {

    fs.readFile(homeDataPath, "utf-8", (err, data) => {

      if (err || !data || data.trim() === "") {
        return callback([]);
      }

      try {

        const homes = JSON.parse(data);
        callback(homes);

      } catch (error) {

        console.log("JSON Parse Error:", error);
        callback([]);

      }

    });

  }

  // FIND BY ID
  static findById(id, callback) {

    Home.fetchAll((homes) => {

      const home = homes.find(
        h => String(h.id) === String(id)
      );

      callback(home);

    });

  }

  // DELETE BY ID
  static deleteById(id, callback) {

    Home.fetchAll((homes) => {

      const updatedHomes = homes.filter(
        h => String(h.id) !== String(id)
      );

      fs.writeFile(
        homeDataPath,
        JSON.stringify(updatedHomes, null, 2),
        (err) => {

          if (err) {
            console.log("Error deleting home:", err);
          }

          callback();

        }
      );

    });

  }

};
const fs = require("fs");
const path = require("path");

const homeDataPath = path.join(
  __dirname,
  "..",
  "data",
  "homes.json"
);

module.exports = class Home {

  constructor(name, description, price, photoUrl, id) {

    this.name = name;
    this.description = description;
    this.price = price;
    this.photoUrl = photoUrl;

    this.id = id ? id : Date.now().toString();
  }

  // SAVE / UPDATE HOME
  Save() {

    return new Promise((resolve, reject) => {

      Home.fetchAll((homes) => {

        const existingHomeIndex = homes.findIndex(
          h => String(h.id) === String(this.id)
        );

        if (existingHomeIndex >= 0) {

          // UPDATE
          homes[existingHomeIndex] = this;

        } else {

          // ADD NEW
          homes.push(this);

        }

        fs.writeFile(
          homeDataPath,
          JSON.stringify(homes, null, 2),
          (err) => {

            if (err) {

              reject(err);

            } else {

              console.log("Home saved successfully");
              resolve();

            }

          }
        );

      });

    });

  }

  // FETCH ALL
  static fetchAll(callback) {

    fs.readFile(homeDataPath, "utf-8", (err, data) => {

      if (err || !data || data.trim() === "") {
        return callback([]);
      }

      try {

        const homes = JSON.parse(data);
        callback(homes);

      } catch (error) {

        console.log("JSON Parse Error:", error);
        callback([]);

      }

    });

  }

  // FIND BY ID
  static findById(id, callback) {

    Home.fetchAll((homes) => {

      const home = homes.find(
        h => String(h.id) === String(id)
      );

      callback(home);

    });

  }

  // DELETE BY ID
  static deleteById(id, callback) {

    Home.fetchAll((homes) => {

      const updatedHomes = homes.filter(
        h => String(h.id) !== String(id)
      );

      fs.writeFile(
        homeDataPath,
        JSON.stringify(updatedHomes, null, 2),
        (err) => {

          if (err) {
            console.log("Error deleting home:", err);
          }

          callback();

        }
      );

    });

  }

};

*/
