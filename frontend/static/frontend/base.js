var mouseOverX = false

// easier calls to api
function callAPI(url, type, data, csrf_head) {

    $.ajax({
        url: url,
        type: type,
        data: data,
        headers:{"X-CSRFToken": csrf_head},
        success: function (response) {
            window.location.reload()
        },
        error: function (response) {
            alert("ERROR: couldn't complete the request!")
            console.log(response)
        }
    })

}

// create new word group item
function createNewGroup() {
    var newName = prompt('Provide a name for your new word group')
    var userid = document.querySelector('#USRID').value
    var csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value

    if (newName && userid && csrf) {
        var data = {
            'name': newName,
            'parent': ('http://127.0.0.1:8000/api/users/' + userid + '/'),
            'csrfmiddlewaretoken': csrf,
        }
        callAPI('/api/wordgroup/', 'post', data)
    }
}


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
    shadowColor = item.style.boxShadow.substring(0, 5);

    if (shadowColor == 'black' && mouseOverX == false) {
        item.style.boxShadow = 'none';
        item.querySelector('input').checked = false;
    } else if (mouseOverX == false) {
        item.style.boxShadow = '0px 0px 8px -2px black';
        item.querySelector('input').checked = true;
    }
}

// group items hover styling
document.querySelectorAll('.group_cont').forEach((item) => {
    item.addEventListener('mouseover', function() {
        if (this.style.boxShadow.substring(0, 5) != 'black') {
            this.style.boxShadow = '0px 0px 8px -2px rgba(143,143,143,1)'
        }
        try {this.querySelector('.xx').style.display = 'unset'} catch {}
    })
    item.addEventListener('mouseout', function() {
        if (this.style.boxShadow.substring(0, 5) != 'black') {
            this.style.boxShadow = 'none'
        }
        try {this.querySelector('.xx').style.display = 'none'} catch {}
    })
})

// x icon for group items
document.querySelectorAll('.xx').forEach( (item) => {
    item.addEventListener('mouseover', () => {
        mouseOverX = true
    })
    item.addEventListener('mouseout', () => {
        mouseOverX = false
    })
    item.addEventListener('click', () => {
        if (confirm('Are you sure you want to move this group to the trash?')) {

            var groupID = item.parentNode.dataset.val
            var groupTYPE = item.parentNode.dataset.type
            var csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value
            var userid = document.querySelector('#USRID').value
            var name = item.parentNode.dataset.key

            if ( groupTYPE == 'G' ) {
                if ( groupID && name && userid && csrf ) {
                    var url = '/api/wordgroup/' + groupID + '/'
                    var data = {
                        "name": name,
                        "trash": true,
                        "parent": `http://127.0.0.1:8000/api/users/${userid}/`
                    }
                    callAPI(url, 'put', data, csrf)
                }
            } else {
                //pass for now... this wil be for the DEFAULT GROUPS
            }
        }
    })
})


