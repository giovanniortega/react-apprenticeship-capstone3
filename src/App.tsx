import React, { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from './firebase/firebaseConfig';

interface MyObject {
  email: number;
  password: string;
}

function App() {
  // const [users, setUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(collection(db, 'users'));
      const usersArray: MyObject[] = [];
      data.forEach((user) => {
        const userData = user.data();
        usersArray.push(userData);
        console.log('array', usersArray);
      });
      // setUsers(usersArray);
    };

    getData();
  }, []);
  return (
    <div className="App">
      <h1>Hola</h1>
    </div>
  );
}

export default App;
