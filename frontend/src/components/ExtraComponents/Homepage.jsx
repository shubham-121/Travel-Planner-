import { Outlet } from "react-router";

export default function Homepage() {
  return (
    <div className="bg-[url('https://images.travelandleisureasia.com/wp-content/uploads/sites/3/2024/09/21141044/world-tourism-day.jpeg')] bg-cover bg-no-repeat h-[105vh] w-[100vw]  relative  z-[1000]">
      <Outlet></Outlet>
      <Header />
      <BodyContent />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="flex justify-center items-center  w-[86vw] gap-[35px] ">
      <button
        className="rounded-full bg-contain bg-no-repeat bg-center w-[121px] h-[42px]"
        style={{
          backgroundImage:
            "url('https://cdn-icons-png.flaticon.com/512/167/167642.png')",
        }}
      ></button>
      <p className="text-[21px] font-black text-center w-[33vw] text-shadow-md ml-[20px]">
        Wander Map List
      </p>
      <div className="flex items-center justify-center gap-[22px] underline w-[70vw]">
        <a className="text-lg font-semibold">Home</a>
        <a className="text-lg font-semibold">AboutUs</a>
        <a className="text-lg font-semibold">Pricing</a>
        <a className="text-lg font-semibold">Contact Us</a>
      </div>
      <input
        placeholder="search..."
        type="text"
        className="w-[12vw] h-[5.5vh] mr-[18px] mt-[6px] opacity-[0.3]"
      />
      <button className="rounded-full w-[7vw] h-[36px] relative -right-[86px] z-[2000]">
        🔍
      </button>
      <button
        className="rounded-full relative -right-[2%] mr-[12px] h-[29px] w-[75px] opacity-[0.7] bg-contain bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg')",
        }}
      ></button>
    </div>
  );
}

function BodyContent() {
  return (
    <div className="flex mt-5  w-[35vw] h-[55vh] justify-center flex-wrap ml-[40px]">
      <div className="font-semibold text-[55px] text-gray-700 text-shadow-lg">
        <p className="text-[40px]">
          It's A Big World Out There, Go And Explore Now s!
        </p>
      </div>
      <p
        id="follow-up"
        className=" font-semibold text-[20px] text-gray-700 text-shadow-lg"
      >
        Discover new attractions and experiences to match your interests and
        travel styles.
      </p>
      <button className="rounded-full font-bold h-[50px] w-[155px] z-[2000] opacity-[0.8] relative -right-[36.5%]  bg-gray-200 hover:scale-110 transition-transform shadow-lg">
        Book Now
      </button>
    </div>
  );
}

function Footer() {
  return (
    <div className="flex justify-center h-[28vh] gap-[73px] ml-[25vw]">
      <SmallBox
        heading="Discover New Destinations"
        content="Explore a world of over 600+ curated destinations. From hidden gems to popular spots, find places that match your travel style."
      />
      <SmallBox
        heading="Personalized Travel Insights"
        content="Save locations, mark favorites, and get tailored recommendations based on your travel preferences. Wander Map List makes it easy to organize."
      />
      <SmallBox
        heading="Seamless Trip Planning"
        content="Easily add destinations to your itinerary, wishlist, or favorites. With one-click additions, you're always ready for adventure."
      />
    </div>
  );
}

function SmallBox({ heading, content }) {
  return (
    <div className="opacity-[0.85] rounded-[30px] border-[2px] border-gray-700 w-[18vw] h-[40vh] bg-gray-200 backdrop-blur-md flex flex-col items-center p-[15px] transition-transform duration-300 hover:scale-[1.05] hover:shadow-lg">
      <p className="text-[30px] font-bold text-center text-gray-700 text-shadow-md">
        {heading}
      </p>
      <hr className="rounded-[30px] bg-gray-700 w-[15vw] h-[4px] " />
      <p className=" font-extrabold text-center text-gray-700">{content}</p>
    </div>
  );
}
