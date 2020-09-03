import axios from 'axios';

const account_url = "http://localhost:8080/account";

class AccountService {


    getAccount = (account_id) => {
        return axios.get(`${account_url}/${account_id}`);
    }

    getUserAccounts = (user_id) => {
        return axios.get(`${account_url}/all/${user_id}`);
    }

    createAccount = (user_id, initial_deposit) => {
        return axios.post(`${account_url}/create`, {
            userId: user_id,
            balance: initial_deposit
        })
    }

    deleteAccount = (account_id) => {
        return axios.delete(`${account_url}/delete/${account_id}`)
    }
}

export default new AccountService();