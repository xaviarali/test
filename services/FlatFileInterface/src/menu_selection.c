/****
* Menu Selection
* - takes in User Id & Company Name as command line parameters.
*
*  Written By: Zaaviar Ali
*              Cenedex Solutions
****/

/*Header files*/
#include<stdio.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <ctype.h>
#include<string.h>
#include<ctype.h>
/*MACROS defining global constants*/
/*lenght of each record in the file*/
#define record_size 73
/* path to data folder */
#define path "/var/vigilant/"

/* struct to hold the read data*/
struct format
{
   char c[record_size];
};
/* function prototypes */
void finalMenu(char* pur,char* allowed,char* final);
void modules(char* user_id, char* company_folder);


/*Entry Point of the Program*/
int 
main(int agrc,char** argv)
{
   modules(argv[1],argv[2]);
}


/*function which computes the final menu items allowed to the user */
void finalMenu(char* pur,char* allowed,char* final)
{
   final[0] = '\0';
   char buffer[4];
   int i = 0, len = strlen(allowed);
   for(i = 0; i < len; i+=2)
   {
     for(int k = 0,len = strlen(pur); k < len; k+=2)
     {
         if(pur[k] == allowed[i] &&  pur[k+1] == allowed[i+1])
         {
            buffer[0] = pur[k]; buffer[1] = pur[k+1]; buffer[2] = ' '; buffer[3] = '\0';
            strcat(final,buffer);
         }  
     }
   }
}
/* function which extracts data out of flat files */
void modules(char* user_id, char* company_folder)
{
     char purchased[100];
     char allowed[100];
     
     purchased[0] ='\0';
     allowed[0] ='\0';
   // variable to store the file name
     char JC = 'N';
     char company_folder_path[50];
     sprintf(company_folder_path,"%s%s/data/sysparam.rnd",path,company_folder);
     FILE* cmpy = fopen(company_folder_path,"r");
     if(cmpy == NULL) return;
     //  buffer
      struct format temp;
      for(int k = 0; k < 2; k++)
      fread(&temp, 73, 1, cmpy);
     // int pindex = 0;
      if(temp.c[0] == '@')
      {     
        // General Ledger
         if(toupper(temp.c[23]) == 'Y'){ // purchased = purchased + "GL"
        // printf("GL\n"); 
          strcat(purchased,"GL");                      
         }
        // Accounts Receivable 
        if(toupper(temp.c[24]) == 'Y'){ // purchased = purchased + "AR"
           // printf("AR\n"); 
             strcat(purchased,"AR");
         }
        // Accounts Payable 
        if(toupper(temp.c[25]) == 'Y'){ // purchased = purchased + "AP"
         //   printf("AP\n"); 
             strcat(purchased,"AP");
         }
        // Inventory Management
        if(toupper(temp.c[26]) == 'Y'){ // purchased = purchased + "IN"
          //  printf("IN\n"); 
            strcat(purchased,"IN");
          }
        // Purchase Order
        if(toupper(temp.c[28]) == 'Y'){ // purchased = purchased + "PO"
        // printf("PO\n"); 
           strcat(purchased,"PO");
          }
        // Manufacturing Job Shop
        if(toupper(temp.c[29]) == 'Y' && JC =='N'){ // purchased = purchased + "JC"
          //printf("JC\n"); 
            strcat(purchased,"JC");
            JC = 'Y';
          }
        // Sales Order & Invoicing  
        if(toupper(temp.c[30]) == 'Y'){ // purchased = purchased + "IV"
            //printf("IV\n");  
            strcat(purchased,"IV");
          }
        // Point of Sale   
        if(toupper(temp.c[31]) == 'Y'){ // purchased = purchased + "PS"
             //printf("PS\n"); 
              strcat(purchased,"PS");
          }
        // Payroll & Personnel Management 
        if(toupper(temp.c[32]) == 'Y'){ // purchased = purchased + "PR"
            // printf("PR\n");
             strcat(purchased,"PR");
         }
        // Bill of Materials  
        if(toupper(temp.c[33]) == 'Y'){ // purchased = purchased + "BM"
           //printf("BM\n"); 
            strcat(purchased,"BM");
         }
        // Advanced Sales Analysis   
        if(toupper(temp.c[34]) == 'Y'){ // purchased = purchased + "SA"
           // printf("SA\n"); 
           strcat(purchased,"SA");
         }
        // Professional Time Billing
        if(toupper(temp.c[36]) == 'Y' && JC =='N'){ // purchased = purchased + "JC"
          // printf("JC\n");
           strcat(purchased,"JC");
           JC = 'Y';
         }
        // Construction Billing
        if(toupper(temp.c[37]) == 'Y' && JC =='N'){ // purchased = purchased + "JC"
          //printf("JC\n");
          strcat(purchased,"JC");
          JC = 'Y';
         }
        // Repetitive Billing 
        if(toupper(temp.c[38]) == 'Y'){ // purchased = purchased + "RB"    
           //printf("RB\n"); 
            strcat(purchased,"RB");
         }
      }   
   // ' *** Step2: does /var/vigilant/bin/.modules.zaviar exist ? 
   // ' ***        if it does - read the modules he has access to.
   // ' ***        otherwise he has access to all Oneir modules, from a 'user' level. 
   char user_module[100];
   sprintf(user_module,"%sbin/.modules.%s",path,user_id);
   FILE* umodule = fopen(user_module,"r"); 
   
   if(umodule != NULL)
   {
      char mbuffer[5];
      while(fscanf(umodule,"%s\n",mbuffer) != EOF)
      {
         if(toupper(mbuffer[0])=='I' && toupper(mbuffer[1])== 'V')
            strcat(allowed,"IV");
         else
            if(toupper(mbuffer[0]) =='R' && toupper(mbuffer[1])== 'B')
               strcat(allowed,"RB");
         else
            if(toupper(mbuffer[0]) =='P' && toupper(mbuffer[1])=='S')
              strcat(allowed,"PS");
         else
            if(toupper(mbuffer[0]) =='A' && toupper(mbuffer[1])=='R')
               strcat(allowed,"AR");
         else
            if(toupper(mbuffer[0]) =='I' && toupper(mbuffer[1])=='N')
               strcat(allowed,"IN");
         else
            if(toupper(mbuffer[0]) =='S' && toupper(mbuffer[1])=='A')
               strcat(allowed,"SA");
         else
            if(toupper(mbuffer[0]) =='J' && toupper(mbuffer[1])=='C')  
               strcat(allowed,"JC");
         else
             if(toupper(mbuffer[0]) =='B' && toupper(mbuffer[1])=='M')
               strcat(allowed,"BM");
         else
             if(toupper(mbuffer[0]) =='A' && toupper(mbuffer[1])=='P')
               strcat(allowed,"AP");
         else
             if(toupper(mbuffer[0]) =='P' && toupper(mbuffer[1])=='R')
               strcat(allowed,"PR");
         else
             if(toupper(mbuffer[0]) =='G' && toupper(mbuffer[1])=='L')
               strcat(allowed,"GL");
         else
             if(toupper(mbuffer[0]) =='P' && toupper(mbuffer[1])=='O')
               strcat(allowed,"PO");
      }
   } 
   else
   {
        strcat(allowed,"IVRBPSARINSAJCBMAPPRGLPO");
   }
   char final[100]; 
   finalMenu(purchased,allowed,final);
   printf("%s",final);
}
