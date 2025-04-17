




# Daily Linux

<br />




## Configure Bash Run Commands File



### Short Alias Rules for Lightning-Fast Commands


```Shell
printf '\nalias xx="clear"; alias vv="sudo apt update -y && sudo apt full-upgrade -y && sudo apt autoremove -y && sudo apt autoclean -y"\n' >> ~/.bashrc
```
> `xx` Clear the terminal `vv` Update the OS

<br />



## Vi Essentials Cheat-Sheet

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
