import './App.css';
import { useState } from "react";
import Data from './Data';

function App() {
  const [inpval, setInpval] = useState({ origin: '' })
  const [inpvalsec, setInpvalsec] = useState({ destination: '', })
  const [date, setDate] = useState({ dat: '' })
  // set data
  const [origin, setOrigin] = useState();
  const [des, setDes] = useState();
  const [searchData, setSeach] = useState();


  const setVal = (e) => {
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value
      }
    })
    autocomplete();
  }

  const setVal2 = (e) => {
    const { name, value } = e.target;

    setInpvalsec(() => {
      return {
        ...inpvalsec,
        [name]: value
      }
    })
    autocompleteSec();
  }

  const autocomplete = async () => {
    try {
      const params = new URLSearchParams({ keyword: inpval.origin });
      const response = await fetch(`http://localhost:1338/api/autocomplete?${params}`);
      const data = await response.json();
      setOrigin(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  const autocompleteSec = async () => {
    try {
      const params = new URLSearchParams({ keyword: inpvalsec.destination });
      const response = await fetch(`http://localhost:1338/api/autocomplete?${params}`);
      const data = await response.json();
      setDes(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  var userOrigin = 0;
  origin?.map((item) => {
    userOrigin = item.iataCode
  })

  var userDes = 0;
  des?.map((item) => {
    userDes = item.iataCode
  })

  const search = async () => {
    console.log(userOrigin, userDes, date.dat, "datya");
    try {
      const params = new URLSearchParams({
        origin: userOrigin,
        destination: userDes,
        departureDate: date.dat,
        adults: '1',
        children: '0',
        infants: '0',
        travelClass: 'ECONOMY'

      });
      const response = await fetch(`http://localhost:1338/api/search?${params}`);
      const data = await response.json();
      console.log(data, "price")
      setSeach(data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
     
     <div className='text-center my-4 ' >
        <h3>Search Price</h3>
     </div>

      <div class="container-sm">
        <div class="my-2 card">
          <div class="card-body">
            <h5 class="card-title">Locations</h5>
            <div class="row">
              <div class="col-sm">
                <div class="mb-2">
                  <label id="origin-label" for="origin-input" class="form-label"
                  >Origin</label>

                  <div class="input-group">
                    <span class="input-group-text"
                    ><i class="bi-pin-map"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      list="origin-options"
                      id="origin-input"
                      placeholder="Location"
                      aria-describedby="origin-label"
                      name='origin'
                      value={inpval.origin}
                      onChange={setVal}
                    />
                    <datalist id="origin-options"></datalist>
                  </div>
                </div>
              </div>
              <div class="col-sm">
                <div class="mb-2">
                  <label
                    id="destination-label"
                    for="destination-input"
                    class="form-label"
                  >Destination</label>

                  <div class="input-group">
                    <span class="input-group-text"
                    ><i class="bi-pin-map-fill"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      list="destination-options"
                      id="destination-input"
                      name='destination'
                      value={inpvalsec.destination}
                      onChange={setVal2}
                      placeholder="Location"
                      aria-describedby="destination-label"
                    />
                    <datalist id="destination-options"></datalist>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="mb-2 col">
            <div class="h-100 card">
              <div class="card-body">
                <h5 class="card-title">Dates</h5>
                <div id="departure-date" class="mb-2">

                  <div class="input-group">
                    <span class="input-group-text"
                    ><i class="bi-calendar"></i>
                    </span>
                    <input type="date" className="form-control" id="date" name="dat" value={date.dat}
                      onChange={(event) => { setDate((prev) => ({ ...prev, dat: event.target.value })) }}
                      aria-describedby="emailHelp" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button id="search-button" onClick={search} class="w-100 btn btn-search">Search</button>
      </div>
      <div className='alldata' >

        {
          searchData?.map((item, index) => {
            return (
              <Data data={item} origin={inpval.origin} desti={inpvalsec.destination} key={index} />
            )
          })
        }

      </div>
    </>
  );
}

export default App;
