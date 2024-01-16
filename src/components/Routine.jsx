import React, { useEffect, useState } from 'react';

const Routine = () => {
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/examInfo')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const size = data.length;
        setRoutine(data[size - 1]['examSchedule']);
      });
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto mb-20">
      <h1 className="text-3xl text-center mb-6">Updated Routine</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
          <thead>
            <tr>
            <th className="py-2 pl-4 pr-6 border-b">Course Code</th>
              <th className="py-2 pl-4 pr-6 border-b">Date</th>
              <th className="py-2 pl-4 pr-6 border-b">Day</th>
              <th className="py-2 pl-4 pr-6 border-b">Duration</th>
            </tr>
          </thead>
          <tbody>
            {routine.map((r) => (
              <tr key={r.course_name} className="hover:bg-gray-50 transition">
                <td className="py-2 px-6 border-b">{r.course_name}</td>
                <td className="py-2 px-6 border-b">{r.date}</td>
                <td className="py-2 px-6 border-b">{r.day}</td>
                <td className="py-2 px-6 border-b">{r.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Routine;
