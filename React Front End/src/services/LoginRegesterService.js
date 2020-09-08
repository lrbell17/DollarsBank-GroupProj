import axios from 'axios';

const user_url = "http://localhost:8080/user";

class LoginRegistrationService {

    createUser = (fname, lname, uname, eMail, pass, amount) => {
        axios.post(user_url.concat("/create/").concat(amount), 
            {
                id: 0,
                firstName: fname,
                lastName: lname,
                userName: uname,
                password: pass,
                email: eMail
            }
        
        )
    }

    getUser = (uname, pass) => {
        return axios.get(`${user_url}/${uname}/${pass}`);
    }

    updateUser = (id, fname, lname, uname, eMail, pass, amount) => {
        return axios.put(`${user_url}/update`),
            {
                id: id,
                firstName: fname,
                lastName: lname,
                userName: uname,
                password: pass,
                email: eMail
            }
    }
}

export default new LoginRegistrationService();