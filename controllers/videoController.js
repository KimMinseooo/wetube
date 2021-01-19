import  routes from "../routes";
import Video from "../models/Video";

export const home = async(req, res ) =>{
    //await 가 끝나기 전까진 render를 하지않음 .
    try{
        const videos = await Video.find({});
         res.render("home", {pageTitle:"Home", videos});
    } catch(error){
        console.log(error);
        res.render("home", {pageTitle:"Home", videos :[] });
    }
    };

export const search =(req, res) =>{
    //const searchingBy =req.query.term; 과 같음
    const {
        query: {term: searchingBy }
    } = req;
    
    res.render("search", {pageTitle:"Search", searchingBy, videos});
};

export const getUpload =(req, res) => 
    res.render("upload",{pageTitle:"Upload"});
    
export const postUpload = async(req, res) =>{
    const { body :{title , description},
     file : { path }
     } =req;
     const newVideo =await Video.create({
         fileUrl: path,
         title,
         description
     });
     console.log(newVideo)
        //To Do: Upload and save video;
       res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail =async(req, res) =>{
    const {
        params: {id}
    } =req;
    try{
        const video =await Video.findById(id);
    res.render("videoDetail", {pageTitle : "Video Detail", video});
    } catch(error){
        res.redirect(routes.home);
    }
};

 export const editVideo =(req, res) => 
res.render("editVideo",{pageTitle: "Edit Video"});

export const deleteVideo =(req, res) =>
 res.render("deleteVideo",{pageTitle: "Delete Video"});