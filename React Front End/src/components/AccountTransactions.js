import React from 'react';
import TransactionService from '../services/TransactionService.js';

class AccountTransactions extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            accountTransactions: []
        }
    }

    componentDidMount = () => {
  
            const accountNo = this.props.accountNo;

            TransactionService.getAllAccountTransactions(accountNo).then((response) => {
                this.setState(() => ({
                    accountTransactions: response.data
                }));

            })
    }

    componentDidUpdate = () => { 
        const accountNo = this.props.accountNo;

        TransactionService.getAllAccountTransactions(accountNo).then((response) => {

            this.setState(() => ({
                accountTransactions: response.data
            }));

        })
    }

    render() {


        const accountTransactions = this.state.accountTransactions;

        const errorStyle = {
            color: 'red'
        }
        const sucessStyle = {
            color: 'blue'
        }

        return(
            <div>

                <br/><h4> Last 5 Transactions for Account: {this.props.accountNo}  </h4><br/>


                <table className="table">
                    <thead>
                            <tr>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Balance</th>
                                <th>Time</th>
                            </tr>
                    </thead>
                    <tbody>
                        {
                            accountTransactions.reverse().slice(0,5).map((transaction, index) => (
                                
                                <tr key={index}>
                                    <td>{transaction.type}</td>

                                    {parseFloat(transaction.startBalance) <= parseFloat(transaction.endBalance) ?
                                        <td style={sucessStyle}>+ ${transaction.amount.toFixed(2)}</td>
                                        :
                                        <td style={errorStyle}>- ${transaction.amount.toFixed(2)}</td>
                                    }
                                    
                                    <td>${transaction.endBalance.toFixed(2)}</td>
                                    <td>{transaction.timeStamp}</td>
                                            
                                </tr>
                                  
                            ))
                        }
                    </tbody>
                </table>

                </div>
        )
    }
}

export default AccountTransactions;