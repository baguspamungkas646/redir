var Base64 = {<br />
&nbsp; &nbsp; _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",<br />
&nbsp; &nbsp; encode: function (input) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; var output = "";<br />
&nbsp; &nbsp; &nbsp; &nbsp; var chr1, chr2, chr3, enc1, enc2, enc3, enc4;<br />
&nbsp; &nbsp; &nbsp; &nbsp; var i = 0;<br />
&nbsp; &nbsp; &nbsp; &nbsp; input = Base64._utf8_encode(input);<br />
&nbsp; &nbsp; &nbsp; &nbsp; while (i &lt; input.length) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; chr1 = input.charCodeAt(i++);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; chr2 = input.charCodeAt(i++);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; chr3 = input.charCodeAt(i++);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; enc1 = chr1 &gt;&gt; 2;<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; enc2 = ((chr1 &amp; 3) &lt;&lt; 4) | (chr2 &gt;&gt; 4);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; enc3 = ((chr2 &amp; 15) &lt;&lt; 2) | (chr3 &gt;&gt; 6);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; enc4 = chr3 &amp; 63;<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; if (isNaN(chr2)) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; enc3 = enc4 = 64;<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; } else if (isNaN(chr3)) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; enc4 = 64;<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);<br />
&nbsp; &nbsp; &nbsp; &nbsp; }<br />
&nbsp; &nbsp; &nbsp; &nbsp; return output;<br />
&nbsp; &nbsp; },<br />
&nbsp; &nbsp; decode: function (input) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; var output = "";<br />
&nbsp; &nbsp; &nbsp; &nbsp; var chr1, chr2, chr3;<br />
&nbsp; &nbsp; &nbsp; &nbsp; var enc1, enc2, enc3, enc4;<br />
&nbsp; &nbsp; &nbsp; &nbsp; var i = 0;<br />
&nbsp; &nbsp; &nbsp; &nbsp; input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");<br />
&nbsp; &nbsp; &nbsp; &nbsp; while (i &lt; input.length) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; enc1 = this._keyStr.indexOf(input.charAt(i++));<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; enc2 = this._keyStr.indexOf(input.charAt(i++));<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; enc3 = this._keyStr.indexOf(input.charAt(i++));<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; enc4 = this._keyStr.indexOf(input.charAt(i++));<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; chr1 = (enc1 &lt;&lt; 2) | (enc2 &gt;&gt; 4);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; chr2 = ((enc2 &amp; 15) &lt;&lt; 4) | (enc3 &gt;&gt; 2);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; chr3 = ((enc3 &amp; 3) &lt;&lt; 6) | enc4;<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; output = output + String.fromCharCode(chr1);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; if (enc3 != 64) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; output = output + String.fromCharCode(chr2);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; if (enc4 != 64) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; output = output + String.fromCharCode(chr3);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }<br />
&nbsp; &nbsp; &nbsp; &nbsp; }<br />
&nbsp; &nbsp; &nbsp; &nbsp; output = Base64._utf8_decode(output);<br />
&nbsp; &nbsp; &nbsp; &nbsp; return output;<br />
&nbsp; &nbsp; },<br />
&nbsp; &nbsp; _utf8_encode: function (string) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; string = string.replace(/\r\n/g, "\n");<br />
&nbsp; &nbsp; &nbsp; &nbsp; var utftext = "";<br />
&nbsp; &nbsp; &nbsp; &nbsp; for (var n = 0; n &lt; string.length; n++) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; var c = string.charCodeAt(n);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; if (c &lt; 128) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; utftext += String.fromCharCode(c);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; } else if ((c &gt; 127) &amp;&amp; (c &lt; 2048)) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; utftext += String.fromCharCode((c &gt;&gt; 6) | 192);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; utftext += String.fromCharCode((c &amp; 63) | 128);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; } else {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; utftext += String.fromCharCode((c &gt;&gt; 12) | 224);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; utftext += String.fromCharCode(((c &gt;&gt; 6) &amp; 63) | 128);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; utftext += String.fromCharCode((c &amp; 63) | 128);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }<br />
&nbsp; &nbsp; &nbsp; &nbsp; }<br />
&nbsp; &nbsp; &nbsp; &nbsp; return utftext;<br />
&nbsp; &nbsp; },<br />
&nbsp; &nbsp; _utf8_decode: function (utftext) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; var string = "";<br />
&nbsp; &nbsp; &nbsp; &nbsp; var i = 0;<br />
&nbsp; &nbsp; &nbsp; &nbsp; var c = c1 = c2 = 0;<br />
&nbsp; &nbsp; &nbsp; &nbsp; while (i &lt; utftext.length) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; c = utftext.charCodeAt(i);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; if (c &lt; 128) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; string += String.fromCharCode(c);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; i++;<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; } else if ((c &gt; 191) &amp;&amp; (c &lt; 224)) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; c2 = utftext.charCodeAt(i + 1);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; string += String.fromCharCode(((c &amp; 31) &lt;&lt; 6) | (c2 &amp; 63));<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; i += 2;<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; } else {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; c2 = utftext.charCodeAt(i + 1);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; c3 = utftext.charCodeAt(i + 2);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; string += String.fromCharCode(((c &amp; 15) &lt;&lt; 12) | ((c2 &amp; 63) &lt;&lt; 6) | (c3 &amp; 63));<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; i += 3;<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }<br />
&nbsp; &nbsp; &nbsp; &nbsp; }<br />
&nbsp; &nbsp; &nbsp; &nbsp; return string;<br />
&nbsp; &nbsp; }<br />
}<br />
var encode = document.getElementById('encode'),<br />
&nbsp; &nbsp; decode = document.getElementById('decode'),<br />
&nbsp; &nbsp; output = document.getElementById('output'),<br />
&nbsp; &nbsp; input = document.getElementById('input');<br />
var User_ID = "";<br />
var protected_links = "";<br />
var a_to_va = 0;<br />
var a_to_vb = 0;<br />
var a_to_vc = "";<br />
<br />
function auto_safelink() {<br />
&nbsp; &nbsp; auto_safeconvert();<br />
}<br />
<br />
function auto_safeconvert() {<br />
&nbsp; &nbsp; var a_to_vd = window.location.hostname;<br />
&nbsp; &nbsp; if (protected_links != "" &amp;&amp; !protected_links.match(a_to_vd)) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; protected_links += ", " + a_to_vd;<br />
&nbsp; &nbsp; } else if (protected_links == "") {<br />
&nbsp; &nbsp; &nbsp; &nbsp; protected_links = a_to_vd;<br />
&nbsp; &nbsp; }<br />
&nbsp; &nbsp; var a_to_ve = "";<br />
&nbsp; &nbsp; var a_to_vf = new Array();<br />
&nbsp; &nbsp; var a_to_vg = 0;<br />
&nbsp; &nbsp; a_to_ve = document.getElementsByTagName("a");<br />
&nbsp; &nbsp; a_to_va = a_to_ve.length;<br />
&nbsp; &nbsp; a_to_vf = a_to_fa();<br />
&nbsp; &nbsp; a_to_vg = a_to_vf.length;<br />
&nbsp; &nbsp; var a_to_vh = false;<br />
&nbsp; &nbsp; var j = 0;<br />
&nbsp; &nbsp; var a_to_vi = "";<br />
&nbsp; &nbsp; for (var i = 0; i &lt; a_to_va; i++) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; a_to_vh = false;<br />
&nbsp; &nbsp; &nbsp; &nbsp; j = 0;<br />
&nbsp; &nbsp; &nbsp; &nbsp; while (a_to_vh == false &amp;&amp; j &lt; a_to_vg) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; a_to_vi = a_to_ve[i].href;<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; if (a_to_vi.match(a_to_vf[j]) || !a_to_vi || !a_to_vi.match("http")) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; a_to_vh = true;<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; j++;<br />
&nbsp; &nbsp; &nbsp; &nbsp; }<br />
&nbsp; &nbsp; &nbsp; &nbsp; if (a_to_vh == false) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; var encryptedUrl = Base64.encode(a_to_vi);<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; a_to_ve[i].href = "http://www.vipinformasi.tk/p/download.html?url=" + encryptedUrl;<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; a_to_ve[i].rel = "nofollow";<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; a_to_vb++;<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; a_to_vc += i + ":::" + a_to_ve[i].href + "\n";<br />
&nbsp; &nbsp; &nbsp; &nbsp; }<br />
&nbsp; &nbsp; }<br />
&nbsp; &nbsp; var a_to_vj = document.getElementById("anonyminized");<br />
&nbsp; &nbsp; var a_to_vk = document.getElementById("found_links");<br />
&nbsp; &nbsp; if (a_to_vj) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; a_to_vj.innerHTML += a_to_vb;<br />
&nbsp; &nbsp; }<br />
&nbsp; &nbsp; if (a_to_vk) {<br />
&nbsp; &nbsp; &nbsp; &nbsp; a_to_vk.innerHTML += a_to_va;<br />
&nbsp; &nbsp; }<br />
}<br />
<br />
function a_to_fa() {<br />
&nbsp; &nbsp; var a_to_vf = new Array();<br />
&nbsp; &nbsp; protected_links = protected_links.replace(" ", "");<br />
&nbsp; &nbsp; a_to_vf = protected_links.split(",");<br />
&nbsp; &nbsp; return a_to_vf;<br />
}
