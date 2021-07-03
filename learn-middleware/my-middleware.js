module.exports = (option)=>{
  return (req,res,next)=>{
    console.log(option);
    next();
  }
}