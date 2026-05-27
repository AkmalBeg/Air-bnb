const homes =require('../../models/home');
const favmodel=require('../../models/favourite');
const favdatapath = require('../../models/favourite');

   exports.getHomes = (req, res, next) => {

    homes.fetchAll((registeredHomes) => {

        console.log(registeredHomes);

        res.render('store/home', {
            ragisterhome: registeredHomes,
            title: 'airbnb Home'
        });

    });

};
exports.getmainHomes = (req, res, next) => {

    homes.fetchAll((registeredHomes) => {

        console.log(registeredHomes);

        res.render('store/main', {
            ragisterhome: registeredHomes,
            title: 'home listing'
        });

    });
};


exports.getBooking=(req,res,next)=>{
        res.render('store/reserve', {    
            title: 'airbnb Home'
        });


    };

    exports.getfavlist=(req,res,next)=>{
        favmodel.getFavList((favourites) => {
        homes.fetchAll((registeredHomes) => {
            const favouriteHomes = registeredHomes.filter(home =>
    favourites.includes(String(home.id))
);
           //  const favouriteHomes = registeredHomes.filter(home => favourites.some(fav => fav.id == home.id));
        console.log(registeredHomes);

        res.render('store/favlist', {
            favhome: favouriteHomes,    
            title: 'airbnb Home'
        });
        
    });
        });
    };

    exports.postremoveFromFav = (req, res, next) => {
  const homeId = req.params.homeId;
 favdatapath.deleteById(homeId, (error) => {
    if (error) {
      console.log('Error while removing from Favourite', error);
    }
    res.redirect("/favlist");
  })
};

      exports.getHomeById=(req,res,next)=>{
     const homeId=req.params.homeId;
     homes.findById(homeId,(home)=>{
        console.log(home);
        
            res.render('store/details', {
               home: home,
            title: 'main listing'
        });
    
        });
    
    };


/*
exports.postfavlist = (req, res, next) => {

    const homeId = req.body.homeId;
favmodel.addToFav(homeId, (err) => {
        if (err) {
          console.error("Error adding to favorites:", err);
          res.status(500).send("Internal Server Error");
        } else {
          homes.fetchAll((homes) => {

        const favouriteHome = homes.find(
            (home) => home.id == homeId
        );

        console.log(favouriteHome);

        res.render('store/favlist', {
            favhome: favouriteHome,
            title: 'Favourite List'
        });

    });

        }

});
        
};*/
exports.postfavlist = (req, res, next) => {

    const homeId = req.body.homeId;

    favmodel.addToFav(homeId, (err) => {

        if (err) {
            console.error("Error adding to favorites:", err);
            return res.status(500).send("Internal Server Error");
        }

        homes.fetchAll((registeredHomes) => {

            favmodel.getFavList((favourites) => {

                const favouriteHomes = registeredHomes.filter(home =>
                    favourites.includes(String(home.id))
                );

                console.log("FAV LIST:", favouriteHomes);

                res.render('store/favlist', {
                    favhome: favouriteHomes,   // ✅ ALWAYS ARRAY
                    title: 'Favourite List'
                });

            });

        });

    });

}