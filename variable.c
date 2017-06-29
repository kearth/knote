typedef struct _kml_var_struct kml_var;
typedef struct _kml_obj_struct kml_obj;

struct _kml_obj_struct
{
}
;

struct _kml_var_struct
{
    uint ref_count;
    uchar is_ref;
    void* value;
    uchar type;
};

union _kml_value
{
    long lval;  /*long value*/
    double dval; /*double value*/
    struct {
        char *val;
        int  len;
    } str;      
    HashTable *ht; /*hash table value*/
    kml_obj obj;
};


