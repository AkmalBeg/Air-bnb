

const e = require('express');
const homes =require('../../models/home');



exports.getAddHome = (req, res, next) => {
    homes.fetchAll((ragisterhome) => {
        res.render('host/add-home', { ragisterhome:ragisterhome, title: 'Add Home' });
    });
};



exports.gethostHomes = (req, res, next) => {

    homes.fetchAll((registeredHomes) => {

        console.log(registeredHomes);

        res.render('host/host-list', {
            ragisterhome: registeredHomes,
            title: 'home-list listing'
        });

    });

};
exports.getEditHome = (req, res, next) => {
    const homeId = req.params.homeId;
    
    if (!homeId) {
        return res.status(400).send('Home ID is required');
    }   
    homes.fetchAll((registeredHomes) => {
        const home = registeredHomes.find(h => String(h.id) === String(homeId));
        if (!home) {
            return res.status(404).send('Home not found');
        }
        res.render('host/edithome', {
            home: home,
            title: 'Edit Home',
        
        });
    });
}

exports.postEditHome = (req, res, next) => {
    console.log('post');
    console.log(req.body);
    console.log(req.params);
     const {name,description,price}=req.body;
const homeId=req.params.homeId;
    const home = new homes(name, description, price);
    home.id=req.params.homeId;
    home.Save();
   return res.redirect("/host/host-list");
};

exports.postDeleteHome = (req, res, next) => {
    const homeId = req.params.homeId;
        homes.deleteById(homeId, (err) => {

            
            if (err) {


               return res.status(500).send('Error deleting home');
           }
                return res.redirect("/host/host-list");
            // const updatedHomes = registeredHomes.filter(h => String(h.id) !== String(homeId));
        });
    };


exports.postAddHome = (req, res, next) => {
    const {name,description,price}=req.body;
    const home = new homes(name, description, price);
    home.Save().then(() => {
        console.log('Home saved successfully');
        
    });
    res.render('host/home-register',{title:'Home Registered Successfully'});
};