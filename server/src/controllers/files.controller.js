const filesService = require("../services/files.service");

const saveFile = async (req, res) => {
    try {
        const result = await filesService.saveFileService(req.body)
        if(result) {
            return res.status(200).json({ message: "Success" });
        }
        throw new Error("Error, something strange happened!")
    } catch (error) {
        res.status(500).send(error.message || JSON.stringify(error))
    }
}

const getFiles = async (req, res) => {
    try {
        const config = await filesService.getFilesService()
        res.status(200).send(config);
    } catch (error) {
        res.status(500).send({Error: "X", Message: error.message})
    }
}

module.exports = {
    saveFile,
    getFiles
}