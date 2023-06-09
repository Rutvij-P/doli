import { useEffect, useState } from 'react';
import axios from 'axios';

interface Car {
  name: string;
  picture: string;
  company: string;
  driveType: string;
  vehicleType: string;
  seats: number;
}

const CarList = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Failed to fetch car data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Car List</h1>
      <ul>
        {cars.map((car) => (
          <li key={car.name}>
            <img src={car.picture} alt={car.name} />
            <h2>{car.name}</h2>
            <p>Company: {car.company}</p>
            <p>Drive Type: {car.driveType}</p>
            <p>Vehicle Type: {car.vehicleType}</p>
            <p>Seats: {car.seats}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
