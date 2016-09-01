/**
 * Created by Zaviar Ali.
 *            Cenedex Solutions.
 */


var express = require('express');
var router = express.Router();
var storage = [];
var cp = require('child_process');

exports.login_check = function(req,res,next){
           if(req.session.me) res.json({'id' : 1});
           else                res.json({'id' : 0});
      };
       
exports.oneir_commands = function(req,res){
          // if(req.query.q && req.session.me) 
              storage[req.session.username] = req.query.q;  
              res.end('sdsd');    
        };

exports.oneir = function(req,res,next){
           var temp = 0;
           if(req.query.q != null && storage[req.query.q] != null)
           { 
              temp = storage[req.query.q];
              storage[req.query.q] = null;
           }
            res.header('Content-Lenght', temp);         
           res.status(200).json({'command' : temp});
           res.end();
      };

exports.browser_tab_id = function(req,res,next){
            
		    var val = req.session.tab_id;
			req.session.tab_id = val + 1;
           res.json({ 'tab_id' :  val});
           res.end();
      };

exports.setCompany = function(req,res,next){
  //  if(req.session.me)
     req.session.compname = req.query.compname;
     req.session.compid = req.query.compid;
     res.json({'cid':req.session.compid});
     res.end();
};

exports.getCompany = function(req,res,next){    
     
       res.json({'compname' : req.session.compname});
       res.end();
};

exports.getMenu = function(req,res,next){
    var cmd = "services/FlatFileInterface/menu_selection "+req.session.username+" "+req.session.compid;
    cp.exec(cmd,function(err,output,_){
                   res.json(output);                
             });
};
exports.getCmps = function(req,res,next){
 
  
    var cmd ="services/FlatFileInterface/company_selection " + req.session.username;
   cp.exec(cmd,function(err,output,_){
       
       res.json(output);
   });
};
