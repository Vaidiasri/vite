import Data from "./Constants/Data"
import Property from "./components/Property"

const App = () => {
  return (
    <>
      {Data.map((data, index) => (
        <Property 
          key={index} 
          title={data.title} 
          age={data.age} 
        />
      ))}
    </>
  )
}

export default App;