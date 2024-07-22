import { account } from "@/app/appwrite";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = async () => {
    await account.deleteSession("current");
    router.push("/");
  };

  return (
    <div className="w-screen flex justify-center">
      <div className="w-4/5 md:w-3/5 my-2 h-14 md:h-24 bg-neutral-800 justify-between rounded-[15px] md:rounded-[30px] flex items-center">
        <div className="mx-2 md:mx-7">
          <h1 className="font-semibold text-sm md:text-[40px] text-white">EVENTX</h1>
        </div>
        <div>
        
        </div>
        <div
          onClick={() => router.push("/profile")}
          className="mx-2 md:mx-7 flex cursor-pointer"
        >
          <Image
            className="mx-1 rounded-[50%] border-white border-2"
            src="https://github.com/shadcn.png"
            alt="profileImg"
            width={45}
            height={45}
          />
          <button onClick={logout} className="hidden hover:bg-slate-100 px-10 py-2 bg-white rounded-lg ">
          Logout
        </button>
        </div>
      </div>
    </div>
  );
}
