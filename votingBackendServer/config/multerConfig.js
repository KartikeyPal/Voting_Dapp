const multer  = require('multer')
const path  = require('path')

const storage = destination => multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `votingSystem/${destination}`)//specifying the folder where i want to upload my file
    },
    filename: function (req, file, cb) {
      const accountAddress   = req.accountAddress
      cb(null, accountAddress+path.extname(file.originalname));//Specifying the name of the file
    }
  })
  
module.exports ={
    uploadCandidate :multer({storage: storage('CandidateImages')}).single('file'),
    uploadVoter :multer({storage: storage('VoterImages')}).single('file')

}