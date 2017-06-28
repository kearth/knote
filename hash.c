
UINT_8 Hash(char *str)
{
    UINT_8 hash = 0;

    while(*str)
    {
        hash = (*str++) + (hash << 6) + (hash << 16) - hash;
    }

    return (hash & 0x7FFFFFFF);
}
