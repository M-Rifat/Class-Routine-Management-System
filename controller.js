const fs = require('fs');

exports.get = async(req,res,next)=>{
    res.end('./index.html');
};

exports.submit = async(req,res,next)=>{
    const body = req.body.html;
    const html = '<!DOCTYPE html>\n'+body;
    fs.writeFile('./public/index.html',html,(err)=>{
        if(!err)console.log('successfully write');
    });
    //console.log(body);
    res.end('ok');
};

exports.update = async(req,res,next)=>{
    res.end('./update.html');
}