import { useEffect, useState } from 'react';
import axios from 'axios';
import Tilt from 'react-parallax-tilt';
import '../pages/carList.css';
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
    <div className="flex-col pt-100px">
        <h3 className="text-3vw flex justify-evenly">Car List</h3>
          <ul className='flex flex-wrap items-stretch py-4 justify-evenly'>
            {cars.map((car) => (
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
    </div>
  );
};

export default CarList;
