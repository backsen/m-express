
module.exports = class IndexContrell{

  constructor(req , res){

    console.log(req.path)

    res.render('index', { title: 'Express' });

  }

}