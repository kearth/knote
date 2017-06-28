#define OPER_VERSON "-v"
#define OPER_HELP   "-h"
#define OPER_TEST   "-t"

void cli(char* oper)
{
    if(strcmp(OPER_VERSON,oper) == 0)
    {
        printf("%s\n","1.0.0v");
    }

    if(strcmp(OPER_HELP,oper) == 0)
    {
        printf("%s\n","there is no help");   
    }

    if(strcmp(OPER_TEST,oper) == 0)
    {
        test();
    }
}
