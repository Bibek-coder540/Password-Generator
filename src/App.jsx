import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length , setLength] = useState(8)
  const [numberAllow , setNumberAllow] = useState(false)
  const [charAllow,setCharAllow] = useState(false)
  const [password,setPassword] = useState()
  const passwordRef = useRef(null)
  

  const PasswordGeneretor = useCallback(
    ()=>{
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numberAllow) str+= "0123456789"
      if(charAllow) str+= "!@#$%^&*()_-~<>,"
      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random()*str.length +1)
         pass += str.charAt(char)
      }
      setPassword(pass)
    },
    [length,numberAllow,charAllow,setPassword]
  )

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,49)
    window.navigator.clipboard.writeText(password)
    },[password]
  )

  useEffect(()=>{
      PasswordGeneretor()
    },[length,numberAllow,charAllow,PasswordGeneretor]
  )

  return (
    <>
      <div className=
      'w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'
      >
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
           type="text"
           value={password}
           className='outline-none w-full py-1 px-3'
           placeholder='Password'
           readOnly
           ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
           className='outline-none text-white bg-blue-700 px-3 py-0.5 shrink-0'
          >
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
             type="range"
             min={8}
             max={50}
             value={length}
             className='cursor-pointer'
             onChange={(e)=>setLength(e.target.value)}
             />
             <label >
              Length:{length}
             </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
             type="checkbox"
             checked={numberAllow}
             id='numberInput'
             onChange={()=>setNumberAllow( (prev) => !prev)}
            />
            <label >Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
             type="checkbox"
             checked={charAllow}
             id='characterInput'
             onChange={()=>setCharAllow( (prev) => !prev)}
            />
            <label >Character</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
