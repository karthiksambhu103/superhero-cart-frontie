import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Product from './Product'; // Import the ProductDetails component
import Lists from './Lists';
import Cart from './Cart';
import User from './User';

import Order from './Order';

function App() {

  return (
    <Router>

      <Routes>
        <Route path="/" element={<Lists />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/Cart/" element={<Cart />} />
        <Route path="/form/" element={<User />} />
        <Route path="/order/" element={<Order />} />

      </Routes>

    </Router>
  );
}

export default App;
