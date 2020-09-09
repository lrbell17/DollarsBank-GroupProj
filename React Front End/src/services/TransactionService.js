import axios from 'axios';

const trans_url = "http://localhost:8080/transaction";

class TransactionService {

    getAllUserTransactions = (userId) => {
        return axios.get(`${trans_url}/user/${userId}`);
    }

    getAllAccountTransactions = (accountId) => {
        return axios.get(`${trans_url}/acct/${accountId}`);
    }

    createTransaction = (type, user_id, account_id, amount, start_balance, end_balance) => {

        const date = new Date();

        return axios.post(`${trans_url}/create`, {
            type: type,
            userId: user_id,
            accountId: account_id,
            amount: amount,
            startBalance: start_balance,
            endBalance: end_balance,
            timeStamp: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
        });
    }

    deleteTransaction = (id) => {
        return axios.delete(`${trans_url}/delete/${id}`);
    }
}

export default new TransactionService();