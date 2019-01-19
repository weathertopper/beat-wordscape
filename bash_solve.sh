
print_arr ()
{
    arr=$1 #("$@")
    if [ -z "$arr" ]; then 
        echo "NO ARRAY TO PRINT";
    fi
    for i in "${!arr[@]}"; do
        echo "$i: ${arr[i]}";
    done
}

# remove_index ()
# {

# }

readarray WORDS < ./words.txt
echo ${WORDS[3]}
print_arr "${WORDS[@]}"