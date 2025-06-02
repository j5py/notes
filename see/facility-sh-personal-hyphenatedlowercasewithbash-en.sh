#!/bin/bash

if [ "$#" -eq 1 ]; then
    naming_convention=$(echo "$1" | \
        iconv -f utf-8 -t ascii//TRANSLIT | \
        tr '[:upper:]' '[:lower:]' | \
        sed 's/[^a-z0-9 -]/-/g' | \
        tr ' ' '-' | \
        tr -s '-' | \
        sed 's/^-//;s/-$//')

    read -p "Do you want to prefix the output with 'task/'? (y/n): " prefix_choice

    if [[ "$prefix_choice" == "y" || "$prefix_choice" == "Y" ]]; then
        echo "task/$naming_convention"
    else
        echo "$naming_convention"
    fi
else
    echo "This script expects a command-line argument string to return its hyphenated lowercase version"
fi

# While this syntax is often called kebab case, you should consider turning vegan

# Additionally, given the advantage of short names, rename this file to tofu.sh
