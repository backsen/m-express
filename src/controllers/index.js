
module.exports = class IndexContrell{

  constructor(req , res , next){
    
    res.render('index', { title: 'Express' });

  }

}