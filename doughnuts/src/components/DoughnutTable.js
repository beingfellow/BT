import React, { useState, useEffect} from 'react';
import { useTable } from 'react-table';
import { chartColors } from './colors';
import 'chart.js/auto';
import {Doughnut } from "react-chartjs-2";
import giftCardData from "./giftCardData";
// import { Ajax } from "react-superagent";


export default function DoughnutTable() {
  
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    // const [cardsData, setcardsData] = useState({});
    const [volume, setVolume] = useState([]);
    const [weight, setWeight] = useState(0);
    const [cardsId, setCardsId] = useState(null);
    const [company, setCompany] = useState("");

  // if fetch used, comment cardsData const and uncomment postcardData state


  const cardsData = giftCardData;

  const handleOnHover = (event, activeElements) => {
    if (activeElements[0]) {
      const id = activeElements[0].index;
      setWeight(Math.round(cardsData.data[id].quantity/ cardsData.total*100));
      setCardsId(id)
      setCompany(cardsData.data[id].name)
      const trs = document.getElementsByClassName("trs");
      for (let t = 0; t < trs.length; t += 1) {
        trs[t].style.backgroundColor = "white";
      }
      document.getElementById(`tr${id}`).style.backgroundColor = "#e8e8e8";
    }
  }

  const renderTableData = (giftCardData) => {
    const btcards = giftCardData.data
    return btcards.map((btcard, index) => {
       return (
          <tr className={`trs ${index===5?"last":""}`} id = {`tr${index}`}>
             <td >{btcard.id}</td>
             <td>{btcard.name}</td>
             <td>{btcard.quantity}</td>
          </tr>
       )
    })
  }
    useEffect(() => {
        // uncomment when fetch used:
        // fetch("https://thebteam.free.beeceptor.com/data")
        //   .then(res => res.json())
        //   .then(
        //     (result) => {
      setIsLoaded(true);
      //         setcardsData(result);
      const companies = cardsData.data.map((card) => card.name);
      const quantity = cardsData.data.map((card) => card.quantity);
      //const total = cardsData.total;
      setVolume({
          // labels: companies,
          datasets: [
            {
              data: quantity,
              backgroundColor: chartColors
            }
          ],
      });


      // createTable(cardsData);
      
      // Close fetch function and error:
      //    },
      //    // Handle errors instead of a catch() block 
      //    // Don't swallow exceptions from actual bugs in components.
      //   (error) => {
      //     setIsLoaded(true);
      //     setError(error);
      //   }
      // )
    }, [])
        // Note: the empty deps array [] means
        // this useEffect will run once
        // similar to componentDidMount()

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className = "doughnut">
          <Doughnut
            data={volume}
            options={{
              interaction: {
                mode: 'point'
              },
              onHover: handleOnHover,
              plugins: {
                elements: {
                  arc: {
                    borderWidth: 0
                  },
                },

                datalabels: {
                  display: false,
                  color: "black",
                  font: {
                    size: 10,
                    weight: "bold"
                  }
                }
              },
            }}
          />
          <div className="weight">{`${weight}%`}</div>
          <div className={`underline line${cardsId}`}></div>
          <div className = "doughnutTitle">{company}</div>
          
          <div className="BTable"/>
            <div className="tableground">
              <div div className="tableholder">
                <table className="tablename">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NAME</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>            
                  <tbody>
                      {renderTableData(cardsData)}
                  </tbody>
                </table>
              </div>
                
            </div>
        </div>
      );
    }
  }
