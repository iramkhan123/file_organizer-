const fs = require("fs");

const path = require("path");

function treeFun(dirpath) {
  if (dirpath == undefined) {
    console.log("Please Enter a Valid Path");
    return;
  }
  let doesExist = fs.existsSync(dirpath);
  if (doesExist == true) {
    treeHelper(dirpath, " ");
  }
}
function treeHelper(targetPath, indent) {
    let isFile = fs.lstatSync(targetPath).isFile();

    if (isFile == true) {
        let fileName = path.basename(targetPath);
        console.log(indent + "├── " + fileName);
        return;
    }
    let dirName = path.basename(targetPath);
    console.log(indent + "└──" + dirName);

    let children = fs.readdirSync(targetPath);

    for (let i = 0; i < children.length; i++) {
      let childpath = path.join(targetPath, children[i]);
      treeHelper(childpath, indent + "\t");
    }
}

module.exports = {
    tree: treeFun,
  };
  //let srcPath="C:\\Users\\asus\\Desktop\\fileorganizer\\downloads"
  //treeFun(srcPath);
