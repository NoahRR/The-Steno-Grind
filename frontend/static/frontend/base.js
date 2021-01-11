var mouseOverX = false

// easier calls to api
function callAPI(url, type, data) {

    $.ajax({
        url: url,
        type: type,
        data: data,
        success: function (response) {
            window.location.reload()
        },
        error: function (response) {
            alert("ERROR: couldn't complete the request!")
            console.log(response)
        }
    })

}

// move word group to trash
function groupToTrash() {

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

// formCreateSubmit('/api/wordgroup/', 'post', {'name': newName, 'parent': ('http://127.0.0.1:8000/api/users/' + userid + '/'), 'csrfmiddlewaretoken': csrf})
function formCreateSubmit(path, method, params) {

  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    // if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];

      form.appendChild(hiddenField);
    // }
  }

  document.body.appendChild(form);
  form.submit();
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
    shadowColor = item.style.boxShadow.substring(0, 3);

    if (shadowColor == 'red' && mouseOverX == false) {
        item.style.boxShadow = 'none';
        item.querySelector('input').checked = false;
    } else if (mouseOverX == false) {
        item.style.boxShadow = '0px 0px 8px -2px red';
        item.querySelector('input').checked = true;
    }
}

// group items hover styling
document.querySelectorAll('.group_cont').forEach((item) => {
    item.addEventListener('mouseover', function() {
        if (this.style.boxShadow.substring(0, 3) != 'red') {
            this.style.boxShadow = '0px 0px 8px -2px rgba(143,143,143,1)'
        }
        try {this.querySelector('.xx').style.display = 'unset'} catch {}
    })
    item.addEventListener('mouseout', function() {
        if (this.style.boxShadow.substring(0, 3) != 'red') {
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
        alert('Are you sure you want to delete this group?')
    })
})


