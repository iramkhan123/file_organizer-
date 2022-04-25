const fs=require("fs");
const path=require("path");


let types = {
    media: ["mp4", "mkv", "mp3","mov"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex',"csv",'json'],
    app: ['exe', 'dmg', 'pkg', "deb","apk"],
    images: ['png','jpg','jpeg']
}
function organize(srcPath){
    if(srcPath == undefined){
        srcPath=process.cwd();
       // console.log("the path generated is",srcPath);
    }
  
let organizedFiles = path.join(srcPath, "organized_files");
console.log("organized files folder path is ", organizedFiles);
if (fs.existsSync(organizedFiles) == false) {
  //organizedfiles naam ka folder exist nhi krta to ek folder bana do warna rhne do
  fs.mkdirSync(organizedFiles);
} else console.log("folder already exists");

//3. scan the entire srcPath(doenloads folder in this case)

//Reads the contents of the directory.-> basically reads the names of files present in directory
  let allFiles = fs.readdirSync(srcPath);
 // console.log(allFiles);

for(let i=0;i<allFiles.length;i++){
    let getfullpath=path.join(srcPath,allFiles[i]);
    //check if it is file or folder
    console.log(getfullpath);
    let isfile=fs.lstatSync(getfullpath).isFile();
    //console.log(allFiles[i]+" is "+isfile);
    // it is files then 
    if(isfile){
        let ext=path.extname(allFiles[i]).split(".")[1];
      //  console.log(ext);
      //get folder name from extension
      let folderName=getfoldername(ext);
      console.log(folderName);
      //copy from src folder and paste in destination folder
      copytoDest(srcPath,getfullpath,folderName);



    }
}
}
 function getfoldername(ext){
  for (let key in types){
    // console.log(key);
    for(let i=0;i<types[key].length;i++){
      if(types[key][i]==ext){
          return key;
      }
    }

  }


    return "miscellaneous";

 }
 function copytoDest(srcPath,getfullpath,folderName){
    let destFolderPath = path.join(srcPath, "organized_files", folderName); //....../downloads/organized_files/archives
    // console.log(des);
    //2 check folder if exists, if it does not, then make folder
  
    if (!fs.existsSync(destFolderPath)) {
      fs.mkdirSync(destFolderPath);
    }
    //copyy file from source to destination
    let fileName = path.basename(getfullpath); //abc.zip
    let destFileName = path.join(destFolderPath, fileName); 
    //copy the file
    fs.copyFileSync(getfullpath, destFileName)
 }
 
//
//let srcPath="C:\\Users\\asus\\Desktop\\fileorganizer\\downloads";
module.exports = {
    organize1:organize
  }
//organize(srcPath);
