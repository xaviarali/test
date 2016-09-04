var sessionId = -1;
var options = {
               'GL' : 'General Ledger','AR' : 'Accounts Receivable','AP' : 'Accounts Payable', 'PO' : 'Purchase Order','JC':'Manufacturing Job Shop','IV':'Sales Order & Invoicing','PS':'Point of Sale','PR':'Payroll & Personnel Management','BM':'Bill of Materials',
               'SA' : 'Advanced Sales Analysis', 'PT' :'Professional Time Billing','CB':'Construction Billing','RB':'Repetitive Billing',         
               'IN' : 'Inventory Management'
              };


var L1 = {
                'GL' : ["Update chart of accounts.", "Post to general journal.", "Display account status.", "Set up special accounts.", "Set up budget accounts.", "Prepare bank reconciliation.", "Close fiscal period.", "Carry out year end closing.", "General ledger utilities menu.", "General ledger reports."],
                'AR' : ["Add, update or delete customers.", "Post (manually prepared) invoices and credit notes.", "Receive payments from customers.", "Display customers' account status.", "Print customer statements and post finance charges.", "Set up customer credit on hold.", "Remove paid invoices from A/R ledger.", "Set up terms, types, salesreps, contact action codes.", "Set up special customer pricing table.", "Accounts receivable utilities menu.", "Accounts receivable reports."],
			    'AP' : ["Add, update or delete vendors", "Post vendor invoices and debit notes", "Make payments to selected vendors", "Prepare cash disbursements", "Display vendors account status", "Print accounts payable cheques.", "Remove paid invoices from A/P ledger.", "Accounts payable utilities menu.", "Accounts payable reports."],
			    'PO' : ["Prepare purchase orders.", "Generate purchase orders.", "Receive and/or invoice stock.", "Print purchase orders.", "Purchase order utilities menu", "Purchase order reports..."],
				'JC' : [], 
				'IV' : ["Prepare sales orders and invoices.", "Prepare credit notes.", "Prepare quotations.", "Print pick pack slips, confirmations, quotes, proformae.", "Print invoices, credit notes and shipping labels.", "Process groups of invoices.", "Generate work orders.", "Set up special customer pricing table.", "Set up special inventory pricing table.", "Sales orders utilities menu.", "Sales orders reports."],
				'PS' : ["Make sales.", "Print clerk 'X' and grand 'Z' totals", "Remove posted point of sale invoices", "Special customer pricing table", "Special inventory pricing table.", "Point of sale utilities menu.", "Point of sale reports."],
				'PR' : [],
				'BM' : ["Add, update or delete bill of materials.","Add, update or delete schedule.","One step production.","Materials requirements planning.","Go to the bill of materials utilities menu.","Print the bill of materials listing.","Print shop orders.","Print production planning report.","Print bill of materials job listing."],
				'SA' : ["Print Inventory Transaction Report.", "Print Sales Analysis by Product.", "Print Sales Analysis by Product Line.", "Print Sales Analysis by Customer.", "Print Sales Analysis by Territory.","Print Sales Analysis by Salesrep.","Print Sales Analysis by Supplier.","Print Sales Analysis with Year Comparisons.","Print Inventory List Price Change Report.","Purge Sales Analysis History","Sales History Data Mining.","Velocity Report."],
				'PT' : [],
				'CB' : [],
				'RB' : ["Add, update or delete contracts.", "Enter meter readings.", "Process billing cycle.", "Print repetitive billing invoices.", "Print proformae invoices.", "Enter extra billings.", "Set up contract types.", "Remove cancelled contracts.", "Print contract listing.", "Print usage follow up sheet."],
				'IN' : ["Add, update or delete inventory items.", "Adjust inventory.", "Interdivisonal stock transfer.", "Display inventory product status.", "Adjust selling prices.", "Stocktaking menu.", "Set up Mix and Match.", "Set up Tag Along.", "Set up Kitting.", "Critical stock level transfer.", "Inventory management utilities menu.", "Inventory management reports."]
              };
var L2 = {	
				//'IV1' : [],
				//'IV2' : [],
				//'IV3' : [],
				//'IV4' : [],
				//'IV5' : [],
				//'IV6' : [],
				//'IV7' : [],
                //'IV9' : [],
                //'IV10' : [],
    'AR11' : ['Print the customer master listing.','Print the customer accounts receivable ledger.','Print the aged accounts receivable report.','Print receivable collection report.','Print the sales register and profit commission report.','Print the sales journal.','Print the cash receipts journal.','Print the cash deposit slip.','Print the sales analysis reports.','Print the annual sales figures.','Print the customer memo and client contact reports.','Print labels.'],  
    'IV11' : ['Print the sales orders booked report.','Print the outstanding sales orders report.','Print the quotation report.','Print the shipping schedule.','Print the Order Guide.','Print the sales register and profit commission report.','Print the special customer pricing report.','Print the special inventory pricing report.'],  
     'PS7' : ['Print the receipts detail report.','Print the cash receipts journal.','Print the cash deposit slip.','Print the transaction detail report.','Print the sales register and profit commission report.','Print the sales journal.','Print the layaway transactions report.','Print the rental transactions report.',"Print the special customer pricing report.","Print the special inventory pricing report."],
		};	  
		
var L3 = {
	        'IV101' : ['AAAA','BBBB','CCCC'],
			'IV111' : ['YYYY','QQQQ','XXXX']
         };			  
$(function(){

       $.get("login_check",function(data){ 
		if(data.id==0)
		{
		    console.log("Menu Script is not working");
		}
		else
		{
		      getBrowserTabId();
                      //events();
                     // menu();
                      getCompany();
                      getMenu();
                      inventoryApp();
                      OnClickTab();					  
		}
	},"json");
    
       
    }); 
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
			 // if submenu has submenu
			 if(L2[code+(i+1)] != null)
			 {	 
		         temp += subMenuHeader(code+(i+1)+'x',code+(i+1),L1[code][i],code);
                 temp += subMenuDiv(code+(i+1));		 		 
			     for(var k = 0,xlen = L2[code+(i+1)].length; k < xlen; k++)
			    {
				     temp += addNewsubMenuOption(code+(i+1)+''+k,L2[code+(i+1)][k],code+(i+1));
					
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
function addNewsubMenuOption(id,item,dataparent)
{
	return "<a id=\""+ id + "\" href=\"#\" class=\"list-group-item\" data-parent=\"#"+dataparent+"\">"+' --'+item+"</a>";
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
		sessionId = data.tab_id; //alert("sesId:"+sessionId);
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
                 $.get("oneir_commands",{ 'q' : "m" + ",0," + sessionId},function(d){});
	                      });
		$(document).on('click',"#hw", function(e){
                 e.preventDefault();  
                $.get("oneir_commands",{ 'q' : "h" + ",0," + sessionId},function(d){});
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
					  //for(var i = 0; i < 1; i++)
                  {
                      html += template(options[m[i]],i+1,m[i]);
                  }
                 $("#menu").html(html);
	   		     var code = m;
				 /*
				 ** Binding event handlers to Level 2 & 3
				 */
				 var telnetCorrespondence = ['0','A','B','C','D','E','F']; 
             	  for(var g = 0; g < code.length-1; g++)
                 {
                     if( L1[code[g]] != null)
	               {
                      for(var i = 0,len = L1[code[g]].length; i < len; i++)
                     {
			              // if submenu has submenu
			             if(L2[code+(i+1)] != null)
			            {	 
		                     temp += subMenuHeader(code+(i+1)+'x',code+(i+1),L1[code][i],code);
                             temp += subMenuDiv(code+(i+1));		 		 
			                 for(var k = 0,xlen = L2[code+(i+1)].length; k < xlen; k++)
			                 {
				                     temp += addNewsubMenuOption(code+(i+1)+''+k,L2[code+(i+1)][k],code+(i+1));
									 bindEventListeners('#'+(k+1)+'s'+i,(k+1)+','+(i+1)+','+sessionId);
			                 }
			                  temp += endofCascadingItemsBlock();
                        }
			             else
			             {
							  var level1 = (g+1), level2 = (i+1);   
				              if( (g+1) > 9 ) m1 = telnetCorrespondence[(g+1)%10];
							  if( (i+1) > 9 ) m1 = telnetCorrespondence[(i+1)%10];
							  bindEventListeners('#'+code+(i+1),level1+','+level2+','+sessionId);
			             }
	                 }
	               }
                 }
      });

   
}

function bindEventListeners(id,para)
{
		 $(document).on('click',id, function(e){
                 e.preventDefault();  
                 $.get("oneir_commands",{ 'q' : para },function(d){});
            });
}

function OnClickTab()
{
	document.addEventListener("visibilitychange", function() {
       if(document.visibilityState === 'hidden')
      {
		 $.get("oneir_commands",{ 'q' : "h" + ",0," + sessionId},function(d){});
         console.log("Show Window");
      }
       else if(document.visibilityState === 'visible')
     {
		 $.get("oneir_commands",{ 'q' : "m" + ",0," + sessionId},function(d){});
         console.log("Hide Window");
     }
    });
}