domain = "https://dayplanner-3.herokuapp.com"
function login(){
    let json_user = {
         "user": {
             "email": document.getElementById('email').value.toString(),
             "password": document.getElementById('password').value.toString()
         }
    }

    post_auth(domain+"/sessions#logged_in", json_user);
}

function registration(){
    let json_user = {
        "user": {
            "email": document.getElementById('email').value.toString(),
            "password": document.getElementById('password').value.toString(),
            "password_confirmation": document.getElementById('password').value.toString()
        }
    }

    post_auth(domain+"/registrations", json_user);
}

function post_auth(url, json_data) {
    $.ajax({
        type: 'post',
        data: json_data,
        cache: false,
        url: url,
        dataType: 'json',
        error: function (request, error) {
            error_alert(error)
        },
        success: function (response) {
            if(response.status === 401){
                alert("Wrong email or password.. :(");
            }
            else{
                console.log(response['user']['id']);
                setCookie('user_id', response['user']['id'], 1)
                setCookie('user_email', response['user']['email'], 1)
                window.location.href = "root.html";
                if(getCookie('user_id') === null) {
                    window.location.href = "index.html";
                }else{
                    window.location.href = "root.html";

                }
            }
        }
    });
}


