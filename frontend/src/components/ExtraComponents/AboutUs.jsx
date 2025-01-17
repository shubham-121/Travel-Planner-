import img from "../../images/travel.jpg";
import taxiimg from "../../images/taxii.jpg";
import worldimg from "../../images/world.jpg";

export default function AboutUs() {
  return (
    <div
      className="min-h-screen bg-gray-400 overflow-hidden"
      style={{ backgroundAttachment: "fixed" }}
    >
      <Header></Header>
      <MainBody></MainBody>
      <MainContent></MainContent>
      <DetailedContent></DetailedContent>
    </div>
  );
}

function Header() {
  return (
    <div className="flex justify-center items-center  w-[86vw] gap-[35px] ml-[10vw]">
      <button
        className="rounded-full bg-contain bg-no-repeat bg-center w-[121px] h-[42px]"
        style={{
          backgroundImage:
            "url(https://cdn-icons-png.flaticon.com/512/167/167642.png)",
        }}
      ></button>
      <p className="text-[21px] font-black text-center w-[33vw] ml-5 text-shadow">
        Wander Map List
      </p>
      <div className="flex items-center justify-center gap-5 w-[70vw] underline">
        <a className="text-lg font-semibold">Home</a>
        <a className="text-lg font-semibold">AboutUs</a>
        <a className="text-lg font-semibold">Pricing</a>
        <a className="text-lg font-semibold">Contact Us</a>
      </div>
      <input
        placeholder="search..."
        type="text"
        className="w-[12vw] h-[5.5vh] mr-[18px] mt-[6px] opacity-30"
      />
      <button className="rounded-full w-[7vw] h-9 relative -right-[86px] z-20">
        🔍
      </button>
      <button
        className="rounded-full relative -right-[2%] mr-3 h-[29px] w-[75px] opacity-70 bg-contain"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg)",
        }}
      ></button>
    </div>
  );
}

function MainBody() {
  return (
    <div className="flex mt-2 bg-[url('./travel.jpg')]">
      <img
        className="h-[86vh] w-[45vw] ml-[2px] rounded-lg object-cover"
        src={img}
      />
      <div className="flex flex-col justify-center w-[20vw] font-bold text-2xl italic text-shadow">
        <p className="w-[53vw] text-center text-[45px]">
          Your Travel Companion: Save, Organize, and Explore.
        </p>
        <p className="mt-[15vh] w-[53vw] text-center text-[21px] font-semibold">
          Embrace the world with confidence—Wander Map List is here to simplify
          your travel planning, one step at a time.
        </p>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex justify-center items-center  mt-2">
      <img
        className="h-[50vh] w-[19vw] rounded-lg hover:scale-105"
        src={taxiimg}
      />
      <div className="flex flex-col items-center justify-center mx-1">
        <p className="text-[35px] font-bold italic text-center text-shadow">
          About Us:
        </p>
        <p className="flex justify-center w-[63vw] text-[25px] font-sans leading-8 text-gray-700 p-5 bg-gray-100 rounded-lg shadow-lg text-justify">
          Welcome to Wander Map List! Wander Map List is designed for explorers,
          adventurers, and dreamers who want a seamless way to organize their
          travel goals...
        </p>
      </div>
      <img
        className="h-[50vh] w-[20vw] rounded-lg hover:scale-105"
        src={worldimg}
      />
    </div>
  );
}

function DetailedContent() {
  return (
    <div className="p-5 border border-gray-300 rounded-lg bg-stone-300">
      <h2 className="text-[24px] font-bold mb-4">What Do We Offer?</h2>
      <ul className="list-none p-0 mb-5">
        <li className="mb-2 text-[18px] leading-6">
          <strong className="text-blue-600">
            Favorites, Wishlist, and Visited Locations:
          </strong>{" "}
          Save places that interest you...
        </li>
        <li className="mb-2 text-[18px] leading-6">
          <strong className="text-blue-600">Custom Itineraries:</strong> Create
          day-by-day plans...
        </li>
      </ul>
      <p className="text-[18px] italic mt-5 text-gray-700">
        Join Us on the Journey! Thank you for being a part of our community...
      </p>
      <button className="relative left-[50%] right-[50%] h-[9vh] w-[11vw] font-bold text-[23px] bg-green-300 rounded-full hover:scale-125 transition-transform">
        Join Us Today!
      </button>
    </div>
  );
}
