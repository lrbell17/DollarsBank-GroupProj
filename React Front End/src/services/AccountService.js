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

    updateAccount = (account_id, user_id, balance) => {
        return axios.put(`${account_url}/update`, {
            id: account_id,
            userId: user_id,
            balance: balance
        })
    }

    deleteAccount = (account_id) => {
        return axios.delete(`${account_url}/delete/${account_id}`)
    }
}

export default new AccountService();