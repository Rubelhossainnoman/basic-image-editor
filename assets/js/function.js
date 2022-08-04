/**
 * Alear Founction....
*/

const setaleart = (msg,type = 'danger') =>{
    return `<p class=" d-flex justify-content-between align-content-center alert alert-${type}">${msg}<button class="btn-close" data-bs-dismiss="alert"></button></p>`
};
