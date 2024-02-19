# Client-side Data Collection
The JavaScript solutions presented here meet needs that are imperfectly covered or not managed by Tag Management Systems.
### Tag Management Systems
TMS are software allowing you to orchestrate the triggering of third-party solutions. The interface designed for less technical profiles attempts to facilitate the configuration of tracking solutions for marketing purposes, however it is almost always necessary to have a more or less advanced knowledge of JavaScript and a good understanding of the development tools integrated into the browsers. A TMS is ultimately a JavaScript file integrated into a website (or application), an entry point allowing third-party solutions to be activated or deactivated independently of the development team.
### JavaScript Versions
When updating my JavaScript solutions, verifying them and refining them, I felt free to use recent syntax. However, TMS may not support arrow function expressions or the use of keywords such as `let` or `const`, **among others**. I invite you to check which of the [JavaScript Versions](https://www.w3schools.com/Js/js_versions.asp) is supported by your TMS, then adapt the statements to avoid any errors.
## Loading
One of the biggest pain points of TMS users.
> Added the script, got undefined

It is extremely common to find configurations where the variables and functions of the third-party solution are referenced just below the code that initializes it, causing the famous `undefined` error.
### The wrong way
> It works, almost always

This first example serves to highlight the `onload` attribute of an `HTMLScriptElement`, but third-party solutions are added via a "tag": literally an HTML tag containing JavaScript code initializing the solution.
```JavaScript
function addScript(url, invokable) {
    const script = document.createElement('script');
    script.setAttribute('src', url);
    if (invokable) script.onload = invokable;
    document.querySelector('body').appendChild(script)
}
```
| Parameter | Use       | Value     | Description                       |
|-----------|-----------|-----------|-----------------------------------|
| url       | Required  | String    | Address of a JavaScript file      |
| invokable | Optional  | Function  | Your function, executed onload    |
#### Why is this wrong?
Encapsulation of references to the solution being loaded in the `onload` attribute does not offer any guarantee of avoiding a blocking error in a user's journey: **once a script is loaded, its content must still be read before being available: this is the execution time**.
#### The fix
```JavaScript
function wait(isDefined, onSuccess, onFailure) {
    let i = 0;
    const speed = 10
        , seconds = 30
        , milliseconds = 1000 * seconds
        , iterations = milliseconds / speed
        , check = setInterval(() => {
            if (isDefined()) {
                clearInterval(check);
                onSuccess()
            } else if (i >= iterations) {
                clearInterval(check);
                if (onFailure) onFailure()
            } else i++
          }, speed)
        ;
}
```
| Parameter | Use       | Value     | Description                                                       |
|-----------|-----------|-----------|-------------------------------------------------------------------|
| isDefined | Required  | Function  | Should return `true`/`<value>` or `false`/`undefined`             |
| onSuccess | Required  | Function  | Contains the logic to apply, or informs the TMS of availability   |
| onFailure | Optional  | Function  | If the 30 second time limit is exceeded                           |
> About the `isDefined` function you need to write: you can use `typeof` to prevents errors.
### The right way
> All in one, always works
```JavaScript
function getPromisedScript(url, reference) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onerror = reject;
        script.onload = () => {
            const execution = setInterval(() => {
                if (window.hasOwnProperty(reference)) {
                    clearInterval(execution);
                    resolve()
                }
            }, 10)
        };
        document.body.appendChild(script)
    })
}
```
| Parameter | Use       | Value     | Description                                           |
|-----------|-----------|-----------|-------------------------------------------------------|
| url       | Required  | String    | Address of a JavaScript file                          |
| reference | Required  | String    | Variable or function name being defined by the script |
#### Example of use
You still need to define `onSuccess` and `onError` functions.
```JavaScript
getPromisedScript(
    'https://example.false/script.js',
    'dataObjects'
).then(() => onSuccess()).catch(e => onError(e));
```
> Note that `'dataObjects'` is just an example to represent how to refer to the JavaScript variable or function you expect.
## Triggering
To decide whether or not to trigger a code for data reporting, it is often necessary to determine the context or track an interaction. For example the device, the parameters, or identifying the precise moment when it is relevant to proceed.
> These are just a few of the numerous code snippets I've written, many of the other solutions I've created are not only proprietary but also specific to the configurations and needs encountered
### Contextual
#### URL Query String parameters
```JavaScript
function getParameter(name) {
    return new URLSearchParams(document.location.search).get(name)
}
```
#### Domain vs. subdomain
```JavaScript
function isMainDomain() {
    const host = window.location.hostname.replace('www.', '');
    return host.match(/\./g).length === 1 ? true : false
}
```
#### Mobile device
> I didn't wrote that one, thanks to [Open source mobile phone detection](http://detectmobilebrowsers.com)
```JavaScript
function isMobile() {
    return !!(function(x) { // By http://detectmobilebrowsers.com
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(x.substr(0, 4))) return 1
    })(navigator.userAgent || window.opera || navigator.vendor)
}
```
#### IOS app .vs Webview
```JavaScript
function isWebviewIOS() {
    const userAgent = window.navigator.userAgent.toLowerCase()
        , safari = /safari/.test(userAgent)
        , ios = /iphone|ipod|ipad/.test(userAgent)
        ;
    if(ios) {
        if (safari) return false;
        else if (!safari) return true
    } else return false
}
```
#### Main document .vs Iframe
```JavaScript
function isIframe() {
    return window.self !== window.top
}
```
#### Main document host
```JavaScript
function getHostEvenFromIframe() {
    let host;
    if (window.location !== window.parent.location)
        host = document.referrer
    else host = document.location.origin
    return host.replace(/\/$/, '')
}
```
### Interactional
#### Detect element display
```JavaScript
function onScrollAndVisibility(node, invokable, once = true) {
    function onEvent() {
        const nT = node.offsetTop
            , nB = nT + node.offsetHeight
            , wT = window.scrollY
            , wB = wT + window.innerHeight
            , topNotUnder = nT < wB
            , baseNotAbove = nB > wT
            ;
        if (topNotUnder && baseNotAbove) {
            if (once) window.removeEventListener('scroll', onEvent);
            invokable(true)
        }
    }
    window.addEventListener('scroll', onEvent)
}
```
| Parameter | Use       | Value     | Description                                                           |
|-----------|-----------|-----------|-----------------------------------------------------------------------|
| node      | Required  | Element   | The reference to the HTML element (a node) that you have selected     |
| invokable | Required  | Function  | Should contain the code you want to run                               |
| once      | Optional  | Boolean   | Not relevant to trigger more than once, but it's there                |
#### Detect scroll percentage
```JavaScript
function onScrollPercentage(invokable, once = 0) {
    window.onscroll = () => {
        const y = (window.scrollY === 0 ? 0 : window.scrollY + window.innerHeight)
            , h = document.querySelector('body').scrollHeight
            , p = Math.round(y * 100 / h)
            ;
        if (once) {
            if (p >= once) {
                window.onscroll = null;
                invokable(p)
            }
        } else invokable(p)
    }
}
```
| Parameter | Use       | Value     | Description                                                                                       |
|-----------|-----------|-----------|---------------------------------------------------------------------------------------------------|
| invokable | Required  | Function  | Should contain the code you want to run, note that the parameter `p` is passed to you             |
| once      | Optional  | Integer   | If `0` it triggers every time, if `80` (for example) it will only trigger once when it reaches it |
## Solving
The only thing worse than having an error is not knowing there is one.
> Errors are good things, they inform you of a malfunction
### If no error message
#### Determine if SPA
This must absolutely **not** be pasted into your TMS but into your browser console: if it is a Single Page Application nothing will happen during your navigation even if the URLs change, but this code will pause execution if there are "real pages" when the current page unloads before loading the next one.
> The browser console must remain open for this code to work, it's particularly useful in mixed user journeys (real and virtual pages) to understand why certain "page views" have not been tracked
```JavaScript
window.onbeforeunload = function() { debugger }
```
#### Watching an Invokable
> Overriding a function

This code allows you to check that an existing function is indeed invoked or to observe the moment when it will be invoked by adding `console.log` or `debugger` for example, this technique is a way of adding an instruction without overwriting the initial logic.
```JavaScript
const retainingOriginalCode = originalFunctionNameHere;

originalFunctionNameHere = function(a, b, ...c) {
    retainingOriginalCode(a, b, ...c);

    // Your code here

}
```
| Parameter                 | Use       | Description                                                                                   |
|---------------------------|-----------|-----------------------------------------------------------------------------------------------|
| retainingOriginalCode     | Variable  | No reason to modify it, this temporarily stores the code of the existing function             |
| originalFunctionNameHere  | Function  | Replace this name with the function you want to observe or modify, without any parentheses    |
## Displaying
### Edit style attribute
The style attribute of an HTML element often has more than one CSS declaration, here's how to modify part of the attribute value without overwriting everything.
```JavaScript
function moveStyleAttribute(node, removeRegEx, addBoolean, addString) {
    const css = (node.getAttribute('style') || '').replace(removeRegEx, '').trim();
    if (addBoolean)
        node.setAttribute('style', (css.length ? css + ' ' : css) + addString);
    else node.setAttribute('style', css)
}
```
| Parameter     | Use       | Value     | Description                                                               |
|---------------|-----------|-----------|---------------------------------------------------------------------------|
| node          | Required  | Element   | The reference to the HTML element (a node) that you have selected         |
| removeRegEx   | Required  | Regex     | A regular expression identifying the targeted CSS property(ies)           |
| addBoolean    | Optional  | Boolean   | Will add CSS as replacement if `true`, just remove selection if `false`   |
| addString     | Optional  | String    | Contains the CSS you can add if `addBoolean` is `true`                    |
#### Example of use
```HTML
<div style="color:blue; font-size: 16px; display: block;">Do you want cookies?</div>
```
> HTML element example
```JavaScript
moveStyleAttribute(
    document.querySelector('body'),
    /display\:\s*\w+\s*(!important)*;/g,
    true,
    'display: none;'
);
```
> Edit without overwriting
### Get property value
When you need to set one value based on another on the fly.
```JavaScript
function getStyleValue(property, node) {
    return window.getComputedStyle(node)
        .getPropertyValue(property)
}
```
| Parameter | Use       | Value     | Description                                                           |
|-----------|-----------|-----------|-----------------------------------------------------------------------|
| property  | Required  | String    | The name of the CSS property                                          |
| node      | Required  | Element   | The reference to the HTML element (a node) that you have selected     |
## Persisting
### Cookies
#### Reading
```JavaScript
function getCookie(name) {
    const start = document.cookie.indexOf(name + '=');
    if (start > -1) {
        let data = document.cookie.substring(start + name.length + 1);
        const end = data.indexOf(';');
        data = end > -1 ? data.substring(0, end) : data;
        for (const builtin of [decodeURIComponent, decodeURI, unescape]) {
            try {
                data = builtin(data);
                break
            } catch (e) {
                console.log(e)
            }
        }
        return data
    }
}
```
> The `unescape` built-in function is **deprecated**, this feature is no longer recommended but is used here as a last case to avoid an error if you encounter it (cookies are almost always encoded to handle special characters)
#### Writing
Editing a cookie requires determining a few properties, each of the following functions allows you to configure them.
##### Functions for properties
###### domain
```JavaScript
function getCookieDomain(unrestricted) {
    var potentialSubdomain = window.location.hostname
      , mainDomain = potentialSubdomain.match(/\w*\.\w*$/)[0]
      ;
    return '.' + (unrestricted ? mainDomain : potentialSubdomain)
}
```
> Note that sometimes you will not be able to set a cookie on the main domain (if you do not own it and are simply a user of one of its subdomains for example), and it is important to understand that a cookie set to a domain is accessible by all of its subdomains (set `unrestricted` to `true` for this) but a cookie on a subdomain is not accessible by adjacent and higher domains
###### expires
```JavaScript
function getRelativeUTC(days = 0, year, month, day) {
    let time = new Date();
    const hours = time.getUTCHours()
        , minutes = time.getUTCMinutes()
        , seconds = time.getUTCSeconds()
        ;
    if (year && month && day) time = new Date(Date.UTC(
        year, month -1, day, hours , minutes , seconds
    ));
    time.setUTCDate(time.getUTCDate() + Number(days));
    return time.toUTCString()
}
```
| Parameter | Use       | Value             | Description                                                                           |
|-----------|-----------|-------------------|---------------------------------------------------------------------------------------|
| days      | Required  | Integer/String    | A negative value deletes the cookie, a positive value determines its lifespan         |
| year      | Optional  | Integer/String    | From a date different from the current one, parameters `year` `month` `day` or none   |
| month     | Optional  | Integer/String    | "                                                                                     |
| day       | Optional  | Integer/String    | "                                                                                     |
###### Secure
```JavaScript
function isHTTPS() {
    return /^https/.test(location.href)
}
```
> **Warning**: In the absence of HTTPS, if you try to write a cookie with the `Secure` property it will simply not be written and there will be no error to inform you
##### The function
```JavaScript
function setCookie(name, value, path, domain, expires, same) {
    const c = `${name}=${encodeURIComponent(value)}; `
            + `path=${path}; `
            + `domain=${domain}; `
            + `expires=${expires}; `
            + `SameSite=${same}`
            + `${isHTTPS() ? '; Secure' : ';' }`
            ;
    document.cookie = c
}
```
> **Warning**: if you modify a third-party cookie with the `encodeURIComponent` method and if initially it was encoded with `encodeURI` or `escape`, then the third-party solution may not respond if this type of error is not handled.
###### Example of use
I recommend leaving `path` at the root value `/`, but if you want to fine-tune cookie availability in addition to domain-based configuration, you can also use `location.pathname`.
```JavaScript
setCookie(
    'Vegan',
    'This cookie is an animal-free product',
    '/',
    getCookieDomain(),
    getRelativeUTC(365),
    'lax'
)
```
> The `lax` property determines read access ( [SameSite | OWASP Foundation](https://owasp.org/www-community/SameSite) ), and if this function fail to read or write an existing cookie: it is possible that `HttpOnly` restricts access to cookies ( [HTTP cookies | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies) )
##### Deleting
Cookies are deleted when they expire.
```JavaScript
function unsetCookie(name) {
    setCookie(
        name,
        '',
        '/',
        getCookieDomain(),
        getRelativeUTC(-1),
        'strict'
    )
}
```
> To delete one, edit it with a date that is anterior to the actual time
### localStorage
The `localStorage` interface allows you to persist a value across pages in a much simpler way than cookies.
```JavaScript
function getSessionPageViews() {
    let count
      , reset
      ;
    const now = new Date().getTime()
        , session = 60 * 30 * 1000
        , started = Number(localStorage.getItem('sessionStart'))
        , ended = now > session + started
        ;
    if (started && !ended) reset = false;
    else {
        localStorage.setItem('sessionStart', now);
        reset = true
    }
    if (reset) count = 1;
    else count = 1 + Number(localStorage.getItem('sessionPages'));
    localStorage.setItem('sessionPages', count);
    return count
}
```
> This function must be invoked each time a page is loaded, you will obtain in return the number of pages visited within the limit of 30 minutes allocated as session duration
## Testing
### A/B Testing and Personalization
This was by far my favorite part! This involves not only having tracking skills to know how to report data, but also understanding which values are relevant. And then it involves Web development, Responsive Web Design of course, from the slightest change for a tiny A/B test to a very extensive modification of the home page of a major client as part of a personalization experience. And finally, designing and applying the logic that will make certain tests possible requires a certain ingenuity; it can be very complex to alter the rendering without impacting the visitor's experience by overriding the intended behavior.
> I won't go into further detail here. I simply provide functions to randomly determine which version (control or variant) should be triggered, it's light and reliable.
#### Random Generation
##### Testing a single variant
> So two versions: a control one, and its variant including the modifications
```JavaScript
function getRandomAB(raw = false) {
    const integer = Math.round(Math.random());
    if (raw) return integer;
    else if (integer) return 'B';
    else return 'A'
}
```
| Parameter | Use       | Value     | Description                                                   |
|-----------|-----------|-----------|---------------------------------------------------------------|
| raw       | Optional  | Boolean   | If `true` or `1` it returns `0`/`1`, else it returns `A`/`B`  |
##### Testing up to nine variants
> So ten versions: one control, and its variants each including a different modification
```JavaScript
function getRandomAJ(versions = 5, raw = false) {
    const check = Number.isInteger(versions)
            && versions >= 2
            && versions <= 10
        , keys = ['A','B','C','D','E','F','G','H','I','J']
        ;
    if (!check) throw new Error('Expect integer (2-10)');
    let i = Infinity;
    while (i > versions -1) i = Math.trunc(10 * Math.random());
    return raw ? i : keys[i]
}
```
| Parameter | Use       | Value     | Description                                                               |
|-----------|-----------|-----------|---------------------------------------------------------------------------|
| versions  | Optional  | Integer   | `5` by default, but you'll probably use `3`... you could go up to `10`    |
| raw       | Optional  | Boolean   | If `true` or `1` it returns `0`-`9`, else it returns `A`-`J`              |
#### Proof of Concept
I understand that you may doubt the effectiveness of such simple functions when certain third-party solutions offer you, in addition to other functionalities, to obtain the same result.
##### How to collect results
```JavaScript
function getVersionDistribution(iterations, invokable, ...parameters) {
    let i = 0;
    const data = {}
        , alphabetical = {}
        ;
    while (i < iterations) {
        const x = invokable(...parameters);
        data[x] ? data[x]++ : data[x] = 1;
        i++
    }
    for (const key of Object.keys(data).sort()) alphabetical[key] = data[key];
    return alphabetical
}
```
| Parameter     | Use       | Value             | Description                                                                           |
|---------------|-----------|-------------------|---------------------------------------------------------------------------------------|
| iterations    | Required  | Integer           | How many times do you want to invoke it to check version distribution?                |
| invokable     | Required  | Function          | It will only be `getRandomAB`or `getRandomAJ` here                                    |
| parameters    | Optional  | [Integer,]Boolean | Could be `true` for `getRandomAB`, at least an integer (`3`-`10`) for `getRandomAJ`   |
##### How to view results
###### 1 million times, 2 versions
```JavaScript
console.log(getVersionDistribution(1000000, getRandomAB));
```
###### 1 million times, but 10 times
```JavaScript
let i = 0;
while (i < 10) {
    console.log(getVersionDistribution(1000000, getRandomAB));
    i++
}
```
###### 1 billion times, 5 versions 
```JavaScript
console.log('This may take a minute, please wait...');
console.log(getVersionDistribution(1000000000, getRandomAJ, 5));
```