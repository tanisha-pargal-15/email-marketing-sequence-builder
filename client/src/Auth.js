import React, { useState } from 'react';

const Auth = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const route = isLogin ? 'login' : 'signup';
    const res = await fetch(`http://localhost:5000/api/${route}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await res.json();
  
    if (isLogin) {
      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        alert(data.error || 'Login failed');
      }
    } else {
      if (res.ok && data.message === 'User created') {
        alert('Signup successful! Now please log in.');
        setIsLogin(true); // switch to login form
      } else {
        alert(data.error || 'Signup failed');
      }
    }
  };
  

  return (
    <div style={{ padding: 20 }}>
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', color: 'blue' }}>
        {isLogin ? 'Need an account? Sign up' : 'Have an account? Log in'}
      </p>
    </div>
  );
};

export default Auth;
