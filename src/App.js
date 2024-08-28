import { useEffect, useState } from "react"

const WIDTH = 8;
const candyColors = [
  "blue",
  "yellow",
  "green",
  "purple",
  "red",
  "orange"
]

const App = ()=> {
  const [currentColors, setCurrentColors] = useState([])

  let notValid = []
  const cellsToAvoid = (first, last) =>{
      for(let i=first; i<=last; i=i+8){
          notValid.push(i)
      }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkOfRowOfFour = () =>{
    for(let i=0; i<=60; i++){
      const rowOfFour = [i, i+1, i+2, i+3];
      const decidedColor = currentColors[i];
      
      notValid = []
      cellsToAvoid(5, 61)
      cellsToAvoid(6, 62)
      cellsToAvoid(7, 63)
      if (!notValid.includes(i)){
        if(rowOfFour.every(square => currentColors[square] === decidedColor)){
          rowOfFour.forEach(square => currentColors[square] = '')
        }  
      }
    }
  }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkOfColumnOfFour = () =>{
    for(let i=0; i<=47; i++){
      const columnOfFour = [i, i+WIDTH, i + WIDTH * 2, i + WIDTH * 2];
      const decidedColor = currentColors[i];
        if(columnOfFour.every(square => currentColors[square] === decidedColor)){
          columnOfFour.forEach(square => currentColors[square] = '')
        }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
    const checkOfRowOfThree = () =>{
      for(let i=0; i<=61; i++){
        const rowOfThree = [i, i+1, i+2];
        const decidedColor = currentColors[i];
        notValid = []
        cellsToAvoid(6, 62)
        cellsToAvoid(7, 63)
    
        if (!notValid.includes(i)){
          if(rowOfThree.every(square => currentColors[square] === decidedColor)){
            rowOfThree.forEach(square => currentColors[square] = '')
          }
        }
      }
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkOfColumnOfThree = () =>{
    for(let i=0; i<=47; i++){
      const columnOfThree = [i, i+WIDTH, i + WIDTH * 2];
      const decidedColor = currentColors[i];

      if(columnOfThree.every(square => currentColors[square] === decidedColor)){
        columnOfThree.forEach(square => currentColors[square] = '')
      }
    }
  }

  const createBoard = () =>{
    const randomColors = []
    for(let i=0; i<WIDTH * WIDTH; i++){
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)]
      randomColors.push(randomColor)
    }
    setCurrentColors(randomColors)
  }

  useEffect(() =>{
    createBoard()
  }, [])

  useEffect(() =>{
    const timer = setInterval(()=>{
      checkOfRowOfFour()
      setCurrentColors([...currentColors])
  
    }, 1000)
    return () => clearInterval(timer)
  }, [checkOfRowOfFour, currentColors])

  useEffect(() =>{
    const timer = setInterval(()=>{
      checkOfColumnOfFour()
      setCurrentColors([...currentColors])
  
    }, 1000)
    return () => clearInterval(timer)
  }, [checkOfColumnOfFour, currentColors])

  useEffect(() =>{
    const timer = setInterval(()=>{
      checkOfColumnOfThree()
      setCurrentColors([...currentColors])
  
    }, 1000)
    return () => clearInterval(timer)
  }, [checkOfColumnOfThree, currentColors])

  useEffect(() =>{
    const timer = setInterval(()=>{
      checkOfRowOfThree()
      setCurrentColors([...currentColors])
  
    }, 1000)
    return () => clearInterval(timer)
  }, [checkOfRowOfThree, currentColors])

  console.log(currentColors);
  return (
    <div className="app">
      <div className="game">
        {currentColors.map((candyColor, index) =>{
        return (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img 
            
            key={index}
            style={{backgroundColor: candyColor}} 
            // alt={candyColor}
          />
        )}
        )}
      </div>
    </div>
  );
}

export default App;
