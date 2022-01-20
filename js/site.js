// display a message to the user
function getMessage() {

    let userMessage = document.getElementById("message").value;

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
    })
    console.log(userMessage);
};