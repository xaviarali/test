var sessionId = -1;
var options = {
               'GL' : 'General Ledger','AR' : 'Accounts Receivable','AP' : 'Accounts Payable', 'PO' : 'Purchase Order','JC':'Manufacturing Job Shop','IV':'Sales Order & Invoicing','PS':'Point of Sale','PR':'Payroll & Personnel Management','BM':'Bill of Materials',
               'SA' : 'Advanced Sales Analysis', 'PT' :'Professional Time Billing','CB':'Construction Billing','RB':'Repetitive Billing',         
               'IN' : 'Inventory Management'
              };


var subItems = {
                'GL' : ["Update chart of accounts.", "Post to general journal.", "Display account status.", "Set up special accounts.", "Set up budget accounts.", "Prepare bank reconciliation.", "Close fiscal period.", "Carry out year end closing.", "General ledger utilities menu.", "General ledger reports..."],
                'AR' : ["Add, update or delete customers.", "Post (manually prepared) invoices and credit notes.", "Receive payments from customers.", "Display customers' account status.", "Print customer statements and post finance charges.", "Set up customer credit on hold.", "Remove paid invoices from A/R ledger.", "Set up terms, types, salesreps, contact action codes.", "Set up special customer pricing table.", "Accounts receivable utilities menu.", "Accounts receivable reports..."],
			    'AP' : ["Add, update or delete vendors", "Post vendor invoices and debit notes", "Make payments to selected vendors", "Prepare cash disbursements", "Display vendors account status", "Print accounts payable cheques.", "Remove paid invoices from A/P ledger.", "Accounts payable utilities menu.", "Accounts payable reports..."],
			    'PO' : ["Prepare purchase orders.", "Generate purchase orders.", "Receive and/or invoice stock.", "Print purchase orders.", "Purchase order utilities menu", "Purchase order reports..."],
				'JC' : [], 
				'IV' : ["Prepare sales & invoices.", "Prepare credit notes", "Prepare quotations.", "Print slips,quotes,performae", "Print invoices,credit notes", "Process groups of invoices", "Generate work orders", "Special customer pricing table.", "Special inventory pricing table.", "Sales orders utilities menu.", "Sales Order Report Menu"],
				'PS' : ["Make sales.", "Print clerk 'X' and grand 'Z' totals", "Remove posted point of sale invoices", "Special customer pricing table", "Special inventory pricing table.", "Point of sale utilities menu.", "Point of sale reports..."],
				'PR' : [],
				'BM' : ["Add, update or delete bill of materials.","Add, update or delete schedule.","One step production.","Materials requirements planning.","Go to the bill of materials utilities menu.","Print the bill of materials listing.","Print shop orders.","Print production planning report.","Print bill of materials job listing."],
				'SA' : ["Print Inventory Transaction Report.", "Print Sales Analysis by Product.", "Print Sales Analysis by Product Line.", "Print Sales Analysis by Customer.", "Print Sales Analysis by Territory.","Print Sales Analysis by Salesrep.","Print Sales Analysis by Supplier.","Print Sales Analysis with Year Comparisons.","Print Inventory List Price Change Report.","Purge Sales Analysis History","Sales History Data Mining.","Velocity Report."],
				'PT' : [],
				'CB' : [],
				'RB' : ["Add, update or delete contracts.", "Enter meter readings.", "Process billing cycle.", "Print repetitive billing invoices.", "Print proformae invoices.", "Enter extra billings.", "Set up contract types.", "Remove cancelled contracts.", "Print contract listing.", "Print usage follow up sheet."],
				'IN' : ["Add, update or delete inventory items.", "Adjust inventory.", "Interdivisonal stock transfer.", "Display inventory product status.", "Adjust selling prices.", "Stocktaking menu.", "Set up Mix and Match.", "Set up Tag Along.", "Set up Kitting.", "Critical stock level transfer.", "Inventory management utilities menu.", "Inventory management reports..."]
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
    

function template(item,id,code)
{
     var temp = "";
     temp += "<a id=\"m"+id+"\" href=\"#" + id + "\" class=\"list-group-item list-group-item-success strong\" data-toggle=\"collapse\" data-parent=\"#item\">"+item+"<i class=\"fa fa-caret-down\"></i></a>";
     temp += "<div class=\"collapse\" id=\""+id+"\">";
	// bindEventListeners('#m'+id,id+','+0+','+sessionId);
     if( subItems[code] != null)
	 {
         for(var i = 0,len = subItems[code].length; i < len; i++)
         {
	         temp += "<a id=\""+ id + "s" + i + "\" href=\"#\" class=\"list-group-item\">"+subItems[code][i]+"</a>";
			// bindEventListeners('#'+(i+1)+'s'+i,id+','+(i+1)+','+sessionId);
         }
	 }
	  temp += "</div>";
	 return temp;
}

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
                  {
                      html += template(options[m[i]],i+1,m[i]);
                  }
                 $("#menu").html(html);
	   		      for(var k = 0; k < m.length-1; k++)
                 {
                     if( subItems[m[k]] != null)
	                {
                         for(var i = 0,len = subItems[m[k]].length; i < len; i++)
					     {
	                          bindEventListeners('#'+(k+1)+'s'+i,(k+1)+','+(i+1)+','+sessionId);
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