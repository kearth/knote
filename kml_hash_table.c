#define HASH_TALBE_INIT_SIZE (1024*1024)
#define FAILED 0
#define SUCCESS 1


typedef struct S_Bucket
{
    char *key;
    void *value;
    struct S_Bucket *next;
} Bucket;

typedef struct S_HashTable
{
    int size;
    int elem_num;
    Bucket **buckets;
} HashTable;


int hash_init(HashTable *ht);
int hash_lookup(HashTable *ht, char *key, void **result);
int hash_insert(HashTable *ht, char *key, void *value);
int hash_remove(HashTable *ht, char *key);
int hash_destory(HashTable *ht);
static void resize_hash_table_if_needed(HashTable *ht);
static int hash_resize(HashTable *ht);

int hash_init(HashTable *ht)
{
    ht->size = HASH_TALBE_INIT_SIZE;
    ht->elem_num = 0;
    ht->buckets  = (Bucket **)calloc(ht->size, sizeof(Bucket *));

    if(ht->buckets == NULL) return FAILED;
    
    log_msg("kml_hash_table/hash_init is error");

    return SUCCESS;
}


int hash_insert(HashTable *ht, char *key,void *value)
{
    resize_hash_table_if_needed(ht);

    int index = hash_index(key,ht->size);
    
    Bucket *org_bucket = ht->buckets[index];
    Bucket *tmp_bucket = org_bucket;
    
    // check if the key exists already
    while(tmp_bucket)
    {
        if(strcmp(key, tmp_bucket->key) == 0)
        {
            tmp_bucket->value = value;
            log_msg("[update\tkey: \n]");
        }
        tmp_bucket = tmp_bucket->next;
    }

    Bucket *bucket = (Bucket *)malloc(sizeof(Bucket));

    bucket->key = key;
    bucket->value = value;
    bucket->next = NULL;

    ht->elem_num += 1;

    if(org_bucket != NULL)
    {
        log_msg("[collision]\tindex: key:");
        bucket->next = org_bucket;
    }

    ht->buckets[index] = bucket;
    return SUCCESS;
}


static void resize_hash_table_if_needed(HashTable *ht)
{
    if(ht->size - ht->elem_num <1)
    {
        hash_resize(ht);
    }
}

static int hash_resize(HashTable *ht)
{
    //double the size 
    int org_size = ht->size;
    ht->size = ht->size * 2;
    ht->elem_num = 0;

    Bucket **buckets = (Bucket **)calloc(ht->size, sizeof(Bucket *));

    Bucket **org_buckets = ht->buckets;
    ht->buckets = buckets;

    int i = 0;
    for(i=0; i < org_size; ++i)
    {
        Bucket *cur = org_buckets[i];
        Bucket *tmp;
        while(cur)
        {
            hash_insert(ht, cur->key, cur->value);
            
            tmp = cur;
            cur = cur->next;
            free(tmp);
        }
    }
    free(org_buckets);
    return SUCCESS;
}

/*int delete_data_from_table(HashTable* pHashTable,int data)*/
/*{*/
    /*Node* pHead;*/
    /*Node* pNode;*/
    /*if(NULL == pHashTable || NULL == pHashTable->value[data % 10])*/
    /*{*/
        /*return FALSE;*/
    /*}*/

    /*if(NULL == (pNode = search_in_table(pHashTable,data)))*/
    /*{*/
        /*return FALSE;*/
    /*}*/

    /*if(pNode == pHashTable->value[data % 10])*/
    /*{*/
        /*pHashTable->value[data % 10] = pNode->next;*/
        /*free(pNode);*/
        /*return TRUE;*/
    /*}*/
    /*pHead = pHashTable->value[data % 10];*/
    /*while(pNode != pHead->next)*/
    /*{*/
        /*pHead = pHead->next;*/
    /*}*/
    /*pHead->next = pNode->next;*/
    /*return TRUE;*/
/*}*/


