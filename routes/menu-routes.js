 /**
 * Created by Zaviar Ali.
 *            Cenedex Solutions.
 */

/* node modules & objects intialization */ 
var express = require('express');
var router = express.Router();
var cp = require('child_process');
var fs = require('fs');

/* object for storing Telnet commands/instructions for all users */
var storage = [];
var hideWindow = [];
var browserTabClosure = [];

/*
 * This request-handler validates that whether the user who sent the request has already logged in.
 * When a user logs in we set and store username in sessions.
 */
exports.login_check = function(req,res,next){
           if(req.session.me) res.json({'id' : 1});
           else                res.json({'id' : 0});
      };

/*
 * This request-handler stores oneir-menu command to the storage object with user's username as key.
 * Storage Object is an associative array.
 */	  
exports.oneir_commands = function(req,res){
          // if(req.query.q && req.session.me) 
              storage[req.session.username] = req.query.q;  
              res.end(req.query.q);    
        };

/*
 * This request-handler is for OML.It recieves an username and checks for oneir_commands.
 * OML app sends requests by sending  WebID and its responded with oneir_commands, if available.
 */		
exports.oneir = function(req,res,next){
           var temp = 'W';
           if(req.query.q != null && storage[req.query.q] != null)
           { 
              temp = storage[req.query.q];
              storage[req.query.q] = null;
           }
            res.header('Content-Lenght', temp);         
           res.status(200).json({'command' : temp});
           res.end();
      };

/*
 * This request-handler is responisble for generating TabIds for users.
 */
exports.browser_tab_id = function(req,res,next){
            
		    var val = req.session.tab_id;
			req.session.tab_id = val + 1;
           res.json({ 'tab_id' :  val});
           res.end();
      };

/*
 * This request-handler sets user's selected company inthe sessions.
 */
exports.setCompany = function(req,res,next){
  //  if(req.session.me)
     req.session.compname = req.query.compname;
     req.session.compid = req.query.compid;
     res.json({'cid':req.session.compid});
     res.end();
};

/*
 * This request-handler responds with user's current selected Company Name.
 * It is used for displaying company name in the Browser.
 */
exports.getCompany = function(req,res,next){    
     
       res.json({'compname' : req.session.compname});
       res.end();
};

/*
 * This request-handler calls up Menu Selection C program by passing user's telnetId and company.
 * The program responds with Menu-items, which are sent to the Browser in JSON format.
 */
exports.getMenu = function(req,res,next){
    var cmd = "services/FlatFileInterface/menu_selection "+req.session.telnetId+" "+req.session.compid;
    cp.exec(cmd,function(err,output,_){
                   res.json(output);                
             });
};

/*
 * This request-handler calls up Company Selection C program by passing user's telnetId.
 * The program responds with Company Names, which are sent to the Browser in JSON format.
 */
exports.getCmps = function(req,res,next){
    var cmd ="services/FlatFileInterface/company_selection " + req.session.telnetId;
    cp.exec(cmd,function(err,output,_){     
       res.json(output);
     });
};

/*
 * This request-handler responds with user's current tabId.
 */
exports.getTabId = function(req,res,next){
   
      var val = req.session.tab_id;
	  res.json({ 'tab_id' :  val});
      res.end();
};

/*
 * This request-handler is for OML.It recieves an username and checks for oneir_commands.
 * OML app sends requests by sending  WebID and its responded with oneir_commands, if available.
 */	
exports.getHideWindow = function(req,res,next){
           var temp = 'W';
           if(req.query.q != null && hideWindow[req.query.q] != null)
           { 
              temp = hideWindow[req.query.q];
              hideWindow[req.query.q] = null;
           }
            res.header('Content-Lenght', temp);         
            res.status(200).json({'command' : temp});
            res.end();
      };

/*
 * This request-handler stores oneir-menu command to the storage object with user's username as key.
 * Storage Object is an associative array.
 */	  
exports.setHideWindow = function(req,res){
          // if(req.query.q && req.session.me) 
              hideWindow[req.session.username] = req.query.q;  
              res.end(req.query.q);    
        };
		

/*
 * This request-handler sets user's TelnetID which is sent by the OML.
 */
exports.setTelnetID = function(req,res,next){
    
	if (typeof localStorage === "undefined" || localStorage === null) {
     var LocalStorage = require('node-localstorage').LocalStorage;
     localStorage = new LocalStorage('./telnetID');
     }
	 if(req.query.webId == null || req.query.telnetId == null )
	 {
		 res.end();
	 }
	 else
	 {
		 localStorage.setItem(req.query.webId,req.query.telnetId);
		 res.end();
	 }	 
};

/*
 * This request-handler responds with user's telnet-Id, which is used for displaying inthe browser.
 */
exports.getTelnetID = function(req,res,next){
      
	  if(req.session.telnetId)
	  {
		  res.json({ 'TelnetID' : req.session.telnetId});
      }
	  res.end();
};

/*
 * This request-handler gets browser tabid.It recieves an username and checks for browser tabid.
 *
 */		
exports.getBrowserClosureTabID = function(req,res,next){
           var temp = 'W';
           if(req.session.username != null && req.query.tabId && browserTabClosure[req.session.username] != null && browserTabClosure[req.session.username] == req.query.tabId)
           { 
              temp = browserTabClosure[req.session.username];
              browserTabClosure[req.session.username] = null;
           }         
            res.status(200).json({'tabId' : temp});
            res.end();
      };

/*
 * This request-handler sets closure id for tab to the storage object with user's username as key.
 * Storage Object is an associative array.
 */	  
exports.setBrowserClosureTabID = function(req,res){
             if(req.query.webId && req.query.BrowserTabId){ 
              browserTabClosure[req.query.webId] = req.query.BrowserTabId;  
              res.end(req.query.webId);
			 }
              else
			 {
				 res.end(); 
			 }			 
        };
		
/*
 * This request-handler user's company file's permission
 * It returns an json object with key as 'access' and values as '1' or '0'
 */	  
exports.getFlatFilePermission = function(req,res){
             fs.access('/var/oneir-cloud-try/services/FlatFileInterface/company_selection', fs.X_OK, function(err){
                    if(err){
						res.json({'access' : '0'});
						return;
					}
					else
					{
						fs.access('/var/oneir-cloud-try/services/FlatFileInterface/menu_selection', fs.X_OK, function(err){
						         if(err){
					               	 res.json({'access' : '0'});
					             }
                                  else{
									 res.json({'access' : '1'});  
								  }								 
						});
				    }
				 });
        };		

/*
 * This request-handler checks whether the .modules.file exists for the user.
 * It responds with json object
 */	  
exports.getModulesFP = function(req,res){
             
	   	  if(req.session.telnetId)
	      {
			   var path = '/var/vigilant/bin/.modules.'+req.session.telnetId;
		       fs.stat(path, function(err, stats){
                if (err || !stats.isFile()) {
                   res.json({'access' : '0'});
                   return;
                } 
				else
				{
				   res.json({'access' : '1'});
				}
			   });
          }
		  else
		  {
			   res.json({'access' : '-1'});
		  }
     };