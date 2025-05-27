Web Development and Linux
================================================================

<br />
<br />
<br />

Bash Run Commands
----------------------------------------------------------------

<br />

### Aliases for Lightning-Fast Commands

```
printf '\nalias xx="clear"; alias vv="sudo apt update -y && sudo apt full-upgrade -y && sudo apt autoremove -y && sudo apt autoclean -y"\n' >> ~/.bashrc
```
> `xx` Clear the terminal `vv` Update the OS

<br />
<br />
<br />

Git
----------------------------------------------------------------

<br />

### Committed Changes

<br />

#### List Files Differing Between Reference and Feature Branch

```
git checkout <reference_branch> && git diff --name-only <feature_branch>
```
> Do not forget to `git checkout <feature_branch>` afterwards

<br />

#### Ckeck Your Own Changes in Feature Branch

```
git diff --name-only <reference_branch>...<feature_branch>
```
> From any branch

<br />
<br />

### Uncommitted Changes

<br />

#### Stashing Changes

<br />

```
git stash
```
> Save changes on a stack and revert your working directory to the last committed state

<br />

```
git stash save <message>
```
> Stash with a message

```
git stash -u
```
> Stash untracked files

```
git stash -a
```
> Stash all files (including ignored)

<br />

#### Listing Stashes

<br />

```
git stash list
```
> List all stashes

<br />

#### Applying and Dropping

<br />

```
git stash show -p
```
> View the patches in the most recent stash

```
git stash apply
```
> Apply the latest stash, the most recent stash is at the top

```
git stash pop
```
> Apply and drop the stash

```
git stash apply stash@{<index>}
```
> Apply a specific stash

```
git stash drop stash@{<index>}
```
> Drop a specific stash

```
git stash clear
```
> Clear all stashes

<br />
<br />
<br />

Node.js Environment
----------------------------------------------------------------

<br />

### Processes

<br />

When you get a `Error: listen ... address already in use ...`

```
lsof -i :<port_number>
```
> List open files to get the PID

<br />

```
kill <PID>
```
> Kill the process

<br />
<br />
<br />

### Apps

```
npm pkg get version
```

<br />
<br />
<br />

Vi Cheat-Sheet
----------------------------------------------------------------

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

IDE and DevTools Tricks
----------------------------------------------------------------

<br />

### Regular Expressions

<br />

```
from\s'.*[A-Z]
```
> To find files containing at least one uppercase letter

<br />

```
(?:const|let|var)\s+([A-Z_][\w-]*)\s*[:=]
```
> To find variables that start with an uppercase letter or an underscore, and/or contain a hyphen or an underscore

<br />
<br />

### Terminal

<br />

```
find ./<path> -name <name> 2>/dev/null
```
> From a repository to find a specific file name

<br />
<br />

### Avoid Overthinking Debugging

<br />

- Use explicit `console.log` statements with a prefix to easily filter messages in DevTools
  ```JavaScript
  console.log('j5py from "_____" log of "_____":', _____);
  ```
- Watch values by logging state changes using React's `useEffect` hook
  ```JavaScript
  useEffect(() => {
      console.log('j5py from "_____" log of "_____":', _____);
  }, [_____]);
  ```
- Copy objects from DevTools logs and compare the outputs with the expected results
- Ensure the correct usage of solutions by checking signatures in third-party documentation
- Then, you can still add breakpoints

<br />
<br />
<br />
