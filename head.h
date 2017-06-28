#include <stdio.h>
#include <stdint.h>
#include <stdlib.h> 
#include <string.h>
#define FALSE 0
#define TRUE  1
typedef unsigned int UINT_8;
typedef struct _Node
{
    int data;
    struct _Node* next;
}Node;
typedef struct _HashTable
{
    Node* value[10];
}HashTable;
