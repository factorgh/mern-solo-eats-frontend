import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className=" bg-orange-600 py-10 " >
      <div className="container mx-auto  items-center  text-center flex flex-col md:flex-row justify-between gap-5 ">
      <Link to="/" className="text-white font-bold text-3xl">  SoloEats.com</Link> 
      
      <span className="text-white font-bold tracking-tight flex gap-4">
    <span>Privacy Policy</span>
    <span>Terms and Condition</span>
      </span>
    </div>
    </div>
  )
}

export default Footer
