# Shell Scripting Basics
Move to a directory dedicated to the following examples
```Shell
mkdir basics; cd basics
```
## Echo
Create or overwrite `echo.sh`
```Shell
echo '#!'$SHELL > echo.sh; chmod 700 echo.sh; vim echo.sh
```
| Part				| Sort					| Description											|
|-------------------|-----------------------|-------------------------------------------------------|
| '#!'$SHELL		| Concatenation			| Creation of a Shebang									|
| $SHELL			| Environment variable	| Absolute path to the command interpreter				|
| > echo.sh			| Redirect				| Used to pass output to either a file or stream		|
| ;					| Semicolon				| Separate commands										|
| chmod 700 echo.sh	| File Permissions		| Change mode (read, write, and execute for user/owner)	|
| vim echo.sh		| Vi IMproved			| Text editor											|

Shebang
```Shell
#!/bin/zsh
```
> Interpreter directive, program loader first argument

Add an echo message
```Shell
#!/bin/zsh

echo 'Hey'
```
> Writes the argument to the standard output

Two ways to execute it
```Shell
./echo.sh
```
```Shell
zsh echo.sh
```
## Test
Please create `test.sh`
```Shell
#!/bin/zsh

if [[ $(pwd) =~ '/basics$' ]]
then
	echo "You're in the right directory $USER"
else
	echo 'Wrong directory' # double quotes only when in the need to expand a variable
fi
```
| Part			| Sort					| Description													|
|---------------|-----------------------|---------------------------------------------------------------|
| [ ... ]		| Test					| [ is actually a program, so it must be surrounded by spaces	|
| [[ ... ]]		| An extension of [ ]	| Supports extra operations (regex matching for example)		|
| $(pwd)		| Command substitution	| Allows the output of a command to replace the command itself	|
| =~ '/basics$'	| Regex matching		| Check that the value ends with /basics						|
| "...  $USER"	| Parameter expansion	| Interprets the parameter										|
```Shell
./test.sh
```
> From the current directory
```Shell
cd ../; ./basics/test.sh
```
> From parent directory
## Find
Please create `find.sh`
```Shell
#!/bin/zsh

cd ~
echo "Moved to $PWD"
sleep 1
echo "Found my `find $PWD -name 'find.sh' 2>/dev/null | grep $USER`"
```
| Part			| Sort										| Description												|
|---------------|-------------------------------------------|-----------------------------------------------------------|
| sleep 1		| Suspend execution							| For a minimum of seconds									|
| " \`...\`"	| Command substitution						| The old-style backquote form of $(...)					|
| 2>/dev/null	| STDERR redirection to the 'null device'	| Ensures that no errors are displayed in the terminal		|
| \|			| Pipe										| Used to pass output to another program or utility			|
| grep $USER	| Global Regular Expression Printer			| Used for simple patterns and basic regular expressions	|
## Read
Please create `read.sh`
```Shell
#!/bin/zsh

echo "Hi! My name is $1 and I like $2!"
echo "What's your name?"
read user_input

echo "Nice to meet you $user_input!"
```
| Part				| Sort					| Description											|
|-------------------|-----------------------|-------------------------------------------------------|
| $1 $2 ...			| Command arguments		| Also known as a positional parameters					|
| read				| Built-in utility		| Reads text from standard input						|
```Shell
./read.sh Shell Internet
```
## Archive
Please create `archive.sh`
```Shell
#!/bin/zsh

time=`TZ='Europe/Paris' date +%Y%m%d%H%M%S`

i_dir='/'
o_dir='/archive/'

echo 'What file in this directory?'
read original

archive=$original'-'$time'.tar'

tar -cvf $PWD$o_dir$archive -P $PWD$i_dir$original

if test -f $PWD$o_dir$archive
then
	echo 'Archived under '$PWD$o_dir$archive
else
	echo $time' failed archiving '$PWD$i_dir$original >> $PWD$o_dir'error.log'
fi
```
```Shell
mkdir archive && ./archive.sh
```
