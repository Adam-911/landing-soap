let _POPUP = document.getElementById('feedbackpopup'),
    _OKButton = document.querySelector('.popup_content_feedback');

_OKButton.onclick = function() {
    console.log("ONCLICK");
    _POPUP.style.display = 'none';
}

const onSubmit = (type='') => {
    let name, contact;
    console.log("llll");
    switch (type) {
        case 'footer':
            name = document.getElementById('name');
            contact = document.getElementById('contact');
            break;
        case 'modal':
            // Значения из modal;  
    }
    sendToMailer('http://localhost:9002/sendmail', { name, contact});
    // return false;
}

function sendToMailer(url = '', data = {}) {
    const myHeaders = new Headers();

    const requestOptions = {
        method: 'GET',
        mode: 'no-cors',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${url}/${data.name.value}/${data.contact.value}`, requestOptions)
        .then(response => {
            response.text();
            _POPUP.style.display = 'block';
            data.name.value = '';
            data.contact.value = '';
        })
        .then(result => console.log("result" + result))
        .catch(error => console.log('error', error));
}

