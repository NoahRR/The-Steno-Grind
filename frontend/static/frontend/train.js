document.querySelector('#typie').select()

var wordlist = document.querySelector('#wordlistFULL').innerHTML
var wordlist_amm = wordlist.split(' ').length
var leftover = ''
var lastOffSet = null
var offBool = true
var startTime = null

document.addEventListener('DOMContentLoaded', function() {
    lastOffSet = document.querySelector('#firstWord').offsetTop
}, false);

divideAndDisplay(wordlist)

function divideAndDisplay(str) {
    document.querySelector('#wordlistcont').innerHTML = ''
    document.querySelector('#wordlistcont').innerHTML += `<span class="restList1">${leftover}</span>`
    document.querySelector('#wordlistcont').innerHTML += `<span id='firstWord'>${str.split(' ')[0]}</span>`
    document.querySelector('#wordlistcont').innerHTML += ` <span class="restList1" id="restList">${str.split(' ').slice(1).join(' ')}</span>`

}

function check() {

    if (!startTime) {
        startTime = Date.now()
    } 

    var inputValue = document.querySelector('#typie').value.trim().toLowerCase()
    var targetValue = document.querySelector('#firstWord').innerHTML.trim().toLowerCase()

    // move on to next word
    if (inputValue == targetValue) {

        document.querySelector('#typie').value = ''
        if (offBool) {
            leftover += wordlist.split(' ')[0] + ' '
            wordlist = wordlist.split(' ').slice(1).join(' ').trim()
        }

        divideAndDisplay(wordlist)

        // cut off top line, if moved on to next line
        if (lastOffSet != document.querySelector('#restList').offsetTop) {
            if (offBool) {
                leftover = ''
                wordlist = document.querySelector('#restList').innerHTML
                offBool = false
            } else {
                offBool = true
            }
        }

        // end
        if (wordlist.length < 1) {
            var seconds_elapsed = (Date.now() - startTime) / 1000

            // calculate WPM
            var WPM = ( wordlist_amm * 60 ) / seconds_elapsed

            document.querySelector('#wordlistcont').innerHTML = ''
            document.querySelector('#wordlistcont').innerHTML = '<span><span style="color: green;">' + Math.floor(WPM) + ' WPM</span></span>'
        }

        lastOffSet = document.querySelector('#restList').offsetTop
    }
}

document.querySelector('#typie').addEventListener('input', function(e) {
    check()
})

document.querySelector('#typie_form').addEventListener('submit', function(e) {
    e.preventDefault()
    check()
})

