#include "head.h"
#include "hash.c"
#include "hashTable.c"
#include "variable.c"
#include "cli.c"

int main(int argc,char** argv)
{

    cli(argv[1]);
    /*HashTable* hashTable = create_hash_table();*/
    /*insert_into_table(hashTable,1);*/
    /*insert_into_table(hashTable,12);*/
    /*insert_into_table(hashTable,21);*/
    /*insert_into_table(hashTable,4);*/

    /*Node* node1 = search_in_table(hashTable,12);*/
    /*Node* node2 = search_in_table(hashTable,21);*/
    /*printf("hashTable 1: %d\n",hashTable->value[1]->data);*/
    /*if(hashTable->value[2] == NULL)*/
        /*printf("hashTable 2 is null\n");*/
    return 0;
}
