var sessionId = -1;
// $('#IV11').collapse('toggle');
//$(menuToBeColl).collapse({"toggle": true, 'parent': menuToBeColl});
var options = {
               'GL' : 'General Ledger','AR' : 'Accounts Receivable','AP' : 'Accounts Payable', 'PO' : 'Purchase Order','JC':'Manufacturing Job Shop','IV':'Sales Order & Invoicing','PS':'Point of Sale','PR':'Payroll & Personnel Management','BM':'Bill of Materials',
               'SA' : 'Advanced Sales Analysis', 'PT' :'Professional Time Billing','CB':'Construction Billing','RB':'Repetitive Billing',         
               'IN' : 'Inventory Management'
              };


var L1 = {
          'GL' : ["Update chart of accounts.", "Post to general journal.", "Display account status.", "Set up special accounts.", "Set up budget accounts.", "Prepare bank reconciliation.", "Close fiscal period.", "Carry out year end closing.", "General ledger utilities menu.", "General ledger reports."],
          'AR' : ["Add, update or delete customers.", "Post (manually prepared) invoices and credit notes.", "Receive payments from customers.", "Display customers' account status.", "Print customer statements and post finance charges.", "Set up customer credit on hold.", "Remove paid invoices from A/R ledger.", "Set up terms, types, salesreps, contact action codes.", "Set up special customer pricing table.", "Accounts receivable utilities menu.", "Accounts receivable reports."],
          'AP' : ["Add, update or delete vendors", "Post vendor invoices and debit notes", "Make payments to selected vendors", "Prepare cash disbursements", "Display vendors account status", "Print accounts payable cheques.", "Remove paid invoices from A/P ledger.", "Accounts payable utilities menu.", "Accounts payable reports."],
		  'PO' : ["Prepare purchase orders.", "Generate purchase orders.", "Receive and/or invoice stock.", "Print purchase orders.", "Purchase order utilities menu", "Purchase order reports."],
	      'JC' : ["Add, update or delete jobs.","Charge labour to jobs.","Charge materials to jobs.","Adjust job purchases.","Display and invoice jobs.","Credit jobs.","Print invoices.","Job utility menu.","Job reports."], 
		  'IV' : ["Prepare sales orders and invoices.", "Prepare credit notes.", "Prepare quotations.", "Print pick pack slips, confirmations, quotes, proformae.", "Print invoices, credit notes and shipping labels.", "Process groups of invoices.", "Generate work orders.", "Set up special customer pricing table.", "Set up special inventory pricing table.", "Sales orders utilities menu.", "Sales orders reports."],
          'PS' : ["Make sales.", "Print clerk 'X' and grand 'Z' totals", "Remove posted point of sale invoices", "Special customer pricing table", "Special inventory pricing table.", "Point of sale utilities menu.", "Point of sale reports."],
		  'PR' : ["Employee menu.","Time tickets menu.","Payroll processing menu.","Print payroll cheques.","Year end processing menu.","Payroll utilities menu.","Payroll reports."],
	      'BM' : ["Add, update or delete bill of materials.","Add, update or delete schedule.","One step production.","Materials requirements planning.","Go to the bill of materials utilities menu.","Print the bill of materials listing.","Print shop orders.","Print production planning report.","Print bill of materials job listing."],
          'SA' : ["Print Inventory Transaction Report.", "  .", "Print Sales Analysis by Product Line.", "Print Sales Analysis by Customer.", "Print Sales Analysis by Territory.","Print Sales Analysis by Salesrep.","Print Sales Analysis by Supplier.","Print Sales Analysis with Year Comparisons.","Print Inventory List Price Change Report.","Purge Sales Analysis History","Sales History Data Mining.","Velocity Report."],
 		  'PT' : ["Add, update or delete jobs.","Charge labour to jobs.","Charge materials to jobs.","Adjust job purchases.","Display and invoice jobs.","Credit jobs.","Print invoices.","Job utility menu.","Job reports."], 
	      'CB' : ["Add, update or delete jobs.","Charge labour to jobs.","Charge materials to jobs.","Adjust job purchases.","Display and invoice jobs.","Credit jobs.","Print invoices.","Job utility menu.","Job reports."], 
	      'RB' : ["Add, update or delete contracts.", "Enter meter readings.", "Process billing cycle.", "Print repetitive billing invoices.", "Print proformae invoices.", "Enter extra billings.", "Set up contract types.", "Remove cancelled contracts.", "Print contract listing.", "Print usage follow up sheet."],
	      'IN' : ["Add, update or delete inventory items.", "Adjust inventory.", "Interdivisonal stock transfer.", "Display inventory product status.", "Adjust selling prices.", "Stocktaking menu.", "Set up Mix and Match.", "Set up Tag Along.", "Set up Kitting.", "Critical stock level transfer.", "Inventory management utilities menu.", "Inventory management reports."]
         };


var L2 = {	
		  'GL10' : ['Print the trial balance.','Print the account detail report.','Print the general journal.','Print the balance sheet.','Print the income statement.','Print the worksheet.','Print the chart of accounts.','Print the general ledger monthly account balances.','Print selected journals and audit trail.'],
          'AR11' : ['Print the customer master listing.','Print the customer accounts receivable ledger.','Print the aged accounts receivable report.','Print receivable collection report.','Print the sales register and profit commission report.','Print the sales journal.','Print the cash receipts journal.','Print the cash deposit slip.','Print the sales analysis reports.','Print the annual sales figures.','Print the customer memo and client contact reports.','Print labels.'],  
          'AP9'  : ['Print the vendor master listing.','Print the accounts payable report.','Print the aged accounts payable report.','Print the discount availability report.','Print the purchase journal.','Print the cash disbursements journal.','Print the cheque register.','Print the purchase analysis report.','Print the annual purchases report.','Print the vendor memo and supplier contact report.','Print vendor labels'],
          'PO6'  : ['Print the inventory stock level report.','Print the purchase order detail report.','Print the outstanding orders report.','Print the expediting report.','Print the accrued accounts payable report.','Print the orders receiving report.','Print the purchase price variance report.','Print the Order Guide.',"Print the purchase journal.","Print purchase analysis by vendor."],
          'JC9'  : ['Print job master listing.','Print labour report.','Print work detail report.','Print materials and services report.','Print purchases report.','Print job ledger report.','Print work in progress report.','Print job invoices report.','Print profitability report.','Print overview report.','Print shop orders base on estimates.','Estimate performance report menu.'],
          'IV11' : ['Print the sales orders booked report.','Print the outstanding sales orders report.','Print the quotation report.','Print the shipping schedule.','Print the Order Guide.','Print the sales register and profit commission report.','Print the special customer pricing report.','Print the special inventory pricing report.'],  
          'PS7'  : ['Print the receipts detail report.','Print the cash receipts journal.','Print the cash deposit slip.','Print the transaction detail report.','Print the sales register and profit commission report.','Print the sales journal.','Print the layaway transactions report.','Print the rental transactions report.',"Print the special customer pricing report.","Print the special inventory pricing report."],    
          'PR1'  : ['Add, update or delete employees.','Update employee earnings and deductions','Update employee year to date amounts','Display insurable earnings.'],    
          'PR2'  : ['Add, update or delete time tickets.','Print time tickets register.','Post time tickets.'],    
          'PR3'  : ['Generate pay transactions.','Add, update or delete pay transactions.','Print pay transactions register.','Process payroll.','Print wage journal.','Print cheque register.','Transfer payroll to bank.'],              
          'PR7'  : ['Print employee master listing.','Print employee phone list.','Print employee year to date report.','Print earnings and deductions history report.','Print employee wage review.','Print overtime report.','Print attendance report.','Print seniority report.','Print employee memo report.'],
          'PT9'  : ['Print job master listing.','Print labour report.','Print work detail report.','Print materials and services report.','Print purchases report.','Print job ledger report.','Print work in progress report.','Print job invoices report.','Print profitability report.','Print overview report.','Print shop orders base on estimates.','Estimate performance report menu.'],
          'CB9'  : ['Print job master listing.','Print labour report.','Print work detail report.','Print materials and services report.','Print purchases report.','Print job ledger report.','Print work in progress report.','Print job invoices report.','Print profitability report.','Print overview report.','Print shop orders base on estimates.','Estimate performance report menu.'],
         'IN12'  : ['Print a product listing.','Print product price list.','Print inventory valuation report.','Print inventory stock level report.','Sales analysis reports menu.','Print ABC stratification','Print lot usage report.','Print product warehouse and pricing labels.','Print the product memo report.'],                   
		 };	  
		
var L3 = {
	        'JC912' : ['Print job and quotation estimates.','Print cost variance report.','Print performance report.','Print overage report.'],
	        'PT912' : ['Print job and quotation estimates.','Print cost variance report.','Print performance report.','Print overage report.'],
	        'CB912' : ['Print job and quotation estimates.','Print cost variance report.','Print performance report.','Print overage report.'],
         };			  
$(function(){

       $.get("login_check",function(data){ 
		if(data.id==0)
		{
		    console.log("Menu Script is not working");
		}
		else 
		{
			           sessStorageInit();
		               setTabid();  
                      //events();
                     // menu();
                       getCompany();
					   setTitleBar('');
                       getMenu();
                       inventoryApp();
                       OnClickTab();
					   userCompanies();
                       exitTelnetBeforeLeaving();						   
		}
	},"json");
    
       
    }); 
	
	function setTabid()
	{
		if(!sessionStorage.getItem('tabId'))
		{
			getBrowserTabId();
		}
	}
	
	function sessStorageInit()
	{
		if(sessionStorage.getItem('tracking'))
		{
			var menuToBeColl = sessionStorage.getItem('menuSelected');
			 sessionStorage.clear();
			 sessionStorage.setItem('menuSelected', menuToBeColl);
			 sessionStorage.setItem("telnet98",'1');
		}
	}
	
	function setTitleBar(item)
	{
		 $.get('/getCompany',function(data){ 
                    if(data){
                        if(item === '') document.title = '['+data.compname+']';
                        else            document.title = '['+data.compname.substring(0, 3)+'CO]'+ item;
					}
					   },"json")	
	}
//
// START OF MENU LEVELS ADDING FUNCTIONS
// 

function template(item,id,code)
{   
    // LEVEL 1
     var temp = "";
     temp += templateHeader(code+'x',code,item,'menu');
	 temp += startofCascadingItemsBlock(code);
	 
     if( L1[code] != null)
	 {
         for(var i = 0,len = L1[code].length; i < len; i++)
         {
			 // LEVEL2
			 if(L2[code+(i+1)] != null)
			 {	 
		         temp += subMenuHeader(code+(i+1)+'x',code+(i+1),L1[code][i],code);
                 temp += subMenuDiv(code+(i+1));		 		 
			     for(var k = 0,xlen = L2[code+(i+1)].length; k < xlen; k++)
			    {
					 // LEVEL3
				      if(L3[code+(i+1)+''+(k+1)] != null)
			         {	 
		                 temp += subMenuHeader(code+(i+1)+''+(k+1)+'x',code+(i+1)+''+(k+1),L2[code+(i+1)][k],code+(i+1));
                         temp += subMenuDiv(code+(i+1)+''+(k+1));		 		 
			            for(var b = 0,xxlen = L3[code+(i+1)+''+(k+1)].length; b < xxlen; b++)
			           {
				            temp += addNewsubMenuOption(code+(i+1)+''+(k+1)+''+(b+1),L3[code+(i+1)+''+(k+1)][b],code+(i+1)+''+(k+1),' ---');
			           }
			           temp += endofCascadingItemsBlock();
                    }
			        else
			       {
				       temp += addNewsubMenuOption(code+(i+1)+''+(k+1),L2[code+(i+1)][k],code+(i+1),' --');
			       }
			    }
			     temp += endofCascadingItemsBlock();
             }
			 else
			 {
				 temp += addNewMenuOption(code+(i+1),L1[code][i],code);
			 }
	    }
	 }
	  temp += endofCascadingItemsBlock();
	 return temp;
 }

/*****
* Helper functions for adding Menu Items and Levels
******/
function templateHeader(id,ref,item,dataparent='')
{
	return "<a id=\""+id+"\" href=\"#" + ref + "\" class=\"list-group-item list-group-item-success strong\" data-toggle=\"collapse\" data-parent=\"#"+dataparent+"\">"+item+"<i class=\"fa fa-caret-down\"></i></a>";  
}
/*****
* Helper functions for adding Menu Items and Levels
******/
function addNewMenuOption(id,item,dataparent)
{
	return "<a id=\""+ id + "\" href=\"#\" class=\"list-group-item\" data-parent=\"#"+dataparent+"\">"+item+"</a>";
}
function addNewsubMenuOption(id,item,dataparent,layer)
{
	return "<a id=\""+ id + "\" href=\"#\" class=\"list-group-item\" data-parent=\"#"+dataparent+"\">"+layer+item+"</a>";
}
/*****
* Helper functions for adding Menu Items and Levels
******/
function startofCascadingItemsBlock(id)
{
	return "<div class=\"collapse\" id=\""+id+"\">"; 
}
/*****
* Helper functions for adding Menu Items and Levels
******/
function endofCascadingItemsBlock()
{
	return "</div>"; 
}
function subMenuDiv(id)
{
	return "<div class=\"collapse list-group-submenu\" id=\""+id+"\">"; 
}
function subMenuHeader(id,ref,item,dataparent='')
{
	return "<a id=\""+id+"\" href=\"#" + ref + "\" class=\"list-group-item strong\" data-toggle=\"collapse\" data-parent=\"#"+dataparent+"\">"+item+"<i class=\"fa fa-caret-down\"></i></a>";  
}
//
// END OF MENU LEVELS ADDING FUNCTIONS
//list-group-item strong
function xtemplate(item,id)
{
    return "<li id=\""+ id +"\"><a href=\"#\"><i class=\"fa fa-list-alt\"></i>"+item+"</a></li>";
}

function menu()
{
  $("#menu").html( "" + template("Customers",1) + template("Products",2) + template("Inventory",3) +  template("Show Window",4) +  template("Hide Window",5));
  $(document).on('click',"#" + 1, function(e){
                 e.preventDefault();  
                 $.get("oneir_commands",{ 'q' : 1 + ",0," + sessionId},function(d){});
	                      });
  $(document).on('click',"#" + 2, function(e){
                 e.preventDefault();  
                 $.get("oneir_commands",{ 'q' : 2 + ",0," + sessionId},function(d){});
	                      });
   $(document).on('click',"#" + 3, function(e){
                 e.preventDefault();  
                 $.get("oneir_commands",{ 'q' : 3 + ",0," + sessionId},function(d){});
	                      });
    $(document).on('click',"#" + 4, function(e){
                 e.preventDefault();  
                 $.get("oneir_commands",{ 'q' : "m" + ",0," + sessionId},function(d){});
	                      });
	 $(document).on('click',"#" + 5, function(e){
                 e.preventDefault();  
                 $.get("oneir_commands",{ 'q' : "h" + ",0," + sessionId},function(d){});
	                      });
 
}



function getBrowserTabId()
{
	$.get("/browser_tab_id",function(data){
		sessionId = data.tab_id; 
		if(sessionStorage)
		{
			sessionStorage.setItem("tabId",data.tab_id);
			sessionStorage.setItem("temp",data.tab_id);
		}
	},"json");
}

function inventoryApp()
{
    $("#inven_app").html( ""+xtemplate("Show Window","sw")+xtemplate("Hide Window","hw") + xtemplate("Ar Customers","inven_na") + xtemplate("Inventory","inven_table"));
    
	    $(document).on('click',"#inven_na", function(e){
                 e.preventDefault();  
                 window.open('/users','Ar Customers',
                             'width=900,height=500,resizable,status=0,top=150,left=380'
                             );
	                      });
        $(document).on('click',"#inven_table", function(e){
                 e.preventDefault();  
                 window.open('/inventory','Inventory','width=900,height=500,resizable,status=0,top=150,left=380');
	                      });
		$(document).on('click',"#sw", function(e){
                 e.preventDefault();  
                 $.get("oneir_commands",{ 'q' : "m" + ",0," + sessionStorage.getItem("tabId")},function(d){});
	                      });
		$(document).on('click',"#hw", function(e){
                 e.preventDefault();  
                $.get("oneir_commands",{ 'q' : "h" + ",0," + sessionStorage.getItem("tabId")},function(d){});
	                      });
					
		$(document).on('click','#go_cmp',function(e){
                            e.preventDefault();
                            $.get('/setCompany',{'compid':$('#cs').find(':selected').val(),'compname':$('#cs').find(':selected').text()},function(){
                                     window.location.href = "index.html";
                              });      
                           // window.location.href = "index.html";
                    });
   
}

function getCompany()
{
    $.get('/getCompany',function(data){ 
             if(data)
             $('#company-name').html(data.compname);
                       },"json");
}

function getMenu()
{
   $.get('/getMenu',function(data){
                    var m = data.split(" ");
                     var html = "";
                   for(var i = 0; i < m.length-1; i++)
                  {
                      html += template(options[m[i]],i+1,m[i]);
                  }
                 $("#menu").html(html);
				 // Binding event handlers to Level 2 & 3
				eventListenersForAllLevels(m);
				if(sessionStorage.getItem('menuSelected'))
				{
					$((sessionStorage.getItem('menuSelected')).substring(0, 3)).collapse('toggle');
					setTitleBar($(sessionStorage.getItem('menuSelected')).html());
					console.log(sessionStorage.getItem('menuSelected'));
					sessionStorage.removeItem('menuSelected');
				}
      });

   
}


function bindEventListeners(id,para1,para2)
{
		 $(document).on('click',id, function(e){
                 e.preventDefault();
				 sessionStorage.setItem('menuSelected',id);
                 if(sessionStorage. getItem("telnet98") === '1')
	             {
		             $.get("/getTabId",function(data){ 
		             sessionStorage.setItem('tabId',data.tab_id + 1);
					     $.get("oneir_commands",{ 'q' : para1+','+data.tab_id+','+para2 },function(d){
					 
				     	      sessionStorage.setItem("telnet98",'1');
  				              sessionStorage.removeItem('tabId');
				              sessionStorage.setItem("tabId",sessionStorage.getItem("temp"));
				              sessionStorage.removeItem('tracking');
				              console.log(sessionStorage.getItem("tabId"));
				          });
	                   },"json");
					sessionStorage.setItem('tracking','1');
			        window.open('/','_blank');
	             }
                  else
				 {			 
                    $.get("oneir_commands",{ 'q' : para1+','+sessionStorage.getItem('tabId')+','+para2 },function(d){ 
					     sessionStorage.setItem("telnet98",'1');
  				         sessionStorage.removeItem('tabId');
				         sessionStorage.setItem("tabId",sessionStorage.getItem("temp"));
				         sessionStorage.removeItem('tracking');
				         console.log(sessionStorage.getItem("tabId"));
				     });
					 setTitleBar($(id).html());
				 }
				 console.log($(id).html()); 
          });
}

function OnClickTab()
{
	document.addEventListener("visibilitychange", function() {
       if(document.visibilityState === 'hidden')
      {
<<<<<<< HEAD
		// $.get("oneir_commands",{ 'q' : "h" + ",0," + sessionId},function(d){});
        // console.log("Hide Window");
=======
		 $.get("oneir_commands",{ 'q' : "h" + ",0," + sessionId},function(d){});
         console.log("Hide Window");
>>>>>>> 67583c578bc1e9210603aa2658123975f962b0dd
      }
       else
		   if(document.visibilityState === 'visible')
     {
<<<<<<< HEAD
		   $.get("oneir_commands",{ 'q' : "m" + ",0," + sessionStorage.getItem("tabId")},function(d){});
		   console.log("Show Window");
=======
		// $.get("oneir_commands",{ 'q' : "m" + ",0," + sessionId},function(d){});
		 $.get("oneir_commands",{ 'q' : "m" + ",0," + sessionId},function(d){});
		 $.get("oneir_commands",{ 'q' : "m" + ",0," + sessionId},function(d){});
		 $.get("oneir_commands",{ 'q' : "M" + ",0," + sessionId},function(d){});
         console.log("Show Window");
>>>>>>> 67583c578bc1e9210603aa2658123975f962b0dd
     }
    });
	
	$(document).on('click','#logout', function(e){
		sessionStorage.clear();
		console.log('Session Storage Cleared.');
	});
}

function eventListenersForAllLevels(code)
{
        //
		//Binding event handlers to Level 2 & 3
	    //
		var telnetCorrespondence = ['0','A','B','C','D','E','F']; 
        for(var g = 0; g < code.length-1; g++)
        {
            if( L1[code[g]] != null)
	        {
                for(var i = 0,len = L1[code[g]].length; i < len; i++)
                {
			        // if submenu has submenu
			        if(L2[code[g]+(i+1)] != null)
			        {	 	 		 
			            for(var k = 0,xlen = L2[code[g]+(i+1)].length; k < xlen; k++)
			           {
							if(L3[code[g]+(i+1)+''+(k+1)] != null)
			               {	 
			                 for(var b = 0,xxlen = L3[code[g]+(i+1)+''+(k+1)].length; b < xxlen; b++)
			                {
								 var level1 = (g+1), level2 = (i+1),level3 = (k+1),level4 = (b+1);   
				                 if( (g+1) > 9 ) level1 = telnetCorrespondence[(g+1)%10];
							     if( (i+1) > 9 ) level2 = telnetCorrespondence[(i+1)%10];
							     if( (k+1) > 9 ) level3 = telnetCorrespondence[(k+1)%10];
								 if( (b+1) > 9 ) level4 = telnetCorrespondence[(b+1)%10];                                
							      bindEventListeners('#'+code[g]+(i+1)+''+(k+1)+''+(b+1),level1+','+level2,code[g]+','+level3+','+level4);
			                }
                           }
			               else
			              {
                            var level1 = (g+1), level2 = (i+1),level3 = (k+1);   
				            if( (g+1) > 9 ) level1 = telnetCorrespondence[(g+1)%10];
							if( (i+1) > 9 ) level2 = telnetCorrespondence[(i+1)%10];
							if( (k+1) > 9 ) level3 = telnetCorrespondence[(k+1)%10];
							bindEventListeners('#'+code[g]+(i+1)+''+(k+1),level1+','+level2,code[g]+','+level3);
			              }
			          }
                    }
			        else
			        {
							var level1 = (g+1), level2 = (i+1);   
				            if( (g+1) > 9 ) level1 = telnetCorrespondence[(g+1)%10];
							if( (i+1) > 9 ) level2 = telnetCorrespondence[(i+1)%10];
<<<<<<< HEAD
							bindEventListeners('#'+code[g]+(i+1),level1+','+level2,code[g]);
=======
							bindEventListeners('#'+code[g]+(i+1),level1+','+level2+','+sessionId+','+code[g]);
>>>>>>> 67583c578bc1e9210603aa2658123975f962b0dd
			        }
	             }
	        }
        }
}

function exitTelnetBeforeLeaving()
{
	window.onbeforeunload = function(){
		  $.get("oneir_commands",{ 'q' : "x" + ",0," + sessionStorage.getItem("tabId")},function(d){});
	};
}

function userCompanies()
{
	$.get("/ms",function(data){
                           var array = data.split(",");
                          var html = "<select class=\"selectpicker\" id=\"cs\">";
                         for(var i =0; i<array.length;i++)
                         {
                             var cmp = array[i].split("#");
                             html = html + "<option value=\""+cmp[1]+"\" >"+cmp[0]+"</option>";
                         }
                          html = html + "</select>";
                          html += "<button id=\'go_cmp\'type='\button'\ class='\btn'\>Go</button>";
						 $("#companies").html(html);
						 $('.selectpicker').selectpicker();
                    });
}
