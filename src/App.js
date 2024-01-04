import "./App.css"
import React, { useState, useEffect } from "react"
import Select from "react-select"
import Card from "./SummaryCard"



function App() {
  // App component starts here
  const locationList = [
    { value: "AB", label: "Alberta" },
    { value: "BC", label: "British Columbia" },
    { value: "MB", label: "Manitoba" },
    { value: "NB", label: "New Brunswick" },
    { value: "NL", label: "Newfoundland and Labrador" },
    { value: "NT", label: "Northwest Territories" },
    { value: "NS", label: "Nova Scotia" },
    { value: "NU", label: "Nunavut" },
    { value: "ON", label: "Ontario" },
    { value: "PE", label: "Prince Edward Island" },
    { value: "QC", label: "Quebec" },
    { value: "SK", label: "Saskatchewan" },
    { value: "YT", label: "Yukon" },
  ]
  const [activeLocation, setActiveLocation] = useState("AB")
  const [lastUpdated, setlastUpdated] = useState("")
  const [summaryData, setSummaryData] = useState({})


  const baseUrl = "https://api.opencovid.ca"

  useEffect(() => {
    getSummaryData()
    getVersion()
  }, [activeLocation])


  const getVersion = async () => {
    const res = await fetch(`${baseUrl}/version`)
    const data = await res.json()

    setlastUpdated(data.timeseries)
  }

  const getSummaryData = async (location) => {
    if (activeLocation === "canada") {
      return
    }
    let res = await fetch(`${baseUrl}/summary?loc=${activeLocation}`)
    let resData = await res.json()
    let summaryData = resData.data[0]
    let formattedData = {}

    Object.keys(summaryData).map(
      (key) => (formattedData[key] = summaryData[key].toLocaleString())
    )
    console.log(formattedData)
    setSummaryData(formattedData)
  }

  //return statement 
  return (
    <div className="App">
      <h1>COVID 19 Dashboard </h1>
      <div className="dashboard-container">
        <div className="dashboard-menu ">
          <Select
            options={locationList}
            onChange={(selectedOption) =>
              setActiveLocation(selectedOption.value)
            }
            defaultValue={locationList.filter(
              (options) => options.value === activeLocation
            )}
            className="dashboard-select"
          />
          <p className="update-date">
            Última Atualização : {lastUpdated}
          </p>
        </div>

        <div className="dashboard-summary">
          <Card title="Casos" value={summaryData.cases} />
          <Card
            title="Testes"
            value={summaryData.tests_completed}
          />
          <Card title="Mortes" value={summaryData.deaths} />
          <Card
            title="Vacinados"
            value={summaryData.vaccine_administration_total_doses}
          />
        </div>
      </div>
    </div>
  )
}

export default App