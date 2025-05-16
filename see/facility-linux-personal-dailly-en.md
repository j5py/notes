



# Daily Linux

<br />
<br />
<br />




## Bash Run Commands

<br />




### Aliases for Lightning-Fast Commands


```Shell
printf '\nalias xx="clear"; alias vv="sudo apt update -y && sudo apt full-upgrade -y && sudo apt autoremove -y && sudo apt autoclean -y"\n' >> ~/.bashrc
```
> `xx` Clear the terminal `vv` Update the OS

<br />
<br />
<br />




## Git

<br />

### List Files Changed in Feature Branch

```Shell
git checkout <reference_branch> && git diff --name-only <feature_branch>
```
> Do not forget to `git checkout <feature_branch>` afterwards

<br />
<br />
<br />




## Node.js Environment

<br />




### Processes

<br />

When you get a `Error: listen ... address already in use ...`


```Shell
lsof -i :<port_number>
```
> List open files to get the PID

<br />

```Shell
kill <PID>
```
> Kill the process

<br />
<br />
<br />



### Apps

```Shell
npm pkg get version
```

<br />
<br />
<br />




## Vi Cheat-Sheet

<br />



### Launching Vi
- `view <file>` Read-only mode
- `vi <file>` Open a file

### Modes
- `i` Insert before the cursor
- `a` Append after the cursor

### Basic Commands
- `:q` Quit
- `:w` Save file
- `:wq` Save and quit

### Navigation
- `:1` Go to the first line
- `:$` Go to the last line
- `(` Back one sentence
- `)` Forward one sentence
- `^` Start of line
- `$` End of line
- `w` Next word
- `b` Previous word
- `h` Move left
- `j` Move down
- `k` Move up
- `l` Move right

### Editing
- `r` Replace one character
- `cw` Change word
- `R` Overwrite from the cursor
- `D` Delete to the end of the line
- `yy` Yank (copy) the line
- `dd` Delete the line
- `p` Paste

### Settings
- `:set nu` Show line numbers
- `:set nonu` Hide line numbers
- `:set ic` Ignore case
- `:set noic` Do not ignore case
- `:set wrap` Wrap long lines
- `:set nowrap` No wrap

### Search
- `/any` Search for "any"
  - `n` Go to the next occurrence
- `?any` Reverse search for "any"

### Replace
- `:s/any/new` Substitute "any" with "new"
- `u` Undo

<br />
<br />
<br />




## IDE Tricks

<br />




### Regular Expressions


```Shell
from\s'.*[A-Z]
```
> To find files containing at least one uppercase letter

<br />


```Shell
(?:const|let|var)\s+([A-Z_][\w-]*)\s*[:=]
```
> To find variables that start with an uppercase letter or an underscore, and/or contain a hyphen or an underscore

<br />
<br />



### Terminal

```Shell
find ./<path> -name "<name>"
```
> From a repository to find a specific file name


