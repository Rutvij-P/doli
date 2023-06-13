import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const CarRecommend = () => {
    const [companies, setCompanies] = useState<string[]>([]);
    const [driveTypes, setDriveTypes] = useState<string[]>([]);
    const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
    const [seats, setSeats] = useState<number[]>([]);
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    const [selectedDriveTypes, setSelectedDriveTypes] = useState<string[]>([]);
    const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  
    const fetchFilters = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/filters');
        const { companies, driveTypes, vehicleTypes, seats } = response.data;
        setCompanies(companies);
        setDriveTypes(driveTypes);
        setVehicleTypes(vehicleTypes);
        setSeats(seats);
      } catch (error) {
        console.error('Failed to fetch filters', error);
      }
    };
  
    const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target;
      setSelectedCompanies((prevCompanies) =>
        checked ? [...prevCompanies, value] : prevCompanies.filter((company) => company !== value)
      );
    };
  
    const handleDriveTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target;
      setSelectedDriveTypes((prevDriveTypes) =>
        checked ? [...prevDriveTypes, value] : prevDriveTypes.filter((driveType) => driveType !== value)
      );
    };
  
    const handleVehicleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target;
      setSelectedVehicleTypes((prevVehicleTypes) =>
        checked ? [...prevVehicleTypes, value] : prevVehicleTypes.filter((vehicleType) => vehicleType !== value)
      );
    };
  
    const handleSeatsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target;
      const seatNumber = parseInt(value, 10);
      setSelectedSeats((prevSeats) =>
        checked ? [...prevSeats, seatNumber] : prevSeats.filter((seat) => seat !== seatNumber)
      );
    };
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      const queryParams = new URLSearchParams({
        companies: selectedCompanies.join(','),
        driveTypes: selectedDriveTypes.join(','),
        vehicleTypes: selectedVehicleTypes.join(','),
        seats: selectedSeats.join(','),
      });
      const url = `http://localhost:3000/api/recommendations?${queryParams.toString()}`;
  
      try {
        const response = await axios.get(url);
        // Handle the recommended car data
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch recommended cars', error);
      }
    };
  
    // Fetch filters on component mount
    useEffect(() => {
      fetchFilters();
    }, []);
  
    return (
      <div className='flex-col pt-100px'>
        <h1 className='text-3vw flex justify-evenly'>Car Recommendation</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Company</h2>
            {companies.map((company) => (
              <label key={company}>
                <input type="checkbox" value={company} onChange={handleCompanyChange} />
                {company}
              </label>
            ))}
          </div>
  
          <div>
            <h2>Drive Type</h2>
            {driveTypes.map((driveType) => (
              <label key={driveType}>
                <input type="checkbox" value={driveType} onChange={handleDriveTypeChange} />
                {driveType}
              </label>
            ))}
          </div>
  
          <div>
            <h2>Vehicle Type</h2>
            {vehicleTypes.map((vehicleType) => (
              <label key={vehicleType}>
                <input type="checkbox" value={vehicleType} onChange={handleVehicleTypeChange} />
                {vehicleType}
              </label>
            ))}
          </div>
  
          <div>
            <h2>Seats</h2>
            {seats.map((seat) => (
              <label key={seat}>
                <input type="checkbox" value={seat} onChange={handleSeatsChange} />
                {seat}
              </label>
            ))}
          </div>
  
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  
  export default CarRecommend;
  