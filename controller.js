const fs = require('fs');

exports.get = async(req,res,next)=>{
    res.end('./index.html');
};

exports.submit = async(req,res,next)=>{
    const body = req.body.html;
    const html = '<!DOCTYPE html>\n'+body;
    fs.writeFile('./public/index.html',html,(err)=>{
        if(!err)console.log('successfully write on index.html');
    });
    fs.writeFile('./public/update.html',html,(err)=>{
        if(!err)console.log('successfully write on update.html');
    });
    //console.log(body);
    res.send('ok');
};

exports.update = async(req,res,next)=>{
    const files = fs.readFileSync('./public/update.html','utf-8');
    //console.log(files);
    res.send(files);
};

exports.login = async(req,res,next)=>{
    const files = fs.readFileSync('./public/login.html','utf-8');
    res.send(files);
}