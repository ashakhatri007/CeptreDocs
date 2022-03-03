// assets/js/post.js
window.onload = function(){
    setTimeout(function(){
        
    var codeBlocks = document.querySelectorAll('pre.highlight');

    codeBlocks.forEach(function (codeBlock) {

    var codeText = codeBlock.innerHTML;
    var copyButton = document.createElement('button');
    copyButton.className = 'copy';
    copyButton.type = 'button';
    copyButton.ariaLabel = 'Copy code to clipboard';
    copyButton.innerText = 'Copy';
    copyButton.style.right = '-90%';
    copyButton.style.position= 'relative';
    codeBlock.append(copyButton);

    copyButton.addEventListener('click', function () {
        var code = codeBlock.querySelector('code').innerText.trim();
        window.navigator.clipboard.writeText(code);

        copyButton.innerText = 'Copied';
        var fourSeconds = 4000;

        setTimeout(function () {
        copyButton.innerText = 'Copy';
        }, fourSeconds);
    });
    });
}, 150);
};