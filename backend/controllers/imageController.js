

//get a thumbnail 

const getThumbnail = async (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = `${__dirname}/images/thumbnail/${imageName}`;

    res.sendFile(imagePath)
}

module.exports = {
    getThumbnail
}