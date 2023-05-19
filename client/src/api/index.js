const BASE = "our api link here"

//REGISTER USER
export const registerUser = async (userObject) => {
    try{
        const response = await fetch(`${BASE}/users/register`, {
            method: 'POST',
            headers: {
                'Content=Type': 'application/json',
            },
            body: JSON.stringify(userObject),
        });
        const result = await response.json();
        console.log(result);
        if (result.user) {
            const {message, userObject, token} = result;
            localStorage.setItem('token', token);
            return {message, userObject, token};
        }
        if (result.error) {
            return result;
        }
        return;
    } catch (error){
        console.error(error);
    }
};
//LOGIN USER
export const loginUser = async (userObject) => {
    try{
        const response = await fetch(`${BASE}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userObject),
        });
        const result = await response.json();
        console.log(result);
        if (result.user){
            const {message, user, token} = result;
            localStorage.setItem('token', token);
            return {message, token, user};
        }
        if (result.error){
            return result;
        }
        const token = result.token;
        console.log(token);
        return;
    } catch (error) {
        console.error(error);
    }  
};
//GET ME

//GET ALL GAMES

//CREATE GAME

// GET GAME BY ID

//CREATE CART

//GET ALL CARTS

//GET CART BY USER

//

//GET ALL CART ITEMS

//CREATE CART ITEM
