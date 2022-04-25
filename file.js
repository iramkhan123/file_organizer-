let help1=require("./command/help");
let orgFunc = require("./command/organize");
let treeFunc = require("./command/tree");
let input=process.argv.slice(2);
let command=input[0];
let path=input[1];
switch(command){
    case "tree":
        treeFunc.tree(path);
        //console.log("tree call and executed\n");
        break;
    case "organize":

        //console.log("organize function called \n");
       orgFunc.organize1(path);
        break;
    case "help":
        //console.log("help called");
        help1.hellp();
        break;
    default: console.log("invalid command");
    break;

}