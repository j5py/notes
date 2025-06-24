#!/bin/bash

to_branch_name_format() {
    echo "$1" | \
        iconv -f utf-8 -t ascii//TRANSLIT | \
        tr '[:upper:]' '[:lower:]' | \
        sed 's/[^a-z0-9 -]/-/g' | \
        tr ' ' '-' | \
        tr -s '-' | \
        sed 's/^-//;s/-$//'
}

to_pr_title_format() {
    echo "$1" | \
        iconv -f utf-8 -t ascii//TRANSLIT | \
        sed 's/[^a-zA-Z0-9 -]/ /g' | \
        tr '-' ' ' | \
        sed 's/  */ /g' | \
        sed 's/^ *//;s/ *$//' | \
        awk 'BEGIN{
            split("a an and as at but by for if in nor of on or out off onto past per plus sans save so the than till to up upon via vs versus with from into upon over yet", minorwords)
            for(i in minorwords) minor[minorwords[i]]=1
        }
        {
            for(i=1;i<=NF;i++){
                if($i == toupper($i)){
                    word=$i
                } else {
                    word=tolower($i)
                }
                if(i!=1 && i!=NF && (word in minor)){
                    $i=word
                } else {
                    $i=toupper(substr(word,1,1)) substr(word,2)
                }
            }
            print
        }'
}

if [ "$1" = "-pr" ] && [ -n "$2" ]; then
    input="$2"
    # Detect if input is kebab-case (contains - and no spaces)
    if [[ "$input" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
        pr_title=$(to_pr_title_format "$input")
    else
        pr_title=$(to_pr_title_format "$(to_branch_name_format "$input")")
    fi
    echo "$pr_title"
elif [ "$#" -eq 1 ]; then

    naming_convention=$(to_branch_name_format "$1")

    printf "\nChoose a prefix for your branch (Re-run it with the -pr option before <string> for a PR title):\n
    - a  tech/      Technical changes\n
    - b  feature/   New features\n
    - c  fix/       Bug fixes\n
    - d  refactor/  Code improvements\n
    - *  None\n\n"

    read -p "Enter your choice: " prefix_choice

    case "$prefix_choice" in
        a) prefix="tech/" ;;
        b) prefix="feature/" ;;
        c) prefix="fix/" ;;
        d) prefix="refactor/" ;;
        *) prefix="" ;;
    esac

    echo "${prefix}${naming_convention}"
else
    echo "Usage:"
    echo "  $0 <string>         # returns hyphenated lowercase version"
    echo "  $0 -pr <string>     # returns PR title format"
fi

# While this syntax is often called kebab case, you should consider turning vegan

# Additionally, given the advantage of short names, rename this file