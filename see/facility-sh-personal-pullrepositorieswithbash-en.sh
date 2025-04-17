#!/usr/bin/bash

# The shebang above may not match your environment
# In Unix or GNU/Linux, enter `which bash` to find the path of your interpreter
# Then, execute this file with `<interpreter> <path/filename>.sh` or `./<filename>.sh`



# Checking for the presence of a directory path as an argument
# Or, find the repositories in the current directory

if [ ! -z "$1" ]; then
    repositories=($(find "$1" -maxdepth 1 -type d -exec basename {} \;))
else
    repositories=($(find . -maxdepth 1 -type d -exec basename {} \;))
fi

# Search without subdirectories to retrieve each directory name without its path



directory=${1:-$(pwd)}

# "The :- operator (parameter expansion or default value operator)
# returns the command argument or the current working directory



for repository in "${repositories[@]}"; do
    if [ "$repository" != "." ]; then
        echo "Pulling from $repository:"
        (cd "$directory/$repository" && git pull)
        wait # for the return of each pull before looping to the next
    fi
done

# Avoid the current directory, which is not subject to pull but contains repositories

