function nextStep() {
    document.querySelectorAll('.part1').forEach((item) => {
        item.style.display = 'none'
    })
    document.querySelectorAll('.part2').forEach((item) => {
        item.style.display = 'unset'
    })
    document.querySelector('#word_amount').select()
}

