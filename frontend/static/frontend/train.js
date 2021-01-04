document.querySelector('#typie').select()

var wordlist = document.querySelector('#wordlistFULL').innerHTML

divideAndDisplay(wordlist)

function divideAndDisplay(str) {
    document.querySelector('#wordlistcont').innerHTML = ''
    document.querySelector('#wordlistcont').innerHTML += `<span id='firstWord'>${str.split(' ')[0]}</span>`
    document.querySelector('#wordlistcont').innerHTML += ` <span id="restList">${str.split(' ').slice(1).join(' ')}</span>`

}

function check() {
    var inputValue = document.querySelector('#typie').value.trim().toLowerCase()
    var targetValue = document.querySelector('#firstWord').innerHTML.trim().toLowerCase()

    // move on to next word
    if (inputValue == targetValue) {

        document.querySelector('#typie').value = ''
        wordlist = wordlist.split(' ').slice(1).join(' ').trim()
        divideAndDisplay(wordlist)

        // end
        if (wordlist.length < 1) {
            document.querySelector('#firstWord').innerHTML = '<span style="color: green;">COMPLETED</span>'
        }
    }
}

document.querySelector('#typie').addEventListener('input', function(e) {
    check()
})

document.querySelector('#typie_form').addEventListener('submit', function(e) {
    e.preventDefault()
    check()
})

