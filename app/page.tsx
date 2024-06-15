import TextSwitcher from "@/components/Animations/TextSwitcher";

export default function Home() {
  return (
    <div className="homepage h-screen flex items-center justify-center">
      <div className="w-[75%] mx-auto">
        <div className="font-bold tracking-tight uppercase">
          <div className="text-white text-5xl md:text-8xl leading-[100px]">
            <div className="flex">
              Feel {' '} <span className="text-red-600">Techno</span>
            </div>
            {/* <br /> */}
            the <span className="text-[#49A7BB]">Beat</span>, <br />
            <span>Embrace</span> <br />
            the <span className=" text-fuchsia-700">Rhythm</span>.
          </div>
        </div>
      </div>
    </div>
  );
}
