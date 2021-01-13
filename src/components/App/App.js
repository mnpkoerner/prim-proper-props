import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from '../Header/Header.js'
import Footer from '../Footer/Footer.js'
import GuestList from '../GuestList/GuestList.js'
import DinnerSupplies from '../DinnerSupplies/DinnerSupplies.js'
import GuestForm from '../GuestForm/GuestForm.js'
import PartyLeader from '../PartyLeader/PartyLeader.js'

function App() {
  let [guestList, setGuestList] = useState([]);
  let [newGuestName, setNewGuestName] = useState('');
  let [newGuestMeal, setNewGuestMeal] = useState('false');

  //On load, get guests
  useEffect(() => {
    getGuests()
  }, [])

  const getGuests = () => {
    axios.get('/guests')
      .then(response => {
        setGuestList(response.data)
      })
      .catch(err => {
        alert('error getting guests');
        console.log(err);
      })
  }


  const addGuest = () => {
    axios.post('/guests', { name: newGuestName, kidsMeal: newGuestMeal })
      .then(response => {
        // clear inputs
        setNewGuestName('');
        setNewGuestMeal(false);

        getGuests();
      })
      .catch(err => {
        alert('Error Adding Guest');
        console.log(err);
      })
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (newGuestName) {
      addGuest();
    }
    else {
      alert('The new guest needs a name!');
    }
  }

  console.log(newGuestMeal)
  return (
    <>
      <Header />
      <PartyLeader
        leader={guestList[0]}
      />
      <GuestForm
        guestList={guestList}
        handleSubmit={handleSubmit}
        newGuestName={newGuestName}
        setNewGuestname={setNewGuestName}
        newGuestMeal={newGuestMeal}
        setNewGuestMeal={setNewGuestMeal}
      />
      <GuestList
        guestList={guestList}
      />
      <DinnerSupplies
        guestList={guestList}
      />
      <Footer />
    </>
  );
}

export default App;
