const Favorite = require('../models/favorite')

const favoriteController = {
    getFavorites:async (req, res) =>{
        try {
            const favorites = await Favorite.find();
            res.json({
                success: true,
                response: {
                    favorites
                }
            })
        } catch (error) {
            res.status(400).json({ success: false, error:"Oops! something went wrong, transaction cannot be found"})
        }
    },
    createFavorite: async(req, res) =>{
        let { property, user} = req.body

        try {
            const favorite = new Favorite({
                property,
                user,
            });

            await favorite.save();

            res.json({
                success: true,
                response: {
                    menssage: "Favorite Created",
                    favorite
                }
            })
        } catch (error) {

            res.status(400).json({ success: false, error:"Oops! something went wrong" })
        }
    }
    
}

module.exports = favoriteController;