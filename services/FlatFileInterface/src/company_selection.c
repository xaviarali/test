/****
* Company Selection
* - takes in User Id as command line parametre.
*
*  Written By: Zaaviar Ali
*              Cenedex Solutions
* Updated & Optimezed: 22-Oct-2016 
****/

#include<stdio.h>
#include<string.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include<ctype.h>
#include "frozen.h"
// lenght of each record in the file
#define record_size 73
// length of each record in the sysparam file
#define sysparam_rec_size 73
// length of each record in the syshware file
#define syshware_rec_size 109

#define DIV_CODE_SIZE 2
#define DIV_NAME_SIZE 29 
#define PC_CODE_SIZE 2 
#define PC_NAME_SIZE 29 
// max lenght of company name
#define COMPANY_NAME_LEN 30
// NULL terminator
#define Null 1
//var/vigilant/
#define path "/var/vigilant/"
// struct to hold the read data

/* function prototypes */
void removeSpecialChars(char* str);
/* prints out Company Name, Code, Division names & Codes */
void company(char* user_id);


/*Entry Point of the Program*/
int 
main(int argc,char** argv)
{
   // call function company and pass telnetid to it
   company(argv[1]);
}

/* removes special characters from generated strings */
void removeSpecialChars(char* str)
{
	// start from the end of the string till start, unless an alphabet is found
    for(int i = strlen(str)-1; i > -1;i--)
    {
       // read character is alphabet
   	   if(isalpha(str[i]))
       {
          // null terminate the string
		  str[i+1] = '\0';
		  // return
          return;
       } 
    }
}
// function company, takes an argument i.e userid
void company(char* telnetID)
{
   // an array to store file/path name of the user's company info file
   char company_filename[50];
   // an array to store company_code read from the file
   char company_code[50];
   // create a string containing the path to user's company file
   sprintf(company_filename,"%sbin/.company.%s",path,telnetID);
   
   FILE* usr_cmpy = fopen(company_filename,"r");
   if(usr_cmpy == NULL) 
   {
      return;
   }
   // variable to store total number of companies for the user 
   int NO_OF_COMPANIES = 0;
   // read total number of companies from user's company file
   fscanf(usr_cmpy,"%d\n",&NO_OF_COMPANIES);
   // buffer for storing the read record
   char sysparamRECORD[record_size];
   // an array for storing sysparam's path
   char sysparamPath[100];
   // start of JSON-array
   printf("[");
   // iterate over list of company codes for the user
   for(int i = 0; i < NO_OF_COMPANIES; i++)
   {
	   // read user's company file and get company-code out of it
       fgets(company_code,50,usr_cmpy);
       // store the company code into a char array and null terminate it
	   company_code[strlen(company_code)-1] = '\0';
       // create a string containing full path to sysparamfile for the company
	   sprintf(sysparamPath,"%s%s/data/sysparam.rnd",path,company_code);
       // open the file and get a pointer to it
	   FILE* rnd = fopen(sysparamPath,"r");
       // error checking
	   if(rnd == NULL)
       {
		 // maybe file doesnt exist, move to other company-code if exist
         continue;
       }
	   // variable for storing total number of divisions
       short totalDivisions = 0;
	   // read the first 2 bytes of the file 
       fread(&totalDivisions,2, 1, rnd);
	   // move to the start of the 6th Record
       fseek(rnd,(record_size*5)-2,SEEK_CUR);
	   // read the 6th recird ann store it into buffer
         fread(sysparamRECORD,record_size, 1, rnd);
      // company name found
      if(sysparamRECORD[0] == '@')
      {
         // for company name and company code
         char company_name[COMPANY_NAME_LEN + Null];
         // extract company_name and copy it to company_name array
         memcpy(company_name, sysparamRECORD+1, COMPANY_NAME_LEN);
         // null terminate the string
         company_name[COMPANY_NAME_LEN] = '\0';
         // remove any special characters from the string
         removeSpecialChars(company_name);
         
         // for division name and division-code
         /* space optimization*/
         
         // space required for commas
         int commas = (totalDivisions-1);
         // space required for quotes
         int quotes = totalDivisions*2;
         /* for storing all the divisions names,codes,profit center codes & names*/
         // array for all division names
         char divNames[ (DIV_NAME_SIZE * totalDivisions) + quotes + commas + Null];
         // array for all division codes
         char divCodes[ (DIV_CODE_SIZE * totalDivisions) + quotes + commas + Null];
         // array for all profit-center codes
         char pcCodes[(PC_CODE_SIZE * totalDivisions) + quotes + commas + Null];
         // array for all profit-center names
         char pcNames[(PC_NAME_SIZE * totalDivisions) + quotes + commas + Null];
         // intialize all the char arrays
         divNames[0] = '\0'; divCodes[0] = '\0'; pcCodes[0] = '\0'; pcNames[0] = '\0';
         // variables for keep track of lenghts of char arrays 
         int lenDC = 0,lenDN = 0,lenPCC = 0,lenPCN = 0;
         
         // read 7th record from the file   
         for(int i = 7,index = 0,range = 7+totalDivisions; i < range; i++,index++)
         { 
             // read the whole record into buffer
             fread(sysparamRECORD,record_size, 1, rnd);
             // insert starting quotes
             divNames[lenDN++] = '\"'; divCodes[lenDC++] = '\"'; pcCodes[lenPCC++] = '\"'; pcNames[lenPCN++] = '\"';
             // null terminate the string
             divNames[lenDN] = '\0'; divCodes[lenDC] = '\0'; pcCodes[lenPCC] = '\0'; pcNames[lenPCN] = '\0';
             
             // extract division code and copy it to char array for division codes
             strncat(divCodes, sysparamRECORD,DIV_CODE_SIZE);   lenDC += DIV_CODE_SIZE;
             // extract division names and copy it to char array for division names
             strncat(divNames, sysparamRECORD+2,DIV_NAME_SIZE); lenDN += DIV_NAME_SIZE;
             // extract profit-center code and copy it to char array for profit-center codes
             strncat(pcCodes, sysparamRECORD+39,PC_CODE_SIZE);   lenPCC += PC_CODE_SIZE;
             // extract profit-center name and copy it to char array for profit-center names
             strncat(pcNames, sysparamRECORD+41,PC_NAME_SIZE);  lenPCN += PC_NAME_SIZE;
             // remove all the special characters from the end
             removeSpecialChars(divCodes);removeSpecialChars(divNames);removeSpecialChars(pcCodes);removeSpecialChars(pcNames);
             // get the current lenght of the char arrays
             lenDC = strlen(divCodes);lenDN = strlen(divNames);lenPCC = strlen(pcCodes);lenPCN = strlen(pcNames);
             // insert ending quotes
             divNames[lenDN++] = '\"'; divCodes[lenDC++] = '\"'; pcCodes[lenPCC++] = '\"'; pcNames[lenPCN++] = '\"';
             // null-terminate the string
             divNames[lenDN++] = '\0'; divCodes[lenDC++] = '\0'; pcCodes[lenPCC++] = '\0'; pcNames[lenPCN++] = '\0';
             
             // if we are not reading the last-entry then add commas
             if(index != totalDivisions -1)
             {
                // add commas
                divNames[lenDN-1] = ','; divCodes[lenDC-1] = ','; pcCodes[lenPCC-1] = ','; pcNames[lenPCN-1] = ',';
                // terminate the string
                divNames[lenDN] = '\0'; divCodes[lenDC] = '\0'; pcCodes[lenPCC] = '\0'; pcNames[lenPCN] = '\0';
             }
         }
         
         // buffer for storing output/data in JSON format
         char buf[500];
         // intialize space for JSON
         struct json_out out = JSON_OUT_BUF(buf, 500);
         // format the string in JSON
         json_printf(&out, "{companyName: %Q, companyCode: %Q, divCodes: [%s], divNames: [%s], pcCodes: [%s], pcNames: [%s] }", company_name, company_code,divCodes,divNames,pcCodes,pcNames);
        // print the string in JSON format 
         printf("%s",buf);       
    
        // if not the last company print a comma
         if(i != NO_OF_COMPANIES -1)
           printf(",");
      }  
      // close the handle to file
      fclose(rnd);   
   }
   // end of JSON-array
   printf("]");
}