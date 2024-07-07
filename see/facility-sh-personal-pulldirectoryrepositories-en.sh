#!/usr/bin/zsh


# Checking for the presence of a directory path as an argument
# Or, find the repositories in the current directory

if [ ! -z $1 ]
then
	repositories=($(print -l "$1"/*(/:t)))
else
	repositories=($(print -l ./*(/:t)))
fi


directory=${1:-$(pwd)} # path using a ternary operator by checking if the argument exists


for repository in $repositories
do
	echo "Pulling from $repository:"
	(cd "$directory/$repository" && git pull)
	wait # for the return of each pull before looping to the next
done

