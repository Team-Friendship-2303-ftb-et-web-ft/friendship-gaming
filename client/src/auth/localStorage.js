export function storeCurrentUser(user) {
    localStorage.setItem('currentUser', user);
  }
  
  export function storeCurrentToken(token) {
    localStorage.setItem('token', token);
  }
  
  export function getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user;
  }
  
  export function clearCurrentUser() {
    localStorage.removeItem('currentUser');
  }

  export function storeCurrentCart(cart) {
    localStorage.setItem('currentCart', cart);
  }