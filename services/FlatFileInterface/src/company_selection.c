/****
* Company Selection
* - takes in User Id as command line parametre.
*
*  Written By: Zaaviar Ali
*              Cenedex Solutions
****/

#include<stdio.h>
#include<string.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include<ctype.h>

// lenght of each record in the file
#define record_size 73
///var/vigilant/
#define path "/var/vigilant/"
// struct to hold the read data
struct format
{
   char c[record_size];
};
/* function prototypes */
void removeSpecialChars(char* str);
void company(char* user_id);

/*Entry Point of the Program*/
int 
main(int argc,char** argv)
{
   company(argv[1]);
}

/* removes special characters from generated strings */
void removeSpecialChars(char* str)
{
    for(int i = 29; i > -1;i--)
    {
       if(isalpha(str[i]))
       {
          str[i+1] = '\0';
          return;
       } 
    }
}
// function company, takes an argument i.e userid
void company(char* user_id)
{
   // variable to store the file name
   char company_filename[50];
   char cmp_buffer[50];
   sprintf(company_filename,"%sbin/.company.%s",path,user_id);
   //printf("path=%s\n",company_filename);
   
   FILE* usr_cmpy = fopen(company_filename,"r");
   if(usr_cmpy == NULL) 
   {
      //printf("File cant be read.%s\n",company_filename);
      return;
    }
   int count = 0;
   // read total number of companies from user's company file
   fscanf(usr_cmpy,"%d\n",&count);
   // buffer
   struct format temp;
   
   char sysparamPath[100];
  
   for(int i = 0; i < count; i++)
   {
       fgets(cmp_buffer,50,usr_cmpy);
       cmp_buffer[strlen(cmp_buffer)-1] = '\0';
      // printf("%s\n",cmp_buffer);
       sprintf(sysparamPath,"%s%s/data/sysparam.rnd",path,cmp_buffer);
       //printf("path=%s\n",sysparamPath);
       FILE* rnd = fopen(sysparamPath,"r");
       if(rnd == NULL)
       {
         //printf("File cant be read.%s\n",sysparamPath);
         continue;
       }
      
       for(int k = 0; k < 6; k++)
         fread(&temp, 73, 1, rnd);
      
      if(temp.c[0] == '@')
      {
         char buffer[31];
         memcpy(buffer, temp.c+1, 30);
         removeSpecialChars(buffer);
         printf("%s#%s",buffer,cmp_buffer);       
      }
      else
      {
         //printf("%s.\n",cmp_buffer);
      }
      if(i != count -1)
        printf(",");
      
      fclose(rnd);   
   }
   
}
