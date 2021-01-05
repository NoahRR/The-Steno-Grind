
// group items hover styling
document.querySelectorAll('.group_cont').forEach((item) => {
    item.addEventListener('mouseover', function() {
        if (this.style.boxShadow.substring(0, 3) != 'red') {
            this.style.boxShadow = '0px 0px 8px -2px rgba(143,143,143,1)'
        }
    })
    item.addEventListener('mouseout', function() {
        if (this.style.boxShadow.substring(0, 3) != 'red') {
            this.style.boxShadow = 'none'
        }
    })
})

// word count form section appreance
function nextStep() {
    document.querySelectorAll('.part1').forEach((item) => {
        item.style.display = 'none';
    })
    document.querySelectorAll('.part2').forEach((item) => {
        item.style.display = 'unset';
    })
    document.querySelector('#word_amount').select()
}

// check and uncheck group items
function check_uncheck(elem) {

    item = document.querySelector(`#cont${elem}`);
    shadowColor = item.style.boxShadow.substring(0, 3);

    if (shadowColor == 'red') {
        item.style.boxShadow = 'none';
        item.querySelector('input').checked = false;
    } else {
        item.style.boxShadow = '0px 0px 8px -2px red';
        item.querySelector('input').checked = true;
    }
}

