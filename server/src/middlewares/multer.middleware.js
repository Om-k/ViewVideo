import multer from "multer"; 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./src/public/temp")
      //cb(null,"D:/WebDevProjects/BackendCourse/Project/src/public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage, 
})