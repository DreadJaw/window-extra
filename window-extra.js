/**
BSD 3-Clause License

Copyright (c) 2019, DreadJaw
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* Base64 Features */
window.base64 = {}
window.base64.encode = window.btoa;
window.base64.decode = window.atob;
window.base64.toString = function() {
    return '[object Object]';
}

/* Get JSON from File */
window.getJSON = function(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            return callback(JSON.parse(this.responseText));
        } else {
            throw new Error(`Failed to get JSON: ${url} (${this.status})`);
        }
    }
    xhr.open('GET', url);
    xhr.send();
}

/* LocalStorage Extensions */
window.storage = {};
window.storage.set = function(name, val, enc = false) {
    if(typeof val == 'string') {
        if(enc) { val = window.btoa(enc) };
        let data = JSON.stringify({type: 'string', value: val});
        localStorage.setItem(name, data);
    }
    if(typeof val == 'object') {
        let stringVal = JSON.stringify(val);
        if(enc) { stringVal = window.btoa(stringVal) };
        let data = JSON.stringify({type: 'object', value: stringVal});
        localStorage.setItem(name, data);
    }
    else {
        let data = JSON.stringify({type: typeof val, value: val});
        localStorage.setItem(name, data);
    }
}
window.storage.get = function(name, enc = false) {
    if(!localStorage.getItem(name)) {
        return undefined;
    }
    let data = localStorage.getItem(name);
    data = JSON.parse(data);
    if(data.type == 'string') {
        if(enc) { return window.atob(data.value) }
        else { return data.value; }
    }
    if(data.type == 'object') {
        if(enc) { return JSON.parse(window.atob(data.value)) }
        else { return JSON.parse(data.value) }
    }
    else {
        return data.value;
    }
}
