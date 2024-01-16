import React, { useEffect, useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

const holidayDates = ['2023-01-01', '2023-07-04', '2023-12-25'];
function isWeekend(date) {
  const day = date.getDay();
  return day === 5 || day === 6; // 5 is Friday, 6 is Saturday
}

function isHoliday(date) {
  // Add your logic to check if the date is a holiday
  // For example:
  return holidayDates.includes(formatDate(date));
  return false;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function App() {
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();

  const handleDateChange = (e) => {
    const selected = new Date(e.target.value);

    if (isWeekend(selected) || isHoliday(selected)) {
      // If it's a weekend or holiday, don't allow the selection
      alert("Please select a valid weekday that is not a holiday.");
      setSelectedDate('');
    } else {
      setSelectedDate(e.target.value);
    }
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const date = form.date.value;
    const time = form.time.value;
    const level = form.level.value;
    const department=form.department.value;
    console.log(department)
    const examStartInfo = { date, time, level ,department};
    fetch('http://localhost:5000/examInfo', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(examStartInfo)
    })
      .then(res => res.json())
      .then(data => {
        if(data){
          console.log(data)
          navigate('/routine')
        }
      })
     
    // console.log(examStartInfo)
    // console.log('submitting')
  }

  

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <form className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pickDate">
              Pick Start Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pickDate"
              type="date"
              name="date"
              value={selectedDate}
              onChange={handleDateChange}
              placeholder="Enter Start Day"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="exampleFormControlSelect1">
              Select Exam Time
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="exampleFormControlSelect1" name="time"
            >
              <option>10</option>
              <option>2</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="exampleFormControlSelect1">
              Select Department
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="exampleFormControlSelect1" name="department"
            >
              <option>CSE</option>
              <option>ECE</option>
              <option>EEE</option>
              
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="exampleFormControlSelect1">
              Select Level Semester
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="exampleFormControlSelect1" name="level"
            >
              <option>L-1-S-1</option>
              <option>L-1-S-2</option>
              <option>L-2-S-1</option>
              <option>L-2-S-2</option>
              <option>L-3-S-1</option>
              <option>L-3-S-2</option>
              <option>L-4-S-1</option>
              <option>L-4-S-2</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
