
<br />

Web Development and Linux
================================================================

<br /><br /><br />

CLI
----------------------------------------------------------------

<br /><br />

### System

<br />

#### Advanced Package Tool

<br />

##### Update Software Packages

```Shell
sudo apt update -y && sudo apt full-upgrade -y && sudo apt autoremove -y && sudo apt autoclean -y
```

##### Remove Package

```Shell
sudo apt purge -y <package_name> && sudo apt autoremove -y && sudo apt autoclean
```

<br />

#### Searching

<br />

##### String from Your Home Directory and Higher

```
grep -r "<string>" ~/ 2>/dev/null
```

##### Files by Extension from Home Directory and Higher
```
find ~/ -type f -name "*.<extension>" 2>/dev/null
```

<br /><br />

### Bash

<br />

#### Shortcuts
> Only those that work in a VS Code terminal

<br />

| Shortcut    | Description                                             |
|------------:|---------------------------------------------------------|
| `Tab`       | Autocomplete commands or file names                     |
| `Ctrl + R`  | Search through command history                          |
| `Alt + B`   | Move backward one word                                  |
| `Ctrl + A`  | Move to the beginning of the line                       |
| `Alt + F`   | Move forward one word                                   |
| `Ctrl + U`  | Clear the line from the cursor to the beginning         |
| `Ctrl + W`  | Clear the word before the cursor                        |
| `Ctrl + C`  | Cancel the current command                              |
| `Ctrl + Z`  | Suspend the current command (can be resumed with `fg`)  |
| `Ctrl + L`  | Clear the screen (like the `clear` command)             |

<br /><br />

#### Bash Run Commands

> Aliases for lightning-Fast commands

<br />

```
printf '\nalias xx="clear"; alias vv="sudo apt update -y && sudo apt full-upgrade -y && sudo apt autoremove -y && sudo apt autoclean -y"\n' >> ~/.bashrc
```
> Open a new terminal for this to work: `xx` to clear the terminal, `vv` to update packages

<br />

```
~/.bashrc
```
> Location

<br /><br /><br />

Git
----------------------------------------------------------------

<br /><br />

### Published


<br /><br />

#### Rename Your Current Branch

<br />

```
git branch -m <new_name>
```
> Rename local branch

<br />

```
git push origin --delete <old_name>
```
> Delete old branch from remote

<br />

```
git push origin <new_name>
```
> Push new branch to remote

<br />

```
git push --set-upstream origin <new_name>
```
> Set upstream connection from the local branch to the specific remote branch on origin

<br /><br />

#### Recreate Branch for Latest Changes

<br />

```
git branch -d <feature_branch>
```
> Delete the local branch, `-D` to force delete

<br />

```
git push origin --delete <feature_branch>
```
> Delete the remote branch

<br />

```
git checkout -b <feature_branch>
```
> Recreate the branch

<br />

```
git push origin <feature_branch>
```
> Push the new branch

<br /><br /><br />

### Uncommitted

<br /><br />

#### Co-authors

<br />

##### Get Co-author Email

```
git log --author="<username>"
```

> If GitHub's `noreply` email address appears, use `<username>@users.noreply.github.com`

<br />

##### Set Your No Reply

```
git config user.email "<username>@users.noreply.github.com"
```

<br />

##### Commit Message

```
Message...

Co-authored-by: username1 <username1@users.noreply.github.com>
Co-authored-by: username2 <username2@example.com>
...
```

> While angle brackets < and > are usually placeholders, they should stay in the Co-authored-by lines as part of the format

<br />

<br /><br />

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

<br />

```
git stash -u
```
> Stash untracked files

<br />

```
git stash -a
```
> Stash all files (including ignored)

<br /><br />

##### Listing Stashes

<br />

```
git stash list
```
> List all stashes

<br /><br />

##### Applying and Dropping

<br />

```
git stash show -p
```
> View the patches in the most recent stash

<br />

```
git stash apply
```
> Apply the latest stash, the most recent stash is at the top

<br />

```
git stash pop
```
> Apply and drop the stash

<br />

```
git stash apply <index>
```
> Apply a specific stash

<br />

```
git stash drop <index>
```
> Drop a specific stash

<br />

```
git stash clear
```
> Clear all stashes

<br /><br /><br />

### Committed

<br /><br />

#### History

<br />

```
git log --oneline
```

<br /><br />

#### Not Pushed

<br />

##### Undo Last Commit

<br />

```
git reset --soft HEAD~1
```
> Keep changes staged

<br />

```
git reset --hard HEAD~1

```
> Discard changes completely

<br /><br />

#### Pushed

<br />

##### Amend Last Commit Message

<br />

```
git commit --amend -m <new_message> && git push --force
```
> Update the last commit message and overwrite the remote history
> <br /><br />
> Edit `<new_message>` with the changes you wish to apply

<br /><br />

##### Patch Previous Commit

<br />

This process allows you to combine the last commit as a patch with the previous one after it has been pushed

```
git rebase -i HEAD~2
```
> Change `pick` to `squash`, follow the editor instructions to save and exit

<br />

```
git push --force
```
> Force push the changes

<br /><br />

##### Find Branches

<br />

```
git branch -a | grep <keyword>
```
> List both local and remote branches matching a keyword

<br /><br />

##### Branch Differences

<br />

###### Changed Files Since Branch Creation

```
git checkout <reference_branch> && git diff --name-only <feature_branch>
```
> Do not forget to `git checkout <feature_branch>` afterwards

<br />

###### Your Changes Since Branch Creation

```
git diff --name-only <reference_branch>...<feature_branch>
```
> From any branch

<br />

###### Merge Latest from Reference Branch

```
git fetch origin && git merge origin/<reference_branch>
```
> Update your development branch with the latest changes from the main branch

<br /><br /><br />

### Pull Request

#### Conflicts

```
git fetch origin && git merge origin/<reference_branch>
```
> From your `<feature_branch>`

<br /><br /><br />

Node.js Environment
----------------------------------------------------------------

<br />

### NPM Token

```Shell
printf '\nexport NPM_TOKEN="<token>"' >> ~/.bashrc
```
> Get your [Personal access tokens (classic)](https://github.com/settings/tokens)

<br />

### App Version

```
npm pkg get version
```

<br /><br />

### localhost
> Assuming you have updated the `scripts` section of your **package.json**

<br />

#### Start

```Shell
git pull && npm install && npm run <script>
```

#### Stop

```Shell
npm run <script>
```
> After `Ctrl|Cmd + C`

<br />

#### Already in Use

> When you get `Error: listen ... address already in use ...`

<br />

```
lsof -i :<port_number>
```
> List open files to get the PID

<br />

```
kill <PID>
```
> Kill the process

<br /><br />

### Docker

#### Database Management System

```
sudo docker compose up <dbms>
```
```
sudo docker ps
```
```
sudo docker stop <container_id>
```

<br /><br />

### React

#### TanStack Query Devtools

<br />

```
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
```

```
<ReactQueryDevtools initialIsOpen={false} />
```
> For [Floating Mode](https://tanstack.com/query/latest/docs/framework/react/devtools#floating-mode)

<br /><br /><br />

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

<br /><br /><br />

Tricks
----------------------------------------------------------------

<br />

### Visual Studio Code

<br />

#### Search with Regular Expressions

<br />

##### Extra Whitespaces
```
(?<=\S) {2,}
```

##### Import Containing Uppercase

```
from\s'.*[A-Z]
```

##### Unusual Variable Names

```
(?:const|let|var)\s+([A-Z_][\w-]*)\s*[:=]
```
> Start with an uppercase letter or an underscore, and may contain a hyphen or an underscore

<br />

#### IntelliSense

<br />

`Ctrl + Space` activates context-aware code suggestions

<br /><br />

### DevTools

<br />

#### Debugging

- Check requests and responses in the Network tab
- Ensure the correct usage of solutions by checking signatures in third-party documentation
- Use explicit `console.log` statements with a prefix to easily filter messages in DevTools
  ```JavaScript
  console.log(`abc`, xyz);
  ```
- Watch values by logging state changes using React's `useEffect` hook
  ```JavaScript
  useEffect(() => { console.log(`abc`, xyz); }, [xyz]);
  ```
- Copy objects from DevTools logs and compare the outputs with the expected results
- Then, you can still add breakpoints


<br />

#### Unlock Copy/Paste

```JavaScript
(function(t) {
    const b = document.body;
    b.style.userSelect = t;
    b.style.webkitUserSelect = t;
    b.style.mozUserSelect = t;
    b.style.msUserSelect = t;
})('text');
```
> Console > Create live expression

<br /><br /><br />


Utils
----------------------------------------------------------------

<br />

### HTML

#### Secure External Link

```
<a href="" target="_blank" rel="noopener noreferrer">___</a>
```

<br />

### Dataset

#### Basic Details

```
John Wheat
```
```
Lorem Quantum
```
```
300 Multiple Choices Avenue
```
```
Apt 101
```
```
NY
```
```
10001
```
```
New York
```
```
+12127773333
```
```
lorem-quantum@test.glitch
```
```
https://fake.false.glitch
```
```
N30-SP00N-404-N0TF0UND-M4TR1X-G71TCH
```

<br /><br /><br />
