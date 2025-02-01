import { useRef, useState } from "react"
import { assets } from "../assets/assets"
import { category } from "../assets/assets"
function Category() {
    const [searchCategory, setSearchCategory] = useState(0)
    const containerRef = useRef(null);
    const [scroll, setScroll] = useState(0);
    const [totalScroll, setTotalScroll] = useState(10000);
    const handleScroll = () => {
        setScroll(containerRef.current.scrollLeft);
        setTotalScroll(containerRef.current.scrollWidth)
    };
  return (
    <div className="flex items-center pl-10 gap-x-8 ">
        <div className="text-4xl bg-zinc-900">
           <assets.IoMenuOutline />
        </div>
        <div className="w-[92vw] pr-4 flex items-center">
           <button className={` text-4xl w-8 h-8 rounded-full cursor-pointer flex items-center justify-center hover:bg-[#222222]`}> <assets.MdChevronLeft className={`${scroll<1 && `hidden`}`}/></button>
            <div id="category" ref={containerRef} onScroll={()=>handleScroll()} className="flex gap-x-3 px-2 rounded-full overflow-x-scroll ">
            {
                category.map((item,index)=>
                    <button key={index} onClick={()=>setSearchCategory(index)} className={`${searchCategory == index ? `bg-white text-black`:`bg-[#222222] hover:bg-[#3f3f3f]`} px-3 h-8 cursor-pointer rounded-md min-w-fit`}>{item}</button>
                )
            }
            </div>
            <button className="text-4xl w-8 h-8 rounded-full cursor-pointer flex items-center justify-center hover:bg-[#222222]"><assets.MdChevronRight className={`${scroll<totalScroll-window.innerWidth*0.88 ? `block`:"hidden"}`}/></button>
        </div>
       
    </div>
  )
}

export default Category