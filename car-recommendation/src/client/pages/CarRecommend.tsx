import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import '../pages/carList.css';

const CarRecommend = () => {
    const [companies, setCompanies] = useState<string[]>([]);
    const [driveTypes, setDriveTypes] = useState<string[]>([]);
    const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
    const [seats, setSeats] = useState<number[]>([]);
    const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
    const [selectedDriveTypes, setSelectedDriveTypes] = useState<string[]>([]);
    const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [recommendedCars, setRecommendedCars] = useState<any[]>([]);
  
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
        setRecommendedCars(response.data);
      } catch (error) {
        console.error('Failed to fetch recommended cars', error);
      }
    };
  
    // Fetch filters on component mount
    useEffect(() => {
      fetchFilters();
    }, []);

    const renderRecommendedCars = () => {
        if (recommendedCars.length === 0) {
          return <p>No cars found.</p>;
        }

        return (
            <ul className='flex flex-wrap items-stretch py-4 justify-evenly'>
              {recommendedCars.map((car) => (
                <Tilt
                className="parallax-effect-img"
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={800}
                transitionSpeed={1500}
                scale={1.05}
                gyroscope={true}>
                  <div className='flex-0 m-2.5 rounded-2xl border-gray-300 shadow-md h-108 w-96 object-fit' key={car.name}>
                    <li key={car.name}>
                      <img className='inner-element' src={car.picture} alt={car.name} />
                      <h2 className='flex justify-evenly text-2vw'>{car.name}</h2>
                      <p>Company: {car.company}</p>
                      <p>Drive Type: {car.driveType}</p>
                      <p>Vehicle Type: {car.vehicleType}</p>
                      <p>Seats: {car.seats}</p>
                    </li>
                  </div>
                </Tilt>
              ))}
            </ul>
          );
    };
  
    return (
        <div className='flex-col pt-100px'>
        <h1 className='text-3vw flex justify-evenly'>Car Recommendation</h1>
            <form onSubmit={handleSubmit}>
                <div className='flex-col py-4 justify-evenly'>
                    <h2 className='text-1.5vw py-2'>Company</h2>
                    {companies.map((company) => (
                        <label className='px-2 justify-evenly' key={company}>
                            <input type="checkbox" value={company} onChange={handleCompanyChange} />
                            {company}
                        </label>
                    ))}
                </div>
        
                <div className='flex-col py-4 justify-evenly'>
                    <h2 className='text-1.5vw py-2'>Drive Type</h2>
                    {driveTypes.map((driveType) => (
                        <label className='px-2 justify-evenly' key={driveType}>
                            <input type="checkbox" value={driveType} onChange={handleDriveTypeChange} />
                            {driveType}
                        </label>
                    ))}
                </div>
        
                <div className='flex-col py-4 justify-evenly'>
                    <h2 className='text-1.5vw py-2'>Vehicle Type</h2>
                    {vehicleTypes.map((vehicleType) => (
                        <label className='px-2 justify-evenly' key={vehicleType}>
                            <input type="checkbox" value={vehicleType} onChange={handleVehicleTypeChange} />
                            {vehicleType}
                        </label>
                    ))}
                </div>
        
                <div className='flex-col py-4 justify-evenly'>
                    <h2 className='text-1.5vw py-2'>Seats</h2>
                    {seats.map((seat) => (
                        <label className='px-2 justify-evenly' key={seat}>
                            <input type="checkbox" value={seat} onChange={handleSeatsChange} />
                            {seat}
                        </label>
                    ))}
                </div>
        
                <button className='text-2vw' type="submit">Submit</button>
            </form>

            <div>
                <h2>Recommended Cars:</h2>
                {renderRecommendedCars()}
            </div>

            <button className='text-2vw' onClick={() => setRecommendedCars([])}>Back</button>
            
        </div>
    );
  };
  
  export default CarRecommend;
  