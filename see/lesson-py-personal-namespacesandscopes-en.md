




# Python Namespaces and Scopes

<br />




## Namespaces


A namespace is a collection of currently defined symbolic names along with information to get the object that each name references. You can think of a namespace as a dictionary in which the keys are the object names and the values are the objects themselves. Each key-value pair maps a name to its corresponding object.



### The Built-In Namespace

```Python
dir(__builtins__)
```
> ['ArithmeticError', 'AssertionError', 'AttributeError', 'BaseException', 'BaseExceptionGroup', 'BlockingIOError', 'BrokenPipeError', 'BufferError', 'BytesWarning', 'ChildProcessError', 'ConnectionAbortedError', 'ConnectionError', 'ConnectionRefusedError', 'ConnectionResetError', 'DeprecationWarning', 'EOFError', 'Ellipsis', 'EncodingWarning', 'EnvironmentError', 'Exception', 'ExceptionGroup', 'False', 'FileExistsError', 'FileNotFoundError', 'FloatingPointError', 'FutureWarning', 'GeneratorExit', 'IOError', 'ImportError', 'ImportWarning', 'IndentationError', 'IndexError', 'InterruptedError', 'IsADirectoryError', 'KeyError', 'KeyboardInterrupt', 'LookupError', 'MemoryError', 'ModuleNotFoundError', 'NameError', 'None', 'NotADirectoryError', 'NotImplemented', 'NotImplementedError', 'OSError', 'OverflowError', 'PendingDeprecationWarning', 'PermissionError', 'ProcessLookupError', 'RecursionError', 'ReferenceError', 'ResourceWarning', 'RuntimeError', 'RuntimeWarning', 'StopAsyncIteration', 'StopIteration', 'SyntaxError', 'SyntaxWarning', 'SystemError', 'SystemExit', 'TabError', 'TimeoutError', 'True', 'TypeError', 'UnboundLocalError', 'UnicodeDecodeError', 'UnicodeEncodeError', 'UnicodeError', 'UnicodeTranslateError', 'UnicodeWarning', 'UserWarning', 'ValueError', 'Warning', 'WindowsError', 'ZeroDivisionError', '__build_class__', '__debug__', '__doc__', '__import__', '__loader__', '__name__', '__package__', '__spec__', 'abs', 'aiter', 'all', 'anext', 'any', 'ascii', 'bin', 'bool', 'breakpoint', 'bytearray', 'bytes', 'callable', 'chr', 'classmethod', 'compile', 'complex', 'copyright', 'credits', 'delattr', 'dict', 'dir', 'divmod', 'enumerate', 'eval', 'exec', 'exit', 'filter', 'float', 'format', 'frozenset', 'getattr', 'globals', 'hasattr', 'hash', 'help', 'hex', 'id', 'input', 'int', 'isinstance', 'issubclass', 'iter', 'len', 'license', 'list', 'locals', 'map', 'max', 'memoryview', 'min', 'next', 'object', 'oct', 'open', 'ord', 'pow', 'print', 'property', 'quit', 'range', 'repr', 'reversed', 'round', 'set', 'setattr', 'slice', 'sorted', 'staticmethod', 'str', 'sum', 'super', 'tuple', 'type', 'vars', 'zip']



### The Global Namespace

Contains any names defined at the level of the main program.



### The Local and Enclosing Namespaces

The interpreter creates a new namespace whenever a function executes.

That namespace is local to the function and remains in existence until the function terminates.

<br />




## Variable Scopes


Local, Enclosing, Global, Built-in.



### Double Definition

The interpreter finds the value from the enclosing scope before looking in the global scope.

```Python
x = 'global'

def f():
    x = 'enclosing'

    def g():
        print(x)
    g()

f()
```
> enclosing



### Triple Definition

Python resolves names using the LEGB (Local Enclosing, GLobal, Built-in) rule.

The LEGB rule dictates that the locally defined value of `x` is searched first.

```Python
x = 'global'

def f():
    x = 'enclosing'

    def g():
        x = 'local'
        print(x)
    g()

f()
```
> local

<br />




## Namespace Dictionaries


Python really does implement these namespaces as dictionaries.

```Python
type(globals())
```
> <class 'dict'>

<br />




## The `globals()` Function


Returns an actual reference (in `x = globals()`, `x` stays up to date).



### Global Variable Access and Comparison


#### Global Variable Declaration

```Python
my_name = 'j5py'
```


#### Dynamic Global Variable Assignment

```Python
globals()["new_note"] = "Learn Python"
```


#### Print Globals

```Python
print(globals())
```
> {'__name__': '__main__', '__doc__': None, '__package__': None, ... , 'my_name': 'j5py', 'new_note': 'Learn Python'}


#### Access Global Variable by Name

```Python
print(globals()["my_name"])
```
> j5py


#### Identity Comparison of Global Variable

```Python
my_name is globals()["my_name"]
```
> True

<br />




## The `locals()` Function


Returns a current copy (in `x = locals()`, `x` remains unchanged).

```Python
def f(x, y):
    w = 'Hey'
    print(locals())

f(10, 0.5)
```
> {'x': 10, 'y': 0.5, 'w': 'Hey'}

<br />




## Scope in Functions



### The `global` Declaration

```Python
x = 20

def f():
    global x
    x = 40
    print(x)

f()
print(x)
```
> 40
> 40



### The `nonlocal` Declaration

```Python
def f():
    x = 20

    def g():
        nonlocal x
        x = 40

    g()
    print(x)

f()
```
> 40
