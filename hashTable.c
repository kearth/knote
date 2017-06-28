#define TABLE_SIZE (1024*1024)
#define NULLKEY 0;

HashTable* create_hash_table()
{
    HashTable* pHashTable = (HashTable*)malloc(sizeof(HashTable));
    memset(pHashTable,0,sizeof(HashTable));
    return pHashTable;
}

Node* search_in_table(HashTable* pHashTable,int data)
{
    Node* pNode;
    if(NULL == pHashTable)
    {
        return NULL;
    }

    if(NULL == (pNode = pHashTable->value[data % 10]))
    {
        return NULL;
    }

    while(pNode)
    {
        if(data == pNode->data)
        {
            return pNode;
        }
        pNode = pNode->next;
    }
    return NULL;
}

int insert_into_table(HashTable* pHashTable,int data)
{
    Node* pNode;
    if(NULL == pHashTable)
    {
        return FALSE;
    }

    if(NULL == pHashTable->value[data % 10])
    {
        pNode = (Node*)malloc(sizeof(Node));
        memset(pNode,0,sizeof(Node));
        pNode->data = data;
        pHashTable->value[data % 10] = pNode;
        return TRUE;
    }
    
    if(NULL != search_in_table(pHashTable,data))
    {
        return FALSE;
    }

    pNode = pHashTable->value[data % 10];
    while(NULL != pNode->next)
    {
        pNode = pNode->next;
    }

    pNode->next = (Node*)malloc(sizeof(Node));
    memset(pNode->next,0,sizeof(Node));
    pNode->next->data = data;
    return TRUE;
}

int delete_data_from_table(HashTable* pHashTable,int data)
{
    Node* pHead;
    Node* pNode;
    if(NULL == pHashTable || NULL == pHashTable->value[data % 10])
    {
        return FALSE;
    }

    if(NULL == (pNode = search_in_table(pHashTable,data)))
    {
        return FALSE;
    }

    if(pNode == pHashTable->value[data % 10])
    {
        pHashTable->value[data % 10] = pNode->next;
        free(pNode);
        return TRUE;
    }
    pHead = pHashTable->value[data % 10];
    while(pNode != pHead->next)
    {
        pHead = pHead->next;
    }
    pHead->next = pNode->next;
    return TRUE;
}



