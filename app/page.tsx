'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Home() {
  const [input, setInput]=useState('');
  const [parts,setParts]=useState<string[]>([])
  const [official,setOfficial]=useState('')

  function Official_Name(){
    interface IOfficial{
      word:string,
      count:number,
      firstOccurence:number
    };

    let Official_Names:IOfficial[]=[];
    let tempString=parts;
    tempString.map((value,i)=>{
      let exists=false;
      Official_Names.forEach((n)=>{
        if(n.word===value)
         {
          //console.log(value,' already exists in array');
          n.count++;
          exists=true;
         }
      })
      if(!exists){
        Official_Names.push({word:value,count:1,firstOccurence:i})
      }
    })
    //console.log(Official_Names)
    let maxOccurence=1;let filtered_official_names:IOfficial[]=[]
    Official_Names.map((name,i)=>{
      if(name.count>maxOccurence){
        maxOccurence=name.count;
        filtered_official_names=[]
        filtered_official_names.push(name);
      }else if(name.count===maxOccurence){
        filtered_official_names.push(name)
      }
    })
    let off:string;
    if(filtered_official_names.length>1){
      let lowestOccurence=filtered_official_names[0].firstOccurence;
      let lowOccurence_Index=0;
      filtered_official_names.map((o,i)=>{
        if(o.firstOccurence<lowestOccurence){
          lowestOccurence=o.firstOccurence;
          lowOccurence_Index=i;
        }
      })
      off=filtered_official_names[lowOccurence_Index].word
    }else{
      off=filtered_official_names[0].word;
    }
    off=off.replace(/3FT|1M|3 Feet|1 Meter|-$/,'');
    setOfficial(off);
  }

  useEffect(()=>{
    let convertedArray=input.toLocaleLowerCase().split(' ');
    convertedArray=convertedArray.filter((e)=>e!='')
    setParts(convertedArray)
  },[input])
  return (
    <div className=' h-screen flex justify-center items-center bg-slate-500/40'>
      <div className=' w-auto md:w-[400px] flex flex-col p-4 md:p-5 gap-4 items-center rounded-md justify-center bg-gradient-to-t from-teal-600/60 to bg-emerald-600/40 shadow-lg '>
      <div className=' flex gap-5 items-center'>
      <input onChange={(e)=>{setInput(e.target.value)}} placeholder='input' className=' rounded-sm h-[35px] min-w-[240px] px-2' />
      <button disabled={input===''?true:false} onClick={Official_Name} className={`${input==''?'bg-red-400':'bg-blue-500'} rounded-md min-w-[50px] h-10 px-2 `}  >Generate</button>
      </div>
      <div className=' w-full flex justify-between'>
        <div>Official</div><text>{official}</text>
      </div>
    </div>
    </div>
  )
}
