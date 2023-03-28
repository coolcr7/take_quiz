import './App.css';
import FlashCardsList from "./FlashCardsList"
import {useState,useEffect,useRef} from "react"
import axios from "axios"

function App() {

  const [flashData,setFlashData]=useState([])
  const [categories,setCategories]=useState([])
  const [category,setCategory]=useState(1)
  const num_ref=useRef()
  const sel_ref=useRef()
  const [num,setNum]=useState(10)
  const convertString=function (str){
     const ele=document.createElement("textarea")
     ele.innerHTML=str
     return ele.value
  }
  // console.log(converString(`<div>this works<div/>`))
   useEffect(()=>{
    axios.get("https://opentdb.com/api_category.php").then(res=>{
      setCategories(res.data.trivia_categories)
    })
   },[])
  useEffect(()=>{
    axios.get("https://opentdb.com/api.php",{
      params:{
        amount:num,
        category:category
      }
    }).then(res=>{
      console.log(res.data)
      setFlashData(res.data.results.map((data,index)=>{
        return {
          id:index+Date.now(),
          question:convertString(data.question),
          answer:convertString(data.correct_answer),
          options:[...data.incorrect_answers,data.correct_answer].sort(()=>{return Math.random() -0.5}).map((ele)=>{return convertString(ele)})
        }
      }))
    }).catch(err=>{
       console.log(err)
    })
  },[category,num])
  const submitHandler=(e)=>{
      e.preventDefault()
      console.log(num_ref.current.value,sel_ref.current.value)
      setNum(num_ref.current.value)
      setCategory(sel_ref.current.value)
  }

  return (
    <>
    <form>
      <lable for="fname">Categories</lable>
      <select ref={sel_ref} name="fname "id="122">
      {categories.map(ele=>{
        return (<option key={ele.id} value={ele.id}>{ele.name}</option>)
      })}
      </select>
      <label for="quantity">Number of question:</label>
      <input ref={num_ref} type="number" id="quantity" name="quantity" min="1" max="25"></input>
      <input type="submit" onClick={submitHandler}/>
    </form>
    <div className="App">
      <FlashCardsList flashData={flashData}/>
    </div>
   </> 
  );
}

export default App;

