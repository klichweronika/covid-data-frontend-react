
import ChartistGraph from 'react-chartist';
import 'react-chartist'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

type RaportParams = {
  country: string,
  period: string
}

type CovidApiResponse = {
  result: CovidRaport[]
}

type CovidRaport = {
  confirmed: number,
  date: string,
  deaths: number,
  recovered: number
}

type ChartData = {
  labels: string[],
  series: number[][]
}

const countries: Record<string, string> = {
   'Poland': 'POL' ,
   'Germany': 'GER',
   'Austria': 'AUS'
};

function Raport() {
  const [covidData, setCovidData] = useState<ChartData | undefined>(undefined);
  const { country, period } = useParams<RaportParams>();

  useEffect(() => {
    axios.get<CovidApiResponse>(`${process.env.REACT_APP_COVID_DATA_API}/country/${countries[country]}/timeseries/${period}-01/${period}-31`, {headers: {"Access-Control-Allow-Origin": "*"}}).then(x => {

      setCovidData({
        labels: x.data.result.map(x => x.date),
        series: [
          x.data.result.map(x => x.confirmed),
          x.data.result.map(x => x.deaths),
          x.data.result.map(x => x.recovered),
        ]
      });

    });
  }, []);

  const options = {
    high: 1264574,
    low: 0,
    axisX: {
      labelInterpolationFnc: function (value: any, index: any) {
        return index % 2 === 0 ? value : null;
      }
    }
  };

  return (
     <Container className="bg-white p-4 mt-4 rounded">
      {covidData 
      ? <div>
            <ChartistGraph data={covidData} options={options} type={'Line'} />
        </div>
      : <h2 className="text-black text-center p-4">No data for this time period!</h2>}
      {console.log(covidData)}
    </Container>
  )
}
export default Raport;
