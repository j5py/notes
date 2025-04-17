#!/usr/bin/zsh

# The shebang above may not match your environment
# In Unix or GNU/Linux, enter `which zsh` to find the path of your interpreter
# Then, execute this file with `<interpreter> <path/filename>.sh` or `./<filename>.sh`



# Checking for the presence of a directory path as an argument
# Or, find the repositories in the current directory

if [ ! -z $1 ]; then
	repositories=($(print -l "$1"/*(/:t)))
else
	repositories=($(print -l ./*(/:t)))
fi

# The syntax /*(/:t) is a feature of Zsh that allows you to list directories



directory=${1:-$(pwd)}

# "The :- operator (parameter expansion or default value operator)
# returns the command argument or the current working directory



for repository in $repositories
do
	echo "Pulling from $repository:"
	(cd "$directory/$repository" && git pull)
	wait # for the return of each pull before looping to the next
done

