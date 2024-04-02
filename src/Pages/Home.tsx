import landingPage from "../assets/landing.png";
import downloadApp from "../assets/appDownload.png";
import SearchBar from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { SearchForm } from "../components/SearchBar";

const Home = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (SearchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${SearchFormValues.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-12">
      <div className=" md:px-32 bg-white shadow-md rounded-lg py-8 flex flex-col gap-5 -mt-16  text-center">
        <h1 className="text-5xl text-orange-600 font-bold tracking-tight">
          Tuck into a takeaway today !
        </h1>
        <span className="text-xl">Food is just a click away</span>
        <SearchBar
          onSubmit={handleSearchSubmit}
          placeHolder="Search by city or town"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingPage} />
        <div className="flex flex-col gap-4 items-center justify-center text-center ">
          <span className="font-bold text-2xl">Order takeaway even faster</span>
          <span>
            Download the SoloEats app for faster ordering and personalized
            recommendations
          </span>
          <img src={downloadApp} />
        </div>
      </div>
    </div>
  );
};

export default Home;
