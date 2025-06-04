#!/bin/bash

if [ "$#" -eq 1 ]; then

    naming_convention=$(echo "$1" | \
        iconv -f utf-8 -t ascii//TRANSLIT | \
        tr '[:upper:]' '[:lower:]' | \
        sed 's/[^a-z0-9 -]/-/g' | \
        tr ' ' '-' | \
        tr -s '-' | \
        sed 's/^-//;s/-$//')

    printf "Choose a prefix for your branch:\n\n\
            - a  tech/      Technical changes\n\
            - b  feature/   New features\n\
            - c  fix/       Bug fixes\n\
            - d  refactor/  Code improvements\n\n\
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
    echo "This script expects a command-line argument string to return its hyphenated lowercase version"
fi

# While this syntax is often called kebab case, you should consider turning vegan

# Additionally, given the advantage of short names, rename this file to tofu.sh
