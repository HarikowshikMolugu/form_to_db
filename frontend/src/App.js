import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckboxValues([...checkboxValues, value]);
    } else {
      setCheckboxValues(checkboxValues.filter((val) => val !== value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    
    if (!radioValue) {
      setError('Please select a radio option.');
      return;
    }
  
   
    if (checkboxValues.length === 0) {
      setError('Please select at least one checkbox.');
      return;
    }
  
    // Reset error and show loading indicator
    setError('');
    setLoading(true);
  
    // Prepare the form data to send in the API request
    const formData = {
      name,
      email,
      phoneNumber,
      checkboxValues,
      radioValue,
    };
  
    // Make the API call to store the form data
    fetch('http://localhost:9000/testAPI', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Form data stored in XAMPP:', data);
  
        // Reset form state
        setName('');
        setEmail('');
        setPhoneNumber('');
        setRadioValue('');
        setCheckboxValues([]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error storing form data:', error);
        setError('Error storing form data. Please try again later.');
        const formData = {
          name,
          email,
          phoneNumber,
          checkboxValues,
          radioValue,
        };
        console.log(formData);
        setLoading(false);
      });
  };
  

  return (
    <div style={{display:"grid",placeItems:"center",marginTop:"5%"}}>
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <label for="name">Name:</label><br></br>
      <input  type="text" id="name" name="name" value={name} onChange={handleNameChange} required/><br></br>

    <label for="email">Email:</label><br></br>
    <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required /><br></br>

    <label for="phoneNumber">Phone Number:</label><br></br>
    <input type="tel" id='phoneNumber' name='phoneNumber' value={phoneNumber} onChange={handlePhoneNumberChange} required /><br></br>
      <div >
      <h2>Choose the city you want to travel</h2>
        <label >
          <input
            type="checkbox"
            value="City1"
            checked={checkboxValues.includes('City1')}
            onChange={handleCheckboxChange}
          />
          City 1
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            value="City2"
            checked={checkboxValues.includes('City2')}
            onChange={handleCheckboxChange}
          />
          City 2
        </label>
      </div>
      <div>
        <h2>Choose the travelling type</h2>
        <label>
          
          <input
            type="radio"
            value="option1"
            checked={radioValue === 'option1'}
            onChange={handleRadioChange}
          />
          Option 1
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="option2"
            checked={radioValue === 'option2'}
            onChange={handleRadioChange}
          />
          Option 2
        </label>
      </div>
      <br></br>
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
    </div>
    
  );
};

export default App;