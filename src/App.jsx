import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { Container } from 'react-bootstrap';

function App() {
  const [mycityData, setcityData] = useState([]);
  const [inputcity, setinputcity] = useState([])
  const [imgicon, setimgicon] = useState('')
  const [temp, settemp] = useState('')
  const [contryname,setcontryname]=useState('')
  const [weather,setweather]=useState('')

  console.log(mycityData);
  const formhendalData = (event) => {
    event.preventDefault();
    const cityName = event.target.weather.value;
    setinputcity(cityName)
  };

  useEffect(() => {
    fechapidata()
  }, [inputcity])

  let fechapidata = () => {

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputcity}&appid=52f11b507965ddea9288f8d8945e6fe1`)
      .then((res) => {
        setcityData(res.data);
        setimgicon(res.data.weather[0].icon)
        settemp(res.data.main.temp);
        setcontryname(res.data.sys.country);
        setweather(res.data.weather[0].main)
      })
      .catch((error) => {
        if ('Error fetching weather data:', error.response.data.cod == '400') {
          setcityData(400)
        }
      });


  }



  return (
    <div className='cardweather mx-auto mt-5 p-3'>
      <form onSubmit={formhendalData} className='w-100 d-flex justify-content-around'>
        <input placeholder='Enter city Name' autocomplete='off' type="search" name="weather" className='p-2 weather' />
        <button type="submit" className='btn ms-1 getbtn'>
          <FaSearch />
        </button>
      </form>
      {

        (mycityData == 400)
          ?
          <div className='d-flex h-100 text-light justify-content-center align-items-center'>
               <h1>City Not Found</h1>
          </div>
          
          :
          <Container>
            <div className='text-center'>
              <img src={`https://openweathermap.org/img/wn/${imgicon}@2x.png`} width={'200px'} className='img-fluid' alt="" />
            </div>
            <div>
              <h3 className='text-center fs-1 text-light position-relative '>
                {temp} <span className='temprechur'></span>&nbsp;&nbsp;&nbsp;C
              </h3>
            </div>
            <div>
              <h3 className='text-center text-light text-uppercase mt-4'>
                {
                  mycityData.name
                }
              </h3>
            </div>
            <div className='d-flex justify-content-between mt-5 '>
                  <div>
                      <div className='contry text-center fs-3 pt-1'>
                         {contryname}
                      </div>
                  </div>
                  <div>
                      <h4 className='text-light mt-3 '>{weather}</h4>
                  </div>
            </div>
          </Container>

      }
    </div>
  );
}

export default App;