import { useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';

const App = () => {
    const [charge, setCharge] = useState('');
    const [amount, setAmount] = useState(0);
    const [alert, setAlert] = useState({ show: false });
    const [id, setId] = useState('');
    const [edit, setEdit] = useState(false);

    const [expenses, setExpenses] = useState([
        { id: 1, charge: '렌트비', amount: 1600 },
        { id: 2, charge: '교통비', amount: 160 },
        { id: 3, charge: '식비', amount: 16 },
    ]);

    const handleCharge = (e) => {
        setCharge(e.target.value);
    };

    const handleAmount = (e) => {
        setAmount(e.target.valueAsNumber);
    };

    const handleSubmit = (e) => {
        console.log(e);
        e.preventDefault();
        /** 이 함수가 실행되면 expenses에 새로운 행을 추가하는 코드를 작성해줘 */
        if (charge !== '' && amount > 0) {
            if (edit) {
                const newExpenses = expenses.map((item) => {
                    return item.id === id ? { ...item, charge, amount } : item;
                });
                setExpenses(newExpenses);
                setEdit(false);
                handleAlter({
                    type: 'success',
                    text: '아이탬이 수정되었습니다',
                });
            } else {
                const newExpense = { id: crypto.randomUUID(), charge, amount };
                const newExpenses = [...expenses, newExpense];
                setExpenses(newExpenses);
                setCharge('');
                setAmount(0);
                handleAlter({
                    type: 'success',
                    text: '아이탬이 생성되었습니다.',
                });
            }
        } else {
            console.log('error');
            handleAlter({
                type: 'danger',
                text: 'charge는 빈 값일 수 없으며, amount 는 0보다 이상이여야 합니다.',
            });
        }
    };

    const handleDelete = (id) => {
        console.log(id);
        const newExpenses = expenses.filter((expenses) => expenses.id !== id);
        console.log(newExpenses);
        setExpenses(newExpenses);
        handleAlter({ type: 'danger', text: '삭제되었습니다.' });
    };

    const handleAlter = ({ type, text }) => {
        setAlert({ show: true, type, text });
        setTimeout(() => {
            setAlert({ show: false });
        }, 7000);
    };

    const handleEdit = (id) => {
        const expense = expenses.find((item) => item.id === id);
        const { charge, amount } = expense;
        setId(id);
        setCharge(charge);
        setAmount(amount);
        setEdit(true);
    };

    const clearItem = () => {
        console.log('확인');
        setExpenses([]);
    };

    return (
        <main className="main-container">
            {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
            <h1>예산 계산기</h1>
            <div
                style={{
                    width: '100%',
                    backgroundColor: 'white',
                    padding: '1rem',
                }}
            >
                <ExpenseForm
                    handleCharge={handleCharge}
                    charge={charge}
                    handleAmount={handleAmount}
                    amount={amount}
                    handleSubmit={handleSubmit}
                    edit={edit}
                />
            </div>
            <div
                style={{
                    width: '100%',
                    backgroundColor: 'white',
                    padding: '1rem',
                }}
            >
                <ExpenseList
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    clearItems={clearItem}
                    expenses={expenses}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'end',
                    marginTop: '1rem',
                }}
            >
                <p style={{ fontSize: '2rem' }}>
                    총지출:
                    <span>
                        {expenses.reduce((acc, curr) => {
                            return (acc += curr.amount);
                        }, 0)}
                        원
                    </span>
                </p>
            </div>
        </main>
    );
};
export default App;
