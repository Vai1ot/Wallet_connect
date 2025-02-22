import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  // Проверка наличия MetaMask при загрузке компонента
  useEffect(() => {
    if (window.ethereum) {
      checkIfWalletIsConnected();
    } else {
      alert('Пожалуйста, установи MetaMask в браузере!');
    }
  }, []);

  // Функция для проверки, подключён ли кошелёк
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert('MetaMask не найден! Установи расширение.');
        return;
      }

      // Проверяем, есть ли уже подключённые аккаунты
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        const account = accounts[0];
        setWalletAddress(account);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Ошибка при проверке подключения:', error);
    }
  };

  // Функция для подключения к MetaMask
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert('MetaMask не найден! Установи расширение.');
        return;
      }

      // Запрашиваем доступ к аккаунтам через MetaMask
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setWalletAddress(account);
      setIsConnected(true);
    } catch (error) {
      console.error('Ошибка при подключении:', error);
      alert('Не удалось подключиться к MetaMask. Убедись, что расширение установлено и ты дал разрешение.');
    }
  };

  return (
    <div className="App" style={{ padding: '20px', textAlign: 'center' }}>
      <Card className="mx-auto" style={{ maxWidth: '400px' }}>
        <Card.Body>
          <Card.Title>Лишние деньги? Подключи кошелёк</Card.Title>
          {isConnected ? (
            <Card.Text>
              <strong>Адрес кошелька:</strong> {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </Card.Text>
          ) : (
            <Button variant="primary" onClick={connectWallet}>
              Подключить кошелёк
            </Button>
          )}
        </Card.Body>
      </Card>

      {/* Место для гифки */}
      <div style={{ marginTop: '20px' }}>
        <img
          src="https://i.gifer.com/origin/e9/e9a505d1d8604f350e9df5b33b551493_w200.webp" // Пример гифки с GIPHY
          alt="Gif"
          style={{ maxWidth: '100%', height: 'auto' }} // Адаптивный размер
        />
      </div>
    </div>
  );
}

export default App;