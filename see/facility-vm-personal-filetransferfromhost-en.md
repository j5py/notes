




# File Transfer from a Windows Host to a Linux Virtual Machine



Since copy/paste functionality between the host machine and VMs doesn't always work and creating a shared folder isn't always desirable, here's a quick way to resolve transfers between OSs.




## Creating a Python Server from the Windows Host



### Open the Command Prompt Terminal
> **Command Prompt**: from `Windows + R` enter `cmd` (then `Enter`, or `Ctrl + Shift` and `Enter` to be **Administrator**)



### Check the Windows Host Machine IP for Later


```
ipconfig
```
> IPv4 address of the Wi-Fi network



### Prepare a Specific Directory to Serve Files with Python


```
mkdir <directoryName>
cd <directoryName>
```
> From the directory, use `dir` to list the files and `del <fileName>` to delete one


```
notepad <fileName>
```
> Edit and save the file, and go back in Command Prompt


### Start a Python Server with a Single Command


```
python -m http.server 8000
```
> You can interrupt it with `Ctrl + C`



## Accessing the File from the Linux Virtual Machine
> The virtual machine network needs to be configured on Bridge


```
wget http://<hostMachineIP>:8000/<fileName>
```
