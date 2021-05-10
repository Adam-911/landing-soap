const onSubmit = (type) => {
    let name, contact;
    
    switch (type) {
        case 'footer':
            name = document.getElementById('name').value;
            contact = document.getElementById('contact').value;
            break;
        case 'modal':
            // Значения из modal;  
    }
    postData('https://adamgutov.kz/sendmail', { name, contact});
}

// Пример отправки POST запроса:
function postData(url = '', data = {}) {
    const myHeaders = new Headers();

    const requestOptions = {
        method: 'GET',
        mode: 'no-cors',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`${url}/${data.name}/${data.contact}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}